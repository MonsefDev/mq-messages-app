import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { QueryMessagesDto } from './dto/query-messages.dto';
import { MessageStatus } from '../shared/enums';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new this.messageModel({
      ...createMessageDto,
      timestamp: createMessageDto.timestamp || new Date()
    });
    return message.save();
  }

  async findAll(queryDto: QueryMessagesDto) {
    const { 
      page = 0, 
      size = 20, 
      status, 
      processedFlowType, 
      source, 
      destination, 
      dateFrom, 
      dateTo, 
      search 
    } = queryDto;
    
    // Construction du filtre
    const filter: any = {};
    
    if (status) filter.status = status;
    if (processedFlowType) filter.processedFlowType = processedFlowType;
    if (source) filter.source = source;
    if (destination) filter.destination = destination;
    
    // Filtre par date
    if (dateFrom || dateTo) {
      filter.timestamp = {};
      if (dateFrom) filter.timestamp.$gte = new Date(dateFrom);
      if (dateTo) filter.timestamp.$lte = new Date(dateTo);
    }
    
    // Recherche textuelle
    if (search) {
      filter.$or = [
        { content: { $regex: search, $options: 'i' } },
        { source: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = page * size;

    const [content, totalElements] = await Promise.all([
      this.messageModel
        .find(filter)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(size)
        .lean()
        .exec(),
      this.messageModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(totalElements / size);

    return {
      content: content.map(msg => ({
        ...msg,
        id: msg._id.toString(),
        _id: undefined
      })),
      totalElements,
      totalPages,
      page,
      size,
    };
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).lean().exec();
    if (!message) {
      throw new NotFoundException(`Message avec ID ${id} non trouvé`);
    }
    
    return {
      ...message,
      id: message._id.toString(),
      _id: undefined
    } as any;
  }
}