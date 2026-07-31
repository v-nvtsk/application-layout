import React, { useState } from 'react';

import { Form } from 'react-final-form';

import {
  ApplicationFooter,
} from '../../../Components/ApplicationLayout/ApplicationFooter';
import {
  ApplicationHeader,
} from '../../../Components/ApplicationLayout/ApplicationHeader';
import {
  ApplicationTopOverlay,
} from '../../../Components/ApplicationLayout/ApplicationTopOverlay';
import {
  PrefillLayout,
} from '../../../Components/ApplicationLayout/PrefillLayout';
import { useSaveApplicationData } from '../hooks/useSaveApplicationData';
import type { ApplicationData } from '../Models';
import { ApplicationPrefillFields } from './ApplicationPrefillFields';

interface ApplicationPrefillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type OverlayType = 'close' | null;

interface ApplicationFormValues extends ApplicationData {
  confirmCorrectness?: boolean;
}

export const ApplicationPrefill: React.FC<ApplicationPrefillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const { save, isSaving } = useSaveApplicationData();

  // ==========================================
  // ТОЧКА ВАЛИДАЦИИ ФОРМЫ (FORM VALIDATION POINT)
  // ==========================================
  const handleValidate = (_values: ApplicationFormValues) => {
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
  const handleSave = async (values: ApplicationFormValues) => {
    const { confirmCorrectness, ...dataToSave } = values;

    if (!confirmCorrectness) return;
    const success = await save(dataToSave);
    if (success) {
      onSave();
      setIsFormOpen(false);
      onClose();
    }
  };

  const handleCancelAttempt = () => {
    setActiveOverlay('close');
  };

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <Form<ApplicationFormValues>
      onSubmit={handleSave}
      validate={handleValidate}
      initialValues={{ confirmCorrectness: false }}
    >
      {({ handleSubmit }) => (
        <PrefillLayout
          isOpen={isFormOpen}
          isLoading={isSaving}
          isOverlayOpen={isOverlayOpen}
          onClose={() => setActiveOverlay('close')}
          dialogsSlot={
            <ApplicationTopOverlay
              isOpen={activeOverlay === 'close'}
              onClose={() => setActiveOverlay(null)}
              onConfirm={() => {
                setIsFormOpen(false);
                onClose();
              }}
              title="Внимание"
              subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму?"
              confirmText="Покинуть форму"
              variant="prefill"
            />
          }
          headerSlot={
            <ApplicationHeader
              title="Предзаполнение данных"
              subhead="Пожалуйста, проверьте и дополните информацию перед сохранением"
            />
          }
          contentSlot={<ApplicationPrefillFields />}
          footerSlot={
            <ApplicationFooter
              onSave={handleSubmit}
              onCancelAttempt={handleCancelAttempt}
            />
          }
        />
      )}
    </Form>
  );
};
