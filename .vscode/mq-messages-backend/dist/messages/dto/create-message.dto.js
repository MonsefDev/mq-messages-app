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
exports.CreateMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../shared/enums");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Hello World Message',
        description: 'Contenu du message'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2024-01-01T10:00:00Z',
        description: 'Timestamp du message'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateMessageDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'QUEUE.IN',
        description: 'Source du message'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'QUEUE.OUT',
        description: 'Destination du message'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.MessageStatus,
        description: 'Statut du message'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MessageStatus),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'partner-123',
        description: 'ID du partenaire'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.ProcessedFlowType,
        description: 'Type de flux traité'
    }),
    (0, class_validator_1.IsEnum)(enums_1.ProcessedFlowType),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "processedFlowType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1024,
        description: 'Taille du message en bytes'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMessageDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { 'Content-Type': 'application/json' },
        description: 'En-têtes du message'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateMessageDto.prototype, "headers", void 0);
//# sourceMappingURL=create-message.dto.js.map