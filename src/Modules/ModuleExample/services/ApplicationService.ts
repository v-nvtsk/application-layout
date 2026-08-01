import { ClientError } from '../../../OnboardingClient/Client';

const API_URL = '/api/v1/module-example/data';

export interface ApplicationData {
  organizationName?: string;
  inn?: string;
  contactEmail?: string;
  contactPhone?: string;
  agreementAccepted?: boolean;
}

export const ApplicationService = {
  async getData(signal?: AbortSignal): Promise<ApplicationData> {
    const res = await fetch(API_URL, { signal });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ClientError(
        {
          errorCode: body.errorCode || 'UNKNOWN_ERROR',
          errorName: body.errorName || 'unexpected error',
          errorDesc: body.errorDesc || `Ошибка сервера (${res.status})`,
        },
        res.status
      );
    }
    return res.json();
  },

  async saveData(data: ApplicationData): Promise<boolean> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ClientError(
        {
          errorCode: body.errorCode || 'SAVE_ERROR',
          errorName: body.errorName || 'unexpected error',
          errorDesc: body.errorDesc || `Ошибка сохранения (${res.status})`,
        },
        res.status
      );
    }
    return true;
  },
};
