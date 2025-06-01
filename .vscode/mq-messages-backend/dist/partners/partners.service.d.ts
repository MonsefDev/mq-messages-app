import { Model } from 'mongoose';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/create-partner.dto';
import { Partner, PartnerDocument } from 'src/messages/schemas/partner.schema';
export declare class PartnersService {
    private partnerModel;
    constructor(partnerModel: Model<PartnerDocument>);
    create(createPartnerDto: CreatePartnerDto): Promise<Partner>;
    findAll(): Promise<Partner[]>;
    findOne(id: string): Promise<Partner>;
    update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<Partner>;
    remove(id: string): Promise<void>;
}
