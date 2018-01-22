/* validateLogin is called in login.html and simply sees if the user is allowed to log in.
 * In this "static" version, only "conor" can log in.
 */

function validateLogin(username) {
    alert("hi")
    if (!userExists(username)) {
        alert("User " + username + " does not exist. Please sign up first.");
        return false;
    }
    alert(username);
    setCookie("username", username);
    return true;
}

function loggedIn() {
    return (loggedInUsername.length > 0);
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


function signupSailor(firstname, lastname, username, boatname, email) {
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
        "firstname": firstname,
        "lastname": lastname,
        "institute": "",
        "boatname": boatname,
        "email": email
    });
    setCookie("username", username);
    return true;
}


function signupScientist(firstname, lastname, username, institute, email) {
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
    if (institute.length == 0) {
        alert("Please enter institute");
        return false;
    }

    if (email.length == 0) {
        alert("Please enter email");
        return false;
    }
    addUser(username, {
        "firstname": firstname,
        "lastname": lastname,
        "institute": institute,
        "boatname": "",
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
var userinfoFields = ["firstname", "lastname", "institute", "boatname", "email"];


function getStorageObject() {
    return someLocalStorage;
}

function createNewDatabase() {
    // Create new empty database
    someLocalStorage = {};

    someLocalStorage["users"] = {};

    // Populate with some default data
    // For compatibility with the static version
    addUser("conor", {
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
