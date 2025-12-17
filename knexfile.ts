export default {
    client: "better-sqlite3",
    connection: {
        filename: "./src/database/database.db"
    },
    pool: {
        afterCreate: (connection: any, done: any) => {
            try {
                if (typeof connection.exec === 'function') {
                    connection.exec('PRAGMA foreign_keys = ON')
                } else if (typeof connection.pragma === 'function') {
                    connection.pragma('foreign_keys = ON')
                } else {
                    connection.prepare('PRAGMA foreign_keys = ON').run()
                }
            } catch (_) {}
            done()
        }
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory:  "./src/database/migrations"
    },
    seeds: {
        extensions: "ts",
        directory: "./src/database/seeds",
    },
}