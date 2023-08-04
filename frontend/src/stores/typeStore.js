import { defineStore } from 'pinia';
import { fetchTypes } from '../services/typeService';

export const useTypeStore = defineStore('type', {
  state: () => ({
    types: [],
  }),
  actions: {
    async loadTypes() {
      const types = await fetchTypes();
      this.types = types;
    },
  },
});