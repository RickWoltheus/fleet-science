//gets var / from url
var action = getParameterByName('/')

//sets title to page + site name


if(action == null){
    if(getParameterByName('page')){
        action = getParameterByName('page');
    }else{
        action = "home";
    }

}

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
        view("forms/_sign-up.html");
        break;

    case "dashboard-sailor":
        view("dashboard/_dashboard-sailor.html");
        break;
    case "about":
        view("static-pages/_about.html");
        break;

    default:
        view("error/_home.html");
        break;
}