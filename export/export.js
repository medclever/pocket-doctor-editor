const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');
const { open } = require('sqlite');
const ArticleRepository = require('./repo/ArticleRepository');
const prepareTextAsParts = require('./prepareTextAsParts');
const ImageRepository = require('./repo/ImageRepository');

(async () => {
    const db = await open({
      filename: '../database.db',
      driver: sqlite3.Database
    })

    const repoArticle = new ArticleRepository(db, 1);
    const repoImage = new ImageRepository(db, 1);

    const exportRoot = path.join(__dirname, '../../pocket-doctor/export');
    const articles = await repoArticle.loadForMenu(false);

    // articles
    const partsPromises = [];
    for (const article of articles) {
      partsPromises.push(prepareTextAsParts(article, repoArticle, repoImage))
    }
    const data = await Promise.all(partsPromises);
    let i = 0;
    for (const article of articles) {
      fs.writeFileSync(`${exportRoot}/article_${article.data.id}.json`, JSON.stringify(data[i++]));
    }
    
    // menu.json
    let indexFile = 
      `export const articles = [` + '\n' +
      articles.map(a => `    require("./article_${a.data.id}.json"),`).join('\n') + '\n' +
      `];`

    fs.writeFileSync(`${exportRoot}/articles.ts`, indexFile);
    const menu = articles.map((a, index) => ({
      id: a.data.id,
      title: a.data.title,
      image_id: a.data.image_id,
      position: a.data.code === 'about' ? '' : String(index - 1),
    }));
    fs.writeFileSync(`${exportRoot}/menu.json`, JSON.stringify(menu));
    
    // images.ts
    const images = await repoImage.loadAll()
    let imageFile = `export const images: any = {` + '\n'
    for (const image of images) {
      imageFile += `    "${image.id}": {` + '\n'
      imageFile += `        file: require("../assets/images/${image.file}"),` + `\n`
      imageFile += `    },` + '\n'
    }
    imageFile += `};`
    fs.writeFileSync(`${exportRoot}/images.ts`, imageFile);
})()