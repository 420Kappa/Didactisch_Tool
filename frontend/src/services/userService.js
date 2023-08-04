import { myAxios } from '../instances/myAxios';

export async function fetchUsers() {
  try {
    const response = await myAxios.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}