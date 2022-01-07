module.exports = class ImageEntity {
  constructor(id,lang_id,name,file,width,height) {
    this.id = id;
    this.lang_id = lang_id;
    this.name = name;
    this.file = file;
    this.width = width;
    this.height = height;
  }
}
