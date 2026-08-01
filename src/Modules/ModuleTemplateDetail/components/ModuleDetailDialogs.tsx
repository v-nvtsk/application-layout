import React from "react";

import { ApplicationTopOverlay } from "../../../Components/ApplicationLayout";

type OverlayType = "close" | "delete" | null;

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
  return (
    <>
      <ApplicationTopOverlay
        isOpen={activeOverlay === "close"}
        onClose={onClose}
        onConfirm={onConfirmClose}
        title="Внимание"
        subTitle="Несохранённые изменения будут утеряны. Продолжить?"
        confirmText="Выйти"
        cancelText="Отмена"
        closeTitle="Закрыть"
      />
      <ApplicationTopOverlay
        isOpen={activeOverlay === "delete"}
        onClose={onClose}
        onConfirm={onConfirmDelete}
        title="Подтверждение удаления"
        subTitle="Вы действительно хотите удалить этот элемент? Это действие необратимо."
        confirmText="Удалить"
        cancelText="Отмена"
        closeTitle="Закрыть"
      />
    </>
  );
};
