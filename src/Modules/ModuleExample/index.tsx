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

import { ApplicationDetail } from './components/ApplicationDetail';
import { ApplicationPrefill } from './components/ApplicationPrefill';

export interface ModuleExampleProps {
  initialOpen?: boolean;
  onClose?: () => void;
  variant?: 'detail' | 'prefill';
}

export function ModuleExample({ initialOpen = false, onClose, variant = 'detail' }: ModuleExampleProps) {
  const [activeVariant, setActiveVariant] = useState<'detail' | 'prefill'>(variant);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(initialOpen);
  const appRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsLightBoxOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleOpen = (v: 'detail' | 'prefill') => {
    setActiveVariant(v);
    setIsLightBoxOpen(true);
  };

  const handleSave = () => {
    alert('Данные сохранены!');
    handleClose();
  };

  return (
    <div ref={appRef} className={styles.appContainer}>
      <ThemeProvider scopeRef={appRef} theme={ETriplexNextTheme.LIGHT}>
        <main className={styles.homeCard}>
          <div className={styles.logoGroup}>
            <span className={styles.logoBadge}>Vite + React</span>
            <span className={styles.logoBadge}>Design System</span>
          </div>

          <Title size={ETitleSize.H1} className={styles.homeTitle}>
            Корпоративная дизайн-система
          </Title>

          <Text size={ETextSize.B2} className={styles.homeSubtitle}>
            Данный демонстрационный стенд показывает работу модуля LightBox с внутренней 
            структурой страницы Page (компоненты Header, Islands в качестве Body и Footer).
          </Text>

          <div className={styles.homeActionGroup}>
            <Button
              theme={EButtonTheme.GENERAL}
              size={EComponentSize.LG}
              onClick={() => handleOpen('prefill')}
            >
              Открыть Prefill
            </Button>
            <Button
              theme={EButtonTheme.SECONDARY}
              size={EComponentSize.LG}
              onClick={() => handleOpen('detail')}
            >
              Открыть Detail
            </Button>
          </div>
        </main>

        {isLightBoxOpen && (
          activeVariant === 'prefill' ? (
            <ApplicationPrefill
              isOpen={isLightBoxOpen}
              onClose={handleClose}
              onSave={handleSave}
            />
          ) : (
            <ApplicationDetail onClose={handleClose} />
          )
        )}
      </ThemeProvider>
    </div>
  );
}
