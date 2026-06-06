import {
  useRef,
  useState,
} from 'react';

import {
  ETriplexNextTheme,
  ThemeProvider,
} from '@sberbusiness/triplex-next';

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
export function ModuleTemplate({ initialOpen = false, onClose, variant = 'detail' }: ModuleTemplateProps) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(initialOpen);
  const appRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsLightBoxOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div ref={appRef} className={styles.appContainer}>
      <ThemeProvider scopeRef={appRef} theme={ETriplexNextTheme.LIGHT}>

        {variant === 'prefill' ? (
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
