import { Message, MessageStatus, ProcessedFlowType } from '../models/message.model';

export const MOCK_MESSAGES: Message[] = [
  {
    id: '001',
    content: '{"type":"PAYMENT","amount":1500,"currency":"EUR","from":"12345","to":"67890"}',
    timestamp: new Date('2024-01-15T10:30:00'),
    source: 'CORE_BANKING',
    destination: 'PAYMENT_GATEWAY',
    status: MessageStatus.PROCESSED,
    processedFlowType: ProcessedFlowType.MESSAGE,
    partnerId: 'partner-1',
    size: 256
  },
  {
    id: '002',
    content: '{"alertType":"FRAUD","severity":"HIGH","account":"12345","amount":5000}',
    timestamp: new Date('2024-01-15T11:15:00'),
    source: 'FRAUD_SYSTEM',
    destination: 'ALERT_MANAGER',
    status: MessageStatus.PENDING,
    processedFlowType: ProcessedFlowType.ALERTING,
    partnerId: 'partner-2',
    size: 312
  },
  {
    id: '003',
    content: '{"type":"NOTIFICATION","message":"Transaction confirmée","customer":"CUST-789"}',
    timestamp: new Date('2024-01-15T12:00:00'),
    source: 'CRM_SYSTEM',
    destination: 'NOTIFICATION_SERVICE',
    status: MessageStatus.PROCESSED,
    processedFlowType: ProcessedFlowType.NOTIFICATION,
    partnerId: 'partner-3',
    size: 289
  },
  {
    id: '004',
    content: '{"type":"TRANSFER","amount":250,"from":"11111","to":"22222","error":"timeout"}',
    timestamp: new Date('2024-01-15T13:30:00'),
    source: 'MOBILE_APP',
    destination: 'CORE_BANKING',
    status: MessageStatus.ERROR,
    processedFlowType: ProcessedFlowType.MESSAGE,
    partnerId: 'partner-1',
    size: 378
  },
  {
    id: '005',
    content: '{"alertType":"MAINTENANCE","system":"CORE_BANKING","window":"02:00-04:00"}',
    timestamp: new Date('2024-01-15T14:45:00'),
    source: 'MONITORING',
    destination: 'OPS_TEAM',
    status: MessageStatus.PROCESSED,
    processedFlowType: ProcessedFlowType.ALERTING,
    size: 234
  }
];