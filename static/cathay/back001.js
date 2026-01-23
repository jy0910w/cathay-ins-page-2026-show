function back001() {
    let scope;
    const update = ()=>{
        const msg002 = document.querySelector("[msg002]");
        if (msg002) {
            const isExpanded = msg002.getAttribute("aria-expanded") === "true";
            scope.classList.remove(isExpanded ? "tw-bottom-20" : "tw-bottom-88");
            scope.classList.add(isExpanded ? "tw-bottom-88" : "tw-bottom-20");
        } else {
            scope.classList.add("tw-bottom-20");
            // console.log("Element with [msg002] attribute not found.");
        }
    }

    const goToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    // Main functionality
    const main = (a_scope) =>{
        scope = a_scope instanceof HTMLElement ? a_scope : document.querySelector(a_scope);
        if (!scope) {
            console.error(`Element not found: ${a_scope}`);
            return;
        }

        document.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                // scope.style.opacity = 1;
                document.documentElement.classList.add("hasBack001");
                scope.classList.remove("tw-opacity-0", "tw-cursor-default", "tw-pointer-events-none");
                scope.classList.add("tw-opacity-100", "tw-cursor-pointer","hover:tw-opacity-50");
            } else {
                // Scroll position is 20 pixels or less
                document.documentElement.classList.remove("hasBack001");
                scope.classList.remove("tw-opacity-100", "tw-cursor-pointer","hover:tw-opacity-50");
                scope.classList.add("tw-opacity-0", "tw-cursor-default", "tw-pointer-events-none");
            }
        });
        document.dispatchEvent(new Event('scroll'));


        document.addEventListener('onMsg002Close', function(event) {
            update();
        });

        scope.addEventListener("click",()=>{
            scope.classList.add("tw-cursor-default", "tw-pointer-events-none");
            goToTop();
        })
        update();
    }

    return {
        init: (elementOrSelector) => {
            main(elementOrSelector);
        }
    }
}
