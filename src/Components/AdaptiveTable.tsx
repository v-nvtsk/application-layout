import React from 'react';
import styles from './AdaptiveTable.module.less';

export interface PaymentRow {
  id: number;
  partnerName: string;
  inn: string;
  kpp: string;
  account: string;
  bik: string;
  bank: string;
  amount: number;
  status: 'success' | 'pending' | 'error';
  date: string;
  purpose: string;
}

const DEMO_ROWS: PaymentRow[] = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx + 1,
  partnerName: `ООО "Партнер ${idx + 1}"`,
  inn: `770123456${idx}`,
  kpp: '770101001',
  account: `4070281090000000123${idx}`,
  bik: '044525225',
  bank: 'ПАО СБЕРБАНК',
  amount: 150000 * (idx + 1),
  status: idx % 3 === 0 ? 'success' : idx % 3 === 1 ? 'pending' : 'error',
  date: '01.08.2026',
  purpose: `Оплата по счету №${100 + idx} за сопровождение.`,
}));

export interface AdaptiveTableProps {
  data?: PaymentRow[];
}

export const AdaptiveTable: React.FC<AdaptiveTableProps> = ({ data = DEMO_ROWS }) => {
  return (
    <div className={styles.tableResponsiveWrapper}>
      <table className={styles.customAdaptiveTable}>
        <thead>
          <tr>
            <th>№</th>
            <th className={styles.stickyCol}>Контрагент</th>
            <th>ИНН</th>
            <th>КПП</th>
            <th>Счет получателя</th>
            <th>БИК</th>
            <th>Банк получателя</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Назначение платежа</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td data-label="№">{row.id}</td>
              <td className={`${styles.stickyCol} ${styles.tablePartnerTitle}`}>
                {row.partnerName}
              </td>
              <td data-label="ИНН">{row.inn}</td>
              <td data-label="КПП">{row.kpp}</td>
              <td data-label="Счет">{row.account}</td>
              <td data-label="БИК">{row.bik}</td>
              <td data-label="Банк">{row.bank}</td>
              <td data-label="Сумма" className={styles.textBold}>
                {row.amount.toLocaleString()} ₽
              </td>
              <td data-label="Статус">
                <span
                  className={`${styles.statusBadge} ${
                    row.status === 'success'
                      ? styles.success
                      : row.status === 'pending'
                      ? styles.pending
                      : styles.error
                  }`}
                >
                  {row.status === 'success'
                    ? 'Исполнен'
                    : row.status === 'pending'
                    ? 'В обработке'
                    : 'Отклонен'}
                </span>
              </td>
              <td data-label="Дата">{row.date}</td>
              <td data-label="Назначение">{row.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
