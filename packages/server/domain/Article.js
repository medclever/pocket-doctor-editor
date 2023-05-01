const { state, stateList } = require('@be-true/stater');
const { BaseAggregate } = require('../base');

class Article extends BaseAggregate {
    #data;
    #langParts;

    constructor(data, langParts) {
        super();
        this.#data = data;
        this.#langParts = langParts;

        this.state = state(data).source('article');
        this.stateLangParts = stateList(langParts).source('article_lang');
        this._setState(this.state, this.stateLangParts);
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