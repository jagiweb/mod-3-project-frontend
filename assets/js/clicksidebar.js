$(document).ready(function () { //contentloaded
    
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("menuDisplayed");
    });
});