import { BACKEND_URL } from '../config.json';

export const FetchAPI = async (path, method, body = '', token = '') => {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body),
    });

    // Build response object for component to handle
    const response = {
      status: res.status,
      data: '',
    }
    const data = await res.json();
    response.data = data;
    return response;
  } catch (e) {
    console.error(`Network error: ${e}`);
  }
}
