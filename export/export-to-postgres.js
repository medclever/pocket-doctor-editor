const { Client } = require('pg');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

(async () => {
  const pg = new Client({
    user: 'user',
    host: 'localhost',
    database: 'pde',
    password: 'password',
    port: 5432,
  })
  pg.connect()

  const sqlite = await open({
    filename: './database.db',
    driver: sqlite3.Database
  })

  try {
    await pg.query('TRUNCATE TABLE public.lang CONTINUE IDENTITY CASCADE;');
    await pg.query('TRUNCATE TABLE public.image_lang CONTINUE IDENTITY CASCADE;');
    await pg.query('TRUNCATE TABLE public.image CONTINUE IDENTITY CASCADE;');
    await pg.query('TRUNCATE TABLE public.article_lang CONTINUE IDENTITY CASCADE;');
    await pg.query('TRUNCATE TABLE public.article CONTINUE IDENTITY CASCADE;');

    const langs = await sqlite.all('SELECT * FROM lang ORDER BY id ASC')
    for (const lang of langs) {
      await pg.query('INSERT INTO lang ("id", "code", "name", "is_default") VALUES ($1, $2, $3, $4)', [
        lang.id, lang.code, lang.name, lang.is_default
      ])
    }

    const images = await sqlite.all('SELECT * FROM image ORDER BY id ASC')
    const imagesLang = await sqlite.all('SELECT * FROM image_lang ORDER BY id ASC')
    for (const image of images) {
      await pg.query('INSERT INTO image ("id", "file", "image_type_id") VALUES ($1, $2, $3)', [
        image.id, image.file, image.image_type_id
      ])
    }  
    for (const imageLang of imagesLang) {
      await pg.query('INSERT INTO image_lang ("id", "image_id", "lang_id", "name", "file_lang") VALUES ($1, $2, $3, $4, $5)', [
        imageLang.id, imageLang.image_id, imageLang.lang_id, imageLang.name, imageLang.file_lang
      ])
    }

    const articles = await sqlite.all('SELECT * FROM article ORDER BY id ASC')
    const articlesLang = await sqlite.all('SELECT * FROM article_lang ORDER BY id ASC')
    for (const article of articles) {
      await pg.query('INSERT INTO article ("id", "image_id", "position", "code", "is_free") VALUES ($1, $2, $3, $4, $5)', [
        article.id, article.image_id, article.position, article.code, article.is_free
      ])
    }
    for (const articleLang of articlesLang) {
      const sql = 'INSERT INTO article_lang ("id", "article_id", "lang_id", "title", "necessary", "possible", "must_not", "important", "text", "active") ' +
                  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
      await pg.query(sql, [
        articleLang.id,
        articleLang.article_id, articleLang.lang_id, articleLang.title, 
        articleLang.necessary, articleLang.possible, articleLang.must_not, 
        articleLang.important, articleLang.text, articleLang.active, 
      ])
    }
  } catch (e) {
    console.error(e);
  } finally {
    pg.end()
    sqlite.close();
  }
})()