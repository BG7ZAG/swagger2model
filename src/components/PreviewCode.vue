<!--
 * @Autor: Jason
 * @Date: 2021-10-12 10:52:43
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-26
 * @FilePath: /src/components/PreviewCode.vue
 * @description: 预览代码
-->
<template>
  <el-dialog v-model="modelValue" title="代码预览" @close="close">
    <highlightjs autodetect :code="code" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="download">下载</el-button>
        <el-button type="primary" @click="copy">复制</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { saveAs } from 'file-saver'
import { PropType } from 'vue'
import useClipboard from 'vue-clipboard3'

const props = defineProps({
  modelValue: Boolean,
  code: String,
  fileName: String,
  type: {
    type: String as PropType<'ts' | 'dart'>,
    default: 'ts'
  }
})
const emits = defineEmits(['update:modelValue'])

const close = () => {
  emits('update:modelValue', false)
}

const { toClipboard } = useClipboard()
const copy = async () => {
  const res = await toClipboard(props.code || '')
  console.log(res)
}

const download = () => {
  return new Promise((res, rej) => {
    try {
      var blob = new Blob([props.code ?? ''], {
        type: 'text/javascript;charset=utf-8'
      })
      saveAs(blob, `${props.fileName ?? 'ExampleModel'}.${props.type}`)
      close()
      res(true)
    } catch (e) {
      rej(false)
    }
  })
}
</script>
