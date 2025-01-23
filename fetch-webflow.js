import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '66a51b9eab07bc7970dbfa3e';

async function fetchWebflowData() {
  try {
    const response = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`
      }
    });
    
    const data = await response.json();
    console.log('First item fieldData:', data.items[0].fieldData);
    
    const processedData = data.items.map(item => {
      console.log('Processing item:', item.fieldData);
      return {
        realName: item.fieldData.RealName,
        artistName: item.fieldData.ArtistName,
        profileImage: item.fieldData.ProfileImage,
        isGoldenTicket: item.fieldData.isGoldenTicket,
        isFeaturedArtist: item.fieldData.isFeaturedArtist, 
        isTakeoverArtist: item.fieldData.isTakeoverArtist,
        url: item.fieldData.CustomLandingPage || item.fieldData.Slug
      };
    });

    writeFileSync('data.json', JSON.stringify(processedData, null, 2));
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchWebflowData();
