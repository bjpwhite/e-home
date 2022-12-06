<script setup lang="ts">
import IconFont from '^/IconFont/index.vue'
import { ElMessageBox } from 'element-plus'
import { ref, onMounted } from 'vue'

const { ipcRenderer } = window.electron;

const handleClose = () => {
  ipcRenderer.send("window-close");
};
const handleMinimize = () => {
  ipcRenderer.send("window-minimize");
};
const handleMaximize = () => {
  ipcRenderer.send("window-maximize");
};
const handleStick = () => {
  ipcRenderer.send("window-stick");
};
const handleMousedown = (flag: number) => {
  if (flag === 1) {
    minimizeBg.value = "#d0d0d0";
  } else if (flag === 2) {
    maximizeBg.value = "#d0d0d0";
  } else if (flag === 3) {
    dangerBg.value = "#e14848";
  } else if (flag === 4) {
    stickBg.value = "#d0d0d0";
  }
};
const handleMouseenter = (flag: number) => {
  if (flag === 1) {
    minimizeBg.value = "#e2e2e2";
  } else if (flag === 2) {
    maximizeBg.value = "#e2e2e2";
  } else if (flag === 3) {
    dangerBg.value = "#fb7373";
  } else if (flag === 4) {
    stickBg.value = "#e2e2e2";
  }
};
const handleMouseup = (flag: number) => {
  if (flag === 1) {
    minimizeBg.value = "";
  } else if (flag === 2) {
    maximizeBg.value = "";
  } else if (flag === 3) {
    dangerBg.value = "";
  } else if (flag === 4) {
    stickBg.value = "";
  }
};
onMounted(()=>{
  ipcRenderer.on("window-moved", (event, newBounds, xBuffer, yBuffer) => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    ipcRenderer.send("window-moved", screenWidth, screenHeight, newBounds, xBuffer, yBuffer);
  });
  ipcRenderer.on("window-maximize", () => {
    isMaximized.value = true;
  });
  ipcRenderer.on("window-unmaximize", () => {
    isMaximized.value = false;
  });
  ipcRenderer.on("window-stick", (event, data) => {
    isSticky.value = data;
  });
})
let minimizeBg = ref("");
let maximizeBg = ref("");
let dangerBg = ref("");
let stickBg = ref("");
let isMaximized = ref(false);
let isSticky = ref(false);
</script>

<template>
<!--  <el-button>1234</el-button>-->
  <div class="frame-header-container">
    <div class="frame-header-operation">
      <div
        class="frame-header-btn"
        :class="isSticky ? 'sticky-btn' : ''"
        :style="{ backgroundColor: stickBg }"
        @click="handleStick"
        @mousedown="handleMousedown(4)"
        @mouseover="handleMouseenter(4)"
        @mouseup="handleMouseup(4)"
        @mouseout="handleMouseup(4)"
      >
        <icon-font iconName="yanjing" class="sticky" />
      </div>
      <div
        class="frame-header-btn"
        :style="{ backgroundColor: minimizeBg }"
        @click="handleMinimize"
        @mousedown="handleMousedown(1)"
        @mouseover="handleMouseenter(1)"
        @mouseup="handleMouseup(1)"
        @mouseout="handleMouseup(1)"
      >
        <icon-font iconName="suoxiao" />
      </div>
      <div
        class="frame-header-btn"
        :style="{ backgroundColor: maximizeBg }"
        @click="handleMaximize"
        @mousedown="handleMousedown(2)"
        @mouseover="handleMouseenter(2)"
        @mouseup="handleMouseup(2)"
        @mouseout="handleMouseup(2)"
      >
        <icon-font :iconName="isMaximized ? `fangdasuoxiao` : `fangda`" />
      </div>
      <div
        class="frame-header-btn"
        :style="{ backgroundColor: dangerBg }"
        @click="handleClose"
        @mousedown="handleMousedown(3)"
        @mouseover="handleMouseenter(3)"
        @mouseup="handleMouseup(3)"
        @mouseout="handleMouseup(3)"
      >
        <icon-font iconName="guanbi" :style="{ color: dangerBg ? '#fff' : '' }" />
      </div>
    </div>
    <div class="clear" />
  </div>
</template>

<style lang="less" scoped>
.frame-header-container {
  -webkit-app-region: drag; //可以拖拽
  .frame-header-operation {
    float: right;
    .frame-header-btn {
      -webkit-app-region: no-drag; //不可拖拽
      display: inline-block;
      padding: 8px 15px;
      cursor: pointer;
    }
    .sticky-btn {
      background-color: #e2e2e2!important;
      .sticky {
        color: #39bc77!important;
      }
    }
  }
}
</style>
