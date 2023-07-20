function updateJS(_element) {
    let rem = _element;
    // let rem = document.createElement("includeHTML");
    let a = rem.querySelectorAll("script")
    for (let i = 0; i < a.length; i++) {
        let b = document.createElement("script");
        b.innerHTML = a[i].innerHTML
        a[i].replaceWith(b);
    }
    return rem;
}
const parser = new DOMParser();
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
                        elmnt.replaceWith(updateJS(parser.parseFromString(this.responseText, 'text/html').querySelector("includeHTML")))
                        // let rem = document.createElement("script")
                        // rem.innerHTML = `
                        // console.log("hello")
                        // `
                        // elmnt.replaceWith(rem)
                    }
                    if (this.status == 404) {
                        elmnt.append("Page not found.");
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