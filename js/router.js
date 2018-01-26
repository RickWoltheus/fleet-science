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
        view("menu/_footer.html");
        break;

    case "all-requests-sailor":
        view("menu/_menu-sailor.html");
        //@@@ should eventually be _all-requests-sailor.html
        view("functional-pages/_all-requests-sailor-localstorage-example.html");
        break;

    case "accepted-requests-sailor":
        view("menu/_menu-sailor.html");
        view("functional-pages/_accepted-requests-sailor-localstorage-example.html");
        break;

    case "chatbox-sailor":
        view("menu/_menu-sailor.html");
        view("functional-pages/_chatbox.html");
        view("menu/_footer.html");
        break;

    // Academic
    case "dashboard-academic":
        view("menu/_menu-academic.html");
        view("dashboard/_dashboard-academic.html");
        view("menu/_footer.html");
        break;

    case "chatbox-academic":
        view("menu/_menu-academic.html");
        view("functional-pages/_chatbox.html");
        view("menu/_footer.html");
        break;


    case "my-requests-academic":
        view("menu/_menu-academic.html");
        view("functional-pages/_my-requests-academic-localstorage.html");
        break;

    case "all-requests-academic":
        view("menu/_menu-academic.html");
        view("functional-pages/_all-requests-localstorage-academic.html");
        break;

    case "accepted-requests-academic":
        view("menu/_menu-academic.html");
        view("functional-pages/_accepted-requests-academic.html");
        break;

    case "download-app":
        view("menu/_menu-sailor.html");
        view("feedback/_download-app.html");
        view("menu/_footer.html");
        break;





        // universal views
    /*case "all-requests":
        view("menu/_menu-sailor.html");
        view("functional-pages/_all-requests-localstorage-example.html");
        view("menu/_footer.html");
        break;
    */

    case "profile":
        view("menu/_menu-sailor.html");
        view("static-pages/_profile.html");
        view("menu/_footer.html");
        break;

    case "profile-academic":
        view("menu/_menu-academic.html");
        view("static-pages/_profile-academic.html");
        view("menu/_footer.html");
        break;

    case "variables":
        view("menu/_menu-sailor.html");
        view("static-pages/_variables.html");
        view("menu/_footer.html");
        break;

    case "editpassword":
        view("menu/_menu-sailor.html");
        view("static-pages/_edit-password.html");
        view("menu/_footer.html");
        break;

    case "home":
        view("menu/_menu.html");
        view("static-pages/_home.html");
        view("menu/_footer.html");
        break;

    case "login":
        view("menu/_menu.html");
        view("forms/_login.html");
        view("menu/_footer.html");
        break;

    case "account-created":
        view("menu/_menu.html");
        view("static-pages/_account-created.html");
        view("menu/_footer.html");
        break;

    case "sign-up":
        view("menu/_menu.html");
        view("forms/_sign-up.html");
        view("menu/_footer.html");
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
    case "database-logged-in-academic":
        view("menu/_menu-academic.html");
        view("static-pages/_database-logged-in.html");
        break;
    case "database-logged-in-sailor":
        view("menu/_menu-sailor.html");
        view("static-pages/_database-logged-in.html");
        break;
    case "forgot-password":
    view("menu/_menu.html");
    view("static-pages/_forgot-password.html");
        break;

    case "requested-academic":
        view("menu/_menu-academic.html");
        view("feedback/requested-academic.html")

}
