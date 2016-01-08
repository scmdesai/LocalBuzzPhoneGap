/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
	
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		console.log("Device is ready");
		//this.receivedEvent('deviceready');
		
        var push = PushNotification.init({
            "android": {
                "senderID": "226322216862"
            },
            "ios": {}, 
            "windows": {} 
        });
        
        push.on('registration', function(data) {
            console.log("registration event: " + data.registrationId);
			//document.getElementById("regId").innerHTML = data.registrationId;
            //console.log(JSON.stringify(data));					
        });

        push.on('notification', function(data) {
        	console.log("notification event received");
			// data.message, 
			console.log("Notification Message is: " + data.message) ;
			// data.title, 
			console.log("Notification Title is: " + data.title) ;
			// data.count, 
			console.log("Notification Count is: " + data.count) ;
			// data.sound, 
			console.log("Notification Sound is: " + data.sound) ;
			// data.image, 
			console.log("Notification Image is: " + data.image) ;
			// data.additionalData 
			console.log("Notification additionalData is: " + data.additionalData) ;
        });

        push.on('error', function(e) {
            console.log("Error received");
			console.log("Error Message is: " + e.message) ;				
        });
		
		/* Commenting out Amazon Analytics */
		/* Amazon Mobile Analytics*/
		/*AWS.config.region = 'us-east-1';
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'us-east-1:cd2c5cf7-2b6d-49a6-be5f-5d1a92113389' //Amazon Cognito Identity Pool ID
		}); 
		var options = {
			appId : 'b8f01603ccc24b2c9d0e78b76334febe', //Amazon Mobile Analytics App ID
			platform: 'Android',
			// logger: console,  // Commented this line to get rid of the error Uncaught TypeError: Converting circular structure to JSON 
			appTitle : 'Local Buzz'              //Optional e.g. 'Example App'
    
		};

		this.mobileAnalyticsClient = new AMA.Manager(options);
		//mobileAnalyticsClient.startSession();
		//mobileAnalyticsClient.submitEvents();

		console.log('Analytics initialized');
  
        document.addEventListener('pause', this.mobileAnalyticsClient.stopSession.bind(this.mobileAnalyticsClient), false);
        document.addEventListener('resume', this.mobileAnalyticsClient.startSession.bind(this.mobileAnalyticsClient), false);
       // document.addEventListener('touch', this.recordTouchEvent.bind(this.mobileAnalyticsClient), false);
	   document.addEventListener('touchstart', this.recordTouchEvent.bind(this), false);
	   //document.addEventListener('touch', this.mobileAnalyticsClient.recordEvent('customTouch', {'screenName': 'main'}, false));*/
	   
	   
	   /* Begin Google Analytics Code*/
	   analytics.startTrackerWithId('UA-67469655-5');
	   //analytics.trackEvent('TouchEvent', 'Touch', 'Main');
	   console.log('Analytics initialized');
	   
	   //the getLocation function grabs the user's location (if they give permission)
function getLocation() {
    if (navigator.geolocation) {
                //if you have the geolocation, run the showPosition function
				console.log("Locating User Location");
				
        navigator.geolocation.getCurrentPosition(showPosition,onError);
		
    } else {
                //geolocation not happening
				console.log("Gelocation not enabled on User device");
                analytics.trackEvent('LocalBuzz App', 'Click', 'Unknown');
    }
}
 
//here's where we grab the lat and long and access the api's for data
function showPosition(position)
{
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
		console.log("Locating User Location inside showPosition");
		console.log("Latitude : " + latitude);
		console.log("Longitude : " + longitude);
       
        // api call for postal code and track event
        $.getJSON("http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + latitude + "&lng=" + longitude + "&username=1234_5678", function(json) {
                        analytics.trackEvent('set', 'dimension5', json.postalCodes[0].postalCode);
						console.log(json.postalCodes[0].postalCode);
                        analytics.trackEvent('LocalBuzz App','Click',json.postalCodes[0].postalCode);
      });
 
}
function onError(error) {
				//geolocation not happening
				console.log("Gelocation not enabled on User device " + error );
                analytics.trackEvent('LocalBuzz App', 'Click', 'Unknown');
}

//run the above functions
//getLocation();
	   
    }, // end of onDeviceReady function
	
    /*touchCount: 0,
    
	recordTouchEvent: function(event) {
		console.log('Touch Event recorded');
        console.log(this.mobileAnalyticsClient.recordEvent('customTouch', { 
            'screenName': 'main'}, {'touchCount': this.touchCount++ } ));
		
		// retrieve the TouchList
		var touches = event.changedTouches;
		
		// iterate through the TouchList
		for (var i = 0; i < touches.length; i++) {
			console.log("touchstart:" + i + "...");
			var touchObject = touches[i] ;
			var touchElement = touchObject.target ;
			
			console.log("Element ClassName is:" + touchElement.className) ;
			console.log("Element ID is:" + touchElement.id) ;
			console.log("Element Tag Name is:" + touchElement.tagName) ;
			console.log("Inner HTML is:"+ touchElement.innerHTML) ;
			console.log("Outer HTML is:"+ touchElement.outerHTML) ;
			/*
			var attrCollection = touchElement.attributes ;
			
			
			for(var k=0; k < attrCollection.length; k++)
			{
				console.log("Attribute Name is:" + attrCollection[k].name);
				console.log("Attribute Value is:" + attrCollection[k].value);
			}
			
		}
        
    },*/
  
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
  
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
  
        console.log('Received Event: ' + id);
	}		
};

app.initialize();