<!--
 * @Autor: Jason
 * @Date: 2021-10-11 11:30:30
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-27
 * @FilePath: /src/pages/Splash.vue
 * @description: description
-->
<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { APP_NAME } from '../utils/config'
import IndexedDB from '../utils/indexedDB'
const url = ref('')

const db = IndexedDB.I

const submit = async () => {
  if (!url.value) {
    ElMessage.error('请输入swagger文档json地址')
    return
  }

  const res = await axios.post(import.meta.env.VITE_BASE_API, {
    url: url.value
  })
  console.log(res)
  // await db.add({ url: 'bb', data: { aa: 'dd' } })
}
</script>
<template>
  <section class="splash">
    <h1>{{ APP_NAME }}</h1>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-card class="mt20">
          <h2>请输入swagger文档json地址</h2>
          <el-alert title="按F12在network中获取" type="info" />
          <el-input class="mt20" v-model="url" placeholder="请输入swagger文档json地址" />
          <el-button class="mt20" type="primary" @click="submit">确定</el-button>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style lang="scss" scoped>
.splash {
  h1 {
    text-align: center;
  }
  .mt20 {
    margin-top: 20px;
  }
}
</style>
