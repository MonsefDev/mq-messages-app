import { MessageStatus, ProcessedFlowType } from '../../shared/enums';
export declare class CreateMessageDto {
    content: string;
    timestamp?: Date;
    source: string;
    destination: string;
    status?: MessageStatus;
    partnerId?: string;
    processedFlowType: ProcessedFlowType;
    size?: number;
    headers?: {
        [key: string]: string;
    };
}
