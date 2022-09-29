<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

import MainVue from '@/components/Main.vue'

import { Swigger } from '../swiggerTypes'
import { clearReactive } from '../utils'
import { APP_NAME } from '../utils/config'
import { formatData, PathMap } from '../utils/formatData'
import IndexedDB from '../utils/indexedDB'

const json = reactive<Swigger.Model>({} as any)
const route = useRoute()
const db = IndexedDB.I

onMounted(() => {
  getData()
})

/**
 * 通过url当key，查找indexed db
 */
const getData = async () => {
  const url = route.query?.url
  if (url && typeof url === 'string') {
    const item = await db.read(encodeURI(url))
    if (item.data) {
      Object.assign(json, item.data)
    }
  }
}

const paths = computed(() => {
  return formatData(json as unknown as Swigger.Model)
})

const form = reactive<PathMap>({} as PathMap)
const handeClick = (e: PathMap) => {
  console.log(e)
  clearReactive(form)
  Object.assign(form, e)
}

const year = new Date().getFullYear()
</script>

<template>
  <el-container class="layout">
    <el-container>
      <div class="aside">
        <el-header>
          <h1 class="logo">{{ APP_NAME }}</h1>
        </el-header>

        <el-aside width="314px">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            default-active="2"
          >
            <el-sub-menu v-for="(item, index) in json.tags" :key="index" :index="item.name">
              <template #title>{{ item.name }}</template>
              <el-menu-item
                v-for="element in paths[item.name]"
                :key="element.data.summary"
                :index="`${index}-${element.path}-${element.method}`"
                @click="handeClick(element)"
                >{{ element.label }}</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </el-aside>
      </div>

      <el-container>
        <el-main>
          <MainVue v-if="form.path" :form="form" />
          <el-empty v-else description="swagger2model"></el-empty>
        </el-main>
        <el-footer>&copy; 2021-{{ year }} swagger2model. 适用于swagger V3版本</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.el-container {
  height: calc(100% - 60px);
}
.el-header {
  background: #1e282c;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
  z-index: 1;
  color: #fff;
  .logo {
    position: sticky;
    top: 0;
    height: 60px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    z-index: 1;
  }
}
.layout {
  height: 100vh;
}
.aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  background-color: #1e282c;
}
.el-footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #888;
  border-top: 1px solid #eee;
}

.el-aside {
  height: 100px;
  flex: 1;
  overflow-y: auto;
  /*滚动条整体样式*/
  &::-webkit-scrollbar {
    width: 10px;
    height: 1px;
  }
  /*滚动条滑块*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  /*滚动条轨道*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background: #ccc;
  }
}
</style>
