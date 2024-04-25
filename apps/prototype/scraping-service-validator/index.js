const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const CONFIG = {
  apiKey: 'API-KEY',
  baseUrl: 'https://www.submarino.com.br/busca/notebook?',
  fileName: 'submarino.txt',
  selector: 'h3.product-name',
  numberOfRequests: 10,
  excludedKeywords: ['Samsung', 'Windows', 'Dell', 'Lenovo', 'Positivo', 'Core', 'Asus', 'Notebook'],
};

let stats = {
  successCount: 0,
  failureCount: 0,
};

async function fetchHtml(url) {
  const queryUrl = `https://api.crawlbase.com/?token=${CONFIG.apiKey}&url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(queryUrl);
    if (response.status === 200) {
      stats.successCount++;
      return response.data;
    }
  } catch (error) {
    console.error('Falha na requisição:', error.message);
    stats.failureCount++;
  }
}

function scrapeTagFromHtml(html) {
  const $ = cheerio.load(html);
  const nodes = $(CONFIG.selector);
  return nodes
    .map((_, el) => $(el).text())
    .get()
    .join(', ');
}

function checkContent(tagContent) {
  return CONFIG.excludedKeywords.some((keyword) => tagContent.includes(keyword));
}

function logContent(i, tagContent) {
  console.log(`${i} - ${tagContent.substring(0, 100)}`);
}

function writeReport() {
  const report = `Total de requisições: ${CONFIG.numberOfRequests}\nRequisições completadas com sucesso: ${stats.successCount}\nRequisições com falha: ${stats.failureCount}`;
  fs.writeFileSync(CONFIG.fileName, report);
  console.log('Relatório gerado.');
}

async function performScrapes() {
  for (let i = 0; i < CONFIG.numberOfRequests; i++) {
    const html = await fetchHtml(CONFIG.baseUrl);

    if (html) {
      const tagContent = scrapeTagFromHtml(html);
      if (!checkContent(tagContent)) {
        stats.successCount--;
        stats.failureCount++;
      } else {
        logContent(i, tagContent);
      }
    }
  }

  writeReport();
}

performScrapes();
