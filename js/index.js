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
        document.addEventListener('deviceready', this.onDeviceReady, false);
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
		
		/* Amazon Mobile Analytics*/
		AWS.config.region = 'us-east-1';
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'us-east-1:cd2c5cf7-2b6d-49a6-be5f-5d1a92113389' //Amazon Cognito Identity Pool ID
		
		var options = {
    appId : 'b8f01603ccc24b2c9d0e78b76334febe', //Amazon Mobile Analytics App ID
	platform: 'JavaScript',
    appTitle : 'Local Buzz',              //Optional e.g. 'Example App'
    
};

var mobileAnalyticsClient = new AMA.Manager(options);
mobileAnalyticsClient.startSession();
mobileAnalyticsClient.submitEvents();

});		
	}
};
app.initialize();