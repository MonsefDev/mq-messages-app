import { MessagesService } from './messages.service';
import { QueryMessagesDto } from './dto/query-messages.dto';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto): Promise<{
        success: boolean;
        data: import("./schemas/message.schema").Message;
        message: string;
    }>;
    findAll(queryDto: QueryMessagesDto): Promise<{
        success: boolean;
        data: {
            content: {
                id: string;
                _id: any;
                content: string;
                timestamp: Date;
                source: string;
                destination: string;
                status: import("../shared/enums").MessageStatus;
                partnerId?: string;
                processedFlowType: import("../shared/enums").ProcessedFlowType;
                size?: number;
                headers?: import("mongoose").FlattenMaps<{
                    [key: string]: string;
                }>;
                $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<import("./schemas/message.schema").MessageDocument, keyof Paths> & Paths;
                $clearModifiedPaths: () => import("./schemas/message.schema").MessageDocument;
                $clone: () => import("./schemas/message.schema").MessageDocument;
                $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
                $getAllSubdocs: () => import("mongoose").Document[];
                $ignore: (path: string) => void;
                $isDefault: (path: string) => boolean;
                $isDeleted: (val?: boolean) => boolean;
                $getPopulatedDocs: () => import("mongoose").Document[];
                $inc: (path: string | string[], val?: number) => import("./schemas/message.schema").MessageDocument;
                $isEmpty: (path: string) => boolean;
                $isValid: (path: string) => boolean;
                $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
                $markValid: (path: string) => void;
                $model: {
                    <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}> & Required<{
                        _id: unknown;
                    }> & {
                        __v: number;
                    }, any>>(name: string): ModelType;
                    <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
                };
                $op: "save" | "validate" | "remove" | null;
                $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("./schemas/message.schema").MessageDocument;
                $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
                $set: {
                    (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("./schemas/message.schema").MessageDocument;
                    (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("./schemas/message.schema").MessageDocument;
                    (value: string | Record<string, any>): import("./schemas/message.schema").MessageDocument;
                };
                $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
                baseModelName?: string;
                collection: import("mongoose").Collection;
                db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
                deleteOne: (options?: import("mongoose").QueryOptions) => any;
                depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("./schemas/message.schema").MessageDocument, Paths>;
                directModifiedPaths: () => Array<string>;
                equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>>) => boolean;
                errors?: import("mongoose").Error.ValidationError;
                get: {
                    <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
                    (path: string, type?: any, options?: any): any;
                };
                getChanges: () => import("mongoose").UpdateQuery<import("./schemas/message.schema").MessageDocument>;
                increment: () => import("./schemas/message.schema").MessageDocument;
                init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("./schemas/message.schema").MessageDocument;
                invalidate: {
                    <T extends string | number | symbol>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
                    (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
                };
                isDirectModified: {
                    <T extends string | number | symbol>(path: T | T[]): boolean;
                    (path: string | Array<string>): boolean;
                };
                isDirectSelected: {
                    <T extends string | number | symbol>(path: T): boolean;
                    (path: string): boolean;
                };
                isInit: {
                    <T extends string | number | symbol>(path: T): boolean;
                    (path: string): boolean;
                };
                isModified: {
                    <T extends string | number | symbol>(path?: T | T[], options?: {
                        ignoreAtomics?: boolean;
                    } | null): boolean;
                    (path?: string | Array<string>, options?: {
                        ignoreAtomics?: boolean;
                    } | null): boolean;
                };
                isNew: boolean;
                isSelected: {
                    <T extends string | number | symbol>(path: T): boolean;
                    (path: string): boolean;
                };
                markModified: {
                    <T extends string | number | symbol>(path: T, scope?: any): void;
                    (path: string, scope?: any): void;
                };
                model: {
                    <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}> & Required<{
                        _id: unknown;
                    }> & {
                        __v: number;
                    }, any>>(name: string): ModelType;
                    <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
                };
                modifiedPaths: (options?: {
                    includeChildren?: boolean;
                }) => Array<string>;
                overwrite: (obj: import("mongoose").AnyObject) => import("./schemas/message.schema").MessageDocument;
                $parent: () => import("mongoose").Document | undefined;
                populate: {
                    <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("./schemas/message.schema").MessageDocument, Paths>>;
                    <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("./schemas/message.schema").MessageDocument, Paths>>;
                };
                populated: (path: string) => any;
                replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("./schemas/message.schema").MessageDocument, {}, unknown, "find", Record<string, never>>;
                save: (options?: import("mongoose").SaveOptions) => Promise<import("./schemas/message.schema").MessageDocument>;
                schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
                    [x: string]: unknown;
                }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
                    [x: string]: unknown;
                }>, {}> & import("mongoose").FlatRecord<{
                    [x: string]: unknown;
                }> & Required<{
                    _id: unknown;
                }> & {
                    __v: number;
                }>>;
                set: {
                    <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("./schemas/message.schema").MessageDocument;
                    (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("./schemas/message.schema").MessageDocument;
                    (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("./schemas/message.schema").MessageDocument;
                    (value: string | Record<string, any>): import("./schemas/message.schema").MessageDocument;
                };
                toJSON: {
                    (options: import("mongoose").ToObjectOptions & {
                        virtuals: true;
                    }): any;
                    (options?: import("mongoose").ToObjectOptions & {
                        flattenMaps?: true;
                        flattenObjectIds?: false;
                    }): import("mongoose").FlattenMaps<any>;
                    (options: import("mongoose").ToObjectOptions & {
                        flattenObjectIds: false;
                    }): import("mongoose").FlattenMaps<any>;
                    (options: import("mongoose").ToObjectOptions & {
                        flattenObjectIds: true;
                    }): {
                        [x: string]: any;
                    };
                    (options: import("mongoose").ToObjectOptions & {
                        flattenMaps: false;
                    }): any;
                    (options: import("mongoose").ToObjectOptions & {
                        flattenMaps: false;
                        flattenObjectIds: true;
                    }): any;
                    <T = any>(options?: import("mongoose").ToObjectOptions & {
                        flattenMaps?: true;
                        flattenObjectIds?: false;
                    }): import("mongoose").FlattenMaps<T>;
                    <T = any>(options: import("mongoose").ToObjectOptions & {
                        flattenObjectIds: false;
                    }): import("mongoose").FlattenMaps<T>;
                    <T = any>(options: import("mongoose").ToObjectOptions & {
                        flattenObjectIds: true;
                    }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
                    <T = any>(options: import("mongoose").ToObjectOptions & {
                        flattenMaps: false;
                    }): T;
                    <T = any>(options: import("mongoose").ToObjectOptions & {
                        flattenMaps: false;
                        flattenObjectIds: true;
                    }): import("mongoose").ObjectIdToString<T>;
                };
                toObject: {
                    (options: import("mongoose").ToObjectOptions & {
                        virtuals: true;
                    }): any;
                    (options?: import("mongoose").ToObjectOptions): any;
                    <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Default__v<import("mongoose").Require_id<T>>;
                };
                unmarkModified: {
                    <T extends string | number | symbol>(path: T): void;
                    (path: string): void;
                };
                updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("./schemas/message.schema").MessageDocument>, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("./schemas/message.schema").MessageDocument, {}, unknown, "find", Record<string, never>>;
                validate: {
                    <T extends string | number | symbol>(pathsToValidate?: T | T[], options?: import("mongoose").AnyObject): Promise<void>;
                    (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
                    (options: {
                        pathsToSkip?: import("mongoose").pathsToSkip;
                    }): Promise<void>;
                };
                validateSync: {
                    (options: {
                        pathsToSkip?: import("mongoose").pathsToSkip;
                        [k: string]: any;
                    }): import("mongoose").Error.ValidationError | null;
                    <T extends string | number | symbol>(pathsToValidate?: T | T[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
                    (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
                };
                __v: number;
            }[];
            totalElements: number;
            totalPages: number;
            page: number;
            size: number;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./schemas/message.schema").Message;
    }>;
}
