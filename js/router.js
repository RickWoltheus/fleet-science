//gets var / from url
var action = getParameterByName('/')

//sets title to page + site name


if (action == null) {
    if (getParameterByName('page')) {
        action = getParameterByName('page');
    } else {
        action = "home";
    }

}

document.title = "Fleet science | " + action;

// the ghetto way of (m)vc
switch (action) {
    case "home":
        view("menu/_menu.html");
        view("static-pages/_home.html");
        view("menu/_footer.html");
        break;

    case "login":
        view("menu/_menu.html");
        view("forms/_login.html");
        //view("menu/_footer.html");
        break;

    case "sign-up":
        view("menu/_menu.html");
        view("forms/_sign-up.html");
        view("menu/_footer.html");
        break;

    case "dashboard-sailor":
        view("menu/_menu-logged-in.html");
        view("dashboard/_dashboard-sailor.html");
        //view("menu/_footer.html");
        break;
    case "about":
        view("menu/_menu.html");
        view("static-pages/_about.html");
        view("menu/_footer.html");
        break;

    case "chatbox":
        view("menu/_menu-logged-in.html");
        view("functional-pages/_chatbox.html");
        view("menu/_footer.html");
        break;

    case "all-requests-sailor":
        view("menu/_menu-logged-in.html");
        view("functional-pages/_all-requests-sailor.html");
        //view("menu/_footer.html");
        break;

    case "accepted-requests-sailor":
        view("menu/_menu-logged-in.html");
        view("functional-pages/_all-requests-sailor.html");
        //view("menu/_footer.html");
        break;

    case "profile":
        view("menu/_menu-logged-in.html");
        view("static-pages/_profile.html");
        //view("menu/_footer.html");
        break;

        // academic

    case "dashboard-academic":
        view("menu/_menu-logged-in.html");
        view("dashboard/_dashboard-academic.html");
        //view("menu/_footer.html");
        break;

    default:
        view("error/_home.html");
        break;
}
