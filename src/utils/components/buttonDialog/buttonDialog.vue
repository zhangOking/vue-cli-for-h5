<template>
  <div class="bd">
    <van-button
      class="bd-button"
      :type="buttonType"
      @click="openPopup">{{buttonName}}</van-button>

    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '90%' }"
      get-container="body">
      <slot name="header" v-if="showPopup" class="bd-header"></slot>
      <slot name="body" v-if="showPopup"></slot>
    </van-popup>

  </div>
</template>

<script>
export default {
  name: 'ButtonDialog',
  props: {
    // 按钮名称
    buttonName: {
      type: String,
      default: '这是个按钮'
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      showPopup: false
    }
  },
  methods: {
    async openPopup(callback = null) {
      this.$emit('buttonClick')
      if (!callback) {
        await callback()
      }
      this.showPopup = true
    },
    close() {
      this.showPopup = false
    }
  }
}
</script>
