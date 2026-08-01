import styles from './ModuleDetail.module.less';

import React, { useEffect, useCallback } from 'react';

import {
  EBodyPageType,
  EBodyPageVerticalMargin,
  EFontType,
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

  const handleRetry = useCallback(() => {
    clearError();
    refetch();
  }, [clearError, refetch]);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleResetOverlay = useCallback(() => {
    setActiveOverlay(null);
  }, []);

  const handleTriggerCloseOverlay = useCallback(() => {
    setActiveOverlay('close');
  }, []);

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <LightBox 
      size={ELightBoxSize.MD} 
      isLoading={isDataLoading} 
      isTopOverlayOpened={isOverlayOpen}
    >
          <LightBox.Content>
            <ModuleDetailDialogs
              activeOverlay={activeOverlay}
              onClose={handleResetOverlay}
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
                      <ModuleDetailFields data={data} />
                    </div>
                    <div className={styles.detailBodyRight}>
                      <ModuleStatusTracker data={data} />
                    </div>
                  </div>
                )}
              </Page.Body>
            </Page>
          </LightBox.Content>
          <LightBox.Controls>
            <LightBox.Controls.Close onClick={handleTriggerCloseOverlay} />
          </LightBox.Controls>
        </LightBox>
  );
};
