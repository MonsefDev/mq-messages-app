import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageStatus, ProcessedFlowType } from '../../shared/enums';

@Schema({ 
  timestamps: true,
  collection: 'messages',
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class Message {


  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ 
    type: String, 
    enum: MessageStatus, 
    default: MessageStatus.PENDING 
  })
  status: MessageStatus;

  @Prop()
  partnerId?: string;

  @Prop({ 
    type: String, 
    enum: ProcessedFlowType, 
    required: true 
  })
  processedFlowType: ProcessedFlowType;

  @Prop()
  size?: number;

  @Prop({ type: Object })
  headers?: { [key: string]: string };
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);

// Index pour performance
MessageSchema.index({ timestamp: -1 });
MessageSchema.index({ status: 1 });
MessageSchema.index({ source: 1 });
MessageSchema.index({ destination: 1 });
MessageSchema.index({ processedFlowType: 1 });
