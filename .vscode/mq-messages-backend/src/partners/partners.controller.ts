import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { PartnersService } from './partners.service';
  import { CreatePartnerDto, UpdatePartnerDto } from './dto/create-partner.dto';
  
  @ApiTags('Partners')
  @Controller('partners')
  export class PartnersController {
    constructor(private readonly partnersService: PartnersService) {}
  
    @Post()
    @ApiOperation({ summary: 'Créer un nouveau partenaire' })
    @ApiResponse({ status: 201, description: 'Partenaire créé avec succès' })
    @ApiResponse({ status: 409, description: 'Un partenaire avec cet alias existe déjà' })
    async create(@Body() createPartnerDto: CreatePartnerDto) {
      const partner = await this.partnersService.create(createPartnerDto);
      return {
        success: true,
        data: partner,
        message: 'Partenaire créé avec succès',
      };
    }
  
    @Get()
    @ApiOperation({ summary: 'Récupérer tous les partenaires' })
    @ApiResponse({ status: 200, description: 'Liste des partenaires' })
    async findAll() {
      const partners = await this.partnersService.findAll();
      return {
        success: true,
        data: partners,
        total: partners.length,
      };
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Récupérer un partenaire par son ID' })
    @ApiResponse({ status: 200, description: 'Partenaire récupéré' })
    @ApiResponse({ status: 404, description: 'Partenaire non trouvé' })
    async findOne(@Param('id') id: string) {
      const partner = await this.partnersService.findOne(id);
      return {
        success: true,
        data: partner,
      };
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Mettre à jour un partenaire' })
    @ApiResponse({ status: 200, description: 'Partenaire mis à jour' })
    async update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
      const partner = await this.partnersService.update(id, updatePartnerDto);
      return {
        success: true,
        data: partner,
        message: 'Partenaire mis à jour avec succès',
      };
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un partenaire' })
    @ApiResponse({ status: 200, description: 'Partenaire supprimé' })
    async remove(@Param('id') id: string) {
      await this.partnersService.remove(id);
      return {
        success: true,
        message: 'Partenaire supprimé avec succès',
      };
    }
  }