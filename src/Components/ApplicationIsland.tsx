import React from 'react';

import {
  EFontType,
  EIslandType,
  ETitleSize,
  Island,
  Title,
} from '@sberbusiness/triplex-next';

export interface SettingsIslandProps {
  title: string;
  type?: EIslandType;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const ApplicationIsland: React.FC<SettingsIslandProps> = ({
  title,
  type = EIslandType.TYPE_1,
  children,
  footer,
}) => {
  return (
    <Island type={type}>
      <Island.Header>
        <Title size={ETitleSize.H3} type={EFontType.PRIMARY}>
          {title}
        </Title>
      </Island.Header>
      <Island.Body>
        {children}
      </Island.Body>
      {footer && (
        <Island.Footer>
          {footer}
        </Island.Footer>
      )}
    </Island>
  );
};
