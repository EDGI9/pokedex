<template>
  <div class="c-section-loader">
    <transition name="fade">
      <div class="c-section-loader__loader" v-if="showLoading">
        <span class="c-section-loader__text">
          {{ message }}
        </span>
        <img class="c-section-loader__image" :src="imageUrl" alt="loading" />
      </div>
    </transition>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "section-loader",
  data: function() {
    return {
      fadeDelay: null,
      showLoading: false
    };
  },
  props: {
    "is-loading": {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "Loading ..."
    },
    delay: {
      type: Number,
      default: 200
    }
  },
  computed: {
    imageUrl: function() {
      return "https://media.tenor.com/images/bb9d0e35fe2bf1e3e49eed5239c67602/tenor.gif";
    }
  },
  mounted: function() {
    this.showLoading = this.isLoading;
  },
  watch: {
    isLoading: function(state) {
      let _this = this;
      if (state === true) {
        this.showLoading = state;
      } else {
        clearTimeout(this.fadeDelay);
        this.fadeDelay = setTimeout(function() {
          _this.showLoading = state;
        }, _this.delay);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../styling/animation.less";
.c-section-loader {
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .c-section-loader__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
  }
  .c-section-loader__text {
    margin-bottom: 10px;
  }
  .c-section-loader__image {
    width: 50px;
    height: 50px;
  }
}
</style>
