function includeHTML() {
    const parser = new DOMParser();
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    // elmnt = document.createElement("div");
                    if (this.status == 200) {
                        elmnt.outerHTML = this.responseText
                    }
                    if (this.status == 404) {
                        elmnt.outerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

includeHTML();