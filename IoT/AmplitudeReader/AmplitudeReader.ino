#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "NOS-A997";
const char* password = "5UGMKT1E";
const int soundSensorPIN = 5;

String serverName = "http://192.168.1.19:80/";

unsigned long lastTimeSentRequest = 0;
unsigned long timerDelayToSendRequest = 0.1 * 60 * 1000;

int numberOfReadings = 0;
int maxAmplitude = 0;
int avgAmplitude = 0;
String sessionId;

void setup() {
  Serial.begin(115200); 
  pinMode(5, INPUT);

  //pinMode(soundSensorPIN, OUTPUT);
  
  lastTimeSentRequest = millis();
  sessionId = String(millis());
  Serial.println("sessionId: " + sessionId);
}

void loop() {
   readAmplitude();
   
   //Send the request after reaching the time interval
   if ((millis() - lastTimeSentRequest) > timerDelayToSendRequest) {
    if(WiFi.status()!= WL_CONNECTED){
      Serial.println("WiFi Disconnected");
      connectToWiFi();
    }
    sendRequestWithAmplitude();

    numberOfReadings = 0;
    maxAmplitude = 0;
    avgAmplitude = 0;
    
    lastTimeSentRequest = millis();  
  }
}

void readAmplitude() {
  analogReadResolution(8);
  int amplitude = analogRead(soundSensorPIN);
  analogReadResolution(11);
  analogSetAttenuation(ADC_6db);

  long amplitudeSum = (numberOfReadings * avgAmplitude) + amplitude;
  avgAmplitude = amplitudeSum / ++numberOfReadings;

  if(amplitude > maxAmplitude) {
    maxAmplitude = amplitude;
  }
}

void sendRequestWithAmplitude() {
  HTTPClient http;

  http.begin(serverName.c_str());
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String json = String(" { \"sessionId\" : \"")+String(sessionId)+String("\", \"maxAmplitude\" : \"")+String(maxAmplitude)+String("\", \"averageAmplitude\" : \"")+String(avgAmplitude)+String("\" } ");

  Serial.println("Sending request: " + json);

  int httpResponseCode = http.POST(json);

  Serial.println("HTTP Response code: " + httpResponseCode);
  String payload = http.getString();
  Serial.println("HTTP Response message: " + payload);

  http.end();  
}

void connectToWiFi(){
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected to WiFi network with IP Address: ");
}
