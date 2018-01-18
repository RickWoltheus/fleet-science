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
    default:
        view("error/_home.html");
        break;
}