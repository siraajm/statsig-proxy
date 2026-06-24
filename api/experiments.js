export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.STATSIG_API_KEY;
  const { page = 1, limit = 100 } = req.query;

  try {
    const response = await fetch(
      `https://statsigapi.net/console/v1/experiments?limit=${limit}&page=${page}`,
      {
        headers: {
          'STATSIG-API-KEY': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
