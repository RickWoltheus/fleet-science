/* validateLogin is called in login.html and simply sees if the user is allowed to log in.
 * In this "static" version, only "conor" can log in.
 */

var count_login_clicks = 0;
var tried_usernames = [];
function validateLogin(username) {
    count_login_clicks++;
    if (!userExists(username)) {
        //alert("User " + username + " does not exist. Please sign up first.");
        if(count_login_clicks == 1 || tried_usernames.indexOf(username) < 0){
            if(!username){
                document.getElementById("not-user").innerHTML += "<b>Fill in with your username and password.</b><br>";
            }            
            else{
                document.getElementById("not-user").innerHTML += "<b>Username " + username +" does not exist. Please sign up first.</b><br>";
            }
            document.getElementById("to-go").style.display = "none";
            tried_usernames.push(username);
        }
        return false;
    }
    //alert("Welcome back " + username);
    setCookie("username", username);
    return true;
}

function loggedIn() {
    return (loggedInUsername.length > 0);
}

function currentUsername() {
    return loggedInUsername;
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


function signupLS(role, firstname, lastname, username, boatname, institute, email) {
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
    if (boatname.length == 0 && role=="sailor") {
        alert("Please enter boat name");
        return false;
    }
    if (institute.length == 0 && role=="academic") {
        alert("Please enter institute name");
        return false;
    }

    if (email.length == 0) {
        alert("Please enter email");
        return false;
    }
    if(role=="academic"){
        return addUser(username, {
            "role": role,
            "firstname": firstname,
            "lastname": lastname,
            "institute": "",
            "boatname": boatname,
            "email": email
        });
    }else{
        return addUser(username, {
            "role": role,
            "firstname": firstname,
            "lastname": lastname,
            "institute": institute,
            "boatname": "",
            "email": email
        });
    }
    return true;
    //setCookie("username", username);
}



function writeAcceptedDataRequestOptions()
{
    var element = document.getElementById("request-options");
    if (element) {
	var text="";

        var accepts = getStorageObject()["accepts"][loggedInUsername];
        if (accepts.length == 0) {
	       text = "You have not accepted any data request yet. Please go to the <a href='?/=all-requests-sailor'>All Requests</a> page to accept requests.";
            document.getElementById("there-are-requests").style.display = "none";
            document.getElementById("no-accepted-request").style.display = "";
	}
	else {
            document.getElementById("there-are-requests").style.display = "";
            document.getElementById("no-accepted-request").style.display = "none";
            text+="<select class='fleet-input' id='requestid'>";
            var i;
	    for (i=0;i<accepts.length;i++) {
                var req=getStorageObject()["requests"][accepts[i]];
                text+="    <option value='"+accepts[i]+"'>"+req["username"]+" - "+req["area"]+" - "+req["reqtype"]+"</option>";
	    }
            text+="</select>";
	}
        element.innerHTML = text;
    }
}



function writeRequestsTable(page) {
    //var acceptedOnly = false;
    var element = document.getElementById("requests-all");
    if (element == null) {
	   element = document.getElementById("requests-accepted");
    }
	if (element) {
        //acceptedOnly = true;
	}

    if (element) {
    	var text="";

    	text+=" <thead>";
    	text+="   <th>Academic</th>";
    	text+="   <th>Requested area</th>";
    	text+="   <th>Type of request";
    	text+="   </th>";
    	text+="   <th>Status";
    	/*text+="     <select id='selectStatus' class='filter-requests' onchange='selectStatus()'>";
        if(page == "all-sailor"){
            text+="       <option selected='selected'>All</option>";
            text+="       <option value='completed'>New</option>";        
            text+="       <option value='accepted'>Accepted</option>";
            text+="       <option value='approved'>Completed</option>";
            text+="       <option value='approved'>Rejected</option>";
        } else{
        	text+="       <option selected='selected'>All</option>";
        	text+="       <option value='approved'>Approved</option>";
        	text+="       <option value='accepted'>Accepted</option>";
        	text+="       <option value='completed'>Completed</option>";
        }
    	text+="     </select>";
        */
    	text+="   </th>";
    	text+="   <th></th>";
    	text+=" </thead>";
    	var count=1;

        var accepts = getStorageObject()["accepts"][loggedInUsername];


    	var requests = getStorageObject()["requests"];
        for (var key in requests) {
    	    if(!requests.hasOwnProperty(key)) {
       			  continue;
    	    }
    	    var row = requests[key];

            if((row["status"] == "Pending Approval" || row["status"] == "Not Approved") && (page=="all-sailor" || page == "all-academic")){
                continue;
            }
            //var requestStatus = "accepted";

            if (page=="accepted" && accepts.indexOf(key) < 0) {
    		      continue;
    		}
            if(page=="my" && (row["username"] != loggedInUsername || row["status"] == "Not Approved")){
                continue;
            }

    	    text+=" <tr>";
    	    //text+="   <td>"+row["username"]+"</td>";
            text+="   <td>"+ someLocalStorage["users"][row["username"]]["firstname"] + " " +
            someLocalStorage["users"][row["username"]]["lastname"]+"</td>";
    	    text+="   <td>"+row["area"]+"</td>";
    	    text+="   <td>"+row["reqtype"]+"</td>";
            if(row["status"] == "Approved" && (page=="all-sailor" || page=="all-academic")){
                text+="   <td>"+"New"+"</td>";
            } else if((row["status"] == "Accepted" || row["status"] == "Rejected") && page=="all-academic"){
                text+="   <td>"+"New"+"</td>";
            } else if( row["status"] == "Accepted" && accepts.indexOf(key) < 0){
               text+="   <td>"+"New"+"</td>";
            } else{
                text+="   <td>"+row["status"]+"</td>";
            }







    	    //text+="   <td>"+requestStatus+"</td>";
    	    text+="   <td>";
    	    text+="     <a href='#' class='toggler' data-request='"+count+"' onclick=\"chevronSwitch('chevron-switch"+count+"');\">";
    	    text+="       <i>";
    	    text+="         <img id='chevron-switch"+count+"' class='chevron-img' src='images/chevron-down.png' alt='chevron down' />";
    	    text+="       </i>";
    	    text+="     </a>";
    	    text+="   </td>";
    	    text+=" </tr>";
    	    text+=" <tr id='section-requests-info"+count+"' class='req"+count+"' style='display: none'>";
    	    text+="   <td colspan='5'>";
    	    text+="     <div class='row wrapper-info-requests'>";
    	    text+="       <div class='col-3'>";
    	    text+="         <p class='p_requests'>Duration</p>";
    	    text+="         <p>"+row["duration"]+"</p>";
    	    text+="         <p class='p_requests'>Frequency</p>";
    	    text+="         <p>"+row["frequency"]+"</p>";
    	    text+="         <p class='p_requests'>Deadline</p>";
    	    text+="         <p>"+row["deadline"]+"</p>";
    	    text+="       </div>";
    	    text+="       <div class='col-9'>";
    	    text+="         <p class='p_requests'>Description</p>";
    	    text+="         <div class='description-box-requests'>"+row["description"]+"</div>";
    	    text+="         <div class='row'>";
            if((row["status"] == "Approved" || row["status"] == "Rejected") && page == "all-sailor"){
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='accept-requests"+count+"' onclick='{addAccept(\""+key+"\");myReload();}' class='btn btn-default button-accept-requests'>Accept</button>";
                text+="           </div>";
            }
            if(row["status"] == "Approved" && page == "all-sailor"){
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='reject-requests"+count+"' class='btn btn-default button-reject-requests' >Reject</button>";
                text+="           </div>";
            }
            if(row["status"] == "Rejected" && page == "all-sailor"){
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='reject-requests"+count+"' class='btn btn-default button-reject-requests' disabled>Reject</button>";
                text+="           </div>";
            }
            //TODO
            if( row["status"] == "Accepted" && accepts.indexOf(key) >= 0 && page=="all-sailor"){
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='accept-requests"+count+"' class='btn btn-default button-accept-requests'>Submit Data</button>";
                text+="           </div>";
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='reject-requests"+count+"' class='btn btn-default button-reject-requests' >Withdraw</button>";
                text+="           </div>";
            }
            if(row["status"] == "Accepted" && accepts.indexOf(key) < 0 && page=="all-sailor"){
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='accept-requests"+count+"' onclick='{addAccept(\""+key+"\");myReload();}' class='btn btn-default button-accept-requests'>Accept</button>";
                text+="           </div>";
                text+="           <div class='col-6'>";
                text+="             <button type='button' id='reject-requests"+count+"' class='btn btn-default button-reject-requests' >Reject</button>";
                text+="           </div>";
            }
            if(page == "all-academic"){
                text+="           <div class='col-6'>";
                text+="             <a href='?/=chatbox-academic'><button type='button' id='accept-requests"+count+"' class='btn btn-default button-accept-requests'>Contact Academic</button></a>";
                text+="           </div>";
                if(row["status"] == "Completed"){
                    text+="           <div class='col-6'>";
                    text+="             <a href='?/=database-logged-in-academic'><button type='button' id='accept-requests"+count+"' class='btn btn-default button-accept-requests'>Download Data</button></a>";
                    text+="           </div>";
                }
            }
            if(page == "my"){
                text+="           <div class='col-6'>";
                if(row["status"] == "Completed"){
                    text+="             <a href='?/=database-logged-in-academic'><button type='button' id='accept-requests"+count+"' class='btn btn-default button-accept-requests'>Download Data</button></a>";
                } else{
                    text+="             <a href='?/=database-logged-in-academic'><button type='button' id='accept-requests"+count+"' class='btn btn-default button-accept-requests' disabled>Download Data</button></a>";
                }
                text+="           </div>";
            }
    	    text+="         </div>";
    	    text+="       </div>";
    	    text+="     </div>";
    	    text+="   </td>";
    	    text+=" </tr>";
    	    text+=" <tr id='section-requests-are_you_sure"+count+"' style='display: none'>";
    	    text+="   <td colspan='5'>";
    	    text+="     <div class='row wrapper-info-requests'>";
    	    text+="       <div class='col-8 offset-2'>";
    	    text+="         <p class='p_requests-accept'>Are you sure that you want to accept this request?</p>";
    	    text+="         <div class='row'>";
    	    text+="           <div class='col-6'>";
    	    text+="             <button id='confirmation-requests"+count+"' type='button' class='btn btn-default button-accept-requests'>Yes</button>";
    	    text+="           </div>";
    	    text+="           <div class='col-6'>";
    	    text+="             <button type='button' onclick='myReload()' class='btn btn-default button-reject-requests'>No</button>";
    	    text+="           </div>";
    	    text+="         </div>";
    	    text+="       </div>";
    	    text+="     </div>";
    	    text+="   </td>";
    	    text+=" </tr>";
    	    text+=" <tr id='section-requests-confirmation"+count+"' style='display: none'>";
    	    text+="   <td colspan='5'>";
    	    text+="     <div class='row wrapper-info-requests'>";
    	    text+="       <div class='col-8 offset-2'>";
    	    text+="         <p class='p_requests-accept'>Your request is succesfully accepted. You can find your accepted request under 'accepted requests'</p>";
    	    text+="         <div class='row'>";
    	    text+="           <div class='col-12'>";
    	    text+="             <button onclick='myReload()' type='button' class='btn btn-default button-accept-requests'>OK</button>";
    	    text+="           </div>";
    	    text+="         </div>";
    	    text+="       </div>";
    	    text+="     </div>";
    	    text+="   </td>";
    	    text+=" </tr>";
    	    text+=" <tr id='section-requests-reject-warning"+count+"' style='display: none'>";
    	    text+="   <td colspan='5'>";
    	    text+="     <div class='row wrapper-info-requests'>";
    	    text+="       <div class='col-8 offset-2'>";
    	    text+="         <p class='p_requests-warning'>WARNING</p>";
    	    text+="         <p class='p_requests-accept'>Are you sure that you want to reject this request?</p>";
    	    text+="         <div class='row'>";
    	    text+="           <div class='col-6'>";
    	    text+="             <button id='confirmation-rejected-requests"+count+"' type='button' class='btn btn-default button-accept-requests'>Yes</button>";
    	    text+="           </div>";
    	    text+="           <div class='col-6'>";
    	    text+="             <button type='button' onclick='myReload()' class='btn btn-default button-reject-requests'>No</button>";
    	    text+="           </div>";
    	    text+="         </div>";
    	    text+="       </div>";
    	    text+="     </div>";
    	    text+="   </td>";
    	    text+=" </tr>";
    	    text+=" <tr id='section-requests-confirmation-rejected"+count+"' style='display: none'>";
    	    text+="   <td colspan='5'>";
    	    text+="     <div class='row wrapper-info-requests'>";
    	    text+="       <div class='col-8 offset-2'>";
    	    text+="         <p class='p_requests-accept'>The request is succesfully rejected. If you did not want to reject the request, you can still accept the";
    	    text+="           rejected request.</p>";
    	    text+="         <div class='row'>";
    	    text+="           <div class='col-12'>";
    	    text+="             <button onclick='myReload()' type='button' class='btn btn-default button-accept-requests'>OK</button>";
    	    text+="           </div>";
    	    text+="         </div>";
    	    text+="       </div>";
    	    text+="     </div>";
    	    text+="   </td>";
    	    text+=" </tr>";
            count++;
        }
        element.innerHTML = text;
    }
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
var requestinfoFields = ["username", "area",  "reqtype",  "description", "status", "duration", "frequency", "deadline"];
var acceptsinfoFields = ["accepts"];
var datainfoFields = ["data"];



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

    someLocalStorage["accepts"] = {};
    someLocalStorage["data"] = {};

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
    addUser("sarah", {
        "role": "academic",
        "firstname": "Sarah",
        "lastname": "la Grue",
        "institute": "UvA",
        "boatname": "",
        "email": "sarahlagrue@gmail.com"
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
        document.getElementById("username-exists").style.display = "";
        //alert("   User with that name already exists");
        return false;
    }
    someLocalStorage["users"][username] = {};
    for (var i = 0; i < userinfoFields.length; i++) {
        someLocalStorage["users"][username][userinfoFields[i]] = userinfo[userinfoFields[i]];
    }
    someLocalStorage["accepts"][username] = [];
    setCookie("username", username);
    putStorage();
    return true;
}

function removeUser(username) {
    delete someLocalStorage["users"][username];
    delete someLocalStorage["accepts"][username];

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

function addAccept(requestid) {
    if (someLocalStorage["accepts"][loggedInUsername].indexOf(requestid)>=0) {
        return false;
    }
    someLocalStorage["accepts"][loggedInUsername].push(requestid);
    someLocalStorage["requests"][requestid]["status"] = "Accepted"
    putStorage();
    return true;
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
    someLocalStorage["data"][requestid] = [];

    putStorage();
    return true;
}

function removeRequest(requestid) {
    delete someLocalStorage["requests"][requestid];
    delete someLocalStorage["data"][requestid];
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

function addData(requestid, data) {
    someLocalStorage["data"][requestid].push(data);
    putStorage();
}
function addNewRequest(area,description,type,status,frequency,lastMeasurement){
    var reqInfo = { "username":loggedInUsername, 
                    "area":area,
                    "description":description,
                    "reqtype":type,  
                    "status":status,
                    "duration":"6 months", 
                    "frequency":frequency,
                    "deadline":lastMeasurement   
                  }  
        addRequest(getNewUniqueId("request"), reqInfo);
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
