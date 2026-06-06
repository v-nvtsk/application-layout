import React from 'react';
import {
  LightBox,
  Button,
  Confirm,
  EButtonTheme,
  EComponentSize,
  ETitleSize,
  ETextSize,
} from '@sberbusiness/triplex-next';

export interface ApplicationTopOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subTitle: string;
  confirmText: string;
  cancelText?: string;
  confirmTheme?: EButtonTheme;
}

export const ApplicationTopOverlay: React.FC<ApplicationTopOverlayProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subTitle,
  confirmText,
  cancelText = 'Отмена',
  confirmTheme = EButtonTheme.DANGER,
}) => {
  return (
    <LightBox.TopOverlay opened={isOpen} onClose={onClose}>
      <Confirm>
        <Confirm.Content>
          <Confirm.Content.Title size={ETitleSize.H3}>{title}</Confirm.Content.Title>
          <Confirm.Content.SubTitle size={ETextSize.B3}>
            {subTitle}
          </Confirm.Content.SubTitle>
        </Confirm.Content>
        <Confirm.Controls>
          <Button
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            theme={confirmTheme}
            size={EComponentSize.MD}
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            {confirmText}
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
