<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'

// const preload = require("@electron-toolkit/preload");
// import { ipcRenderer } from 'electron';
const { ipcRenderer } = window.electron;
const closeMoments = () => {
  ElMessageBox.confirm('当前操作会关闭此程序，是否继续?', {
    confirmButtonText: '是',
    cancelButtonText: '否',
    type: 'warning',
  })
    .then(() => {
      // console.log(ipcRenderer)
      ipcRenderer.send("window-close");
    })
    .catch(() => {
    });
};
onMounted(()=>{
  console.log("hhh")
})
</script>

<template>
  <div class="test">
    <div>123</div>
    <el-button @click="closeMoments">关闭朋友圈</el-button>
  </div>
</template>

<style lang="less" scoped>

</style>
