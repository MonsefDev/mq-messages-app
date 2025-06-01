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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const partners_service_1 = require("./partners.service");
const create_partner_dto_1 = require("./dto/create-partner.dto");
let PartnersController = class PartnersController {
    constructor(partnersService) {
        this.partnersService = partnersService;
    }
    async create(createPartnerDto) {
        const partner = await this.partnersService.create(createPartnerDto);
        return {
            success: true,
            data: partner,
            message: 'Partenaire créé avec succès',
        };
    }
    async findAll() {
        const partners = await this.partnersService.findAll();
        return {
            success: true,
            data: partners,
            total: partners.length,
        };
    }
    async findOne(id) {
        const partner = await this.partnersService.findOne(id);
        return {
            success: true,
            data: partner,
        };
    }
    async update(id, updatePartnerDto) {
        const partner = await this.partnersService.update(id, updatePartnerDto);
        return {
            success: true,
            data: partner,
            message: 'Partenaire mis à jour avec succès',
        };
    }
    async remove(id) {
        await this.partnersService.remove(id);
        return {
            success: true,
            message: 'Partenaire supprimé avec succès',
        };
    }
};
exports.PartnersController = PartnersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau partenaire' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Partenaire créé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Un partenaire avec cet alias existe déjà' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_dto_1.CreatePartnerDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les partenaires' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des partenaires' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un partenaire par son ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Partenaire récupéré' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Partenaire non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un partenaire' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Partenaire mis à jour' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_partner_dto_1.UpdatePartnerDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un partenaire' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Partenaire supprimé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "remove", null);
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)('Partners'),
    (0, common_1.Controller)('partners'),
    __metadata("design:paramtypes", [partners_service_1.PartnersService])
], PartnersController);
//# sourceMappingURL=partners.controller.js.map