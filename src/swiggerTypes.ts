/*
 * @Autor: Jason
 * @Date: 2021-10-09 17:56:51
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-26
 * @FilePath: /src/swiggerTypes.ts
 * @description: description
 */
export namespace Swigger {
  export interface Model {
    info: Info
    host: string
    basePath: string
    tags: { name: string }[]
    paths: Record<string, Record<string, Paths>>
    securityDefinitions: {
      Authorization: {
        type: string
        name: string
        in: string
      }
    }
    components: {
      schemas: Components
    }
  }
  export interface Info {
    description: string
    version: string
    title: string
    termsOfService: string
    contact: {
      name: string
      url: string
    }
  }

  export interface RequestBody {
    content: {
      'application/json': {
        schema: {
          $ref: string
        }
      }
    }
  }

  export interface Responses {
    description: string
    content: {
      '*/*': {
        schema: {
          $ref: string
        }
      }
    }
  }
  export interface Paths {
    tags: string[]
    summary: string
    operationId: string
    produces: string[]
    parameters: Parameter[]
    requestBody: RequestBody
    responses: Record<number, Responses>
    security: Security[]
    deprecated: boolean
    consumes: string[]
  }

  export interface Security {
    Authorization: string[]
  }

  export interface Schema {
    originalRef: string
    $ref: string
  }

  export interface Parameter {
    name: string
    in: string
    description?: string
    required: boolean
    type: string
    format?: string
    schema?: Schema
  }

  export interface Components {
    [x: string]: ComponentsItem
  }

  export interface ComponentsItem {
    title: string
    type: string
    properties: Properties
    description: string
    required?: string[]
  }

  export interface Properties {
    [x: string]: PropertiesItem
  }

  export interface PropertiesItem {
    type?: string
    description?: string
    enum?: string[]
    $ref?: string
    originalRef?: string
    format?: string
    items?: PropertiesItem
  }
}