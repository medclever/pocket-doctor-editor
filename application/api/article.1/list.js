({
  access: 'public',
  async method() {
    const sql =
    'SELECT a.id as article_id, a.*, al.*, im.file as image_file FROM article a ' +
    'LEFT JOIN article_lang al ON al.article_id = a.id ' +
    'LEFT JOIN image im ON im.id = a.image_id ' +
    'WHERE al.lang_id = 1 ORDER BY a.position ASC';

    const { rows } = await db.pg.query(sql)
    return { data: rows };
  },
});
