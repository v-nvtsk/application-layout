import styles from './ApplicationPrefill.module.less';

import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { PrefillLayout } from '../../../Components/ApplicationLayout/PrefillLayout';
import { ApplicationHeader } from '../../../Components/ApplicationLayout/ApplicationHeader';
import { ApplicationFooter } from '../../../Components/ApplicationLayout/ApplicationFooter';
import { ApplicationTopOverlay } from '../../../Components/ApplicationLayout/ApplicationTopOverlay';
import { ApplicationPrefillFields } from './ApplicationPrefillFields';

interface ApplicationPrefillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type OverlayType = 'close' | null;

export const ApplicationPrefill: React.FC<ApplicationPrefillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const handleSave = () => {
    onSave();
    setIsFormOpen(false);
    onClose();
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
                subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму?"
                confirmText="Покинуть форму"
              />
            ) : null
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
