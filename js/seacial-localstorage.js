


/* validateLogin is called in login.html and simply sees if the user is allowed to log in.
 * In this "static" version, only "conor" can log in.
 */

function validateLogin(username) {
    if (!userExists(username)) {
        alert("User "+username+" does not exist. Please sign up first.");
        return false;
    }
    return true;
} 


/*
 * If corruption ever occurred, this function should reset the database.
 */
function resetDatabase()
{
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

function createNewDatabase()
{
    // Create new empty database
    someLocalStorage = {};  

    someLocalStorage["users"] = {};

    // Populate with some default data
    // For compatibility with the static version
    addUser("conor", {
        "firstname":"FirstName", 
        "lastname":"Conor", 
	"institute":"The Top University", 
	"boatname":"The Lady's Name", 
	"email":"contact@seacial.com"
    });
    
    // Put in storage
    putStorage();
}


function userExists(username)
{
    return (someLocalStorage["users"][username] != null);
}

function addUser(username,userinfo)
{
    if (userExists(username)) {
        alert("User with that name already exists");
        return false;
    }
    someLocalStorage["users"][username] = {};
    for (var i=0;i<userinfoFields.length;i++) {
        someLocalStorage["users"][username][userinfoFields[i]] = userinfo[userinfoFields[i]];
    }
    putStorage();
    return true;
}

function removeUser(username) {
    delete someLocalStorage["users"][username];
    putStorage();
}

function  updateUser(username,newUserInfo) {
    if (!userExists(username)) {
        alert("User "+username+" does not exist");
        return false;
    }
    someLocalStorage["users"][username] = newUserInfo;
    putStorage();
}


function putStorage()
{
    var stringified = JSON.stringify(someLocalStorage);
    localStorage.setItem(dataversion,stringified);
}

function getStorage()
{
    var stringified = localStorage.getItem(dataversion);
    var result = JSON.parse(stringified)
    if (result == null) {
	createNewDatabase();
    }
    else {
	someLocalStorage = result;
    }
//    alert("storage is "+JSON.stringify(someLocalStorage));
}

var prev_onload_localstorage = window.onload;
window.onload = onload_localstorage;
function onload_localstorage()
{
    if (prev_onload_localstorage) {
	prev_onload_localstorage();
    }
    getStorage();
}


