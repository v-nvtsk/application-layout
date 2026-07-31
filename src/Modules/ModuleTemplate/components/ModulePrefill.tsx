import React, { useState } from "react";

import { Form } from "react-final-form";

import {
  ApplicationFooter,
  ApplicationHeader,
  ApplicationTopOverlay,
  PrefillLayout,
} from "../../../Components/ApplicationLayout";
import { useSaveModuleData } from "../hooks/useSaveModuleData";
import type { ModuleData } from "../Models";
import { ModulePrefillFields } from "./ModulePrefillFields";

interface ModulePrefillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type OverlayType = "close" | null;

export const ModulePrefill: React.FC<ModulePrefillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const { save, isSaving } = useSaveModuleData();

  // ==========================================
  // ТОЧКА ВАЛИДАЦИИ ФОРМЫ (FORM VALIDATION POINT)
  // ==========================================
  const handleValidate = (_values: ModuleData) => {
    const errors: Record<string, string> = {};
    // Добавьте логику валидации полей формы здесь. Например:
    // if (!values.someField) {
    //   errors.someField = 'Обязательное поле';
    // }
    return errors;
  };

  // ==========================================
  // ТОЧКА САБМИТА ДАННЫХ ФОРМЫ (FORM SUBMIT POINT)
  // ==========================================
  const handleSave = async (values: ModuleData) => {
    const success = await save(values);
    if (success) {
      onSave();
      setIsFormOpen(false);
      onClose();
    }
  };

  const handleCancelAttempt = () => {
    setActiveOverlay("close");
  };

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <Form
      onSubmit={handleSave}
      validate={handleValidate}
      initialValues={{ confirmCorrectness: false }}
    >
      {({ handleSubmit }) => (
        <PrefillLayout
          isOpen={isFormOpen}
          isLoading={isSaving}
          isOverlayOpen={isOverlayOpen}
          onClose={() => setActiveOverlay("close")}
          dialogsSlot={
            <ApplicationTopOverlay
              isOpen={activeOverlay === "close"}
              onClose={() => setActiveOverlay(null)}
              onConfirm={() => {
                setIsFormOpen(false);
                onClose();
              }}
              title="Внимание"
              subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите выйти?"
              confirmText="Выйти"
              cancelText="Отмена"
              closeTitle="Закрыть"
              variant="prefill"
            />
          }
          headerSlot={
            <ApplicationHeader
              title="Форма предзаполнения (Шаблон)"
              subhead="Пожалуйста, проверьте информацию перед продолжением"
            />
          }
          contentSlot={<ModulePrefillFields />}
          footerSlot={
            <ApplicationFooter
              onSave={handleSubmit}
              onCancelAttempt={handleCancelAttempt}
              description="Заполните все обязательные поля перед отправкой заявки."
              saveText="Далее"
              cancelText="Назад"
            />
          }
        />
      )}
    </Form>
  );
};
