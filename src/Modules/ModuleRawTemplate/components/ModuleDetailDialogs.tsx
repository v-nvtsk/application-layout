import React from 'react';
import {
  Button,
  Confirm,
  EButtonTheme,
  EComponentSize,
  ETextSize,
  ETitleSize,
  LightBox,
} from '@sberbusiness/triplex-next';

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
  const isOpen = activeOverlay !== null;

  if (!isOpen) return null;

  const getDialogContent = () => {
    if (activeOverlay === 'close') {
      return {
        title: 'Внимание',
        subTitle: 'Несохранённые изменения будут утеряны. Продолжить?',
        confirmText: 'Выйти',
        onConfirm: onConfirmClose,
        confirmTheme: EButtonTheme.DANGER,
      };
    }
    if (activeOverlay === 'delete') {
      return {
        title: 'Подтверждение удаления',
        subTitle: 'Вы действительно хотите удалить этот элемент? Это действие необратимо.',
        confirmText: 'Удалить',
        onConfirm: onConfirmDelete,
        confirmTheme: EButtonTheme.DANGER,
      };
    }
    return null;
  };

  const content = getDialogContent();
  if (!content) return null;

  return (
    <LightBox.TopOverlay opened={isOpen} onClose={onClose}>
      <Confirm>
        <Confirm.Content>
          <Confirm.Content.Title size={ETitleSize.H3}>
            {content.title}
          </Confirm.Content.Title>
          <Confirm.Content.SubTitle size={ETextSize.B3}>
            {content.subTitle}
          </Confirm.Content.SubTitle>
        </Confirm.Content>
        <Confirm.Controls>
          <Button
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            theme={content.confirmTheme}
            size={EComponentSize.MD}
            onClick={() => {
              onClose();
              content.onConfirm();
            }}
          >
            {content.confirmText}
          </Button>
        </Confirm.Controls>
        <Confirm.Close
          title="Закрыть"
          clickByEsc={isOpen}
          onClick={onClose}
        />
      </Confirm>
    </LightBox.TopOverlay>
  );
};
