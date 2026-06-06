import React from 'react';
import styles from './ModuleStatusTracker.module.less';
import {
  EStatusTrackerType,
  StatusTracker,
  StatusTrackerBody,
  StatusTrackerDescription,
  StatusTrackerHeader,
  StatusTrackerSum,
  StatusTrackerTitle,
} from '@sberbusiness/triplex-next';

export const ModuleStatusTracker: React.FC = () => {
  return (
    <div className={styles.detailSidebarContainer || 'detail-sidebar-container'}>
      <StatusTracker type={EStatusTrackerType.DRAFT} className={styles.detailStatusTracker}>
        <StatusTrackerHeader>
          <StatusTrackerTitle>Статус Заявления</StatusTrackerTitle>
        </StatusTrackerHeader>
        <StatusTrackerBody>
          <StatusTrackerDescription>
            Черновик заявления подготовлен к отправке. Требуется подтверждение изменений.
          </StatusTrackerDescription>
          <StatusTrackerSum amountProps={{ value: '1245800.50', currency: 'RUB' }} />
        </StatusTrackerBody>
      </StatusTracker>
    </div>
  );
};
