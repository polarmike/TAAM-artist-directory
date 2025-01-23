import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '66a51b9eab07bc7970dbfa3e';

async function fetchWebflowData() {
  console.log('Token:', WEBFLOW_API_TOKEN ? 'Present' : 'Missing');
  
  const response = await fetch(
    `https://api.webflow.com/collections/${COLLECTION_ID}/items`,
    {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'accept-version': '1.0.0'
      }
    }
  );
  
  console.log('Response status:', response.status);
  const data = await response.json();
  console.log('API Response:', JSON.stringify(data, null, 2));
  
  if (!data.items) {
    throw new Error(`No items in response: ${JSON.stringify(data)}`);
  }

  const processedData = data.items.map(item => ({
    realName: item.RealName,
    artistName: item.ArtistName,
    profileImage: item.ProfileImage,
    isGoldenTicket: item.isGoldenTicket,
    isFeaturedArtist: item.isFeaturedArtist, 
    isTakeoverArtist: item.isTakeoverArtist,
    url: item.CustomLandingPage || item.Slug
  }));

  writeFileSync('data.json', JSON.stringify(processedData, null, 2));
}

fetchWebflowData().catch(console.error);
