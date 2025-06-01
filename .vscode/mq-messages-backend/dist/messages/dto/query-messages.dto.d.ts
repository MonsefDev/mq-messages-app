import { MessageStatus, ProcessedFlowType } from '../../shared/enums';
export declare class QueryMessagesDto {
    page?: number;
    size?: number;
    status?: MessageStatus;
    processedFlowType?: ProcessedFlowType;
    source?: string;
    destination?: string;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string;
}
