import React from 'react';
import { ApplicationTopOverlay } from '../../../Components/ApplicationLayout/ApplicationTopOverlay';

type OverlayType = 'close' | 'delete' | null;

interface ModuleDetailDialogsProps {
  activeOverlay: OverlayType;
  onClose: () => void;
  onConfirmClose: () => void;
  onConfirmDelete: () => void;
}

export const ModuleDetailDialogs: React.FC<ModuleDetailDialogsProps> = ({
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
        subTitle="Несохранённые изменения будут утеряны. Продолжить?"
        confirmText="Выйти"
      />
    );
  }

  if (activeOverlay === 'delete') {
    return (
      <ApplicationTopOverlay
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirmDelete}
        title="Подтверждение удаления"
        subTitle="Вы действительно хотите удалить этот элемент? Это действие необратимо."
        confirmText="Удалить"
      />
    );
  }

  return null;
};
