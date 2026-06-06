import React from 'react';
import styles from './ModuleStatusTracker.module.less';
import {
  EStatusTrackerType,
  StatusTracker,
  StatusTrackerBody,
  StatusTrackerDescription,
  StatusTrackerHeader,
  StatusTrackerTitle,
} from '@sberbusiness/triplex-next';

/**
 * СТАТУС-ТРЕКЕР НА "ГОЛЫХ" КОМПОНЕНТАХ (RAW ШАБЛОН)
 */
export const ModuleStatusTracker: React.FC = () => {
  return (
    <div className={styles.detailSidebarContainer}>
      <StatusTracker type={EStatusTrackerType.DRAFT} className={styles.detailStatusTracker}>
        <StatusTrackerHeader>
          <StatusTrackerTitle>[Статус RAW]</StatusTrackerTitle>
        </StatusTrackerHeader>
        <StatusTrackerBody>
          <StatusTrackerDescription>
            [Описание процесса без оберток]
          </StatusTrackerDescription>
        </StatusTrackerBody>
      </StatusTracker>
    </div>
  );
};
