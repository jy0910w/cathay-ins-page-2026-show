// Wrap the entire code in an IIFE to create a separate scope
(() => {
    const ARIA_TERM = "aria-expanded";
    const TARGET_TERM = "data-target";
    const DELAY_TIME = 100;
    const ATTRIBUTE_NAME = "tooltip";
    const CHARACTER_WIDTH = 15;
    const MAX_CONTAINER_WIDTH = 300;
    const GAP = 20;
    const ICON_WIDTH = 24;
    const TEMPLATE = "<div tw-reset tooltip001 aria-show='false' class='tw-absolute tw-pt-4 tw-transition-opacity tw-duration-300 tw-will-change-opacity'><svg class='tw-ml-3' width='18' height='15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.229 1.8c1.231-2.133 4.31-2.133 5.542 0l4.85 8.4c1.232 2.133-.308 4.8-2.771 4.8h-9.7c-2.463 0-4.003-2.667-2.771-4.8l4.85-8.4Z' fill='#293235' /></svg><div tooltipContent class='-tw-mt-7 tw-rounded-8 tw-bg-neutral-variant-800 tw-px-10 tw-py-12 tw-text-white'></div></div>"
    let isMouseOver = false;
    let currentTooltipElm;
    let tooltipTriggerElms;
    let tooltipTriggerElmsAry;
    // Check if globalTooltipStore is already defined before creating it
    if (typeof globalTooltipStore === 'undefined') {
        const globalTooltipStore = (() => {
            let data = [];

            return {
                destroy:(elm)=>{
                    elm.setAttribute(ARIA_TERM, "false");
                    const tooltip = document.querySelector('#'+elm.getAttribute(TARGET_TERM));
                    if(tooltip){
                    var fadeOutDuration = 350;
                    setTimeout(function() {
                      tooltip.style.opacity = 0;
                    }, 100); 

                    setTimeout(function() {
                        tooltip.remove();
                      }, fadeOutDuration);
                    }
                },
                remove: (elm) => {
                    const index = data.indexOf(elm);
                    if (index !== -1) {
                        data.splice(index, 1);
                    }
                    globalTooltipStore.destroy(elm);
                },
                removeAll: () => {
                    data.forEach((elm)=>{
                        globalTooltipStore.destroy(elm);
                    })
                    data = [];
                },
                add: (elm) => {
                    if (data.indexOf(elm) === -1) {
                        setTimeout(() => {
                            data.push(elm);
                        }, DELAY_TIME);
                    }
                },
                get: () => data,
            };
        })();

        /*
        const handleScroll = () => {
            const storedElements = globalTooltipStore.get();
            storedElements.forEach((element) => {
                element.setAttribute(ARIA_TERM, "false");
            });
            globalTooltipStore.removeAll();
        };
        */
        // Add a scroll event listener to collapse all tooltips on scroll
        //document.addEventListener('scroll', handleScroll);

        // Add a single click event listener to the document for event delegation
       /*
       document.addEventListener('click', (event) => {
            const target = event.target;
            const storedElements = globalTooltipStore.get();

            if (storedElements.length === 0) return;

            let foundElement = false;

            for (let i = 0; i < storedElements.length; i++) {
                if (storedElements[i].contains(target)) {
                    foundElement = true;
                    break;
                } else {
                    storedElements[i].setAttribute(ARIA_TERM, "false");
                }
            }

            if (!foundElement) {
                globalTooltipStore.removeAll();
            }
        });*/

        let checkInt;
        const updateTooltip = ()=>{
            clearTimeout(checkInt);
            checkInt = setTimeout(()=>{
                tooltipTriggerElms.forEach((tooltip) => {
                    if(tooltip.getAttribute(ARIA_TERM) === "false"){
                        globalTooltipStore.remove(tooltip);
                    }
                });
            },100);
        }

        const initializeTooltips = () => {
            tooltipTriggerElms = document.querySelectorAll("[" + ATTRIBUTE_NAME + "]");
            tooltipTriggerElmsAry = [];
            tooltipTriggerElms.forEach((tooltip) => {

                if(tooltip.getAttribute("data-init")==="true"){
                    return;
                }
                const tooltipId  = 'tooltip-'+Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                tooltipTriggerElmsAry.push({
                    id:tooltipId,
                    elm:tooltip,
                    status:false
                })
                tooltip.setAttribute("data-init", "true");
                tooltip.setAttribute(TARGET_TERM, tooltipId);
                tooltip.addEventListener('mouseenter', () => {
                    tooltip.querySelector("[tooltipIcon]").classList.remove("tw-delay-300");
                    if(tooltip.getAttribute(ARIA_TERM) === "true") return;
                    tooltip.setAttribute(ARIA_TERM, "true");
                    isMouseOver = true;
                    const tooltipId  = tooltip.getAttribute(TARGET_TERM);
                    const hasTooltipElm = document.querySelector('#'+tooltipId);
                    if(hasTooltipElm){
                        hasTooltipElm.remove();
                    }else{
                        // console.log('create new');
                    }

                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = TEMPLATE;
                    currentTooltipElm = document.body.insertBefore(tempContainer.firstChild, document.body.lastChild);
                    currentTooltipElm.id = tooltipId;
                    globalTooltipStore.add(tooltip);
                    const tooltipRec = tooltip.getBoundingClientRect();
                    currentTooltipElm.style.position = "absolute";
                    const top = window.scrollY+tooltipRec.bottom;
                    const left = window.scrollX+tooltipRec.left;
                    currentTooltipElm.style.top = `${top}px`;
                    currentTooltipElm.style.left = `${left}px`;
                    const element = currentTooltipElm.querySelector("[tooltipContent]");
                    element.innerHTML = tooltip.querySelector("[tooltipContent]").innerHTML;
                    if (element) {
                        const textContent = element.textContent.trim();
                        element.style.width = null;
                        element.style.marginLeft = null;
                        let textLength = 0;
                        for (let i = 0; i < textContent.length; i++) {
                            const char = textContent[i];
                            const charWidth =
                              (char >= "\u0020" && char <= "\u007E") ||
                              (char >= "\uFF01" && char <= "\uFF5E")
                                ? 1
                                : 2;
                        
                                textLength += charWidth;
                        }
                        const calculatedWidth = Math.min(textLength * CHARACTER_WIDTH, MAX_CONTAINER_WIDTH);
                        element.style.width = calculatedWidth + "px";
                        const rect = element.getBoundingClientRect();
                        const isPartiallyOutside =
                            rect.right < 0 ||
                            rect.left+calculatedWidth/2 > window.innerWidth ||
                            rect.bottom < 0 ||
                            rect.top > window.innerHeight;
    
                        currentTooltipElm.style.top = rect.top;
                        let translateXValue;
                        if(isPartiallyOutside){
                            translateXValue = window.innerWidth - (rect.left+calculatedWidth+ICON_WIDTH/2+GAP);
                        }else{
                            translateXValue = -calculatedWidth/2+ICON_WIDTH/2;
                        }
                        element.style.marginLeft = `${translateXValue}px`;

                        currentTooltipElm.addEventListener('mouseenter',()=>{
                            isMouseOver = true;
                            tooltip.querySelector("[tooltipIcon]").classList.remove("tw-delay-300");
                            tooltip.setAttribute(ARIA_TERM, "true");
                        })

                        currentTooltipElm.addEventListener('mouseleave',()=>{
                            isMouseOver = false;
                            tooltip.querySelector("[tooltipIcon]").classList.add("tw-delay-300");
                            tooltip.setAttribute(ARIA_TERM, "false");
                            updateTooltip();
                        })
                    } 
                });
        
                tooltip.addEventListener('mouseleave', () => {
                    isMouseOver = false;
                    tooltip.querySelector("[tooltipIcon]").classList.add("tw-delay-300");
                    tooltip.setAttribute(ARIA_TERM, "false");
                    updateTooltip();
                });

                /*
                tooltip.addEventListener('click', (event) => {
                    if (!isMouseOver) {
                        const newExpandedValue = tooltip.getAttribute(ARIA_TERM) === "true" ? "false" : "true";
                        tooltip.setAttribute(ARIA_TERM, newExpandedValue);
                        globalTooltipStore.add(tooltip);
                    }
                });
                */
            });
        };

        // Initialize tooltips when the script is executed
        initializeTooltips();

        document.addEventListener("updateTooltip",()=>{
            initializeTooltips();
        });

    } else {
        console.error("globalTooltipStore is already defined.");
    }
})();
