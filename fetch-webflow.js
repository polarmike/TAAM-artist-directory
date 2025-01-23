import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '66a51b9eab07bc7970dbfa3e';

async function fetchWebflowData() {
  try {
    console.log('Using token:', WEBFLOW_API_TOKEN.slice(0, 5) + '...');
    
    const response = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`
      }
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchWebflowData();
