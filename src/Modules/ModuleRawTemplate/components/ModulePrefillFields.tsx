import React from 'react';
import {
  EFontType,
  EIslandType,
  ETitleSize,
  Island,
  Title,
} from '@sberbusiness/triplex-next';
import styles from './ModulePrefill.module.less';

/**
 * КОМПОНЕНТ ПРЕДЗАПОЛНЕНИЯ НА "ГОЛЫХ" КОМПОНЕНТАХ (RAW ШАБЛОН)
 */
export const ModulePrefillFields: React.FC = () => {
  return (
    <div className={styles.templateIslandsContainer}>
      <Island type={EIslandType.TYPE_1}>
        <Island.Header>
          <Title size={ETitleSize.H3} type={EFontType.PRIMARY}>
            [Проверка данных RAW]
          </Title>
        </Island.Header>
        <Island.Body>
          {/* Место для ручной верстки без оберток */}
        </Island.Body>
      </Island>
    </div>
  );
};
