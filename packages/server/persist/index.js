const mergeSources = () => {
  const result = {};
  for (const [aggName, configMap] of Object.entries(require('./resources'))) {
    for (const [sourceName, config] of Object.entries(configMap)) {
      if (result[sourceName] !== undefined) throw new Error(`Дублирование настройки записи для source "${sourceName}" агрегата "${aggName}"`);
      result[sourceName] = config;
    }
  }
  return result;
};

module.exports = {
  sourceMapConfig: mergeSources(),
  persistState: require('./persistState').persistState,
}
