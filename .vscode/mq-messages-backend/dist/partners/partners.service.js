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
exports.PartnersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const partner_schema_1 = require("../messages/schemas/partner.schema");
let PartnersService = class PartnersService {
    constructor(partnerModel) {
        this.partnerModel = partnerModel;
    }
    async create(createPartnerDto) {
        const existingPartner = await this.partnerModel.findOne({
            alias: createPartnerDto.alias,
        });
        if (existingPartner) {
            throw new common_1.ConflictException(`Un partenaire avec l'alias "${createPartnerDto.alias}" existe déjà`);
        }
        const createdPartner = new this.partnerModel(createPartnerDto);
        return createdPartner.save();
    }
    async findAll() {
        return this.partnerModel
            .find()
            .sort({ createdAt: -1 })
            .lean()
            .exec();
    }
    async findOne(id) {
        const partner = await this.partnerModel.findById(id).exec();
        if (!partner) {
            throw new common_1.NotFoundException(`Partenaire avec ID ${id} non trouvé`);
        }
        return partner;
    }
    async update(id, updatePartnerDto) {
        const updatedPartner = await this.partnerModel
            .findByIdAndUpdate(id, updatePartnerDto, { new: true })
            .exec();
        if (!updatedPartner) {
            throw new common_1.NotFoundException(`Partenaire avec ID ${id} non trouvé`);
        }
        return updatedPartner;
    }
    async remove(id) {
        const result = await this.partnerModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Partenaire avec ID ${id} non trouvé`);
        }
    }
};
exports.PartnersService = PartnersService;
exports.PartnersService = PartnersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(partner_schema_1.Partner.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PartnersService);
//# sourceMappingURL=partners.service.js.map