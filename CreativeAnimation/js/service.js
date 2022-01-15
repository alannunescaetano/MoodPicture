class Service {
    static getSensorReadings(onResponse) {
        fetch('http://localhost:80/?sessionId=652&userPerception=angry')
        .then((response) => {
          return response.json();
        })
        .then((json) => {
            onResponse(json);
        });
    }

    static getAllSessions(onResponse) {
        fetch('http://localhost:80/')
        .then((response) => {
          return response.json();
        })
        .then((json) => {
            onResponse(json);
        });
    }
}