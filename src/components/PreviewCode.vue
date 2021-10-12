<!--
 * @Autor: Jason
 * @Date: 2021-10-12 10:52:43
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-12 12:02:28
 * @FilePath: /src/components/PreviewCode.vue
 * @description: 预览代码
-->
<template>
  <el-dialog v-model="modelValue" title="代码预览" @close="close">
    <highlightjs autodetect :code="code" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modelValue = false">关闭</el-button>
        <el-button type="primary" @click="download">下载</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { saveAs } from "file-saver";
import { PropType } from "vue-demi";

const props = defineProps({
  modelValue: Boolean,
  code: String,
  fileName: String,
  type: {
    type: String as PropType<"ts" | "dart">,
    default: "ts",
  },
});
const emits = defineEmits(["update:modelValue"]);

const close = () => {
  emits("update:modelValue", false);
};

const download = () => {
  return new Promise((res, rej) => {
    try {
      var blob = new Blob([props.code ?? ""], {
        type: "text/javascript;charset=utf-8",
      });
      saveAs(blob, `${props.fileName ?? "ExampleModel"}.${props.type}`);
      close();
      res(true);
    } catch (e) {
      rej(false);
    }
  });
};
</script>
