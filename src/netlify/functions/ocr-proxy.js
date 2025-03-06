const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { user, key, service, target, age } = JSON.parse(event.body);

  try {
    const response = await fetch('https://api.idresponse.com/process/comprehensive/gateway', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers here
      },
      body: JSON.stringify({
        user,
        key,
        service,
        target,
        age,
      }),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};