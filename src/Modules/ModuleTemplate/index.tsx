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
        <main className={styles.homeCard}>
          <div className={styles.logoGroup}>
            <span className={styles.logoBadge}>ModuleTemplate</span>
            <span className={styles.logoBadge}>Clean</span>
          </div>

          <Title size={ETitleSize.H1} className={styles.homeTitle}>
            Шаблон модуля
          </Title>

          <Text size={ETextSize.B2} className={styles.homeSubtitle}>
            Это чистая заготовка для нового функционала. 
            Используйте ее как базу для создания новых разделов.
          </Text>

          <Button
            theme={EButtonTheme.GENERAL}
            size={EComponentSize.LG}
            onClick={() => setIsLightBoxOpen(true)}
          >
            Открыть форму ({variant})
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
