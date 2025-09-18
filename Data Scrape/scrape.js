const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const urls = [];

// Read URLs from input.csv
fs.createReadStream("input.csv")
  .pipe(csv())
  .on("data", (row) => {
    if (row.URL) urls.push(row.URL.trim());
  })
  .on("end", async () => {
    console.log(`🔍 Found ${urls.length} URLs. Starting scrape...`);

    const csvWriter = createCsvWriter({
      path: "products.csv",
      header: [
        { id: "url", title: "URL" },
        { id: "title", title: "Title" },
        { id: "price", title: "Price" },
        { id: "specs", title: "Specs" },
        { id: "description", title: "Description" },
        { id: "categories", title: "Categories" },
      ],
    });

    const results = [];

    for (const url of urls) {
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Title
        const title = $("title").text().trim() || "N/A";

        // Price
        const price =
          $(".price .woocommerce-Price-amount bdi")
            .text()
            .replace(/\s+/g, "") || "N/A";

        // Specs (bullet points)
        const specs =
          $(".product-description-txt li")
            .map((i, el) => "• " + $(el).text().trim())
            .get()
            .join("\n") || "N/A";

        // Description
        const description =
          $(".woocommerce-product-details__short-description.test p")
            .text()
            .trim() || "empty:";

        // Categories from embedded JS
        const categoryMatch = data.match(/"category":\s*\[(.*?)\]/);
        let categories = "N/A";
        if (categoryMatch && categoryMatch[1]) {
          categories = categoryMatch[1]
            .split(",")
            .map((cat) => cat.replace(/["']/g, "").trim())
            .join(", ");
        }

        results.push({ url, title, price, specs, description, categories });
        console.log(`✅ Scraped: ${url}`);
      } catch (err) {
        console.error(`❌ Failed: ${url}`, err.message);
        results.push({
          url,
          title: "error",
          price: "",
          specs: "",
          description: "",
          categories: "",
        });
      }
    }

    await csvWriter.writeRecords(results);
    console.log("🎉 Scraping complete. Data saved to products.csv");
  });
