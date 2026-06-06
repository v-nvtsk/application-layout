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

export interface ModuleRawTemplateProps {
  initialOpen?: boolean;
  onClose?: () => void;
  variant?: "detail" | "prefill";
}

/**
 * RAW ТОЧКА ВХОДА (ШАБЛОН)
 */
export function ModuleRawTemplate({
  initialOpen = false,
  onClose,
  variant = "detail",
}: ModuleRawTemplateProps) {
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
        {variant === "prefill" ? (
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
