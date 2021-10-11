<!--
 * @Autor: Jason
 * @Date: 2021-05-06 15:59:10
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-11 11:31:36
 * @FilePath: /src/pages/404.vue
 * @description: description
-->
<template>
  <el-result
    icon="error"
    title="404 NotFound"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <el-button type="primary" @click="toHome"> 返回首页 </el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
export default {
  name: "NotFound",
};
</script>
<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const toHome = () => router.push("/");
</script>
