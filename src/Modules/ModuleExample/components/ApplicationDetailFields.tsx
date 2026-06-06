import React from 'react';
import { useFormState } from 'react-final-form';
import {
  EFontType,
  EIslandType,
  ETextSize,
  Text,
} from '@sberbusiness/triplex-next';
import { ApplicationIsland } from '../../../Components/ApplicationIsland';
import styles from './ApplicationDetail.module.less';

export const ApplicationDetailFields: React.FC = () => {
  const { values } = useFormState();

  return (
    <>
      <ApplicationIsland
        title="💳 Информация о карте"
        type={EIslandType.TYPE_1}
        footer={
          <Text size={ETextSize.B4} type={EFontType.BRAND}>
            Активный тариф: Бизнес Плюс (490 ₽/мес)
          </Text>
        }
      >
        <div className={styles.settingsSectionContent}>
          <Text size={ETextSize.B2} type={EFontType.PRIMARY_INVERT}>
            Название: <strong>{values.cardName || 'Не указано'}</strong>
          </Text>
          <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
            Номер карты: <strong>•••• {values.cardNumber || '4532'}</strong>
          </Text>
          <Text size={ETextSize.B3} type={EFontType.SECONDARY_INVERT}>
            Статус: Активна. Следующее списание 15 июня 2026.
          </Text>
        </div>
      </ApplicationIsland>

      <ApplicationIsland
        title="🔔 Статус уведомлений"
        type={EIslandType.TYPE_2}
        footer={
          <Text size={ETextSize.B4} type={EFontType.SUCCESS}>
            Конфигурация актуальна
          </Text>
        }
      >
        <div className={styles.settingsSectionContent}>
          <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
            Системные уведомления: <strong>{values.notificationsEnabled ? 'Включены' : 'Выключены'}</strong>
          </Text>
          <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
            Маркетинговые рассылки: <strong>{values.marketingEmails ? 'Разрешены' : 'Запрещены'}</strong>
          </Text>
        </div>
      </ApplicationIsland>

      <ApplicationIsland
        title="🔒 Параметры безопасности"
        type={EIslandType.TYPE_3}
        footer={
          <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
            Последний вход: сегодня в 23:14
          </Text>
        }
      >
        <div className={styles.settingsSectionContent}>
          <Text size={ETextSize.B3} type={EFontType.PRIMARY_INVERT}>
            Двухфакторная аутентификация: <strong>{values.twoFactorEnabled ? 'Активна' : 'Деактивирована'}</strong>
          </Text>
          <Text size={ETextSize.B3} type={EFontType.SECONDARY_INVERT}>
            Безопасность вашего аккаунта находится под защитой СберБизнес.
          </Text>
        </div>
      </ApplicationIsland>
    </>
  );
};
