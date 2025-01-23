import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function fetchWebflowData() {
  // First get site ID
  const sitesResponse = await fetch('https://api.webflow.com/sites', {
    headers: {
      'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
      'accept-version': '1.0.0'
    }
  });
  
  console.log('Sites Response:', await sitesResponse.json());
}

fetchWebflowData().catch(console.error);
