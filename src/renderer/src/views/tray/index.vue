<script setup lang="ts">
import { onMounted } from 'vue'
const { ipcRenderer } = window.electron
const handleSelect = (key: string) => {
  if (key === '3') {
    ipcRenderer.send('window-quit')
  } else {
    ipcRenderer.send('window-hide')
    if (key === '1') {
      alert('1')
    } else if (key === '2') {
      alert('2')
    }
  }
}
onMounted(() => {
  console.log('xxx')
})
</script>

<template>
  <div>
    <el-menu :default-active="`0`" class="el-menu-demo" @select="handleSelect">
      <el-menu-item index="1">设置</el-menu-item>
      <el-menu-item index="2">帮助</el-menu-item>
      <el-menu-item index="3">退出</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-menu-item) {
  color: #000000;
  padding-left: 33px !important;
  &:focus,
  &.is-active {
    color: #000000 !important;
  }
}
</style>
