import { myAxios } from '../instances/myAxios';

export async function fetchCourses() {
  try {
    const response = await myAxios.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}