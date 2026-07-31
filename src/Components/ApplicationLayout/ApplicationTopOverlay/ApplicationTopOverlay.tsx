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
import styles from './ApplicationTopOverlay.module.less';

export interface ApplicationTopOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subTitle: string;
  confirmText: string;
  cancelText: string;
  closeTitle: string;
  confirmTheme?: EButtonTheme;
  variant?: 'detail' | 'prefill';
}

export const ApplicationTopOverlay: React.FC<ApplicationTopOverlayProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subTitle,
  confirmText,
  cancelText,
  closeTitle,
  confirmTheme = EButtonTheme.DANGER,
  variant = 'detail',
}) => {
  const confirmClass = variant === 'prefill' ? styles.prefillConfirm : styles.detailConfirm;

  return (
    <LightBox.TopOverlay opened={isOpen} onClose={onClose}>
      <Confirm className={confirmClass}>
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
          title={closeTitle}
          clickByEsc={isOpen}
          onClick={onClose}
        />
      </Confirm>
    </LightBox.TopOverlay>
  );
};
