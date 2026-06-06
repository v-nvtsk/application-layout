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


export function Qualification({
  initialOpen = true,
  onClose,
  variant,
}: ModuleRawTemplateProps = {}) {
  // Определяем вариант отображения: приоритет у пропса, затем URL query параметр, затем по умолчанию 'detail'
  const getActiveVariant = (): 'detail' | 'prefill' => {
    if (variant) {
      return variant;
    }
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlVariant = searchParams.get('variant');
      if (urlVariant === 'prefill' || urlVariant === 'detail') {
        return urlVariant as 'detail' | 'prefill';
      }
    }
    return 'detail';
  };

  const activeVariant = getActiveVariant();
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(initialOpen);
  const appRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsLightBoxOpen(false);
    if (onClose) {
      onClose();
    } else if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  return (
    <div ref={appRef} className={styles.appContainer}>
      <ThemeProvider scopeRef={appRef} theme={ETriplexNextTheme.LIGHT}>
        {activeVariant === "prefill" ? (
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
