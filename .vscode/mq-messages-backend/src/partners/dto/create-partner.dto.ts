import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Direction, ProcessedFlowType } from '../../shared/enums';

export class CreatePartnerDto {
  @ApiProperty({ example: 'BANK_PARTNER_1', description: 'Alias unique du partenaire' })
  @IsString()
  alias: string;

  @ApiProperty({ example: 'Banking', description: 'Type du partenaire' })
  @IsString()
  type: string;

  @ApiProperty({ enum: Direction, description: 'Direction du flux' })
  @IsEnum(Direction)
  direction: Direction;

  @ApiPropertyOptional({ example: 'Core Banking', description: 'Application associée' })
  @IsOptional()
  @IsString()
  application?: string;

  @ApiProperty({ enum: ProcessedFlowType, description: 'Type de flux traité' })
  @IsEnum(ProcessedFlowType)
  processedFlowType: ProcessedFlowType;

  @ApiProperty({ example: 'Partenaire bancaire principal', description: 'Description du partenaire' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ default: true, description: 'Partenaire actif ou non' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdatePartnerDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  alias?: string;  

  @ApiPropertyOptional({ description: 'Type du partenaire' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ enum: Direction, description: 'Direction du flux' })
  @IsOptional()
  @IsEnum(Direction)
  direction?: Direction;

  @ApiPropertyOptional({ description: 'Application associée' })
  @IsOptional()
  @IsString()
  application?: string;

  @ApiPropertyOptional({ enum: ProcessedFlowType, description: 'Type de flux traité' })
  @IsOptional()
  @IsEnum(ProcessedFlowType)
  processedFlowType?: ProcessedFlowType;

  @ApiPropertyOptional({ description: 'Description du partenaire' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Partenaire actif ou non' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}