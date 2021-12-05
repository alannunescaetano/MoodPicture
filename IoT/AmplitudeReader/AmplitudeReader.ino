#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

const char* ssid = "NOS-A997";
const char* password = "5UGMKT1E";

String serverName = "http://192.168.1.184:80/";

unsigned long lastTimeSentRequest = 0;
unsigned long timerDelayToSendRequest = 0.1 * 60 * 1000;

int numberOfReadings = 0;
int maxAmplitude = 0;
int avgAmplitude = 0;

void setup() {
  Serial.begin(115200); 
  
  lastTimeSentRequest = millis();
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
  int amplitude = 0;
  //Code to read the sound

  amplitude = random(0, 1023);

  long amplitudeSum = (numberOfReadings * avgAmplitude) + amplitude;
  Serial.println(String("numberOfReadings: ") + String(numberOfReadings) + String(" - avgAmplitude: ") + String(avgAmplitude));

  avgAmplitude = amplitudeSum / ++numberOfReadings;
  Serial.println(String("avgAmplitude: ") + String(avgAmplitude) + String(" - numberOfReadings: ") + String(numberOfReadings));

  if(amplitude > maxAmplitude) {
    maxAmplitude = amplitude;
  }
}

void sendRequestWithAmplitude() {
  HTTPClient http;

  http.begin(serverName.c_str());
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String json = String(" { \"maxAmplitude\" : \"")+String(maxAmplitude)+String("\", \"avgAmplitude\" : \"")+String(avgAmplitude)+String("\" } ");

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
