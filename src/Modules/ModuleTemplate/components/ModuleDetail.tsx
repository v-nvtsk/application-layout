import React, { useEffect } from "react";

import { Form } from "react-final-form";

import {
  ApplicationFooter,
  ApplicationHeader,
  DetailsLayout,
} from "../../../Components/ApplicationLayout";
import { useErrorController } from "../hooks/useErrorController";
import { useFetchModuleData } from "../hooks/useFetchModuleData";
import { useSaveModuleData } from "../hooks/useSaveModuleData";
import type { ModuleData } from "../Models";
import styles from "./ModuleDetail.module.less";
import { ModuleDetailDialogs } from "./ModuleDetailDialogs";
import { ModuleDetailError } from "./ModuleDetailError";
import { ModuleDetailFields } from "./ModuleDetailFields";
import { ModuleStatusTracker } from "./ModuleStatusTracker";

interface ModuleDetailProps {
  onClose?: () => void;
}

type OverlayType = "close" | "delete" | null;

export const ModuleDetail: React.FC<ModuleDetailProps> = ({ onClose }) => {
  const [activeOverlay, setActiveOverlay] = React.useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(true);

  const {
    data,
    isLoading: isDataLoading,
    error: fetchError,
    refetch,
  } = useFetchModuleData();
  const { save, isSaving } = useSaveModuleData();
  const {
    error: activeError,
    isCriticalError,
    handleApiError,
    clearError,
  } = useErrorController();

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
    const success = await save(values);
    if (success) {
      setIsFormOpen(false);
      if (onClose) onClose();
    }
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
          isLoading={isDataLoading || submitting || isSaving}
          isOverlayOpen={isOverlayOpen}
          onClose={() => setActiveOverlay("close")}
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
              onCancelAttempt={() => setActiveOverlay("close")}
              description="Внимание! Изменения вступят в силу немедленно."
              saveText="Сохранить"
              cancelText="Отменить"
            />
          }
        />
      )}
    </Form>
  );
};
