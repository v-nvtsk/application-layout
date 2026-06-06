import styles from './ModulePrefill.module.less';

import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { PrefillLayout } from '../../../Components/ApplicationLayout/PrefillLayout';
import { ApplicationHeader } from '../../../Components/ApplicationLayout/ApplicationHeader';
import { ApplicationFooter } from '../../../Components/ApplicationLayout/ApplicationFooter';
import { ApplicationTopOverlay } from '../../../Components/ApplicationLayout/ApplicationTopOverlay';
import { ModulePrefillFields } from './ModulePrefillFields';
import { useSaveModuleData } from '../hooks/useSaveModuleData';
import type { ModuleData } from '../hooks/useFetchModuleData';

interface ModulePrefillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type OverlayType = 'close' | null;

export const ModulePrefill: React.FC<ModulePrefillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const { save, isSaving } = useSaveModuleData();

  const handleSave = async (values: ModuleData) => {
    const success = await save(values);
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
    <Form
      onSubmit={handleSave}
      initialValues={{ confirmCorrectness: false }}
    >
      {({ handleSubmit }) => (
        <PrefillLayout
          isOpen={isFormOpen}
          isLoading={isSaving}
          isOverlayOpen={isOverlayOpen}
          onClose={() => setActiveOverlay('close')}
          className={styles.prefillBodyWidth}
          dialogsSlot={
            activeOverlay === 'close' ? (
              <ApplicationTopOverlay
                isOpen={true}
                onClose={() => setActiveOverlay(null)}
                onConfirm={() => {
                  setIsFormOpen(false);
                  onClose();
                }}
                title="Внимание"
                subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите выйти?"
                confirmText="Выйти"
              />
            ) : null
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
            />
          }
        />
      )}
    </Form>
  );
};
