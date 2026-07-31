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
  description: React.ReactNode;
  saveText: string;
  cancelText: string;
  signText?: string;
}

export const ApplicationFooter: React.FC<ApplicationFooterProps> = ({
  onSave,
  onCancelAttempt,
  canSign = false,
  onSign,
  description,
  saveText,
  cancelText,
  signText,
}) => {
  return (
    <Page.Footer type={EFooterPageType.FIRST} sticky>
      <Page.Footer.Description>
        <Page.Footer.Description.Content>
          {typeof description === 'string' ? (
            <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
              {description}
            </Text>
          ) : (
            description
          )}
        </Page.Footer.Description.Content>
        <Page.Footer.Description.Controls>
          {canSign && onSign && signText && (
            <Button
              theme={EButtonTheme.GENERAL}
              size={EComponentSize.MD}
              onClick={onSign}
            >
              {signText}
            </Button>
          )}
          <Button
            theme={canSign ? EButtonTheme.SECONDARY : EButtonTheme.GENERAL}
            size={EComponentSize.MD}
            onClick={onSave}
          >
            {saveText}
          </Button>
          <Button
            theme={EButtonTheme.SECONDARY_LIGHT}
            size={EComponentSize.MD}
            onClick={onCancelAttempt}
          >
            {cancelText}
          </Button>
        </Page.Footer.Description.Controls>
      </Page.Footer.Description>
    </Page.Footer>
  );
};

