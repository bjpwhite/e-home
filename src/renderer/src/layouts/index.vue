<script setup lang="ts">
import FrameHeader from '@/layouts/FrameHeader.vue'
const { ipcRenderer } = window.electron
const openMoments = () => {
  ipcRenderer.send('open-moments')
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="test" width="200px">
        <el-button @click="openMoments">打开朋友圈</el-button>
      </el-aside>
      <el-container>
        <el-header>
          <FrameHeader />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
