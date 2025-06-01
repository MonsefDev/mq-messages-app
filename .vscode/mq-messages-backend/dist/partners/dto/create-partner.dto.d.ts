import { Direction, ProcessedFlowType } from '../../shared/enums';
export declare class CreatePartnerDto {
    alias: string;
    type: string;
    direction: Direction;
    application?: string;
    processedFlowType: ProcessedFlowType;
    description: string;
    isActive?: boolean;
}
export declare class UpdatePartnerDto {
    alias?: string;
    type?: string;
    direction?: Direction;
    application?: string;
    processedFlowType?: ProcessedFlowType;
    description?: string;
    isActive?: boolean;
}
