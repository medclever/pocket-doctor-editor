const articleSourceMap = {
  article: {
    table: { name: 'article', pk: 'id' },
    columns: {
      id: ['number'],
      image_id: ['number', true],
      position: ['number', true],
      code: ['string', true],
      is_free: ['boolean', true],
    },
  },
  article_lang: {
    table: { name: 'article_lang', pk: 'id' },
    columns: {
      id: ['number'],
      article_id: ['number'],
      lang_id: ['number'],
      title: ['string', true],
      necessary: ['string', true],
      possible: ['string', true],
      must_not: ['string', true],
      important: ['string', true],
      text: ['string', true],
      active: ['boolean', true],
    },
  },
};

module.exports = {
  articleSourceMap
}
