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
 * БОКОВАЯ ПАНЕЛЬ СТАТУС-ТРЕКЕРА (ШАБЛОН)
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
          <StatusTrackerTitle>[Статус документа]</StatusTrackerTitle>
        </StatusTrackerHeader>
        <StatusTrackerBody>
          <StatusTrackerDescription>
            [Описание текущего состояния бизнес-процесса]
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
