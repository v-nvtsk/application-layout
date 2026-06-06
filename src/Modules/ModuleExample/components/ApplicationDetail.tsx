import styles from './ApplicationDetail.module.less';

import React, { useState, useEffect } from 'react';
import { Form } from 'react-final-form';

import { useFetchApplicationData, type ApplicationData } from '../hooks/useFetchApplicationData';
import { useErrorController } from '../hooks/useErrorController';
import { DetailsLayout } from '../../../Components/ApplicationLayout/DetailsLayout';
import { ApplicationHeader } from '../../../Components/ApplicationLayout/ApplicationHeader';
import { ApplicationFooter } from '../../../Components/ApplicationLayout/ApplicationFooter';
import { ApplicationDetailFields } from './ApplicationDetailFields';
import { ModuleStatusTracker } from './ModuleStatusTracker';
import { ApplicationDetailError } from './ApplicationDetailError';
import { ApplicationDetailDialogs } from './ApplicationDetailDialogs';

interface SettingsDetailFormProps {
  onClose?: () => void;
}

type OverlayType = 'close' | 'delete' | null;

export const ApplicationDetail: React.FC<SettingsDetailFormProps> = ({ onClose }) => {
  const [simulateError, setSimulateError] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  // 1. Data Access Layer
  const { data, isLoading: isDataLoading, error: fetchError, refetch } = useFetchApplicationData({
    simulateError,
  });

  // 2. Error Controller
  const { error: activeError, isCriticalError, handleApiError, clearError } = useErrorController();

  // Route any fetch errors to the error controller
  useEffect(() => {
    if (fetchError) {
      handleApiError(fetchError);
    } else {
      clearError();
    }
  }, [fetchError, handleApiError, clearError]);

  const handleRetry = () => {
    setSimulateError(false);
    clearError();
    refetch();
  };

  const handleSave = async (values: ApplicationData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('Настройки сохранены!\n' + JSON.stringify(values, null, 2));
        setIsFormOpen(false);
        if (onClose) onClose();
        resolve();
      }, 500);
    });
  };

  const handleDelete = () => {
    alert('Конфигурация удалена!');
    setIsFormOpen(false);
    if (onClose) onClose();
  };

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  // Pre-declared slot contents (for clean template view)
  const headerSlot = (
    <ApplicationHeader
      title="Настройки Личного Кабинета"
      subhead="Просмотр текущей конфигурации профиля (режим чтения)"
      canDelete={!!data}
      canPrint={!!data}
      onDeleteAttempt={() => setActiveOverlay('delete')}
    />
  );

  const contentSlot = <ApplicationDetailFields />;

  return (
    <Form
      onSubmit={handleSave}
      initialValues={data || {}}
      subscription={{ submitting: true }}
    >
      {({ handleSubmit, submitting }) => (
        <DetailsLayout
          isOpen={isFormOpen}
          isLoading={isDataLoading || submitting}
          isOverlayOpen={isOverlayOpen}
          onClose={() => setActiveOverlay('close')}
          className={styles.detailBodyWidth}
          dialogsSlot={
            <ApplicationDetailDialogs
              activeOverlay={activeOverlay}
              onClose={() => setActiveOverlay(null)}
              onConfirmClose={() => {
                setIsFormOpen(false);
                if (onClose) onClose();
              }}
              onConfirmDelete={handleDelete}
            />
          }
          headerSlot={headerSlot}
          errorSlot={
            isCriticalError && activeError ? (
              <ApplicationDetailError
                message={activeError.message}
                onRetry={handleRetry}
              />
            ) : null
          }
          contentSlot={contentSlot}
          sidebarSlot={
            <ModuleStatusTracker
              simulateError={simulateError}
              onSimulateErrorChange={setSimulateError}
            />
          }
          footerSlot={
            <ApplicationFooter
              onSave={handleSubmit}
              onCancelAttempt={() => setActiveOverlay('close')}
            />
          }
        />
      )}
    </Form>
  );
};
