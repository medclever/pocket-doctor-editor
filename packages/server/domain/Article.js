class Article {
    #data;
    #langParts;

    constructor(data, landParts) {
        this.#data = data;
        this.#langParts = landParts;
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