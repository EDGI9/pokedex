<template>
  <div class="c-pokemon-pagination">
    <div class="c-pokemon-pagination__container">
      <transition name="fade">
        <MyButton
          v-if="POKEMON_PREVIOUS_LIST_URL"
          value="Previous"
          @click="GET_POKEMON_LIST(POKEMON_PREVIOUS_LIST_URL)"
        />
      </transition>
      <transition name="fade">
        <MyButton
          v-if="POKEMON_NEXT_LIST_URL"
          value="Next"
          @click="GET_POKEMON_LIST(POKEMON_NEXT_LIST_URL)"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/Button.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PokemonPagination",
  components: {
    MyButton
  },
  computed: {
    ...mapGetters("pokemons/", [
      "POKEMON_NEXT_LIST_URL",
      "POKEMON_PREVIOUS_LIST_URL"
    ])
  },
  methods: {
    ...mapActions("pokemons/", ["GET_POKEMON_LIST"])
  }
};
</script>

<style lang="less" scoped>
@import "../styling/animation.less";
.c-pokemon-pagination {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 15px;

  .c-pokemon-pagination__container {
    max-width: 200px;
  }
}
</style>
