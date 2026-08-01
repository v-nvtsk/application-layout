import React, { useCallback } from 'react';

import {
  Button,
  EButtonTheme,
  EComponentSize,
  EStatusTrackerType,
  StatusTracker,
  StatusTrackerBody,
  StatusTrackerDescription,
  StatusTrackerHeader,
  StatusTrackerTitle,
} from '@sberbusiness/triplex-next';

import { useSaveModuleData } from '../hooks/useSaveModuleData';
import styles from './ModuleStatusTracker.module.less';

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
  );
};
