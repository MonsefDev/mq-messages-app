import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/create-partner.dto';
import { Partner, PartnerDocument } from 'src/messages/schemas/partner.schema';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    const existingPartner = await this.partnerModel.findOne({
      alias: createPartnerDto.alias,
    });

    if (existingPartner) {
      throw new ConflictException(`Un partenaire avec l'alias "${createPartnerDto.alias}" existe déjà`);
    }

    const createdPartner = new this.partnerModel(createPartnerDto);
    return createdPartner.save();
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnerModel.findById(id).exec();
    if (!partner) {
      throw new NotFoundException(`Partenaire avec ID ${id} non trouvé`);
    }
    return partner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    const updatedPartner = await this.partnerModel
      .findByIdAndUpdate(id, updatePartnerDto, { new: true })
      .exec();

    if (!updatedPartner) {
      throw new NotFoundException(`Partenaire avec ID ${id} non trouvé`);
    }

    return updatedPartner;
  }

  async remove(id: string): Promise<void> {
    const result = await this.partnerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Partenaire avec ID ${id} non trouvé`);
    }
  }
}