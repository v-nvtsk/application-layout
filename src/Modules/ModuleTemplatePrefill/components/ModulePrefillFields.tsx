import React from 'react';
import { EIslandType } from '@sberbusiness/triplex-next';

import { ApplicationIsland } from '../../../Components/ApplicationIsland';
import styles from './ModulePrefill.module.less';

/**
 * КОМПОНЕНТ ДЛЯ ОПИСАНИЯ ПОЛЕЙ ФОРМЫ ПРЕДЗАПОЛНЕНИЯ (ШАБЛОН)
 */
export const ModulePrefillFields: React.FC = () => {
  return (
    <div className={styles.templateIslandsContainer}>
      <ApplicationIsland
        title="[Название секции]"
        type={EIslandType.TYPE_1}
      >
        {/* Добавьте сюда поля формы */}
        {null}
      </ApplicationIsland>
    </div>
  );
};
