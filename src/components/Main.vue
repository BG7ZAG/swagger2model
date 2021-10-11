<!--
 * @Autor: Jason
 * @Date: 2021-10-09 17:49:22
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-11 18:14:48
 * @FilePath: /src/components/Main.vue
 * @description: description
-->
<template>
  <el-descriptions class="margin-top" :title="form?.label" :column="1" border>
    <el-descriptions-item>
      <template #label> 地址 </template>
      {{ form?.path }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 请求类型 </template>
      <el-tag size="small" :type="getTagType(form?.method)">{{
        form?.method?.toLocaleUpperCase()
      }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 请求数据类型 </template>
      {{ form?.data?.consumes?.join() }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 请求参数 </template>
      <TableVue
        v-if="form?.req?.length"
        :data="form?.req ?? []"
        :column="reqColumn"
      />
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 响应参数 </template>
      <TableVue
        v-if="form?.res?.length"
        :data="form?.res ?? []"
        :column="resColumn"
      />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { PropType } from "@vue/runtime-core";
import { PathMap } from "../utils/formatData";
import TableVue from "./Table.vue";

defineProps({
  form: {
    type: Object as PropType<PathMap>,
  },
});

const getTagType = (method?: string) => {
  if (!method) return "";
  switch (method) {
    case "post":
      return "success";
    case "delete":
      return "danger";
    case "put":
      return "warning";
    default:
      break;
  }
  return "";
};

const reqColumn = [
  {
    title: "参数名称",
    dataIndex: "name",
  },
  {
    title: "参数说明",
    dataIndex: "description",
  },
  {
    title: "是否必须",
    dataIndex: "required",
  },
  {
    title: "数据类型",
    dataIndex: "type",
  },
  {
    title: "schema",
    dataIndex: "schema",
  },
];

const resColumn = [
  {
    title: "参数名称",
    dataIndex: "name",
  },
  {
    title: "参数说明",
    dataIndex: "description",
  },
  {
    title: "数据类型",
    dataIndex: "type",
  },
  {
    title: "schema",
    dataIndex: "schema",
  },
];
</script>
