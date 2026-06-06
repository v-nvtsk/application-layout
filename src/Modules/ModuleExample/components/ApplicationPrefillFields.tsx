import React from 'react';
import { Field } from 'react-final-form';
import {
  Checkbox,
  EFontType,
  EIslandType,
  ETextSize,
  Text,
  TextField,
} from '@sberbusiness/triplex-next';
import { ApplicationIsland } from '../../../Components/ApplicationIsland';
import styles from './ApplicationDetail.module.less';

export const ApplicationPrefillFields: React.FC = () => {
  return (
    <div className={styles.prefillIslandsContainer || ''}>
      <ApplicationIsland
        title="📝 Основная информация"
        type={EIslandType.TYPE_1}
      >
        <div className={styles.settingsSectionContent}>
          <Field name="cardName">
            {({ input }) => (
              <TextField
                label="Название для настройки"
                inputProps={{
                  value: input.value || '',
                  onChange: input.onChange,
                  onBlur: input.onBlur,
                  onFocus: input.onFocus,
                }}
              />
            )}
          </Field>
          <Text size={ETextSize.B3} type={EFontType.SECONDARY_INVERT}>
            Пожалуйста, заполните необходимые поля перед сохранением конфигурации.
          </Text>
        </div>
      </ApplicationIsland>

      <ApplicationIsland
        title="🔔 Параметры уведомлений"
        type={EIslandType.TYPE_2}
      >
        <div className={styles.settingsCheckboxGroup}>
          <Field name="notificationsEnabled" type="checkbox">
            {({ input }) => (
              <Checkbox
                checked={!!input.checked}
                onChange={input.onChange}
              >
                Системные уведомления по СМС и Email
              </Checkbox>
            )}
          </Field>
          <Field name="marketingEmails" type="checkbox">
            {({ input }) => (
              <Checkbox
                checked={!!input.checked}
                onChange={input.onChange}
              >
                Маркетинговые предложения
              </Checkbox>
            )}
          </Field>
        </div>
      </ApplicationIsland>

      <ApplicationIsland
        title="🔒 Безопасность"
        type={EIslandType.TYPE_3}
      >
        <div className={styles.settingsCheckboxGroup}>
          <Field name="twoFactorEnabled" type="checkbox">
            {({ input }) => (
              <Checkbox
                checked={!!input.checked}
                onChange={input.onChange}
              >
                Двухфакторная аутентификация
              </Checkbox>
            )}
          </Field>
        </div>
      </ApplicationIsland>

      <ApplicationIsland
        title="✅ Подтверждение"
        type={EIslandType.TYPE_1}
      >
        <Field name="confirmCorrectness" type="checkbox">
          {({ input }) => (
            <Checkbox
              checked={!!input.checked}
              onChange={input.onChange}
            >
              Я подтверждаю корректность введенных данных
            </Checkbox>
          )}
        </Field>
      </ApplicationIsland>
    </div>
  );
};
