/*
 * @Autor: Jason
 * @Date: 2021-10-09 17:56:51
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-11 17:08:42
 * @FilePath: /src/swiggerTypes.ts
 * @description: description
 */
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
    responses: Record<number, Parameter>;
    security: Security[];
    deprecated: boolean;
    consumes: string[];
  }

  export interface Security {
    Authorization: string[];
  }

  export interface Schema {
    originalRef: string;
    $ref: string;
  }

  export interface Parameter {
    name: string;
    in: string;
    description?: string;
    required: boolean;
    type: string;
    format?: string;
    schema?: Schema;
  }

  export interface Definitions {
    [x: string]: DefinitionsItem;
  }

  export interface DefinitionsItem {
    type: string;
    properties: Properties;
    title: string;
    required?: string[];
  }

  export interface Properties {
    [x: string]: PropertiesItem;
  }

  export interface PropertiesItem {
    type?: string;
    description?: string;
    enum?: string[];
    $ref?: string;
    originalRef?: string;
    format?: string;
    items?: PropertiesItem;
  }
}
