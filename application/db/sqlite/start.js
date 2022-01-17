async () => {
    if (application.worker.id === 'W1') {
      console.debug('Connect to sqlite');
    }

    const client = await npm.sqlite.open({
        filename: 'database.db',
        driver: npm.sqlite3.Database
    })
    
    db.sqlite.client = client;
  };