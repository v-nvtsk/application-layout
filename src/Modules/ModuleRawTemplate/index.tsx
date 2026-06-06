import styles from './index.module.less';

import {
  useRef,
  useState,
} from 'react';

import {
  Button,
  EButtonTheme,
  EComponentSize,
  ETextSize,
  ETitleSize,
  ETriplexNextTheme,
  Text,
  ThemeProvider,
  Title,
} from '@sberbusiness/triplex-next';

import { ModuleDetail } from './components/ModuleDetail';
import { ModulePrefill } from './components/ModulePrefill';

export interface ModuleRawTemplateProps {
  initialOpen?: boolean;
  onClose?: () => void;
  variant?: 'detail' | 'prefill';
}

/**
 * RAW ТОЧКА ВХОДА (ШАБЛОН)
 */
export function ModuleRawTemplate({ initialOpen = false, onClose, variant = 'detail' }: ModuleRawTemplateProps) {
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
        <main className={styles.homeCard}>
          <div className={styles.logoGroup}>
            <span className={styles.logoBadge}>ModuleRawTemplate</span>
            <span className={styles.logoBadge}>Anti-Pattern</span>
          </div>

          <Title size={ETitleSize.H1} className={styles.homeTitle}>
            RAW Шаблон модуля
          </Title>

          <Text size={ETextSize.B2} className={styles.homeSubtitle}>
            Демонстрация верстки на "голых" компонентах. 
            В Template-версии контент удален.
          </Text>

          <Button
            theme={EButtonTheme.GENERAL}
            size={EComponentSize.LG}
            onClick={() => setIsLightBoxOpen(true)}
          >
            Открыть RAW форму ({variant})
          </Button>
        </main>

        {isLightBoxOpen && (
          variant === 'prefill' ? (
            <ModulePrefill
              isOpen={isLightBoxOpen}
              onClose={handleClose}
              onSave={handleClose}
            />
          ) : (
            <ModuleDetail onClose={handleClose} />
          )
        )}
      </ThemeProvider>
    </div>
  );
}
