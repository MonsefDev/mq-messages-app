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
exports.QueryMessagesDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../shared/enums");
class QueryMessagesDto {
    constructor() {
        this.page = 0;
        this.size = 20;
    }
}
exports.QueryMessagesDto = QueryMessagesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: 0,
        minimum: 0,
        description: 'Numéro de page (commence à 0)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], QueryMessagesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: 20,
        minimum: 1,
        description: 'Nombre d\'éléments par page'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryMessagesDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.MessageStatus,
        description: 'Filtrer par statut'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MessageStatus),
    __metadata("design:type", String)
], QueryMessagesDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.ProcessedFlowType,
        description: 'Filtrer par type de flux'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ProcessedFlowType),
    __metadata("design:type", String)
], QueryMessagesDto.prototype, "processedFlowType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrer par source'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryMessagesDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrer par destination'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryMessagesDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Date de début (ISO string)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], QueryMessagesDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Date de fin (ISO string)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], QueryMessagesDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Recherche dans content, source, destination'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryMessagesDto.prototype, "search", void 0);
//# sourceMappingURL=query-messages.dto.js.map