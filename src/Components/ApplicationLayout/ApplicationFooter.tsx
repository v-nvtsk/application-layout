import React from 'react';
import {
  Page,
  EFooterPageType,
  Text,
  Button,
  EButtonTheme,
  EComponentSize,
  ETextSize,
  EFontType,
} from '@sberbusiness/triplex-next';

export interface ApplicationFooterProps {
  onSave: () => void;
  onCancelAttempt: () => void;
  canSign?: boolean;
  onSign?: () => void;
}

export const ApplicationFooter: React.FC<ApplicationFooterProps> = ({
  onSave,
  onCancelAttempt,
  canSign = false,
  onSign,
}) => {
  return (
    <Page.Footer type={EFooterPageType.FIRST} sticky>
      <Page.Footer.Description>
        <Page.Footer.Description.Content>
          <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
            Изменения вступят в силу для всех пользователей организации.
          </Text>
        </Page.Footer.Description.Content>
        <Page.Footer.Description.Controls>
          {canSign && onSign && (
            <Button
              theme={EButtonTheme.GENERAL}
              size={EComponentSize.MD}
              onClick={onSign}
            >
              Подписать
            </Button>
          )}
          <Button
            theme={canSign ? EButtonTheme.SECONDARY : EButtonTheme.GENERAL}
            size={EComponentSize.MD}
            onClick={onSave}
          >
            Применить
          </Button>
          <Button
            theme={EButtonTheme.SECONDARY_LIGHT}
            size={EComponentSize.MD}
            onClick={onCancelAttempt}
          >
            Отмена
          </Button>
        </Page.Footer.Description.Controls>
      </Page.Footer.Description>
    </Page.Footer>
  );
};
