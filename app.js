const express = require('express');
const axios = require('axios');
const app = express();
const cheerio = require('cheerio');
const port = 3000;
const pretty = require('pretty');
const puppeteer = require('puppeteer');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

// Hashtag analytics route
app.get('/hashtags/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;

    // Fetch HTML content from a website (replace URL with actual URL)
    const url = `https://www.tiktok.com/search?q=${keyword}`;
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to a URL
    await page.goto(url);

    // Wait for the content to load (you can adjust the wait time as needed)
    await page.waitForTimeout(3000);

    // Get the page's source code
    const pageSource = await page.content();
    // Load the HTML content into cheerio
    const soup = cheerio.load(pageSource);

    // Select all elements with class "tiktok-1soki6-DivItemContainerForSearch.e19c29qe11"
    const elements = soup('.tiktok-1soki6-DivItemContainerForSearch.e19c29qe11');
    const info = [];

    elements.each((index, element) => {
      const tag = soup(element).find('.tiktok-9w77y5-DivContainer.ejg0rhn0').text();
      const views = soup(element).find('.tiktok-ws4x78-StrongVideoCount.etrd4pu10').text();
      const user_id = soup(element).find('.tiktok-2zn17v-PUniqueId.etrd4pu6').text()
      info.push({
        'tag': tag,
        'views': views,
        'user': user_id 
      });
    });
  
    console.log(info);

    await browser.close();
    
    // Send the info as JSON response
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching HTML content');
  }
});

// Fetch HTML function
async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching HTML:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
