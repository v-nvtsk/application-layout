import React from 'react';
import styles from './FieldsGrid.module.less';

export interface FieldsGridProps {
  children: React.ReactNode;
}



export const FieldsGrid: React.FC<FieldsGridProps> = ({ children }) => {
  return <div className={styles.fieldsGrid}>{children}</div>;
};
