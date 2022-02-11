const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');
const ArticleRepository = require('./repo/ArticleRepository');
const prepareTextAsParts = require('./prepareTextAsParts');
const ImageRepository = require('./repo/ImageRepository');

(async () => {
    const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    })

    // const exportRoot = path.join(__dirname, '../../pocket-doctor/export');
    const exportRoot = '/Users/eugen/Projects/PocketDoctorUniversal/app/export';
    const langs = [{ code: 'ru', langId: 1 }, { code: 'en', langId: 2 }];
    let articleAll = []
    let imageAll = []
    const menuAll = {};
    for (const lang of langs) {
      const repoArticle = new ArticleRepository(db, lang.langId);
      const repoImage = new ImageRepository(db, lang.langId);

      const articles = await repoArticle.loadForMenu(false);

      // save article item
      const partsPromises = [];
      for (const article of articles) {
        partsPromises.push(prepareTextAsParts(article, repoArticle, repoImage))
      }
      const data = await Promise.all(partsPromises);
      let i = 0;
      for (const article of articles) {
        const dataJSON = {
          id: article.data.id,
          code: article.data.code,
          image_id: article.data.image_id,
          langCode: lang.code,
          data: data[i++],
        }
        fs.writeFileSync(`${exportRoot}/data/article_${article.data.id}_${lang.code}.json`, JSON.stringify(dataJSON));
        articleAll.push(`    require("./data/article_${article.data.id}_${lang.code}.json"),`);
      }
      
      menuAll[lang.code] = articles.map((a, index) => ({
        id: a.data.id,
        title: a.data.title,
        image_id: a.data.image_id,
        position: a.data.code === 'about' ? '' : String(index - 1),
      }));

      const images = await repoImage.loadAll();
      for (const image of images) {
        const dataJSON = {
          id: image.id,
          lang_id: lang.langId,
          name: image.name,
          file: 'asset:/images/' + image.file,
          width: 100,
          height: 100,
        }
        fs.writeFileSync(`${exportRoot}/data/image_${image.id}_${lang.code}.json`, JSON.stringify(dataJSON));
        imageAll.push(`    require("./data/image_${image.id}_${lang.code}.json"),`);
      }
    }

    // save all articles index
    let indexFile = 
      `export type ArticleData = { \n` +
      `    id: number, \n` +
      `    code: string, \n` +
      `    langCode: 'ru' | 'en', \n` +
      `    image_id: number, \n` +
      `    data: { title: string } \n` +
      `} \n` +
      `export const articles: ArticleData[] = [` + '\n' +
        articleAll.sort((a, b) => {
          const [, a1] = a.match(/article_(\d+)/);
          const [, b1] = b.match(/article_(\d+)/);
          return parseInt(a1) > parseInt(b1) ? 1 : -1
        }).join('\n') + '\n' +
      `];`
    fs.writeFileSync(`${exportRoot}/articles.ts`, indexFile);

    // save menu.json
    fs.writeFileSync(`${exportRoot}/data/menu.json`, JSON.stringify(menuAll));
    let menuFile = 
    `export type MenuLangKey = 'ru' | 'en'; \n` +
    `export type MenuItem = { \n` +
    `    id: number, \n` +
    `    title: string, \n` +
    `    image: string, \n` +
    `    position: number, \n` +
    `    is_free: boolean, \n` +
    `    is_locked: boolean, \n` +
    `    active: boolean, \n` +
    `} \n` +
    `export const menu: {[key in MenuLangKey]: MenuItem[]} = require("./data/menu.json"); \n`;
    fs.writeFileSync(`${exportRoot}/menu.ts`, menuFile);
      
    // images.ts
    let imageFile = 
    `export type ImageData = { \n` +
    `    id: number, \n` +
    `    lang_id: number, \n` +
    `    name: boolean, \n` +
    `    file: string, \n` +
    `    width: string, \n` +
    `    height: number, \n` +
    `} \n` +
    `export const images: ImageData[] = [` + '\n' +
        imageAll.join('\n') + '\n' +
    `];`
    fs.writeFileSync(`${exportRoot}/images.ts`, imageFile);
})()