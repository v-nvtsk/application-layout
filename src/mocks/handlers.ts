import { http, HttpResponse, delay } from 'msw';

/**
 * Тип данных модуля — используется как в хэндлерах, так и в хуках.
 * При добавлении нового модуля через CLI-генератор, добавьте сюда
 * соответствующие хэндлеры (или используйте wildcard-паттерн).
 */
export interface MockModuleData {
  organizationName: string;
  inn: string;
  contactEmail: string;
  contactPhone: string;
  agreementAccepted: boolean;
}

const moduleDataStore: Record<string, Record<string, unknown>> = {};

/**
 * Фабрика начальных данных для модуля.
 * Каждый модуль при первом GET получает копию этих данных.
 */
function getDefaultData(moduleName: string): Record<string, unknown> {
  if (moduleName === 'module-example' || moduleName === 'module-template') {
    return {
      cardName: 'Основная карта',
      cardNumber: '4532',
      notificationsEnabled: true,
      marketingEmails: false,
      twoFactorEnabled: true,
    };
  }
  return {
    organizationName: 'ООО «Ромашка»',
    inn: '7707083893',
    contactEmail: 'info@romashka.ru',
    contactPhone: '+7 (495) 555-12-34',
    agreementAccepted: false,
  };
}

function getOrCreateModuleData(moduleName: string): Record<string, unknown> {
  if (!moduleDataStore[moduleName]) {
    moduleDataStore[moduleName] = getDefaultData(moduleName);
  }
  return moduleDataStore[moduleName];
}

export const handlers = [
  /**
   * GET /api/v1/:moduleName/data
   * Возвращает данные модуля. Симулирует задержку сети.
   */
  http.get('/api/v1/:moduleName/data', async ({ params }) => {
    await delay(400);

    const moduleName = params.moduleName as string;
    const data = getOrCreateModuleData(moduleName);

    return HttpResponse.json(data);
  }),

  /**
   * POST /api/v1/:moduleName/data
   * Сохраняет данные модуля. Принимает JSON body.
   */
  http.post('/api/v1/:moduleName/data', async ({ params, request }) => {
    await delay(300);

    const moduleName = params.moduleName as string;
    const body = (await request.json()) as Record<string, unknown>;

    // Обновляем данные в in-memory store
    const currentData = getOrCreateModuleData(moduleName);
    Object.assign(currentData, body);

    return HttpResponse.json({ success: true, data: currentData });
  }),
];
