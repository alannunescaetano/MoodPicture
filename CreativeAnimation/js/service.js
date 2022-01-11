class Service {
    static getSensorReadings(onResponse) {
        fetch('http://10.72.62.57:80/?sessionId=652&userPerception=angry')
        .then((response) => {
          return response.json();
        })
        .then((json) => {
            onResponse(json);
        });
    }
}