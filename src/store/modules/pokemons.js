import Axios from "axios";
import Api from "@/api/index";

export default {
  namespaced: true,
  state() {
    return {
      pokemons: [],
      pokemonCount: 0,
      nextListUrl: "",
      previousListUrl: "",
      individualPokemon: {},
      pokemonModalVisible: false
    };
  },
  getters: {
    POKEMON_COUNT(state) {
      return state.pokemonCount;
    },
    POKEMON_LIST(state) {
      return state.pokemons;
    },
    POKEMON_NEXT_LIST_URL(state) {
      return state.nextListUrl;
    },
    POKEMON_PREVIOUS_LIST_URL(state) {
      return state.previousListUrl;
    },
    INDIVIDUAL_POKEMON_DATA(state) {
      return state.individualPokemon;
    },
    POKEMON_MODAL_VISIBLE(state) {
      return state.pokemonModalVisible;
    }
  },
  mutations: {
    UPDATE_POKEMON_DATA(state, payload) {
      state.pokemons = payload.results;
      state.pokemonCount = payload.count;
      state.nextListUrl = payload.next || "";
      state.previousListUrl = payload.previous || "";
    },
    UPDATE_INDIVIDUAL_POKEMON_DATA(state, payload) {
      state.individualPokemon = payload;
    },
    DELETE_INDIVIDUAL_POKEMON_DATA(state) {
      state.individualPokemon = {};
    },
    UPDATE_POKEMON_MODAL_VISIBILITY(state, payload) {
      state.pokemonModalVisible = payload;
    }
  },
  actions: {
    GET_POKEMON_LIST({ commit }, urlString) {
      let url = urlString ? urlString : Api.pokemons.getAllPokemons;
      Axios.get(url)
        .then(response => {
          if (response.status === 200) {
            let data = {
              ...response.data,
              results: response.data.results.map(pokemon => {
                let pokemonId = pokemon.url
                  .split("/")
                  .filter(part => {
                    return !!part;
                  })
                  .pop();
                return { ...pokemon, id: pokemonId };
              })
            };

            commit("UPDATE_POKEMON_DATA", data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    GET_INDIVIDUAL_POKEMON_DATA({ commit }, pokemon) {
      let url = Api.pokemons.getPokemon.replace("{pokemonName}", pokemon.name);
      Axios.get(url)
        .then(response => {
          if (response.status === 200) {
            commit("UPDATE_INDIVIDUAL_POKEMON_DATA", response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    DELETE_INDIVIDUAL_POKEMON_DATA({ commit }) {
      commit("DELETE_INDIVIDUAL_POKEMON_DATA");
    },
    UPDATE_POKEMON_MODAL_VISIBILITY({ commit }, payload) {
      commit("UPDATE_POKEMON_MODAL_VISIBILITY", payload);
    }
  }
};
