import {
  useRef,
  useState,
} from 'react';

import {
  ETriplexNextTheme,
  ThemeProvider,
} from '@sberbusiness/triplex-next';

import { getActiveVariant } from '../../shared/utils/getActiveVariant';
import { makeHandleClose } from '../../shared/utils/makeHandleClose';
import { ModuleDetail } from './components/ModuleDetail';
import { ModulePrefill } from './components/ModulePrefill';
import styles from './index.module.less';

export interface ModuleTemplateProps {
  initialOpen?: boolean;
  onClose?: () => void;
  variant?: 'detail' | 'prefill';
}

/**
 * ТОЧКА ВХОДА В МОДУЛЬ (ШАБЛОН)
 * 
 * Данный компонент является оберткой для инициализации темы и отображения 
 * основных форм модуля (Detail/Prefill).
 */
export function ModuleTemplate({
  initialOpen = true,
  onClose,
  variant,
}: ModuleTemplateProps = {}) {
  const activeVariant = getActiveVariant(variant);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(initialOpen);
  const appRef = useRef<HTMLDivElement>(null);
  const handleClose = makeHandleClose(setIsLightBoxOpen, onClose);

  return (
    <div ref={appRef} className={styles.appContainer}>
      <ThemeProvider scopeRef={appRef} theme={ETriplexNextTheme.LIGHT}>
        {activeVariant === 'prefill' ? (
          <ModulePrefill
            isOpen={isLightBoxOpen}
            onClose={handleClose}
            onSave={handleClose}
          />
        ) : (
          <ModuleDetail onClose={handleClose} />
        )}
      </ThemeProvider>
    </div>
  );
}
