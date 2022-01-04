const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const FILE_NAME = '/db/mood_picture.db';

const CREATE_COMMAND_CAPTURE_SESSION = "CREATE TABLE IF NOT EXISTS CAPTURE_SESSION ( "+
                            "ID TEXT PRIMARY KEY, "+
                            "START_TIME TEXT, "+
                            "END_TIME TEXT, "+
                            "STRESS NUMERIC "+
                        ") ";

const CREATE_COMMAND_AMPLITUDE_READING = "CREATE TABLE IF NOT EXISTS AMPLITUDE_READING ( "+
                            "CAPTURE_SESSION_ID TEXT, "+
                            "MAX_AMPLITUDE INTEGER, "+
                            "AVG_AMPLITUDE INTEGER, "+
                            "FOREIGN KEY(CAPTURE_SESSION_ID) REFERENCES CAPTURE_SESSION(ID) "+
                        ") ";

module.exports = {
    getDatabase: function() {
        return new sqlite3.Database(FILE_NAME, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the Mood Picture database.');
        });
    },
    createDatabaseIfNotExists: function() {
        !fs.existsSync('/db/') && fs.mkdirSync('/db/', { recursive: true });

        let db = new sqlite3.Database(FILE_NAME, (err) => {
            if (err) {
                return console.error("ERROR CREATING DATABASE: "+err.stack);
            }

            db.run(CREATE_COMMAND_CAPTURE_SESSION);

            db.run(CREATE_COMMAND_AMPLITUDE_READING, (err) => {
                console.log('Database created!!!');
                if (err) {
                    return console.error("ERROR CREATING DATABASE: "+err.stack);
                }

                db.close();

                console.log('Connected to the Mood Picture database.');
            });
        });
    }
};