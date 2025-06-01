  import {Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { MessagesService } from './messages.service';
  import { QueryMessagesDto } from './dto/query-messages.dto';
  import { CreateMessageDto } from './dto/create-message.dto';
  
  @ApiTags('Messages')
  @Controller('messages')
  export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}
  
    @Post()
    @ApiOperation({ summary: 'Créer un nouveau message' })
    @ApiResponse({ status: 201, description: 'Message créé avec succès' })
    async create(@Body() createMessageDto: CreateMessageDto) {
      const message = await this.messagesService.create(createMessageDto);
      return {
        success: true,
        data: message,
        message: 'Message créé avec succès',
      };
    }

    @Get()
    @ApiOperation({ summary: 'Récupérer la liste des messages avec pagination et filtres' })
    @ApiResponse({ status: 200, description: 'Liste des messages récupérée' })
    async findAll(@Query() queryDto: QueryMessagesDto) {
      const result = await this.messagesService.findAll(queryDto);
      return {
        success: true,
        data: result,
      };
    }

  
    @Get(':id')
    @ApiOperation({ summary: 'Récupérer un message par son ID' })
    @ApiResponse({ status: 200, description: 'Message récupéré' })
    @ApiResponse({ status: 404, description: 'Message non trouvé' })
    async findOne(@Param('id') id: string) {
      const message = await this.messagesService.findOne(id);
      return {
        success: true,
        data: message,
      };
    }
}
  