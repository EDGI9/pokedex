<template>
  <div class="c-pokemon-modal">
    <div class="c-pokemon-modal__container">
      <SectionLoader :is-loading="isLoading">
        <template v-if="!isLoading">
          <div class="c-pokemon-modal__header">
            <img
              class="c-pokemon-modal__header-image"
              :src="pokemonImage"
              :alt="pokemon.name"
            />
            <h3 class="c-pokemon-modal__header-name">
              {{ pokemonName }}
            </h3>
          </div>
          <div class="c-pokemon-modal__body">
            <div class="c-pokemon-modal__list">
              <h4 class="c-pokemon-modal__list-header">
                Stats
              </h4>
              <div
                class="c-pokemon-modal__list-row c-pokemon-modal__list-row--space-between c-pokemon-modal__list-row--border-bottom"
              >
                <div>Base experience</div>
                <div>{{ pokemonBaseExperience }}</div>
              </div>
              <div
                class="c-pokemon-modal__list-row c-pokemon-modal__list-row--space-between c-pokemon-modal__list-row--border-bottom"
              >
                <div>Height</div>
                <div>{{ pokemonHeight }}</div>
              </div>
              <div
                class="c-pokemon-modal__list-row c-pokemon-modal__list-row--space-between"
              >
                <div>Weight</div>
                <div>{{ pokemonWeight }}</div>
              </div>
            </div>
            <div class="c-pokemon-modal__list">
              <h4 class="c-pokemon-modal__list-header">
                Pokemon Types
              </h4>
              <div class="c-pokemon-modal__list-row">
                <div
                  v-for="(pokemonType, index) in pokemonTypes"
                  :key="index"
                  class="c-pokemon-modal__list-item c-pokemon-modal__list-item-badge c-pokemon-modal__list-item-badge--blue"
                >
                  {{ pokemonType.type.name }}
                </div>
              </div>
            </div>
            <div class="c-pokemon-modal__list">
              <h4 class="c-pokemon-modal__list-header">
                Pokemon Abilities
              </h4>
              <div class="c-pokemon-modal__list-row">
                <div
                  v-for="(pokemonAbility, index) in pokemonAbilities"
                  :key="index"
                  class="c-pokemon-modal__list-item c-pokemon-modal__list-item-badge c-pokemon-modal__list-item-badge--red"
                >
                  {{ pokemonAbility.ability.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="c-pokemon-modal__footer">
            <MyButton value="Close" @click="$emit('close')" />
          </div>
        </template>
      </SectionLoader>
    </div>
  </div>
</template>

<script>
import SectionLoader from "@/components/SectionLoader";
import MyButton from "@/components/Button.vue";
import { mapActions } from "vuex";
export default {
  name: "PokemonModal",
  props: {
    pokemon: {
      require: true,
      type: Object,
      default: () => {}
    }
  },
  components: {
    SectionLoader,
    MyButton
  },
  data: () => {
    return {
      isLoading: true
    };
  },
  computed: {
    pokemonName() {
      return this.pokemon.name;
    },
    pokemonHeight() {
      return `${(this.pokemon.height * 0.1).toFixed(2)} m`;
    },
    pokemonWeight() {
      return `${(this.pokemon.weight * 0.1).toFixed(2)} kg`;
    },
    pokemonBaseExperience() {
      return `${this.pokemon.base_experience} XP`;
    },
    pokemonImage() {
      return this.pokemon.sprites?.front_default;
    },
    pokemonTypes() {
      return this.pokemon.types;
    },
    pokemonAbilities() {
      return this.pokemon.abilities;
    }
  },
  methods: {
    ...mapActions("pokemons/", ["DELETE_INDIVIDUAL_POKEMON_DATA"])
  },
  watch: {
    pokemon(data) {
      let _this = this;
      if (Object.entries(data).length > 0) {
        setTimeout(function() {
          _this.isLoading = false;
        }, 1000);
      }
    }
  },
  beforeDestroy() {
    this.DELETE_INDIVIDUAL_POKEMON_DATA();
  }
};
</script>

<style lang="less" scoped>
.c-pokemon-modal {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(1, 1, 1, 0.5);
  height: 100%;
  width: 100%;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .c-pokemon-modal__container {
    background-color: white;
    padding: 20px 40px;
    max-width: 500px;
    min-width: 300px;
    min-height: 200px;
    border-radius: 5px;
    box-shadow: 5px 5px 8px rgba(1, 1, 1, 0.2);
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .c-pokemon-modal__header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
  .c-pokemon-modal__header-name {
    margin-top: 70px;
    text-transform: capitalize;
  }
  .c-pokemon-modal__header-image {
    position: absolute;
    width: 100px;
    height: 100px;
    top: -50px;
    left: calc(50% - 50px);
    border: 2px solid white;
    border-radius: 50px;
    background-color: white;
    box-shadow: 0px 5px 15px rgba(1, 1, 1, 0.2);
  }
  .c-pokemon-modal__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
  }
  .c-pokemon-modal__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }
  .c-pokemon-modal__list-header {
    display: flex;
    border-bottom: 1px solid #cecece;
    margin-bottom: 15px;
    width: 100%;
  }
  .c-pokemon-modal__list-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    &.c-pokemon-modal__list-row--space-between {
      width: 100%;
      justify-content: space-between;
    }
    &.c-pokemon-modal__list-row--border-bottom {
      border-bottom: 1px dashed #cecece;
    }
  }
  .c-pokemon-modal__list-item {
    margin: 0 5px;
  }
  .c-pokemon-modal__list-item-badge {
    color: white;
    padding: 5px 10px;
    border-radius: 25px;
    &.c-pokemon-modal__list-item-badge--blue {
      background-color: rgb(19, 106, 177);
    }
    &.c-pokemon-modal__list-item-badge--red {
      background-color: rgb(197, 81, 3);
    }
  }
  .c-pokemon-modal__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
