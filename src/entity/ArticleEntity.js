module.exports = class ArticleEntity {
  constructor(data) {
    this.data = data;
  }

  getTitleWithPosition() {
    return this.data.code === 'about'
      ? this.data.title
      : `${this.data.position}. ${this.data.title}`;
  }
}
