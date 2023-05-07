const { state, stateList } = require('@be-true/stater');
const { BaseAggregate } = require('../base');

class Article extends BaseAggregate {
    #data;
    #langParts;

    static create({ data, langParts }) {
        return new Article(data, langParts).asNew();
    }

    constructor(data, langParts) {
        super();
        this.#data = data;
        this.#langParts = langParts;

        this.stateData = state(data).source('article');
        this.stateLangParts = stateList(langParts).source('article_lang');
        this._setState(this.stateData, this.stateLangParts);
    }

    update({ data, langParts }) {
        this.stateData.mset(data);
        for (const langData of langParts) {
            const lang = this.stateLangParts.find(i => i.get('lang_id') === langData.lang_id);
            if (lang) lang.mset(langData);
        }
        return this;
    }

    presentToList(langID) {
        const lang = this.#langParts.find(i => i.lang_id === langID);
        const position = this.#data.position > 0 ? this.#data.position : undefined;
        return {
            id: this.#data.id,
            position,
            title: lang.title,
        };
    }

    presentToItem(langID) {
        const lang = this.#langParts.find(i => i.lang_id === langID);
        const position = this.#data.position > 0 ? this.#data.position : undefined;
        return {
            id: this.#data.id,
            position,
            title: lang.title,
            necessary: lang.necessary,
            possible: lang.possible,
            must_not: lang.must_not,
            important: lang.important,
            text: lang.text,
        };
    }
}

module.exports = {
    Article
}