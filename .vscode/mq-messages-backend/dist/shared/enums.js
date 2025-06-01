"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.ProcessedFlowType = exports.MessageStatus = void 0;
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["PENDING"] = "PENDING";
    MessageStatus["PROCESSED"] = "PROCESSED";
    MessageStatus["ERROR"] = "ERROR";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
var ProcessedFlowType;
(function (ProcessedFlowType) {
    ProcessedFlowType["MESSAGE"] = "MESSAGE";
    ProcessedFlowType["ALERTING"] = "ALERTING";
    ProcessedFlowType["NOTIFICATION"] = "NOTIFICATION";
})(ProcessedFlowType || (exports.ProcessedFlowType = ProcessedFlowType = {}));
var Direction;
(function (Direction) {
    Direction["INBOUND"] = "INBOUND";
    Direction["OUTBOUND"] = "OUTBOUND";
})(Direction || (exports.Direction = Direction = {}));
//# sourceMappingURL=enums.js.map