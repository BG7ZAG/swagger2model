<!--
 * @Autor: Jason
 * @Date: 2021-10-09 17:49:22
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-09 18:07:09
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
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 响应参数 </template>
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { PropType } from "@vue/runtime-core";
import { PathMap } from "./Layout.vue";

defineProps({
  form: {
    type: Object as PropType<PathMap>,
  },
});

const getTagType = (method?: string) => {
  if (!method) return;
  switch (method) {
    case "post":
      return "success";
    case "delete":
      return "warning";
    case "put":
      return "danger";
    default:
      break;
  }
};
</script>
