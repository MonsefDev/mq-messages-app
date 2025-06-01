import { IsOptional, IsString, IsEnum, IsNumber, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MessageStatus, ProcessedFlowType } from '../../shared/enums';

export class QueryMessagesDto {
  @ApiPropertyOptional({ 
    default: 0, 
    minimum: 0, 
    description: 'Numéro de page (commence à 0)' 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @ApiPropertyOptional({ 
    default: 20, 
    minimum: 1, 
    description: 'Nombre d\'éléments par page' 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size?: number = 20;

  @ApiPropertyOptional({ 
    enum: MessageStatus, 
    description: 'Filtrer par statut' 
  })
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @ApiPropertyOptional({ 
    enum: ProcessedFlowType, 
    description: 'Filtrer par type de flux' 
  })
  @IsOptional()
  @IsEnum(ProcessedFlowType)
  processedFlowType?: ProcessedFlowType;

  @ApiPropertyOptional({ 
    description: 'Filtrer par source' 
  })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ 
    description: 'Filtrer par destination' 
  })
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiPropertyOptional({ 
    description: 'Date de début (ISO string)' 
  })
  @IsOptional()
  @IsDateString()
  dateFrom?: Date;

  @ApiPropertyOptional({ 
    description: 'Date de fin (ISO string)' 
  })
  @IsOptional()
  @IsDateString()
  dateTo?: Date;

  @ApiPropertyOptional({ 
    description: 'Recherche dans content, source, destination' 
  })
  @IsOptional()
  @IsString()
  search?: string;
}
