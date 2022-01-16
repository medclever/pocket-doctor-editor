const ArticleEntity = require("../entity/ArticleEntity");

const articleSql =
  'SELECT a.id as article_id, a.*, al.*, im.file as image_file FROM article a' +
  ' LEFT JOIN article_lang al ON al.article_id = a.id' +
  ' LEFT JOIN image im ON im.id = a.image_id';

module.exports = class ArticleRepository {
  constructor(db, langID) {
    this.db = db;
    this.langID = langID;
  }

  parseRow(row) {
    var imageFile = '';

    let article = new ArticleEntity({
      id: row.article_id,
      lang_id: row.lang_id,
      code: row.code,
      position: row.position,
      is_free: row.is_free,
      is_locked: !row.is_free,
      image: imageFile,
      title: row.title,
      necessary: row.necessary,
      possible: row.possible,
      must_not: row.must_not,
      important: row.important,
      text: row.text,
      image_id: row.image_id,
    });

    return article;
  }

  async loadByID(id) {
    const query =
      articleSql +
      ' WHERE al.lang_id = ' +
      this.langID +
      ' AND a.id = ' +
      id
    ;

    const row = await this.db.get(query);
    let article = this.parseRow(row);

    return article;
  }

  async loadForMenu(free) {
    var query =
      articleSql + 
      ` WHERE al.lang_id = ${this.langID}` + 
      (free ? ' ORDER BY a.is_free DESC, a.position ASC'
           : ' ORDER BY a.position ASC');

    const rows = await this.db.all(query);
    return rows.map(row => this.parseRow(row));
  }
}
