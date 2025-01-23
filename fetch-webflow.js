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
    
    const processedData = data.items.map(item => ({
      realName: item.fieldData.realname,
      artistName: item.fieldData.artistname,
      profileImage: item.fieldData.profileimg,
      isGoldenTicket: item.fieldData.isgoldenticket,
      isFeaturedArtist: item.fieldData.isfeatureartis,
      isTakeoverArtist: item.fieldData.istakeoverartist,
      url: item.fieldData.customlandingpage || item.fieldData.slug
    }));

    writeFileSync('data.json', JSON.stringify(processedData, null, 2));
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchWebflowData();
