import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '66a51b9eab07bc7970dbfa3e';

async function fetchWebflowData() {
  try {
    const url = `https://api.webflow.com/collections/${COLLECTION_ID}/items?limit=100`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'accept-version': '1.0.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data received:', data);

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
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

fetchWebflowData();
