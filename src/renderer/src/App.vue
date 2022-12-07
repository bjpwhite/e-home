<script setup lang="ts">
import { ref } from 'vue'
import FrameHeader from '@/layouts/FrameHeader.vue'
import { ElConfigProvider } from 'element-plus'
const zIndex = ref(3000)
const size = ref('default')
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>

<style lang="less"></style>
