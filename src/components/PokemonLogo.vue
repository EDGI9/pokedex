<template>
  <div class="c-pokemon-logo">
    <transition name="bounce">
      <img
        v-if="showPokeball"
        class="c-pokemon-logo_pokeball"
        alt="Pokeball"
        src="../assets/pokeball.webp"
      />
    </transition>
    <transition name="spin">
      <div v-if="showLogo" class="c-pokemon-logo_name" alt="Pokemon logo"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PokemonLogo",
  data() {
    return {
      showPokeball: false,
      showLogo: false
    };
  },
  mounted() {
    let _this = this;
    setTimeout(() => {
      _this.showPokeball = true;
    }, 1000);
    setTimeout(() => {
      _this.showLogo = true;
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
@import "../styling/animation.less";
.c-pokemon-logo {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  max-width: 900px;
  margin: auto;
  padding: 60px 0;
  min-height: 210px;

  .c-pokemon-logo_pokeball {
    width: 100px;
  }

  .c-pokemon-logo_name {
    background-image: url("../assets/pokemon-logo.webp");
    background-size: cover;
    background-repeat: no-repeat;
    width: 280px;
    height: 110px;
    background-position: center;
  }
}
</style>
