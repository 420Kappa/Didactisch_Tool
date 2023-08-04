import { defineStore } from 'pinia';
import { fetchUsers } from '../services/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async loadUsers() {
      const users = await fetchUsers();
      this.users = users;
    },
  },
});