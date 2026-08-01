import React, { useEffect, useCallback } from "react";

import {
  ApplicationHeader,
  DetailsLayout,
} from "../../../Components/ApplicationLayout";
import { useErrorController } from "../hooks/useErrorController";
import { useFetchModuleData } from "../hooks/useFetchModuleData";
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

  const handleRetry = useCallback(() => {
    clearError();
    refetch();
  }, [clearError, refetch]);

  const handleResetOverlay = useCallback(() => {
    setActiveOverlay(null);
  }, []);

  const handleTriggerCloseOverlay = useCallback(() => {
    setActiveOverlay("close");
  }, []);

  const handleConfirmClose = useCallback(() => {
    setIsFormOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleConfirmDelete = useCallback(() => {
    setIsFormOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <DetailsLayout
      isOpen={isFormOpen}
      isLoading={isDataLoading}
          isOverlayOpen={isOverlayOpen}
          onClose={handleTriggerCloseOverlay}
          className={styles.detailBodyWidth}
          dialogsSlot={
            <ModuleDetailDialogs
              activeOverlay={activeOverlay}
              onClose={handleResetOverlay}
              onConfirmClose={handleConfirmClose}
              onConfirmDelete={handleConfirmDelete}
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
      contentSlot={<ModuleDetailFields data={data} />}
      statusTrackerSlot={<ModuleStatusTracker data={data} />}
    />
  );
};
