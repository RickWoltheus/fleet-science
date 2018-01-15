


/* validateLogin is called in login.html and simply sees if the user is allowed to log in.
 * In this "static" version, only "conor" can log in.
 */

function validateLogin(username) {
    if (username != "conor") {
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
  alert('Resetting Database');
}


