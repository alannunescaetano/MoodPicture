let dbManager = require('./dbManager.js');

module.exports = {
    getSensorReadings: function(sessionId, readingsRetrieved) {
        getCaptureSession(sessionId, (sessionRow) => {
            let db = dbManager.getDatabase();

            let sql = 'SELECT rowid as Id, MAX_AMPLITUDE as MaxAmplitude, AVG_AMPLITUDE as AverageAmplitude '
                    +'FROM AMPLITUDE_READING '
                    +'WHERE CAPTURE_SESSION_ID = ?';

            db.all(sql, [sessionId], (err, rows) => {
                if (err) {
                    return console.error(err.message);
                }

                db.close();

                sessionRow.readings = rows;
                readingsRetrieved(sessionRow);
            });
        });
    },

    addReading: function(reading) {
        getCaptureSession(reading.sessionId, (sessionRow) => {
            if(sessionRow) {
                insertAmplitudeReading(reading);
            } else {
                insertCaptureSession(reading.sessionId, () => {
                    insertAmplitudeReading(reading);
                })
            }
        });
    },

    getAllSessions(sessionsRetrieved) {
        let db = dbManager.getDatabase();
    
        let sql = 'SELECT ID as Id, START_TIME as StarTime, STRESS as Stress '
                 +'FROM CAPTURE_SESSION ORDER BY START_TIME ';
    
        db.all(sql, (err, rows) => {
            if (err) {
                return console.error(err.message);
            }

            console.log(rows)
    
            db.close();
    
            sessionsRetrieved(rows);
        });
    }
};

function insertAmplitudeReading(reading) {
    let db = dbManager.getDatabase();

    let sql = 'INSERT INTO AMPLITUDE_READING(CAPTURE_SESSION_ID, MAX_AMPLITUDE, AVG_AMPLITUDE) VALUES (?, ?, ?)';
    db.run(sql, [reading.sessionId, reading.maxAmplitude, reading.averageAmplitude], function(err) {
        if (err) {
          console.error(err.message);
        }

        db.close();
    });
}

function insertCaptureSession(sessionId, sessionInserted) {
    let db = dbManager.getDatabase();

    let sql = 'INSERT INTO CAPTURE_SESSION(ID, START_TIME) VALUES (?, ?)';

    db.run(sql, [sessionId, new Date()], function(err) {
        if (err) {
          console.error(err.message);
        }

        db.close();

        sessionInserted();
    });
}

function getCaptureSession(sessionId, sessionRetrieved) {
    let db = dbManager.getDatabase();

    let sql = 'SELECT ID as Id, START_TIME as StarTime, END_TIME as EndTime '
             +'FROM CAPTURE_SESSION '
             +'WHERE ID = ?';

    db.get(sql, [sessionId], (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        db.close();

        sessionRetrieved(row);
    });
}