<!--
 * @Autor: Jason
 * @Date: 2021-10-09 17:49:22
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-12 14:49:39
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
      >
        <template #name="{ scope }">
          <div class="name">
            <span>{{ scope.row.name }}</span>
            <el-button
              style="margin-left: 20px"
              plain
              size="mini"
              v-if="scope.row.children"
              @click="generateTSModel(scope.row, 'req')"
            >
              TS
            </el-button>
            <el-button
              style="margin-left: 20px"
              plain
              size="mini"
              v-if="scope.row.children"
              @click="generateDartModel(scope.row)"
            >
              Dart
            </el-button>
          </div>
        </template>
      </TableVue>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 响应参数 </template>
      <TableVue
        v-if="form?.res?.length"
        :data="form?.res ?? []"
        :column="resColumn"
      >
        <template #name="{ scope }">
          <div class="name">
            <span>{{ scope.row.name }}</span>

            <el-button
              style="margin-left: 20px"
              plain
              size="mini"
              v-if="scope.row.children"
              @click="generateTSModel(scope.row, 'res')"
            >
              TS
            </el-button>
            <el-button
              style="margin-left: 20px"
              plain
              size="mini"
              v-if="scope.row.children"
              @click="generateDartModel(scope.row)"
            >
              Dart
            </el-button>
          </div>
        </template>
      </TableVue>
    </el-descriptions-item>
  </el-descriptions>

  <PreviewCodeVue v-model="visible" :code="code" :fileName="fileName" />
</template>

<script lang="ts" setup>
import { PropType } from "@vue/runtime-core";
import { ref, watch } from "vue";
import { convert2TSModel, DataType } from "../utils/convert2TSModel";
import { Item, PathMap } from "../utils/formatData";
import PreviewCodeVue from "./PreviewCode.vue";
import TableVue from "./Table.vue";

const props = defineProps({
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
    slot: "name",
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
    slot: "name",
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

const visible = ref(false);
const code = ref("");
const fileName = ref();
import axios from "axios";
axios.get("https://sales.hnevo.com/test/v2/api-docs?group=api").then((res) => {
  console.log(res);
});

const generateTSModel = (e: Item, type: DataType) => {
  fileName.value = `${e.schema || e.type || e.name || "Example"}Model`;
  const res = convert2TSModel(e, type);
  code.value = res;
  visible.value = true;
};
const generateDartModel = (e: any) => {
  console.log(e);
};
</script>

<style scoped lang="scss">
::v-deep(.cell) {
  display: flex;
  align-items: center;
}

.name {
  display: flex;
  align-items: center;
  > span {
    white-space: nowrap;
  }
}
</style>
