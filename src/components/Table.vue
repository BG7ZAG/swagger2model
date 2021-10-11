<!--
 * @Autor: Jason
 * @Date: 2021-05-06 18:13:39
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-11 18:19:50
 * @FilePath: /src/components/Table.vue
 * @description: description
-->
<template>
  <el-table
    ref="table"
    :data="data"
    row-key="name"
    default-expand-all
    style="width: 100%"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column
      v-for="i in column"
      :key="i.dataIndex"
      :prop="i.dataIndex"
      :label="i.title"
    >
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ElTable } from "element-plus";
import { PropType } from "vue";

export interface ColumnType {
  type?: string;
  dataIndex?: string;
  title?: string;
  formatter?: any;
  width?: string | number;
  align?: string;
  fixed?: boolean | string;
  slot?: string;
  sortable?: boolean;
}

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  column: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
});
</script>
