import fs from 'fs';
import https from 'https';

const queries = [
  "Zenith Defy Revival A3643 watch photo",
  "Panerai Luminor Marina Bronzo PAM01678 watch",
  "Ressence Type 3 Marc Newson TYPE 3 MN watch",
  "Panerai Radiomir Platinumtech PAM01730 watch",
  "Panerai Radiomir California PAM01729 watch"
];

(async () => {
  for (let i = 0; i < queries.length; i++) {
    const q = encodeURIComponent(queries[i]);
    const url = `https://html.duckduckgo.com/html/?q=${q}&t=h_&iar=images&iax=images&ia=images`;
    console.log(`Searching for ${queries[i]}...`);
    
    try {
      const html = await new Promise((resolve, reject) => {
        https.get(url, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        }, res => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(data));
          res.on('error', reject);
        });
      });

      // Extract image URL using regex
      const match = html.match(/class="image_empty_bg" src="([^"]+)"/);
      if (match && match[1]) {
        let imgUrl = match[1];
        if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
        console.log(`Found image: ${imgUrl}`);
        
        await new Promise(resolve => {
          https.get(imgUrl, res => {
            const file = fs.createWriteStream(`src/assets/watches/watch${i+1}.jpg`);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
          });
        });
      } else {
        console.log(`No image found for ${queries[i]}`);
      }
    } catch (err) {
      console.log(`Error on ${queries[i]}: ${err.message}`);
    }
  }
})();
