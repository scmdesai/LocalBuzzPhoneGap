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
         //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		 document.addEventListener('deviceready', function() {
		 try{
		 
		 window.analytics.startTrackerWithId('UA-67469655-6');
		 
		 var userLocation = navigator.geolocation.getCurrentPosition(function(position){
		 var latitude = position.coords.latitude;
		 var longitude = position.coords.longitude;
		 var postalcode;
		 $.getJSON("http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + latitude + "&lng=" + longitude + "&username=1234_5678", function(json) {
		        postalcode = json.postalCodes[0].postalCode;
				console.log('User Location is: ' + postalcode);
				var push = PushNotification.init({
            "android": {
                "senderID": "226322216862"
            },
            "ios": {
				// "senderID": "226322216862",
				// "gcmSandbox": "true"
				"alert": "false",
				"badge": "true"
			}, 
            "windows": {} 
        });
		
		    push.on('registration', function(data) {
            console.log("registration event: " + data.registrationId);
			console.log("Device platform is: " + device.platform) ;
			console.log("Device Cordova is: " + device.cordova) ;
			console.log("Device Model is: " + device.model) ;
			console.log("Device UUID is: " + device.uuid) ;
			console.log("Device Version is: " + device.version) ;
			console.log("Device Manufacturer is: " + device.manufacturer) ;
			console.log("Device Serial is: " + device.serial) ;
			console.log("Device isVirtual is: " + device.isVirtual) ;
			// Save the registration ID on the server. 
			// Sending and receiving data in JSON format using POST mothod
			//
			xhr = new XMLHttpRequest();
			var url = "http://services.appsonmobile.com/devices";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = function () { 
				if (xhr.readyState == 4 && xhr.status == 200) {
					var json = JSON.parse(xhr.responseText);
					console.log(json.success + ", " + json.msg) ;
				}
			}
			var data = '{"deviceType":"'+device.platform+'","registrationID":"'+data.registrationId+'","userLocation":"'+postalcode+'"}';
			xhr.send(data);
			
			
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
			
		 });
		 });
		 
		 
		StatusBar.overlaysWebView(false);
		
        
        
    
		}
		catch (e){
		alert(e);
    }
}, false);
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      /*  app.receivedEvent('deviceready');
		console.log('Device Ready');
		StatusBar.overlaysWebView(false);
		
        
        
        push.on('registration', function(data) {
            console.log("registration event: " + data.registrationId);
			console.log("Device platform is: " + device.platform) ;
			console.log("Device Cordova is: " + device.cordova) ;
			console.log("Device Model is: " + device.model) ;
			console.log("Device UUID is: " + device.uuid) ;
			console.log("Device Version is: " + device.version) ;
			console.log("Device Manufacturer is: " + device.manufacturer) ;
			console.log("Device Serial is: " + device.serial) ;
			console.log("Device isVirtual is: " + device.isVirtual) ;
			// Save the registration ID on the server. 
			// Sending and receiving data in JSON format using POST mothod
			//
			xhr = new XMLHttpRequest();
			var url = "http://services.appsonmobile.com/devices";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = function () { 
				if (xhr.readyState == 4 && xhr.status == 200) {
					var json = JSON.parse(xhr.responseText);
					console.log(json.success + ", " + json.msg) ;
				}
			}
			var data = '{"deviceType":"'+device.platform+'","registrationID":"'+data.registrationId+'"}';
			xhr.send(data);
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
        });*/
    },
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
