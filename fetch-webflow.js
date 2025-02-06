import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '66a51b9eab07bc7970dbfa3e';

async function fetchWebflowData() {
  try {
    let allItems = [];
    let offset = 0;
    const limit = 100;  // Maximum items per request
    
    // Keep fetching until we get all items
    while (true) {
      const response = await fetch(
        `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?offset=${offset}&limit=${limit}`, 
        {
          headers: {
            'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`
          }
        }
      );
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        break; // Exit if no more items
      }
      
      const processedItems = data.items.map(item => ({
        realName: item.fieldData.realname,
        artistName: item.fieldData.artistname,
        profileImage: item.fieldData.profileimg,
        isGoldenTicket: item.fieldData.isgoldenticket,
        isFeaturedArtist: item.fieldData.isfeatureartis,
        isTakeoverArtist: item.fieldData.istakeoverartist,
        url: item.fieldData.customlandingpage || item.fieldData.slug
      }));
      
      allItems = [...allItems, ...processedItems];
      offset += limit;
      
      // Optional: Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`Total items fetched: ${allItems.length}`);
    writeFileSync('data.json', JSON.stringify(allItems, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchWebflowData();
