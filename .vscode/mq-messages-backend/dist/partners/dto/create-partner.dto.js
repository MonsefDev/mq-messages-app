"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnerDto = exports.CreatePartnerDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../shared/enums");
class CreatePartnerDto {
    constructor() {
        this.isActive = true;
    }
}
exports.CreatePartnerDto = CreatePartnerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BANK_PARTNER_1', description: 'Alias unique du partenaire' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartnerDto.prototype, "alias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Banking', description: 'Type du partenaire' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartnerDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.Direction, description: 'Direction du flux' }),
    (0, class_validator_1.IsEnum)(enums_1.Direction),
    __metadata("design:type", String)
], CreatePartnerDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Core Banking', description: 'Application associée' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartnerDto.prototype, "application", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ProcessedFlowType, description: 'Type de flux traité' }),
    (0, class_validator_1.IsEnum)(enums_1.ProcessedFlowType),
    __metadata("design:type", String)
], CreatePartnerDto.prototype, "processedFlowType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Partenaire bancaire principal', description: 'Description du partenaire' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartnerDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true, description: 'Partenaire actif ou non' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartnerDto.prototype, "isActive", void 0);
class UpdatePartnerDto {
}
exports.UpdatePartnerDto = UpdatePartnerDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePartnerDto.prototype, "alias", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Type du partenaire' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePartnerDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Direction, description: 'Direction du flux' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Direction),
    __metadata("design:type", String)
], UpdatePartnerDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Application associée' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePartnerDto.prototype, "application", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.ProcessedFlowType, description: 'Type de flux traité' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ProcessedFlowType),
    __metadata("design:type", String)
], UpdatePartnerDto.prototype, "processedFlowType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description du partenaire' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePartnerDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Partenaire actif ou non' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePartnerDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-partner.dto.js.map