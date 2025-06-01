import { PartnersService } from './partners.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/create-partner.dto';
export declare class PartnersController {
    private readonly partnersService;
    constructor(partnersService: PartnersService);
    create(createPartnerDto: CreatePartnerDto): Promise<{
        success: boolean;
        data: import("../messages/schemas/partner.schema").Partner;
        message: string;
    }>;
    findAll(): Promise<{
        success: boolean;
        data: import("../messages/schemas/partner.schema").Partner[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("../messages/schemas/partner.schema").Partner;
    }>;
    update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<{
        success: boolean;
        data: import("../messages/schemas/partner.schema").Partner;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
