READ ME
========
This is my Personal File
I have included cordova-2.2.0 with this application.
In my Apps, i entered into Dashboard Page after using the credentials in the login page. After that, when i press the Back button in the mobile, it returns to the Login Page and not stay on the Dashboard Page. I have tried a lot.

<script type="text/javascript" charset="utf-8" src="cordova-2.2.0.js"></script>
<script type="text/javascript" charset="utf-8">

// Call onDeviceReady when Cordova is loaded.
//
// At this point, the document has loaded but cordova-2.2.0.js has not.
// When Cordova is loaded and talking with the native device,
// it will call the event `deviceready`.
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// Cordova is loaded and it is now safe to call Cordova methods
//
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back button
//
function onBackKeyDown() {
    alert("Back Button Clicked"); //called the alert..checking
}

</script>

But both onDeviceReady and onBackKeyDown not triggered :( – Am i missing something???
