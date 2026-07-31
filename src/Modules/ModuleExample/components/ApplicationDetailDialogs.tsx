import React from 'react';
import { ApplicationTopOverlay } from '../../../Components/ApplicationLayout/ApplicationTopOverlay';

type OverlayType = 'close' | 'delete' | null;

interface ApplicationDetailDialogsProps {
  activeOverlay: OverlayType;
  onClose: () => void;
  onConfirmClose: () => void;
  onConfirmDelete: () => void;
}

export const ApplicationDetailDialogs: React.FC<ApplicationDetailDialogsProps> = ({
  activeOverlay,
  onClose,
  onConfirmClose,
  onConfirmDelete,
}) => {
  return (
    <>
      <ApplicationTopOverlay
        isOpen={activeOverlay === 'close'}
        onClose={onClose}
        onConfirm={onConfirmClose}
        title="Внимание"
        subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?"
        confirmText="Покинуть форму"
      />
      <ApplicationTopOverlay
        isOpen={activeOverlay === 'delete'}
        onClose={onClose}
        onConfirm={onConfirmDelete}
        title="Удаление настроек"
        subTitle="Вы действительно хотите удалить конфигурацию настроек? Это действие необратимо."
        confirmText="Удалить"
      />
    </>
  );
};
