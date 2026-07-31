import React, { useEffect, useState } from "react";

import { Form } from "react-final-form";

import {
  DeleteStrokeSrvIcon24,
  PrintStrokeSrvIcon24,
} from "@sberbusiness/icons-next";
import {
  Button,
  EButtonTheme,
  EComponentSize,
} from "@sberbusiness/triplex-next";

import {
  ApplicationFooter,
  ApplicationHeader,
  DetailsLayout,
} from "../../../Components/ApplicationLayout";
import { useErrorController } from "../hooks/useErrorController";
import { useFetchApplicationData } from "../hooks/useFetchApplicationData";
import { useSaveApplicationData } from "../hooks/useSaveApplicationData";
import type { ApplicationData } from "../Models";
import styles from "./ApplicationDetail.module.less";
import { ApplicationDetailDialogs } from "./ApplicationDetailDialogs";
import { ApplicationDetailError } from "./ApplicationDetailError";
import { ApplicationDetailFields } from "./ApplicationDetailFields";
import { ModuleStatusTracker } from "./ModuleStatusTracker";

interface SettingsDetailFormProps {
  onClose?: () => void;
}

type OverlayType = "close" | "delete" | null;

export const ApplicationDetail: React.FC<SettingsDetailFormProps> = ({
  onClose,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  // 1. Data Access Layer
  const {
    data,
    isLoading: isDataLoading,
    error: fetchError,
    refetch,
  } = useFetchApplicationData();
  const { save, isSaving } = useSaveApplicationData();

  // 2. Error Controller
  const {
    error: activeError,
    isCriticalError,
    handleApiError,
    clearError,
  } = useErrorController();

  // Route any fetch errors to the error controller
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

  const handleSave = async (values: ApplicationData) => {
    const success = await save(values);
    if (success) {
      setIsFormOpen(false);
      if (onClose) onClose();
    }
  };

  const handleDelete = () => {
    alert("Конфигурация удалена!");
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
      controlsSlot={
        <>
          {data && (
            <Button
              theme={EButtonTheme.SECONDARY_LIGHT}
              size={EComponentSize.MD}
              icon={<PrintStrokeSrvIcon24 paletteIndex={0} />}
              onClick={() => window.print()}
              title="Печать"
            />
          )}
          {data && (
            <Button
              theme={EButtonTheme.DANGER}
              size={EComponentSize.MD}
              icon={<DeleteStrokeSrvIcon24 paletteIndex={0} />}
              onClick={() => setActiveOverlay("delete")}
              title="Удалить"
            />
          )}
        </>
      }
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
          isLoading={isDataLoading || submitting || isSaving}
          isOverlayOpen={isOverlayOpen}
          onClose={() => setActiveOverlay("close")}
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
          sidebarSlot={<ModuleStatusTracker />}
          footerSlot={
            <ApplicationFooter
              onSave={handleSubmit}
              onCancelAttempt={() => setActiveOverlay("close")}
              description={"Какое-то описание"}
              saveText={"Создать"}
              cancelText={"Отменить"}
            />
          }
        />
      )}
    </Form>
  );
};
