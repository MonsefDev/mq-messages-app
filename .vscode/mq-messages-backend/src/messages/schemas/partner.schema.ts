import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Direction, ProcessedFlowType } from '../../shared/enums';

@Schema({ timestamps: true })
export class Partner {
  @Prop({ required: true, unique: true })
  alias: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: String, enum: Direction, required: true })
  direction: Direction;

  @Prop()
  application: string;

  @Prop({ type: String, enum: ProcessedFlowType, required: true })
  processedFlowType: ProcessedFlowType;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

export type PartnerDocument = Partner & Document;
export const PartnerSchema = SchemaFactory.createForClass(Partner);