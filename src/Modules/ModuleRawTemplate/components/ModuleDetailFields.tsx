import React from 'react';
import {
  EFontType,
  EIslandType,
  ETitleSize,
  Island,
  Title,
} from '@sberbusiness/triplex-next';
import styles from './ModuleDetail.module.less';

/**
 * КОМПОНЕНТ ПОЛЕЙ НА "ГОЛЫХ" КОМПОНЕНТАХ (RAW ШАБЛОН)
 */
export const ModuleDetailFields: React.FC = () => {
  return (
    <>
      <Island type={EIslandType.TYPE_1}>
        <Island.Header>
          <Title size={ETitleSize.H3} type={EFontType.PRIMARY}>
            [Секция RAW]
          </Title>
        </Island.Header>
        <Island.Body>
          <div className={styles.templateSectionContent}>
             {/* Контент на чистых компонентах библиотеки */}
          </div>
        </Island.Body>
      </Island>
    </>
  );
};
