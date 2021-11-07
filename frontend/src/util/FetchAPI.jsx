import { BACKEND_URL } from '../config.json';

export const FetchAPI = async (path, method, body = '', token = '') => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BACKEND_URL}${path}`, options);

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
