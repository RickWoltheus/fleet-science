

/* validateLogin is called in login.html and simply sees if the user is allowed to log in.
 * In this "static" version, only "conor" can log in.
 */
function validateLogin(username) {
    alert('hi')
    if (username != "conor") {
        alert("User "+username+" does not exist. In this version, you can only log in as user 'conor'");
        return false;
    }
    alert(username);
    
    return true;
}

function loggedIn() {
    return true;
}

function loggedInFullName() {
    return "Conor la Grue";
}


function loggedInEmail() {
    return "conorlagrue@gmail.com";
}

function loggedInBoatName() {
    return "Given Time";
}

function loggedInInstitute() {
    return "";
}

function signupSailor(firstname, lastname, username, boatname, email) {
    return true;
}

function signupScientist(firstname, lastname, username, institute, email) {
    return true;
}


/****************************************************
 *
 * End of driver
 *
 ****************************************************/






/*
 * resetDatabase. In this static data version, this function does nothing.
 */
function resetDatabase()
{
}
