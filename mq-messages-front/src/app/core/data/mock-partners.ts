import { Direction, Partner, ProcessedFlowType } from "../models/partner.model";

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'partner-1',
    alias: 'CoreBanking-MQ',
    type: 'BANKING_CORE',
    direction: Direction.INBOUND,
    application: 'Core Banking System',
    processedFlowType: ProcessedFlowType.MESSAGE,
    description: 'Interface principale pour les transactions bancaires',
    createdAt: new Date('2024-01-01T10:00:00'),
    updatedAt: new Date('2024-01-10T15:30:00'),
    isActive: true
  },
  {
    id: 'partner-2',
    alias: 'FraudDetection-Alert',
    type: 'SECURITY_SYSTEM',
    direction: Direction.OUTBOUND,
    application: 'Fraud Detection Engine',
    processedFlowType: ProcessedFlowType.ALERTING,
    description: 'Système de détection de fraude en temps réel',
    createdAt: new Date('2024-01-02T09:15:00'),
    updatedAt: new Date('2024-01-12T11:20:00'),
    isActive: true
  },
  {
    id: 'partner-3',
    alias: 'CRM-Notifications',
    type: 'CRM_SYSTEM',
    direction: Direction.INBOUND,
    application: 'Customer Relationship Management',
    processedFlowType: ProcessedFlowType.NOTIFICATION,
    description: 'Système CRM pour notifications clients',
    createdAt: new Date('2024-01-03T14:30:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    isActive: true
  },
  {
    id: 'partner-4',
    alias: 'PaymentGateway-API',
    type: 'PAYMENT_PROCESSOR',
    direction: Direction.OUTBOUND,
    application: 'Payment Gateway Service',
    processedFlowType: ProcessedFlowType.MESSAGE,
    description: 'Passerelle de paiement pour transactions en ligne',
    createdAt: new Date('2024-01-04T08:00:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    isActive: true
  }
];