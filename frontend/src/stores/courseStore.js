import { defineStore } from 'pinia';
import { fetchCourses } from '../services/courseService';

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
  }),
  actions: {
    async loadCourses() {
      const courses = await fetchCourses();
      this.courses = courses;
    },
  },
});