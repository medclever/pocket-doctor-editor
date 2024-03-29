const { compose } = require('@be-true/stater');

class BaseAggregate {
    state;

    asNew() {
        this._assertState(this.state);
        this.state.asNew();
        return this;
    }

    getChanges() {
        this._assertState(this.state);
        return this.state.getChanges();
    }

    getState() {
        this._assertState(this.state);
        return this.state;
    }

    getChangesBatch(size = 100) {
        this._assertState(this.state);
        return this.state.getChangesBatch({ size });
    }

    _setState(...states) {
        this.state = compose(...states);
        return this;
    }

    _assertState(value) {
        if (this.state === undefined) throw new Error('Необходимо указать состояние для агрегата вызвав метод setState()');
    }
}

module.exports = {
    BaseAggregate
}