<!--
 * @Autor: Jason
 * @Date: 2021-10-11 11:30:30
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-29
 * @FilePath: /src/pages/Splash.vue
 * @description: description
-->
<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { APP_NAME } from '../utils/config'
import IndexedDB from '../utils/indexedDB'
const url = ref('')
const router = useRouter()

const db = IndexedDB.I
const submit = async () => {
  if (!url.value) {
    ElMessage.error('请输入swagger文档json地址')
    return
  }

  let data
  if (import.meta.env.DEV) {
    const res = await axios.get('/api?url=' + url.value)
    data = res.data
  } else {
    const res = await axios.post(import.meta.env.VITE_BASE_API, {
      url: url.value
    })
    data = res.data?.data
  }

  await db.update({ url: url.value, data: data || {} })

  router.push('/home?url=' + url.value)
}
</script>
<template>
  <section class="splash">
    <h1>{{ APP_NAME }}</h1>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-card class="mt20">
          <h2>请输入swagger文档json地址</h2>
          <el-alert
            title="适用于外网环境下的swagger文档。如在局域网内的请拉取该项目本地运行。https://github.com/hlbj105/swagger2model"
            type="info"
          />
          <el-alert class="mt20" title="按F12在network中获取swagger文档json地址" type="info" />
          <el-input v-model="url" class="mt20" placeholder="请输入swagger文档json地址" />
          <el-button class="mt20" type="primary" @click="submit">确定</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12" class="link">
        <el-link href="https://github.com/hlbj105/swagger2model" target="_blank">Github</el-link>
        <el-link href="https://gitee.com/hlbj105/swagger2model" target="_blank">Gitee</el-link>
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

  .link {
    margin-top: 50px;
    text-align: center;
    > a {
      margin: 0 10px;
    }
  }
}
</style>
