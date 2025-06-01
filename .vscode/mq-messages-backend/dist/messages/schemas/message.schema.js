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
exports.MessageSchema = exports.Message = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enums_1 = require("../../shared/enums");
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Message.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Message.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Message.prototype, "destination", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: enums_1.MessageStatus,
        default: enums_1.MessageStatus.PENDING
    }),
    __metadata("design:type", String)
], Message.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Message.prototype, "partnerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: enums_1.ProcessedFlowType,
        required: true
    }),
    __metadata("design:type", String)
], Message.prototype, "processedFlowType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Message.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Message.prototype, "headers", void 0);
exports.Message = Message = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'messages',
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    })
], Message);
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);
exports.MessageSchema.index({ timestamp: -1 });
exports.MessageSchema.index({ status: 1 });
exports.MessageSchema.index({ source: 1 });
exports.MessageSchema.index({ destination: 1 });
exports.MessageSchema.index({ processedFlowType: 1 });
//# sourceMappingURL=message.schema.js.map