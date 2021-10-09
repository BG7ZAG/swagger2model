<template>
  <el-container>
    <el-aside width="250px">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu v-for="(item,index) in json.tags" :key="index" :index="index">
          <template #title>{{ item.name }}</template>
          <el-menu-item
            v-for="element in paths[item.name]"
            :key="element.data.summary"
            :index="`${index}-${element.path}`"
          >{{ element.label }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { computed, reactive } from '@vue/reactivity';
import data from '../swagger.json'
import { Swigger } from '../swiggerTypes';
console.log(data);

const json: Swigger.Model = reactive(data as any);

const tags = computed(() => {
  return json.tags.map(e => e.name);
})

interface PathMap {
  label: string;
  method: string
  data: Swigger.Paths,
  path: string
}


const paths = computed(() => {
  const pathMap: Record<string, PathMap[]> = {}

  Object.keys(json.paths).forEach((path) => {
    const record = json.paths[path];

    Object.keys(record).forEach(method => {
      const data = record[method]
      const tags = data.tags;

      for (const tag of tags) {
        pathMap[tag] ??= [];
        pathMap[tag].push({
          label: data.summary,
          method: method,
          data: data,
          path: path
        })
      }

    })
  })
  return pathMap;
})

</script>

<style lang="scss">
.el-container {
  height: 100vh;
}
.el-header {
  background: #fff;
}
.el-menu {
  height: 100%;
}
</style>