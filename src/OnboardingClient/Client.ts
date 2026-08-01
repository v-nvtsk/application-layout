export enum EErrorType {
  NETWORK = 'NETWORK',
  BUSINESS = 'BUSINESS',
  BUSINESS_CRITICAL = 'BUSINESS_CRITICAL',
  UNKNOWN = 'UNKNOWN',
}

export interface RboErrorData {
  errorCode?: string;
  errorName?: string;
  errorDesc?: string;
}

export interface IRboErrorData {
  errorCode: string;
  errorName: string;
  errorDesc: string;
  errorType: EErrorType;
}

const ERROR_BASE = 'ERROR_BASE';
const NO_PERMISSION_ERROR_CODE = 'NO_PERMISSION';
const BUSINESS_CRITICAL_ERROR_REGEX = /^(?![0-9]+$)[A-Z0-9_]+$/;

export class ClientError extends Error {
  errorCode = '';
  errorName = '';
  errorDesc = '';
  status = 500;
  errorType: EErrorType = EErrorType.UNKNOWN;

  constructor(errorData: RboErrorData | undefined, status: number | undefined) {
    super('');
    
    // Восстанавливаем прототип для корректной работы instanceof в TypeScript
    Object.setPrototypeOf(this, new.target.prototype);

    this.errorCode = errorData?.errorCode || '';
    this.errorName = errorData?.errorName || '';
    this.errorDesc = errorData?.errorDesc || '';
    this.status = status || 500;

    if (!this.errorCode && !this.errorName && !this.errorDesc) {
      this.errorName = 'unexpected error';
    }

    this.errorType = this.determineErrorType();
    this.message = this.toString();
  }

  determineErrorType(): EErrorType {
    if (this.status >= 400 && this.status < 600) {
      return EErrorType.NETWORK;
    }

    if (this.isHttpStatusCodeOk()) {
      if (this.errorCode === NO_PERMISSION_ERROR_CODE) {
        return EErrorType.BUSINESS_CRITICAL;
      }

      if (this.errorCode.startsWith(ERROR_BASE)) {
        return EErrorType.BUSINESS;
      }

      if (BUSINESS_CRITICAL_ERROR_REGEX.test(this.errorCode)) {
        return EErrorType.BUSINESS_CRITICAL;
      }

      return EErrorType.UNKNOWN;
    }

    return EErrorType.UNKNOWN;
  }

  isHttpStatusCodeOk(): boolean {
    return [200, 201].includes(this.status);
  }

  get isBusiness(): boolean {
    return this.errorType === EErrorType.BUSINESS;
  }

  get isBusinessCritical(): boolean {
    return this.errorType === EErrorType.BUSINESS_CRITICAL;
  }

  get isNetwork(): boolean {
    return this.errorType === EErrorType.NETWORK;
  }

  static isClientError(error: unknown): error is ClientError {
    return error instanceof ClientError;
  }

  toString(): string {
    return (
      'ClientError ' +
      (this.errorName ? `(${this.errorName}) ` : '') +
      `${this.errorCode} ${this.errorDesc}`
    );
  }

  valueOf() {
    return this.toJson();
  }

  toJson(): IRboErrorData {
    return {
      errorCode: this.errorCode,
      errorName: this.errorName,
      errorDesc: this.errorDesc,
      errorType: this.errorType,
    };
  }
}
