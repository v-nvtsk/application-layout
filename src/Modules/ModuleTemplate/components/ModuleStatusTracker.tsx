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
 * БОКОВАЯ ПАНЕЛЬ СТАТУС-ТРЕКЕРА (ШАБЛОН)
 */
export const ModuleStatusTracker: React.FC = () => {
  return (
    <div className={styles.detailSidebarContainer}>
      <StatusTracker type={EStatusTrackerType.DRAFT} className={styles.detailStatusTracker}>
        <StatusTrackerHeader>
          <StatusTrackerTitle>[Статус документа]</StatusTrackerTitle>
        </StatusTrackerHeader>
        <StatusTrackerBody>
          <StatusTrackerDescription>
            [Описание текущего состояния бизнес-процесса]
          </StatusTrackerDescription>
        </StatusTrackerBody>
      </StatusTracker>
    </div>
  );
};
