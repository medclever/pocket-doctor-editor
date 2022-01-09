const ImageEntity = require('../entity/ImageEntity')

let sqlBase =
  'SELECT *, i.id as image_id FROM image i ' +
  'LEFT JOIN image_lang iml ON iml.image_id = i.id ';

module.exports = class ImageRepository {
  constructor(db, langID) {
    this.db = db;
    this.langID = langID;
  }

  parseRow(row) {
    let imageFile = row.file_lang.trim().length > 0 ? row.file_lang : row.file;
    return new ImageEntity(row.image_id, row.lang_id, row.name, imageFile);
  }

  /**
   * @returns {Promise<ImageEntity>}
   */
  async loadAll() {
    let query = sqlBase;

    const rows = await this.db.all(query);
    let images = rows.map(row => {
      const image = this.parseRow(row)
      // TODO;
      image.width = 100;
      image.height = 100;
      return image;
    });

    return images;
  }

  /**
   * @param {number} id
   * @returns {Promise<ImageEntity>}
   */
  async loadByID(id) {
    let query =
      sqlBase + 
      'WHERE i.id=' + id + 
      ' AND lang_id = ' + this.langID;

    const row = await this.db.get(query);
    let image = this.parseRow(row);
    // TODO;
    image.width = 100;
    image.height = 100;

    return image;
  }

  async loadByIDs(ids) {
    return Promise.all(ids.map((id) => this.loadByID(id)));
  }
}
