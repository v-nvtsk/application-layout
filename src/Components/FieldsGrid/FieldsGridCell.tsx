import React from 'react';
import styles from './FieldsGrid.module.less';

export interface FieldsGridCellProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const FieldsGridCell: React.FC<FieldsGridCellProps> = ({
  children,
  fullWidth = false,
  className = '',
}) => {
  const cellClass = `${fullWidth ? styles.fullWidth : ''} ${className}`;
  return <div className={cellClass.trim()}>{children}</div>;
};
