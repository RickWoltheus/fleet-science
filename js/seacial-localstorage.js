/* validateLogin is called in login.html and simply sees if the user is allowed to log in.
 * In this "static" version, only "conor" can log in.
 */

function validateLogin(username) {
    
    if (!userExists(username)) {
        alert("User " + username + " does not exist. Please sign up first.");
        return false;
    }
    alert("Welcome back " + username);
    setCookie("username", username);
    return true;
}

function loggedIn() {
    return (loggedInUsername.length > 0);
}

function loggedInRole() {
    if (loggedIn()) {
        return someLocalStorage["users"][loggedInUsername]["role"];
    }
    return "(Not logged in!)";
}

function loggedInFullName() {
    if (loggedIn()) {
        return someLocalStorage["users"][loggedInUsername]["firstname"] + " " +
            someLocalStorage["users"][loggedInUsername]["lastname"];
    }
    return "(Not logged in!)";
}


function loggedInEmail() {
    if (loggedIn()) {
        return someLocalStorage["users"][loggedInUsername]["email"];
    }
    return "(Not logged in!)";
}

function loggedInBoatName() {
    if (loggedIn()) {
        return someLocalStorage["users"][loggedInUsername]["boatname"];
    }
    return "(Not logged in!)";
}


function loggedInInstitute() {
    if (loggedIn()) {
        return someLocalStorage["users"][loggedInUsername]["institute"];
    }
    return "(Not logged in!)";
}


function signupLS(role, firstname, lastname, username, boatname, email) {
    if (firstname.length == 0) {
        alert("Please enter first name");
        return false;
    }
    if (lastname.length == 0) {
        alert("Please enter last name");
        return false;
    }
    if (username.length == 0) {
        alert("Please enter username");
        return false;
    }
    if (boatname.length == 0) {
        alert("Please enter boat name");
        return false;
    }

    if (email.length == 0) {
        alert("Please enter email");
        return false;
    }
    addUser(username, {
        "role": role,
        "firstname": firstname,
        "lastname": lastname,
        "institute": "",
        "boatname": boatname,
        "email": email
    });
    setCookie("username", username);
    return true;
}


/****************************************************
 *
 * End of driver
 *
 ****************************************************/



/*
 * If corruption ever occurred, this function should reset the database.
 */
function resetDatabase() {
    //    alert('Resetting Database');
    createNewDatabase();
}
















/*
 * Simulating a database by storing data into localstorage.
 */


var dataversion = "data001";
var someLocalStorage = {};
var userinfoFields =    ["role", "firstname", "lastname", "institute",   "boatname", "email"];
var messageinfoFields = ["type", "from",      "to",       "description", "date",     "previous"];
var requestinfoFields = ["username", "area",  "reqtype",  "status", "duration", "frequency", "deadline"];


function getTodayDateString() {
    var date = new Date();
    return ""+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
}

function getNewUniqueId(typeStr) {
    someLocalStorage["lastuid"] = someLocalStorage["lastuid"] + 1;
    var uid = typeStr+someLocalStorage["lastuid"];
    putStorage();
    return uid;
}

function getStorageObject() {
    return someLocalStorage;
}

function createNewDatabase() {
    // Create new empty database
    someLocalStorage = {};

    someLocalStorage["lastuid"]=1;
    someLocalStorage["users"] = {};
    someLocalStorage["messages"] = {};
    someLocalStorage["requests"] = {};

    // Populate with some default data
    // For compatibility with the static version
    addUser("conor", {
        "role": "sailor",
        "firstname": "Conor",
        "lastname": "la Grue",
        "institute": "",
        "boatname": "Given Time",
        "email": "conorlagrue@gmail.com"
    });

    // Put in storage
    putStorage();
}


function userExists(username) {
// RICK: JSON.stringify maakt van een object een human-readable string
// RICK: Ik heb de alerts maar even uitgezet.
// Ayal
//    console.log(JSON.stringify(someLocalStorage));
//    alert(JSON.stringify(someLocalStorage));


    return (someLocalStorage["users"][username] != null);
}

function addUser(username, userinfo) {
    if (userExists(username)) {
        alert("User with that name already exists");
        return false;
    }
    someLocalStorage["users"][username] = {};
    for (var i = 0; i < userinfoFields.length; i++) {
        someLocalStorage["users"][username][userinfoFields[i]] = userinfo[userinfoFields[i]];
    }
    putStorage();
    return true;
}

function removeUser(username) {
    delete someLocalStorage["users"][username];
    putStorage();
}

function updateUser(username, newUserInfo) {
    if (!userExists(username)) {
        alert("User " + username + " does not exist");
        return false;
    }
    someLocalStorage["users"][username] = newUserInfo;
    putStorage();
}



function messageExists(messageid) {
    return (someLocalStorage["messages"][messageid] != null);
}

function addMessage(messageid, messageinfo) {
    if (messageExists(messageid)) {
        alert("Message with that id already exists");
        return false;
    }
    someLocalStorage["messages"][messageid] = {};
    for (var i = 0; i < messageinfoFields.length; i++) {
        someLocalStorage["messages"][messageid][messageinfoFields[i]] = messageinfo[messageinfoFields[i]];
    }
    putStorage();
    return true;
}

function removeMessage(messageid) {
    delete someLocalStorage["messages"][messageid];
    putStorage();
}

function updateMessage(messageid, newMessageInfo) {
    if (!messageExists(messageid)) {
        alert("Message " + messageid + " does not exist");
        return false;
    }
    someLocalStorage["messages"][messageid] = newMessageInfo;
    putStorage();
}












function requestExists(requestid) {
    return (someLocalStorage["requests"][requestid] != null);
}

function addRequest(requestid, requestinfo) {
    if (requestExists(requestid)) {
        alert("Request with that id already exists");
        return false;
    }
    someLocalStorage["requests"][requestid] = {};
    for (var i = 0; i < requestinfoFields.length; i++) {
        someLocalStorage["requests"][requestid][requestinfoFields[i]] = requestinfo[requestinfoFields[i]];
    }
    putStorage();
    return true;
}

function removeRequest(requestid) {
    delete someLocalStorage["requests"][requestid];
    putStorage();
}

function updateRequest(requestid, newRequestInfo) {
    if (!requestExists(requestid)) {
        alert("Request " + requestid + " does not exist");
        return false;
    }
    someLocalStorage["requests"][requestid] = newRequestInfo;
    putStorage();
}








function putStorage() {
    var stringified = JSON.stringify(someLocalStorage);
    localStorage.setItem(dataversion, stringified);
}

function getStorage() {
    var stringified = localStorage.getItem(dataversion);
    var result = JSON.parse(stringified)
    if (result == null) {
        createNewDatabase();
    } else {
        someLocalStorage = result;
    }
    //    alert("storage is "+JSON.stringify(someLocalStorage));
}



function setCookie(name, value) {
    var expires = "";
    document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}


var request = new Array();
var loggedInUsername = "";

var prev_onload_localstorage = window.onload;
window.onload = onload_localstorage;

function onload_localstorage() {
    if (prev_onload_localstorage) {
        prev_onload_localstorage();
    }

    if (document.location.search) {
        var i;
        var vals = document.location.search.substr(1).split("&");
        for (i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
            request[unescape(vals[i][0])] = unescape(vals[i][1]);
        }
    }

    loggedInUsername = getCookie("username");
    //alert("loggedInUsername = "+loggedInUsername);

    getStorage();
}
