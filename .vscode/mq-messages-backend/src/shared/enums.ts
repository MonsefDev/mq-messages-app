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
  
  export enum Direction {
    INBOUND = 'INBOUND',
    OUTBOUND = 'OUTBOUND',
  }