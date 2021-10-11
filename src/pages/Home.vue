<template>
  <el-container class="layout">
    <el-header>
      <h1 class="logo">swagger2model</h1>
    </el-header>

    <el-container>
      <el-aside width="250px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
        >
          <el-sub-menu
            v-for="(item, index) in json.tags"
            :key="index"
            :index="item.name"
          >
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

      <el-container>
        <el-main>
          <MainVue v-if="form.path" :form="form" />
          <el-empty v-else description="swagger2model"></el-empty>
        </el-main>
        <el-footer>&copy; 2021 swagger2model</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { computed, reactive } from "@vue/reactivity";
import data from "../swagger.json";
import { Swigger } from "../swiggerTypes";
import { clearReactive } from "../utils";
import MainVue from "@/components/Main.vue";
import { formatData, PathMap } from "../utils/formatData";
console.log(data);

const json = reactive<Swigger.Model>(data as any);

const paths = computed(() => {
  const newData = formatData(data as unknown as Swigger.Model);
  console.log(newData);
  return newData;
});

const form = reactive<PathMap>({} as PathMap);
const handeClick = (e: PathMap) => {
  console.log(e);
  clearReactive(form);
  Object.assign(form, e);
};
</script>

<style lang="scss">
.el-container {
  height: calc(100% - 60px);
}
.el-header {
  background: #fff;
}
.layout {
  height: 100vh;
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
}

.logo {
  position: sticky;
  top: 0;
  height: 60px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 1;
}

.el-aside {
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
