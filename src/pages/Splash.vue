<!--
 * @Autor: Jason
 * @Date: 2021-10-11 11:30:30
 * @LastEditors: BG7ZAG BG7ZAG@qq.com
 * @LastEditTime: 2023-06-01
 * @FilePath: /src/pages/Splash.vue
 * @description: description
-->
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { clearReactive, getDataByUrl, NetType } from '../utils'
import { APP_NAME } from '../utils/config'
import IndexedDB, { Item } from '../utils/indexedDB'

const url = ref('')
const router = useRouter()
const loading = ref(false)
const db = IndexedDB.I
const submit = async (type: NetType) => {
  if (type == 'extranet' && !url.value) {
    ElMessage.error('请输入swagger文档json地址')
    return
  }

  loading.value = true
  try {
    await getDataByUrl(url.value, type)
    goDetail(url.value)
  } catch (error: any) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

const history = reactive<Item[]>([])
/**
 * 获取历史列表
 */
const getList = async () => {
  clearReactive(history)
  const res = await db.readAll()
  Object.assign(history, res)
}
onMounted(() => {
  getList()
})

/**
 * 跳转详情
 * @param url 链接
 */
const goDetail = (url: string) => {
  router.push('/home?url=' + url)
}

/**
 * 清空记录
 */
const onClear = async () => {
  await db.clear()
  getList()
}

const isDev = import.meta.env.DEV
</script>
<template>
  <section class="splash">
    <h1>{{ APP_NAME }}</h1>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-card class="mt20">
          <h2>请输入swagger文档json地址</h2>
          <el-alert title="适用于外网环境下的swagger文档。" type="info" />
          <el-alert
            class="mt20"
            title="如在局域网内的请拉取该项目本地运行(https://github.com/bg7zag/swagger2model)，修改 `vite.config.ts` 中的`proxy`下的`target`地址，此时输入框随意输入。"
            type="info"
          />
          <el-alert class="mt20" title="按F12在network中获取swagger文档json地址" type="info" />
          <el-input v-model="url" class="mt20" placeholder="请输入swagger文档json地址" />
          <el-button class="mt20" type="primary" :loading="loading" @click="submit('extranet')">确定</el-button>
          <el-button v-if="isDev" class="mt20" type="primary" :loading="loading" @click="submit('intranet')"
            >内网</el-button
          >
          <template v-if="history.length">
            <el-row justify="space-between" style="margin-top: 50px">
              <el-col :span="6">
                <h3 style="margin: 0">历史记录</h3>
              </el-col>
              <el-col :span="2">
                <el-button text @click="onClear">清空</el-button>
              </el-col>
            </el-row>
            <el-divider style="margin-top: 5px" />
            <el-row>
              <el-col v-for="i in history" :key="i.url" class="history-item">
                <el-link type="primary" @click="goDetail(i.url)">
                  {{ i?.data?.info?.title ?? i.url }}
                </el-link>
              </el-col>
            </el-row>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12" class="link">
        <el-link href="https://github.com/bg7zag/swagger2model" target="_blank">Github</el-link>
        <el-link href="https://gitee.com/bg7zag/swagger2model" target="_blank">Gitee</el-link>
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

  .history-item {
    width: 100%;
    display: flex;
  }
}
</style>
