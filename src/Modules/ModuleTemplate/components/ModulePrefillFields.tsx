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
        title="[Секция подтверждения данных]"
        type={EIslandType.TYPE_1}
      >
        {/* Разместите здесь информацию для проверки перед созданием документа */}
        {null}
      </ApplicationIsland>
    </div>
  );
};
