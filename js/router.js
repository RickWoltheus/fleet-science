//gets var / from url
var action = getParameterByName('/')

//sets title to page + site name
document.title = "Fleet science | " + action;

// the ghetto way of mvc
switch (action) {
    case "home":
        view("static-pages/_home.html");
        break;

    case "login":
        view("forms/_login.html");
        break;

    case "sign-up":
        view("static-pages/_login.html");
        break;
    case "dashboard-sailor":
        view("dashboard/_dashboard-sailor.html");
        break;

    case "chatbox-sailor":
        view("chatbox/_chatbox-sailor.html");
        break;

    case "chatbox-academic":
        view("chatbox/_chatbox-academic.html");
        break;

    case "accepted-requests-sailor":
        view("requests/_accepted-requests-sailor.html");
        break;

    case "my-requests-academic":
        view("requests/_my-requests-academic.html");
        break;

    case "all-requests-sailor":
        view("requests/_all-requests-sailor.html");
        break;

    case "all-requests-academic":
        view("requests/_all-requests-academic.html");
        break;

    default:
        view("error/_home.html");
        break;
}
