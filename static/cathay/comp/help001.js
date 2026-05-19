function help001() {
    const BREAKPOINT = window.breakpoint || 992;
    let triggers;
    let collapses;
    let currentWidth;
    let mode = window.innerWidth >= BREAKPOINT ? "lg" : "sm";

    // Resize function
    const resize = ()=>{
        if(currentWidth === window.innerWidth) return;
        currentWidth = window.innerWidth;
        const prevMode = mode;
        mode = currentWidth >= BREAKPOINT ? "lg" : "sm";
        if (mode !== prevMode && mode === "lg") {
            Array.from(triggers).forEach(trigger => {
                const collapse = Array.from(collapses).find(c => trigger.dataset.collapseTarget === c.dataset.collapse);
                collapse.style.removeProperty('height');
                trigger.removeAttribute("open");
            });
        }
    }
    
    const clickHandler = (event, trigger, collapse) => {
        if(mode==='lg')
            return;
        const isOpen = collapse.style.height && collapse.style.height !== "0px";
        if (isOpen) {
            collapse.style.height = 0;
            trigger.removeAttribute("aria-expanded");
        } else {
            collapse.style.height = `${collapse.scrollHeight}px`;
            trigger.setAttribute("aria-expanded", "true");
        }
    };

    const initCollapse = ()=>{
        Array.from(triggers).forEach(trigger => {
            const collapse = Array.from(collapses).find(c => trigger.dataset.collapseTarget === c.dataset.collapse);
            trigger.addEventListener("click",  (event) => clickHandler(event, trigger, collapse));
        });
    }
    // Add event listeners
    const addEventListener = () => {
        window.removeEventListener('resize', resize);
        window.addEventListener('resize', debounce(resize, 100));
        window.addEventListener("orientationchange", ()=>{
            setTimeout(()=>{
                resize();
            },500);
        });
        resize();
        initCollapse();
    };

    // Main functionality 
    const main = (a_scope) =>{
        const scope = a_scope instanceof HTMLElement ? a_scope : document.querySelector(a_scope);
        if (!scope) {
            console.error(`Element not found: ${a_scope}`);
            return;
        }

        triggers = scope.querySelectorAll("[data-collapse-target]");
        collapses = scope.querySelectorAll("[data-collapse]");
        
        addEventListener();
    }

    return {
        init: (elementOrSelector) => {
            main(elementOrSelector);
        }
    }
}
