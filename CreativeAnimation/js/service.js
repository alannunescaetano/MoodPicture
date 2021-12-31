class Service {
    static getSensorReadings(onResponse) {
        fetch('http://10.72.27.108:80/?sessionId=652')
        
        .then((response) => {
          return response.json();
        })
        .then((json) => {
            onResponse(json.readings);
        });
    }
}