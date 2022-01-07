const sqlite3 = require('sqlite3');
const fs = require('fs');
const { open } = require('sqlite');
const ArticleRepository = require('./src/repo/ArticleRepository');
const prepareTextAsParts = require('./src/prepareTextAsParts');
const ImageRepository = require('./src/repo/ImageRepository');

(async () => {
    const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    })

    const repoArticle = new ArticleRepository(db, 1);
    const repoImage = new ImageRepository(db, 1);

    const articles = await Promise.all([
      repoArticle.loadByID(1),
      repoArticle.loadByID(2),
      repoArticle.loadByID(3),
    ]);

    const partsPromises = [];
    for (const article of articles) {
      partsPromises.push(prepareTextAsParts(article, repoArticle, repoImage))
    }
    const data = await Promise.all(partsPromises);
    let i = 0;
    for (const article of articles) {
      fs.writeFileSync(`export/article_${article.data.id}.json`, JSON.stringify(data[i++]));
    }
    
    let indexFile = 
      `export const articles = [` + '\n' +
      articles.map(a => `    require("./article_${a.data.id}.json"),`).join('\n') + '\n' +
      `];`

    fs.writeFileSync("export/index.ts", indexFile);
})()