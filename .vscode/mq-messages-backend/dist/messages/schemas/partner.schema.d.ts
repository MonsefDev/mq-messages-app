import { Document } from 'mongoose';
import { Direction, ProcessedFlowType } from '../../shared/enums';
export declare class Partner {
    alias: string;
    type: string;
    direction: Direction;
    application: string;
    processedFlowType: ProcessedFlowType;
    description: string;
    isActive: boolean;
}
export type PartnerDocument = Partner & Document;
export declare const PartnerSchema: import("mongoose").Schema<Partner, import("mongoose").Model<Partner, any, any, any, Document<unknown, any, Partner, any> & Partner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Partner, Document<unknown, {}, import("mongoose").FlatRecord<Partner>, {}> & import("mongoose").FlatRecord<Partner> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
