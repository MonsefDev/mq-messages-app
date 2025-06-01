export interface Partner {
  id: string;
  alias: string;
  type: string;
  direction: Direction;
  application: string;
  processedFlowType: ProcessedFlowType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export enum Direction {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

export enum ProcessedFlowType {
  MESSAGE = 'MESSAGE',
  ALERTING = 'ALERTING',
  NOTIFICATION = 'NOTIFICATION'
}

export interface CreatePartnerRequest {
  alias: string;
  type: string;
  direction: Direction;
  application: string;
  processedFlowType: ProcessedFlowType;
  description: string;
}

export interface PartnerFormData {
  partner: Partner | null;
  isEdit: boolean;
}