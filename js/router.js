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



    // Sailor views
    case "dashboard-sailor":
        view("menu/_menu-sailor.html");
        view("dashboard/_dashboard-sailor.html");
        break;
        
    case "accepted-requests-sailor":
        view("menu/_menu-sailor.html");
        view("functional-pages/_all-requests-sailor.html");
        break;

    // Academic
    case "dashboard-academic":
        view("menu/_menu-academic.html");
        view("dashboard/_dashboard-academic.html");
        break;

    case "chatbox":
        view("menu/_menu-sailor.html");
        view("functional-pages/_chatbox.html");
        break;

    case "my-request-academic":
        view();
        break;




        // universal views
    case "all-requests":
        view("menu/_menu-sailor.html");
        view("functional-pages/_all-requests-localstorage-example.html");
        break;

    case "profile":
        view("menu/_menu-sailor.html");
        view("static-pages/_profile.html");
        break;

    case "home":
        view("menu/_menu.html");
        view("static-pages/_home.html");
        view("menu/_footer.html");
        break;

    case "login":
        view("menu/_menu.html");
        view("forms/_login.html");
        break;

    case "account-created":
        view("menu/_menu.html");
        view("static-pages/_account-created.html");
        break;

    case "sign-up":
        view("menu/_menu.html");
        view("forms/_sign-up.html");
        break;

    case "about":
        view("menu/_menu.html");
        view("static-pages/_about.html");
        view("menu/_footer.html");
        break;
    case "database":
        view("menu/_menu.html");
        view("static-pages/_database.html");
        break;
    default:
        view("error/_home.html");
        break;
}
