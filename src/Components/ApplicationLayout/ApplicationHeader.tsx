import React from 'react';
import {
  Page,
  EHeaderPageType,
  Title,
  Text,
  Button,
  EButtonTheme,
  EComponentSize,
  ETitleSize,
  ETextSize,
  EFontType,
} from '@sberbusiness/triplex-next';
import { PrintStrokeSrvIcon24, DeleteStrokeSrvIcon24 } from '@sberbusiness/icons-next';

export interface ApplicationHeaderProps {
  title: string;
  subhead?: string;
  canPrint?: boolean;
  canDelete?: boolean;
  onDeleteAttempt?: () => void;
  onPrint?: () => void;
}

export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  title,
  subhead,
  canPrint = false,
  canDelete = false,
  onDeleteAttempt,
  onPrint,
}) => {
  const handlePrintClick = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <Page.Header type={EHeaderPageType.FIRST} sticky>
      <Page.Header.Title>
        <Page.Header.Title.Content>
          <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
            {title}
          </Title>
        </Page.Header.Title.Content>
        
        <Page.Header.Title.Controls>
          {canPrint && (
            <Button
              theme={EButtonTheme.SECONDARY_LIGHT}
              size={EComponentSize.MD}
              icon={<PrintStrokeSrvIcon24 paletteIndex={0} />}
              onClick={handlePrintClick}
              title="Печать"
            />
          )}
          {canDelete && onDeleteAttempt && (
            <Button
              theme={EButtonTheme.DANGER}
              size={EComponentSize.MD}
              icon={<DeleteStrokeSrvIcon24 paletteIndex={0} />}
              onClick={onDeleteAttempt}
              title="Удалить"
            />
          )}
        </Page.Header.Title.Controls>
      </Page.Header.Title>
      
      {subhead && (
        <Page.Header.Subhead>
          <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
            {subhead}
          </Text>
        </Page.Header.Subhead>
      )}
    </Page.Header>
  );
};
