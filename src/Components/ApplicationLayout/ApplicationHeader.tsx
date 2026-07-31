import React from 'react';
import {
  Page,
  EHeaderPageType,
  Title,
  Text,
  ETitleSize,
  ETextSize,
  EFontType,
} from '@sberbusiness/triplex-next';

export interface ApplicationHeaderProps {
  title: string;
  subhead?: string;
  controlsSlot?: React.ReactNode;
}

export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  title,
  subhead,
  controlsSlot,
}) => {
  return (
    <Page.Header type={EHeaderPageType.FIRST} sticky>
      <Page.Header.Title>
        <Page.Header.Title.Content>
          <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
            {title}
          </Title>
        </Page.Header.Title.Content>
        
        {controlsSlot && (
          <Page.Header.Title.Controls>
            {controlsSlot}
          </Page.Header.Title.Controls>
        )}
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
