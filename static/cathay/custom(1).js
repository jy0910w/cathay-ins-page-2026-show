(function () {
    return;
    if (!requirejs) {
        return;
    }
    window.siteUrl = window.siteUrl || '/';
    window.version = window.version || new Date();
    requirejs.config({
        urlArgs: `v=${window.version}`,
        "paths": { "custom": (window.siteUrl + "js/custom") }
    });
    let customAry = document.querySelectorAll("[data-type='custom']");   
    customAry.forEach((component) => {
        let compName = component.getAttribute("data-comp-name");
        let plugin = component.getAttribute("data-plugin");
        if (compName && plugin) {           
            try {
                require([plugin]);
            } catch (error) {
                console.error(`Error initializing component ${compName}: ${error.message}`);
            }
        }
    });
})()