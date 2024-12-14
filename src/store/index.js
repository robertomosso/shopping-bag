import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    loadBag(state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem(
        "productsInBag",
        JSON.stringify(state.productsInBag)
      );
    },
    removeFromBag(state, productId) {
      state.productsInBag = state.productsInBag.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem(
        "productsInBag",
        JSON.stringify(state.productsInBag)
      );
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        const data = response.data.map((el) => {
          return { ...el, quantity: 0 };
        });
        commit("loadProducts", data);
      });
    },
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit("loadBag", JSON.parse(localStorage.getItem("productsInBag")));
      }
    },
    addToBag({ commit }, product) {
      commit("addToBag", product);
    },
    removeFromBag({ commit }, productId) {
      if (confirm("Are you sure?")) {
        commit("removeFromBag", productId);
      }
    },
  },
  modules: {},
});
