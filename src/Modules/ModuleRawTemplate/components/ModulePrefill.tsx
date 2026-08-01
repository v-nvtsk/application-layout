import React, { useState, useCallback } from 'react';

import { Form } from 'react-final-form';

import {
  Button,
  Confirm,
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

import type { ModuleData } from '../Models';
import { useSaveModuleData } from '../hooks/useSaveModuleData';
import styles from './ModulePrefill.module.less';
import { ModulePrefillFields } from './ModulePrefillFields';

interface ModulePrefillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type OverlayType = 'close' | null;

/**
 * ФОРМА ПРЕДЗАПОЛНЕНИЯ МОДУЛЯ
 *
 * Использует нативные компоненты Triplex (LightBox, Page) напрямую.
 * Сохранение через fetch API (перехватывается MSW в dev-режиме).
 */
export const ModulePrefill: React.FC<ModulePrefillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const { save, isSaving } = useSaveModuleData();

  // ==========================================
  // ТОЧКА ВАЛИДАЦИИ ФОРМЫ (FORM VALIDATION POINT)
  // ==========================================
  const handleValidate = useCallback((_values: ModuleData) => {
    const errors: Record<string, string> = {};
    // Добавьте логику валидации полей формы здесь. Например:
    // if (!values.someField) {
    //   errors.someField = 'Обязательное поле';
    // }
    return errors;
  }, []);

  // ==========================================
  // ТОЧКА САБМИТА ДАННЫХ ФОРМЫ (FORM SUBMIT POINT)
  // ==========================================
  const handleSave = useCallback(
    async (values: ModuleData) => {
      const success = await save(values);
      if (success) {
        onSave();
        setIsFormOpen(false);
        onClose();
      }
    },
    [save, onSave, onClose]
  );

  const handleCancelAttempt = useCallback(() => {
    setActiveOverlay('close');
  }, []);

  const handleResetOverlay = useCallback(() => {
    setActiveOverlay(null);
  }, []);

  const handleConfirmExit = useCallback(() => {
    setIsFormOpen(false);
    onClose();
  }, [onClose]);

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <Form
      onSubmit={handleSave}
      validate={handleValidate}
      initialValues={{} as ModuleData}
    >
      {({ handleSubmit }) => (
        <LightBox 
          size={ELightBoxSize.MD} 
          isLoading={isSaving} 
          isTopOverlayOpened={isOverlayOpen}
        >
          <LightBox.Content>
            <LightBox.TopOverlay opened={activeOverlay === 'close'} onClose={handleResetOverlay}>
              <Confirm>
                <Confirm.Content>
                  <Confirm.Content.Title size={ETitleSize.H3}>Внимание</Confirm.Content.Title>
                  <Confirm.Content.SubTitle size={ETextSize.B3}>
                    Несохранённые данные будут утеряны. Вы уверены, что хотите выйти?
                  </Confirm.Content.SubTitle>
                </Confirm.Content>
                <Confirm.Controls>
                  <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EComponentSize.MD}
                    onClick={handleResetOverlay}
                  >
                    Отмена
                  </Button>
                  <Button
                    theme={EButtonTheme.DANGER}
                    size={EComponentSize.MD}
                    onClick={handleConfirmExit}
                  >
                    Выйти
                  </Button>
                </Confirm.Controls>
                <Confirm.Close
                  title="Закрыть"
                  clickByEsc={true}
                  onClick={handleResetOverlay}
                />
              </Confirm>
            </LightBox.TopOverlay>

            <Page className={styles.prefillBodyWidth}>
              <Page.Header type={EHeaderPageType.FIRST} sticky>
                <Page.Header.Title>
                  <Page.Header.Title.Content>
                    <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                      Предзаполнение данных
                    </Title>
                  </Page.Header.Title.Content>
                </Page.Header.Title>
                
                <Page.Header.Subhead>
                  <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                    Пожалуйста, заполните информацию и проверьте перед сохранением
                  </Text>
                </Page.Header.Subhead>
              </Page.Header>

              <Page.Body
                type={EBodyPageType.SECOND}
                verticalMargin={EBodyPageVerticalMargin.LARGE}
              >
                <div className={styles.prefillBodyContent}>
                  <ModulePrefillFields />
                </div>
              </Page.Body>

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
                      onClick={handleCancelAttempt}
                    >
                      Отмена
                    </Button>
                  </Page.Footer.Description.Controls>
                </Page.Footer.Description>
              </Page.Footer>
            </Page>
          </LightBox.Content>
          <LightBox.Controls>
            <LightBox.Controls.Close onClick={handleCancelAttempt} />
          </LightBox.Controls>
        </LightBox>
      )}
    </Form>
  );
};
