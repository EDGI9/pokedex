<template>
  <section class="c-pokemon-list">
    <article
      v-for="(pokemon, index) in pokemons"
      :key="index"
      class="c-pokemon-list_card"
      @click="getPokemonData(pokemon)"
    >
      <img
        class="c-pokemon-list_card-image"
        :src="getPokemonImageUrl(pokemon)"
        :alt="pokemon.name"
      />
      <h3 class="c-pokemon-list_card-name">{{ pokemon.name }}</h3>
      <div class="c-pokemon-list_card-reflexion"></div>
    </article>
  </section>
</template>

<script>
import Api from "@/api/index";
import { mapActions } from "vuex";
export default {
  name: "PokemonList",
  props: {
    pokemons: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapActions("pokemons/", [
      "GET_INDIVIDUAL_POKEMON_DATA",
      "UPDATE_POKEMON_MODAL_VISIBILITY"
    ]),
    getPokemonData(pokemon) {
      this.GET_INDIVIDUAL_POKEMON_DATA(pokemon);
      this.UPDATE_POKEMON_MODAL_VISIBILITY(true);
    },
    getPokemonImageUrl(pokemon) {
      return Api.pokemons.getPokemonImage.replace("{number}", pokemon.id);
    }
  }
};
</script>

<style lang="less" scoped>
.c-pokemon-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 900px;
  margin: auto;

  .c-pokemon-list_card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 150px;
    height: 150px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    margin: 5px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
    position: relative;

    &:not(:hover) {
      .c-pokemon-list_card-reflexion {
        transition: none;
      }
    }

    &:hover {
      transform: scale(1.2);
      .c-pokemon-list_card-reflexion {
        left: 130%;
      }
    }
  }

  .c-pokemon-list_card-reflexion {
    width: 100px;
    height: 250px;
    top: calc(50% - 110px);
    left: -100%;
    transform: rotate(30deg);
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgb(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    transition: left 0.8s;
    position: absolute;
  }

  .c-pokemon-list_card-image {
    width: 50px;
    height: 50px;
  }

  .c-pokemon-list_card-name {
    text-transform: capitalize;
  }
}
</style>
