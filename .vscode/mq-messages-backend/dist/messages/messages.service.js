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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("./schemas/message.schema");
let MessagesService = class MessagesService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async create(createMessageDto) {
        const message = new this.messageModel({
            ...createMessageDto,
            timestamp: createMessageDto.timestamp || new Date()
        });
        return message.save();
    }
    async findAll(queryDto) {
        const { page = 0, size = 20, status, processedFlowType, source, destination, dateFrom, dateTo, search } = queryDto;
        const filter = {};
        if (status)
            filter.status = status;
        if (processedFlowType)
            filter.processedFlowType = processedFlowType;
        if (source)
            filter.source = source;
        if (destination)
            filter.destination = destination;
        if (dateFrom || dateTo) {
            filter.timestamp = {};
            if (dateFrom)
                filter.timestamp.$gte = new Date(dateFrom);
            if (dateTo)
                filter.timestamp.$lte = new Date(dateTo);
        }
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
    async findOne(id) {
        const message = await this.messageModel.findById(id).lean().exec();
        if (!message) {
            throw new common_1.NotFoundException(`Message avec ID ${id} non trouvé`);
        }
        return {
            ...message,
            id: message._id.toString(),
            _id: undefined
        };
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map