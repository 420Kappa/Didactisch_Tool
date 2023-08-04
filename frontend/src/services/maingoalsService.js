import { myAxios } from '../instances/myAxios';

export async function fetchMaingoals() {
  try {
    const response = await myAxios.get('/maingoals');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}