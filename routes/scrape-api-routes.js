var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/getNews", function (req, res) {
        db.News.findAll().then(function (dbNews) {
            console.log("news")
            res.json(dbNews);
        });
    });

    app.delete("/api/deleteNews/:id", function (req, res) {
        db.News.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbEvent) {
            res.json(dbEvent);
        });
    });

    app.get("/api/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.tabletopgamingnews.com/tag/board-games").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            // $("article h2").each(function(i, elem  ent) {
            $(".type-post").each(function (i, element) {

                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children(".entry-header")
                    .children(".entry-title")
                    .children("a")
                    .text();
                result.summary = $(this)
                    .children(".entry-content")
                    .children("p")
                    .text();
                result.image = $(this)
                    .children(".post-thumbnail")
                    .children("a")
                    .children("img")
                    .attr("src");
                result.link = $(this)
                    .children(".entry-content")
                    .children("a")
                    .attr("href");
                // console.log(result.summary);
                // Create a new Article using the `result` object built from scraping
                db.News.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                        //   return(res.json);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });

            // Send a message to the client
            res.send("Scrape Complete");
        });
    });
}