function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function view(include) {

    $("#content").append("<div  data-include='views/" + include + "'></div>");
    $(function () {
        var includes = $('[data-include]');
        jQuery.each(includes, function () {
            var file = $(this).data('include');
            $(this).load(file);

        });
    });
}

function viewPart(id, include) {

    $(id).append("<div  data-include='views/" + include + "'></div>");
    $(function () {
        var includes = $('[data-include]');
        jQuery.each(includes, function () {
            var file = $(this).data('include');
            $(this).load(file);

        });
    });
}

//sets text of element with id
function setText(elementId, text) {
    var element = document.getElementById(elementId);
console.log("setText: "+elementId+" "+text);
    if (element) {
        element.innerHTML = text;
    }
};
