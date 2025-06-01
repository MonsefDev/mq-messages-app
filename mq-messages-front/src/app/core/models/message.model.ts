export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  source: string;
  destination: string;
  status: MessageStatus;
  partnerId?: string;
  processedFlowType: ProcessedFlowType;
  size?: number;
  headers?: { [key: string]: string };
}

export enum MessageStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  ERROR = 'ERROR'
}

export enum ProcessedFlowType {
  MESSAGE = 'MESSAGE',
  ALERTING = 'ALERTING',
  NOTIFICATION = 'NOTIFICATION'
}

export interface MessageFilter {
  status?: MessageStatus;
  processedFlowType?: ProcessedFlowType;
  source?: string;
  destination?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface PagedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
