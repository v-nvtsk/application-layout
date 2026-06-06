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
  if (activeOverlay === 'close') {
    return (
      <ApplicationTopOverlay
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirmClose}
        title="Внимание"
        subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?"
        confirmText="Покинуть форму"
      />
    );
  }

  if (activeOverlay === 'delete') {
    return (
      <ApplicationTopOverlay
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirmDelete}
        title="Удаление настроек"
        subTitle="Вы действительно хотите удалить конфигурацию настроек? Это действие необратимо."
        confirmText="Удалить"
      />
    );
  }

  return null;
};
