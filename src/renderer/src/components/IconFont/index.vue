<script setup lang="ts">
const props = defineProps({
  margin: {
    type: Boolean,
    default() {
      return false
    }
  },
  warning: {
    type: String,
    default() {
      return ''
    }
  },
  tip: {
    type: String,
    default() {
      return ''
    }
  },
  mode: {
    type: String,
    default() {
      return ''
    }
  },
  iconName: {
    type: String,
    require: true,
    default() {
      return ''
    }
  }
})
const emit = defineEmits(['confirm', 'blur', 'click'])
const iconConfirm = () => {
  emit('confirm')
}
const iconBlur = () => {
  emit('blur')
}
const iconClick = () => {
  emit('click')
}
</script>

<template>
  <div class="a-svg-container">
    <el-tooltip v-if="mode === 'tip'" effect="dark" :content="tip" placement="top">
      <span
        class="tip"
        :class="margin ? 'operation-margin' : ''"
        @click="iconClick"
        @blur="iconBlur"
      >
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#e-home-${iconName}`" />
        </svg>
      </span>
    </el-tooltip>
    <el-popconfirm
      v-else-if="mode === 'confirm'"
      :title="warning"
      confirm-button-type="primary"
      cancel-button-type="text"
      icon="el-icon-question"
      @confirm="iconConfirm"
    >
      <el-tooltip slot="reference" effect="dark" :content="tip" placement="top">
        <span class="warning" :class="margin ? 'operation-margin' : ''" @click="iconClick">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#e-home-${iconName}`" />
          </svg>
        </span>
      </el-tooltip>
    </el-popconfirm>
    <span v-else @click="iconClick">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#e-home-${iconName}`" />
      </svg>
    </span>
  </div>
</template>

<style lang="less" scoped>
@import './index';
</style>
