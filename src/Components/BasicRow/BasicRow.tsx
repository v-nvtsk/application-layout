import React from 'react';
import { Text, ETextSize, EFontType } from '@sberbusiness/triplex-next';
import styles from './BasicRow.module.less';

export interface BasicRowProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const BasicRow: React.FC<BasicRowProps> = ({
  label,
  required = false,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.basicRow} ${className}`.trim()}>
      <div className={styles.labelContainer}>
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
          {label}
          {required && <span className={styles.requiredStar}> *</span>}
        </Text>
      </div>
      <div className={styles.fieldContainer}>
        {children}
      </div>
    </div>
  );
};
