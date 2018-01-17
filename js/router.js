
function view(file){
    return document.getElementById("content").innerHTML += "<div data-include='components/" + file + "'></div>";;

}



var action = getParameterByName('/');
switch (action) {
    case "home":
        view("static-pages/_home.html");
        break;

    case "login":
        view("static-pages/_login.html");
        break;

    case "home":
        view("static-pages/_login.html");
        break;
}