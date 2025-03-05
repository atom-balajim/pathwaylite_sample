export const post = async (url, body, headers, isRaw) => {
  console.log('BaseService URL:', url); // Log the URL
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
        // Log the error response body for debugging
        throw new Error(`HTTP error! status: ${response.status}`);
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