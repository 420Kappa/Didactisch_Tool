import { myAxios } from '../instances/myAxios';

export async function fetchTypes() {
  try {
    const response = await myAxios.get('/lessongoals/types');
    return response.data;
  } catch (error) {
    console.error('Error fetching types:', error);
    return [];
  }
}