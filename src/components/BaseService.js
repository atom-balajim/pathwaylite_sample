// src/components/BaseService.js
export const post = async (url, body, headers, isRaw) => {
  console.log('BaseService URL:', url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error text
      console.error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    if (isRaw) {
      const data = await response.json();
      return { data };
    }

    return response;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
};

export const get = async (url, headers) => {
  console.log('BaseService URL:', url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during GET request:', error);
    throw error;
  }
};

export const put = async (url, body, headers) => {
  console.log('BaseService URL:', url);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during PUT request:', error);
    throw error;
  }
};

export const del = async (url, headers) => {
  console.log('BaseService URL:', url);
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Error during DELETE request:', error);
    throw error;
  }
};