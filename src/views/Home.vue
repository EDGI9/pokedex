<template>
  <div class="home">
    <PokemonLogo />
    <PokemonList :pokemons="POKEMON_LIST" />
    <PokemonPagination />
    <transition name="fade">
      <PokemonModal
        v-if="POKEMON_MODAL_VISIBLE"
        :pokemon="INDIVIDUAL_POKEMON_DATA"
        @close="UPDATE_POKEMON_MODAL_VISIBILITY(false)"
      />
    </transition>
  </div>
</template>

<script>
import PokemonList from "@/components/PokemonList.vue";
import PokemonModal from "@/components/PokemonModal.vue";
import PokemonPagination from "@/components/PokemonPagination.vue";
import PokemonLogo from "@/components/PokemonLogo.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => {
    return {
      showModal: true,
      index: 0
    };
  },
  components: {
    PokemonList,
    PokemonModal,
    PokemonPagination,
    PokemonLogo
  },
  computed: {
    ...mapGetters("pokemons/", [
      "POKEMON_LIST",
      "POKEMON_MODAL_VISIBLE",
      "INDIVIDUAL_POKEMON_DATA",
      "POKEMON_NEXT_LIST_URL",
      "POKEMON_PREVIOUS_LIST_URL"
    ])
  },
  methods: {
    ...mapActions("pokemons/", [
      "GET_POKEMON_LIST",
      "UPDATE_POKEMON_MODAL_VISIBILITY"
    ]),
  },
  created() {
    this.GET_POKEMON_LIST();
  }
};
</script>
<style lang="less" scoped>
@import "../styling/animation.less";
</style>
