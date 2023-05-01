const { compose } = require('@be-true/stater');
const { toArray } = require('@be-true/utils');

class BaseRepository {
    _sqlite;

    constructor({ sqlite }) {
        this._sqlite = sqlite;
    }

    async persist(agg) {
        return this.persistAgg(agg, { batch: 100 });
    }

    async persistAgg(agg, settings) {
        if (!agg) return;
        const aggs = toArray(agg);
        if (!aggs.length) return;
        const aggsResult = aggs.filter((i) => i !== undefined);
        const state = compose(...aggsResult.map((i) => i.getState()));
        await persistState(state, settings);
    }
}

module.exports = {
    BaseRepository
}