import styles from './ModuleDetail.module.less';

import React, { useEffect } from 'react';

import { Form } from 'react-final-form';

import {
  Button,
  EBodyPageType,
  EBodyPageVerticalMargin,
  EButtonTheme,
  EComponentSize,
  EFontType,
  EFooterPageType,
  EHeaderPageType,
  ELightBoxSize,
  ETextSize,
  ETitleSize,
  LightBox,
  Page,
  Text,
  Title,
} from '@sberbusiness/triplex-next';

import { useErrorController } from '../hooks/useErrorController';
import { useFetchModuleData } from '../hooks/useFetchModuleData';
import { useSaveModuleData } from '../hooks/useSaveModuleData';
import type { ModuleData } from '../Models';
import { ModuleDetailDialogs } from './ModuleDetailDialogs';
import { ModuleDetailError } from './ModuleDetailError';
import { ModuleDetailFields } from './ModuleDetailFields';
import { ModuleStatusTracker } from './ModuleStatusTracker';

interface ModuleDetailProps {
  onClose?: () => void;
}

type OverlayType = 'close' | 'delete' | null;

/**
 * ДЕТАЛЬНАЯ ФОРМА МОДУЛЯ
 *
 * Использует нативные компоненты Triplex (LightBox, Page) напрямую — без промежуточных обёрток.
 * Данные загружаются через fetch API (перехватывается MSW в dev-режиме).
 */
export const ModuleDetail: React.FC<ModuleDetailProps> = ({ onClose }) => {
  const [activeOverlay, setActiveOverlay] = React.useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(true);

  // 1. Data Access Layer — реальные fetch-запросы
  const { data, isLoading: isDataLoading, error: fetchError, refetch } = useFetchModuleData();
  const { save, isSaving } = useSaveModuleData();

  // 2. Error Controller
  const { error: activeError, isCriticalError, handleApiError, clearError } = useErrorController();

  // Маршрутизация ошибок загрузки в error controller
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
    const success = await save(values);
    if (success) {
      setIsFormOpen(false);
      if (onClose) onClose();
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    if (onClose) onClose();
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
          isLoading={isDataLoading || submitting || isSaving} 
          isTopOverlayOpened={isOverlayOpen}
        >
          <LightBox.Content>
            <ModuleDetailDialogs
              activeOverlay={activeOverlay}
              onClose={() => setActiveOverlay(null)}
              onConfirmClose={handleCloseForm}
              onConfirmDelete={handleCloseForm}
            />
            
            <Page className={styles.detailBodyWidth}>
              <Page.Header type={EHeaderPageType.FIRST} sticky>
                <Page.Header.Title>
                  <Page.Header.Title.Content>
                    <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                      Детальная форма
                    </Title>
                  </Page.Header.Title.Content>
                </Page.Header.Title>
                
                <Page.Header.Subhead>
                  <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                    Просмотр и редактирование данных организации
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
                        Изменения вступят в силу после сохранения.
                      </Text>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                      <Button
                        theme={EButtonTheme.GENERAL}
                        size={EComponentSize.MD}
                        onClick={handleSubmit}
                      >
                        Сохранить
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
