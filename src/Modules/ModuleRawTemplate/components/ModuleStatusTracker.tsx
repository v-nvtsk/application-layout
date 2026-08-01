import React, { useCallback } from 'react';
import styles from './ModuleStatusTracker.module.less';
import {
  EStatusTrackerType,
  StatusTracker,
  StatusTrackerBody,
  StatusTrackerDescription,
  StatusTrackerHeader,
  StatusTrackerTitle,
  Button,
  EButtonTheme,
  EComponentSize,
} from '@sberbusiness/triplex-next';
import { useSaveModuleData } from '../hooks/useSaveModuleData';

export interface ModuleStatusTrackerProps {
  data?: Record<string, unknown>;
}

/**
 * СТАТУС-ТРЕКЕР НА "ГОЛЫХ" КОМПОНЕНТАХ (RAW ШАБЛОН)
 */
export const ModuleStatusTracker: React.FC<ModuleStatusTrackerProps> = ({ data }) => {
  const { save, isSaving } = useSaveModuleData();

  const handleSign = useCallback(async () => {
    if (data) {
      await save(data);
    }
  }, [data, save]);
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
          <Button
            theme={EButtonTheme.GENERAL}
            size={EComponentSize.MD}
            isLoading={isSaving}
            onClick={handleSign}
            style={{ marginTop: 16, width: '100%' }}
          >
            Подписать
          </Button>
        </StatusTrackerBody>
      </StatusTracker>
    </div>
  );
};
