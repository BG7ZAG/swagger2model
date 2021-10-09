export namespace Swigger {
  export interface Model {
    info: Info;
    host: string;
    basePath: string;
    tags: { name: string }[];
    paths: Record<string, Record<string, Paths>>;
    securityDefinitions: {
      Authorization: {
        type: string;
        name: string;
        in: string;
      };
    };
    definitions: Definitions;
  }
  export interface Info {
    description: string;
    version: string;
    title: string;
    termsOfService: string;
    contact: {
      name: string;
      url: string;
    };
  }

  export interface Paths {
    tags: string[];
    summary: string;
    operationId: string;
    produces: string[];
    parameters: Parameter[];
    responses: Record<number, Responses>;
    security: Security[];
    deprecated: boolean;
  }

  export interface Security {
    Authorization: string[];
  }

  export interface Responses {
    description: string;
    schema: {
      originalRef: string;
      $ref: string;
    };
  }

  export interface Parameter {
    name: string;
    in: string;
    description?: string;
    required: boolean;
    type: string;
    format?: string;
  }

  export interface Definitions {
    type: string;
    properties: Properties;
    title: string;
  }

  export interface Properties {
    countId: CountId;
    current: Current;
    hitCount: CountId;
    maxLimit: Current;
    optimizeCountSql: CountId;
    orders: Orders;
    pages: Current;
    records: Orders;
    searchCount: CountId;
    size: Current;
    total: Current;
  }

  export interface Orders {
    type: string;
    items: {
      originalRef: string;
      $ref: string;
    };
  }

  export interface Current {
    type: string;
    format: string;
  }

  export interface CountId {
    type: string;
  }
}
