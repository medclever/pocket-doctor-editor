const cheerio = require('cheerio');
var uuid = require('uuid');

let propsText = [
  'text',
  'necessary',
  'possible',
  'must_not',
  'important',
];

module.exports = async function prepareTextAsParts(article, repoArticle, repoImage) {
    const promises = propsText.map((prop) => {
        return prepareSplitAsList(article.data[prop], repoArticle, repoImage)
        .then(function (parts) {
            let data = {};
            data.title = prop;
            data.parts = parts;

            return {
                type: 'group',
                data: data,
            };
        });
    });

    const parts = await Promise.all(promises);

    return {
        title: article.data.title,
        parts
    }
};


async function prepareSplitAsList(text, repoArticle, repoImage) {
    if (text.trim().length === 0) {
        return Promise.resolve([]);
    }

    const $ = cheerio.load(text, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: false,
    });
    let galleries = {};

    return Promise.resolve()
        .then(() => {
            // Заменяем ссылки на реальные тексты
            let links = $('[data-link-id]').map(async function () {
                let $link = $(this);
                let linkId = $link.attr('data-link-id');
                return repoArticle.loadByID(linkId).then((article) => {
                    $link
                    .find('[data-link-position]')
                    .replaceWith('' + article.data.position);
                    $link.find('[data-link-name]').replaceWith(article.data.title);
                    $link.replaceWith(
                        `<a href="/article/${article.data.id}" data-link-id="${
                            article.data.id
                        }">${$link.text()}</a>`,
                    );
                });
            }).get();

            return Promise.all(links);
        })
        .then(() => {
            // Выдираем галерии и получаем список изображений
            $('.gallery-items').map(function () {
                let key = 'gallery_' + uuid.v4();
                let data = {};
                data.images = $(this)
                    .find('[data-image-id]')
                    .map(function () {
                        return $(this).attr('data-image-id');
                    })
                    .get();
                galleries[key] = data;
                $(this).replaceWith(key);
            });

            return galleries;
        })
        .then((galleries) => {
            // Загружаем данные о изображениях из списков
            let pImages = [];
            for (key in galleries) {
                ((key) => {
                pImages.push(
                    repoImage.loadByIDs(galleries[key].images).then((images) => {
                    galleries[key] = images;
                    }),
                );
                })(key);
            }

            return Promise.all(pImages);
        })
        .then(() => {
            // разбиваем по строкам
            text = $.html();
            return text.split(/\r?\n/);
        })
        .then((lines) => {
            // Устанавливаем тип компонента
            let pLines = lines.map((line) => {
                if (/^(gallery_).*/i.test(line)) {
                    return Promise.resolve({
                            type: 'gallery',
                            data: {
                            images: galleries[line],
                        },
                    });
                }
                if (/<[a-z][\s\S]*>/i.test(line)) {
                    return Promise.resolve({
                            type: 'html',
                            data: {
                            content: '<div>' + line + '</div>',
                        },
                    });
                } else {
                    return Promise.resolve({
                            type: 'text',
                            data: {
                            content: line,
                        },
                    });
                }
            });

            return Promise.all(pLines);
        });
}

