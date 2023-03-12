class Article {
    #data;
    #langParts;

    constructor(data, landParts) {
        this.#data = data;
        this.#langParts = landParts;
    }

    presentToList(langID) {
        const lang = this.#langParts.find(i => i.lang_id === langID);
        return {
            id: this.#data.id,
            position: this.#data.position,
            title: lang.title,
        };
    }

    presentToItem() { }
}

module.exports = {
    Article
}