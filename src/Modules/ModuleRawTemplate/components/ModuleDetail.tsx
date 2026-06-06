import styles from './ModuleDetail.module.less';

import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import {
  LightBox,
  Page,
  ELightBoxSize,
  EBodyPageType,
  EBodyPageVerticalMargin,
  EHeaderPageType,
  Title,
  Text,
  Button,
  EButtonTheme,
  EComponentSize,
  ETitleSize,
  ETextSize,
  EFontType,
  EFooterPageType,
} from '@sberbusiness/triplex-next';

import { useFetchModuleData, type ModuleData } from '../hooks/useFetchModuleData';
import { useErrorController } from '../hooks/useErrorController';
import { ModuleDetailFields } from './ModuleDetailFields';
import { ModuleStatusTracker } from './ModuleStatusTracker';
import { ModuleDetailError } from './ModuleDetailError';
import { ModuleDetailDialogs } from './ModuleDetailDialogs';

interface ModuleDetailProps {
  onClose?: () => void;
}

type OverlayType = 'close' | 'delete' | null;

export const ModuleDetail: React.FC<ModuleDetailProps> = ({ onClose }) => {
  const [activeOverlay, setActiveOverlay] = React.useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(true);

  const { data, isLoading: isDataLoading, error: fetchError, refetch } = useFetchModuleData();
  const { error: activeError, isCriticalError, handleApiError, clearError } = useErrorController();

  useEffect(() => {
    if (fetchError) {
      handleApiError(fetchError);
    } else {
      clearError();
    }
  }, [fetchError, handleApiError, clearError]);

  const handleRetry = () => {
    clearError();
    refetch();
  };

  const handleSave = async (values: ModuleData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('Данные сохранены (RAW)!\n' + JSON.stringify(values, null, 2));
        setIsFormOpen(false);
        if (onClose) onClose();
        resolve();
      }, 500);
    });
  };

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <Form
      onSubmit={handleSave}
      initialValues={data || {}}
      subscription={{ submitting: true }}
    >
      {({ handleSubmit, submitting }) => (
        <LightBox 
          size={ELightBoxSize.MD} 
          isLoading={isDataLoading || submitting} 
          isTopOverlayOpened={isOverlayOpen}
        >
          <LightBox.Content>
            <ModuleDetailDialogs
              activeOverlay={activeOverlay}
              onClose={() => setActiveOverlay(null)}
              onConfirmClose={() => {
                setIsFormOpen(false);
                if (onClose) onClose();
              }}
              onConfirmDelete={() => {
                setIsFormOpen(false);
                if (onClose) onClose();
              }}
            />
            
            <Page className={styles.detailBodyWidth}>
              <Page.Header type={EHeaderPageType.FIRST} sticky>
                <Page.Header.Title>
                  <Page.Header.Title.Content>
                    <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                      [Заголовок RAW]
                    </Title>
                  </Page.Header.Title.Content>
                </Page.Header.Title>
                
                <Page.Header.Subhead>
                  <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                    [Описание RAW-реализации]
                  </Text>
                </Page.Header.Subhead>
              </Page.Header>

              <Page.Body
                type={EBodyPageType.SECOND}
                verticalMargin={EBodyPageVerticalMargin.LARGE}
              >
                {isCriticalError && activeError ? (
                  <div className={styles.detailsLayoutErrorWrapper}>
                    <ModuleDetailError
                      message={activeError.message}
                      onRetry={handleRetry}
                    />
                  </div>
                ) : (
                  <div className={styles.detailBodyGrid}>
                    <div className={styles.detailBodyLeft}>
                      <ModuleDetailFields />
                    </div>
                    <div className={styles.detailBodyRight}>
                      <ModuleStatusTracker />
                    </div>
                  </div>
                )}
              </Page.Body>

              {!(isCriticalError && activeError) && (
                <Page.Footer type={EFooterPageType.FIRST} sticky>
                  <Page.Footer.Description>
                    <Page.Footer.Description.Content>
                      <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                        [Подвал формы RAW]
                      </Text>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                      <Button
                        theme={EButtonTheme.GENERAL}
                        size={EComponentSize.MD}
                        onClick={handleSubmit}
                      >
                        Применить
                      </Button>
                      <Button
                        theme={EButtonTheme.SECONDARY_LIGHT}
                        size={EComponentSize.MD}
                        onClick={() => setActiveOverlay('close')}
                      >
                        Отмена
                      </Button>
                    </Page.Footer.Description.Controls>
                  </Page.Footer.Description>
                </Page.Footer>
              )}
            </Page>
          </LightBox.Content>
          <LightBox.Controls>
            <LightBox.Controls.Close onClick={() => setActiveOverlay('close')} />
          </LightBox.Controls>
        </LightBox>
      )}
    </Form>
  );
};
