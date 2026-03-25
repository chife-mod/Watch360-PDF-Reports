const XLSX = require('xlsx');
const wb = XLSX.readFile('data/Watch360 _ Watch Media _ Dec 25 - Feb 26 _  Brands & Models.xlsx');
const sheetName = wb.SheetNames.find(n => n.includes('Top 25 Collections'));
const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
const collections = [];
for (let i = 3; i < rows.length && collections.length < 20; i++) {
  const row = rows[i];
  if (!row || !row[1]) break;
  collections.push({
    rank: collections.length + 1,
    collection: String(row[1]).trim(),
    brand: String(row[2]).trim(),
    articles: Number(row[3]) || 0,
  });
}
console.log(JSON.stringify(collections, null, 2));
