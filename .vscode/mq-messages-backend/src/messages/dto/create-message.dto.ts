import { IsString, IsOptional, IsEnum, IsNumber, IsObject, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageStatus, ProcessedFlowType } from '../../shared/enums';

export class CreateMessageDto {
  @ApiProperty({ 
    example: 'Hello World Message', 
    description: 'Contenu du message' 
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({ 
    example: '2024-01-01T10:00:00Z', 
    description: 'Timestamp du message' 
  })
  @IsOptional()
  @IsDateString()
  timestamp?: Date;

  @ApiProperty({ 
    example: 'QUEUE.IN', 
    description: 'Source du message' 
  })
  @IsString()
  source: string;

  @ApiProperty({ 
    example: 'QUEUE.OUT', 
    description: 'Destination du message' 
  })
  @IsString()
  destination: string;

  @ApiPropertyOptional({ 
    enum: MessageStatus, 
    description: 'Statut du message' 
  })
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @ApiPropertyOptional({ 
    example: 'partner-123', 
    description: 'ID du partenaire' 
  })
  @IsOptional()
  @IsString()
  partnerId?: string;

  @ApiProperty({ 
    enum: ProcessedFlowType, 
    description: 'Type de flux traité' 
  })
  @IsEnum(ProcessedFlowType)
  processedFlowType: ProcessedFlowType;

  @ApiPropertyOptional({ 
    example: 1024, 
    description: 'Taille du message en bytes' 
  })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional({ 
    example: { 'Content-Type': 'application/json' }, 
    description: 'En-têtes du message' 
  })
  @IsOptional()
  @IsObject()
  headers?: { [key: string]: string };
}