import { Document } from 'mongoose';
import { MessageStatus, ProcessedFlowType } from '../../shared/enums';
export declare class Message {
    content: string;
    timestamp: Date;
    source: string;
    destination: string;
    status: MessageStatus;
    partnerId?: string;
    processedFlowType: ProcessedFlowType;
    size?: number;
    headers?: {
        [key: string]: string;
    };
}
export type MessageDocument = Message & Document;
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message, any> & Message & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>, {}> & import("mongoose").FlatRecord<Message> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
