<template>
  <button class="c-button" @click="$emit('click')">
    <slot>{{ value }}</slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
  props: {
    value: {
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.c-button {
  background-color: white;
  border: 0;
  padding: 5px 10px;
  margin: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;
}
</style>
