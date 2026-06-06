import React from 'react';
import styles from './ModuleStatusTracker.module.less';
import {
  EFontType,
  EStatusTrackerType,
  ETextSize,
  StatusTracker,
  StatusTrackerBody,
  StatusTrackerDescription,
  StatusTrackerHeader,
  StatusTrackerSum,
  StatusTrackerTitle,
  Text,
  Checkbox,
} from '@sberbusiness/triplex-next';

interface ModuleStatusTrackerProps {
  simulateError: boolean;
  onSimulateErrorChange: (checked: boolean) => void;
}

export const ModuleStatusTracker: React.FC<ModuleStatusTrackerProps> = ({
  simulateError,
  onSimulateErrorChange,
}) => {
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
      
      {/* Demo Sandbox controller */}
      <div className={styles.detailSandboxPanel}>
        <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
          🛠️ Панель отладки MFE:
        </Text>
        <Checkbox
          checked={simulateError}
          onChange={(e) => onSimulateErrorChange(e.target.checked)}
        >
          Имитировать сбой API (500)
        </Checkbox>
      </div>
    </div>
  );
};
