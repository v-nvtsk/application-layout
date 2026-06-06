import styles from './ModulePrefill.module.less';

import React, { useState } from 'react';
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
import { ModulePrefillFields } from './ModulePrefillFields';

interface ModulePrefillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type OverlayType = 'close' | null;

export const ModulePrefill: React.FC<ModulePrefillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const handleSave = () => {
    onSave();
    setIsFormOpen(false);
    onClose();
  };

  const handleCancelAttempt = () => {
    setActiveOverlay('close');
  };

  const isOverlayOpen = activeOverlay !== null;

  if (!isFormOpen) return null;

  return (
    <Form
      onSubmit={handleSave}
      initialValues={{ confirmCorrectness: false }}
    >
      {({ handleSubmit }) => (
        <LightBox 
          size={ELightBoxSize.MD} 
          isLoading={false} 
          isTopOverlayOpened={isOverlayOpen}
        >
          <LightBox.Content>
            {activeOverlay === 'close' && (
              <LightBox.TopOverlay opened={true} onClose={() => setActiveOverlay(null)}>
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
                      onClick={() => setActiveOverlay(null)}
                    >
                      Отмена
                    </Button>
                    <Button
                      theme={EButtonTheme.DANGER}
                      size={EComponentSize.MD}
                      onClick={() => {
                        setIsFormOpen(false);
                        onClose();
                      }}
                    >
                      Выйти
                    </Button>
                  </Confirm.Controls>
                  <Confirm.Close
                    title="Закрыть"
                    clickByEsc={true}
                    onClick={() => setActiveOverlay(null)}
                  />
                </Confirm>
              </LightBox.TopOverlay>
            )}

            <Page className={styles.prefillBodyWidth}>
              <Page.Header type={EHeaderPageType.FIRST} sticky>
                <Page.Header.Title>
                  <Page.Header.Title.Content>
                    <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                      Форма предзаполнения (RAW)
                    </Title>
                  </Page.Header.Title.Content>
                </Page.Header.Title>
                
                <Page.Header.Subhead>
                  <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                    Пожалуйста, проверьте информацию перед продолжением (БЕЗ обёрток)
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
                      Изменения вступят в силу для всех пользователей организации. (RAW)
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
