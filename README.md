<!--
 * @Author: Jason
 * @Date: 2021-10-09 17:12:53
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-10-30
 * @FilePath: /README.md
 * @description: description
-->
# Swagger2Model

这是一个通过swagger文档的`json`接口数据转换为`ts`类型的工具，后续计划支持`dart`。

swagger文档外网可访问状态下，可使用在线版本[https://BG7ZAG.github.io/swagger2model/](https://BG7ZAG.github.io/swagger2model/)

swagger文档在内网的话，需要clone到本地运行，需要修改 `vite.config.ts` 中的`proxy`下的`target`地址。

## 本地编译

### clone项目到本地

```bash
git clone git@github.com:BG7ZAG/swagger2model.git
```

### 安装依赖并启动

```bash
npm i
```

```bash
npm run dev
```

### 部署

```bash
npm run build
```
