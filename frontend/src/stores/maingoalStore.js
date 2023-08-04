import { defineStore } from 'pinia';
import { fetchMaingoals } from '../services/maingoalsService';

export const useMaingoalStore = defineStore('maingoal', {
  state: () => ({
    maingoals: [],
  }),
  actions: {
    async loadMaingoals() {
      const maingoals = await fetchMaingoals();
      this.maingoals = maingoals;
    },
  },
});