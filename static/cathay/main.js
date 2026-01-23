let resources = ["tooltip"];
let componentAry = document.querySelectorAll("[data-type='comp']");
let actionAry = new Set();

componentAry.forEach((component) => {
    const compName = component.getAttribute("data-comp-name");
    const plugin = component.getAttribute("data-plugin");

    if (compName && plugin) {
        resources = resources.concat(plugin.split(","));
        actionAry.add(compName);
    }
});

// Use const for resourcesSet and actionArySet
const resourcesSet = new Set(resources);
const actionArySet = new Set(actionAry);

// console.log(resourcesSet);
// require(resources, function() {
require(resources, (...pluginResources) => {
    function getResourceValue(resourceName) {
        const resourceIdx = resources.indexOf(resourceName);
        return resourceIdx !== -1 ? pluginResources[resourceIdx] : null;
    }
    Flickity = getResourceValue("flickity");
    if(Flickity){
        Flickity.createMethods.push('_createPrevNextCells')
        Flickity.prototype._createPrevNextCells = function () {
            this.on('select', this.setPrevNextCells)
        }

        Flickity.prototype.setPrevNextCells = function () {

            changeSlideClasses(this.previousSlide, 'remove', 'is-previous')
            changeSlideClasses(this.previousPrevSlide, 'remove', 'is-previous-previous')
            changeSlideClasses(this.nextSlide, 'remove', 'is-next')
            changeSlideClasses(this.nextNextSlide, 'remove', 'is-next-next')
            
            if (this.selectedIndex - 1 < 0) {
                this.previousSlide = this.slides[this.slides.length - 1]
                this.previousPrevSlide = this.slides[this.slides.length - 2]
            } else {
                this.previousSlide = this.slides[this.selectedIndex - 1]
                this.previousPrevSlide = this.slides[this.selectedIndex - 2]
            }

            if (this.selectedIndex === 1) {
                this.previousPrevSlide = this.slides[this.slides.length - 1]
            } else {}

            if (this.selectedIndex + 1 === this.slides.length) {
                this.nextSlide = this.slides[0]
                this.nextNextSlide = this.slides[1]
            } else {
                this.nextSlide = this.slides[this.selectedIndex + 1]
                this.nextNextSlide = this.slides[this.selectedIndex + 2]
            }

            if (this.selectedIndex + 2 === this.slides.length) {
                this.nextNextSlide = this.slides[0]
            } else {}

            changeSlideClasses(this.previousSlide, 'add', 'is-previous')
            changeSlideClasses(this.previousPrevSlide, 'add', 'is-previous-previous')
            changeSlideClasses(this.nextSlide, 'add', 'is-next')
            changeSlideClasses(this.nextNextSlide, 'add', 'is-next-next')
        }
        function changeSlideClasses(slide, method, className) {
            if (!slide) {
                return
            }
            slide.getCellElements().forEach(function (cellElem) {
                cellElem.classList[method](className)
            })
        }
    }

    //add google fonts
    var stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.type = "text/css";
    stylesheet.href = window.webFont;
    // document.head.appendChild(stylesheet);
    
    // Combine multiple forEach loops into one
    componentAry.forEach((elm) => {
        // Destructuring assignment to get attributes
        const { compName, plugin } = elm.dataset;
        if (compName && plugin) {
            // Use Set.add directly instead of converting to an array
            actionArySet.add(compName);
            // Move the try-catch block outside the loop for better performance
            let tmpCompInstance;
            try {
                tmpCompInstance = new this[compName]();
                if(elm.getAttribute("data-prevent-init")!=="true"){
                    tmpCompInstance.init(elm);
                }
            } catch (error) {
                console.error(`Error initializing component ${compName}: ${error.message}`);
            }
        }
    });

    /* hack */
    // 請根據以下列表以準備文件修正桌機格線錯誤
    var selectElement = document.querySelector('.download-block .row .col-12.col-md-9');
    if(selectElement){
        selectElement.classList.add('col-lg-12');
    }
    const oldHeaderElm = document.querySelector(".cli-header");
    if(oldHeaderElm){
        const htmlElement = document.querySelector('html');
        htmlElement.classList.add('polyfill');
    }
    // Get the img element
    var imgElement;
    var newDivElement;

    //hack green wave image width issue
    const bgWaveElms = document.querySelectorAll('.bg-wave');
    Array.from(bgWaveElms).forEach(bgElm=>{
        newDivElement = document.createElement('div');
        newDivElement.classList.add('image-container');
        newDivElement.style.position = 'relative';
        newDivElement.style.top = '-125px';
        newDivElement.style.height = '90px';
        newDivElement.style.overflow = 'hidden';
        bgElm.parentNode.insertBefore(newDivElement, bgElm);
        newDivElement.appendChild(bgElm);
        bgElm.style.top = `0px`;
    })
    //hack people image width issue
    const hackImgAry = [];
    // hackImgAry.push({"src":"https://www.cathay-ins.com.tw/CXIDocs/PF/image/common/empty-section-bg.png","top":"0","height":"526","position":"absolute"});
    // hackImgAry.push({"src":"https://www.cathay-ins.com.twhttps://www.cathay-ins.com.tw/cathayins/-/media/12770821e32e4b8dbc09dc32524fe4bf.png?la=zh-tw&sc_lang=zh-tw","top":"240","height":"195"});
    // hackImgAry.push({"src":"https://www.cathay-ins.com.twhttps://www.cathay-ins.com.tw/cathayins/-/media/d0f3454778214e8cac38a9135d28de45.png?v=1","top":"240","height":"456","position":"absolute"});
    // hackImgAry.push({"src":"https://cathaybkdev.esi-tech.nethttps://www.cathay-ins.com.tw/cathayins/-/media/12770821e32e4b8dbc09dc32524fe4bf.png?la=zh-tw&h=195&w=595&sc_lang=zh-tw","top":"240","height":"195"});

    hackImgAry.push({"src":"/CXIDocs/PF/image/common/empty-section-bg.png","top":"0","height":"526","position":"absolute"});
    hackImgAry.push({"src":"/media/12770821e32e4b8dbc09dc32524fe4bf.png","top":"240","height":"195"});
    hackImgAry.push({"src":"/media/d0f3454778214e8cac38a9135d28de45.png","top":"240","height":"456","position":"absolute"});

    hackImgAry.forEach(item=>{
        // imgElement = document.querySelector(`img[src="${item.src}"]`);
        imgElement = document.querySelector(`img[src*="${item.src}"]`);
        // Split the URL string by '/'
        const parts = item.src.split('/');
        let filenameWithExtension = parts[parts.length - 1];

        // Find the position of the last dot (.) which indicates the beginning of the file extension
        const dotIndex = filenameWithExtension.lastIndexOf('.');
        
        // Remove the file extension
        
        // Get the last part which should be the filename
        let filename = "";
        filename = parts[parts.length - 1];
        const filenameWithoutExtension = "img_"+filename.substring(0, dotIndex);
        
        if(imgElement){
        newDivElement = document.createElement('div');
        newDivElement.classList.add('image-container',filenameWithoutExtension);
        if(item.position){
            newDivElement.style.position = item.position;
        }else{
            newDivElement.style.position = 'relative';
        }
        // newDivElement.style.height = `${item.height}px`;
        // newDivElement.style.width = `100%`;
        // newDivElement.style.overflow = 'hidden';
        // newDivElement.style.top = `${item.top}px`;
        imgElement.parentNode.insertBefore(newDivElement, imgElement);
        newDivElement.appendChild(imgElement);
    }
    })

    // Creating a new PageReady event
    const pageReadyEvent = new Event('pageReady');
    document.dispatchEvent(pageReadyEvent);
});