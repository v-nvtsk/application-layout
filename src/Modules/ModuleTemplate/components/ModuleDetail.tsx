import styles from './ModuleDetail.module.less';

import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import {
  DetailsLayout,
} from '../../../Components/ApplicationLayout/DetailsLayout';
import { ApplicationHeader } from '../../../Components/ApplicationLayout/ApplicationHeader';
import { ApplicationFooter } from '../../../Components/ApplicationLayout/ApplicationFooter';

import { useFetchModuleData, type ModuleData } from '../hooks/useFetchModuleData';
import { useErrorController } from '../hooks/useErrorController';
import { ModuleDetailFields } from './ModuleDetailFields';
import { ModuleStatusTracker } from './ModuleStatusTracker';
import { ModuleDetailError } from './ModuleDetailError';
import { ModuleDetailDialogs } from './ModuleDetailDialogs';

interface ModuleDetailProps {
  onClose?: () => void;
}

type OverlayType = 'close' | 'delete' | null;

export const ModuleDetail: React.FC<ModuleDetailProps> = ({ onClose }) => {
  const [activeOverlay, setActiveOverlay] = React.useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(true);

  const { data, isLoading: isDataLoading, error: fetchError, refetch } = useFetchModuleData();
  const { error: activeError, isCriticalError, handleApiError, clearError } = useErrorController();

  useEffect(() => {
    if (fetchError) {
      handleApiError(fetchError);
    } else {
      clearError();
    }
  }, [fetchError, handleApiError, clearError]);

  const handleRetry = () => {
    clearError();
    refetch();
  };

  const handleSave = async (values: ModuleData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('Данные сохранены!\n' + JSON.stringify(values, null, 2));
        setIsFormOpen(false);
        if (onClose) onClose();
        resolve();
      }, 500);
    });
  };

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

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
            <ModuleDetailDialogs
              activeOverlay={activeOverlay}
              onClose={() => setActiveOverlay(null)}
              onConfirmClose={() => {
                setIsFormOpen(false);
                if (onClose) onClose();
              }}
              onConfirmDelete={() => {
                setIsFormOpen(false);
                if (onClose) onClose();
              }}
            />
          }
          headerSlot={
            <ApplicationHeader
              title="Детальная форма (Шаблон)"
              subhead="[Описание функционала раздела]"
            />
          }
          errorSlot={
            isCriticalError && activeError ? (
              <ModuleDetailError
                message={activeError.message}
                onRetry={handleRetry}
              />
            ) : null
          }
          contentSlot={<ModuleDetailFields />}
          sidebarSlot={<ModuleStatusTracker />}
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
