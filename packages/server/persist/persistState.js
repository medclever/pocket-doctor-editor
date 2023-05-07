const { resources } = require('./resources');
const { insert, ParamsEmptyCollector, update, deleteHard } = require('@be-true/sqlk');

const persistState = async (state, settings, sqlite) => {
  const run = async (sqlite, actions) => {
    for (const batch of state.getChangesBatch({ size: settings.batch, actions })) {
      const queries = [];
      const collector = new ParamsEmptyCollector();

      for (const change of batch) {
        const toStorage = {
          ...resources[change.source],
          params: change.params,
          collector,
        };

        let query = ({
          'create': () => insert(toStorage),
          'update': () => update(toStorage),
          'delete': () => deleteHard(toStorage),
        })[change.action]();

        queries.push(query);
      }

      if (queries.length) {
        await sqlite.exec(queries.join(";\n") + ";", collector.getParams());
      }
    }
  };

  await run(sqlite, ['create']);
  await run(sqlite, ['update']);
  await run(sqlite, ['delete']);
};

module.exports = {
  persistState
}

