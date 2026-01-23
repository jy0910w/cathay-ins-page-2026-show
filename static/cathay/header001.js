function header001() {
    const BREAKPOINT = window.breakpoint || 992;
    const EXTRA_SPACE = 200;
    let mode;
    let scope;
    let navAry;
    let bizNavWrapElm;
    let navTogglerElm;
    let navLv1Elms;
    let navLv2WrapElms;
    let navLv2Elms;
    let navLv3WrapElms;
    let currentLv = 0;
    let currentWidth;
    let navLv1WrapElm;
    let mainNavWrap;
    let navLv2Ary = [];
    let navLv3Ary = [];
    let scrollTop = 0;
    let iconWrap;
    // Resize function
    const resize = () => {



        if (currentWidth === window.innerWidth) return;
        currentWidth = window.innerWidth;
        const prevMode = mode;
        mode = currentWidth >= BREAKPOINT ? "lg" : "sm";


        if (mode === "sm") {
            // alert("change to sm "+currentWidth)
            Array.from(iconWrap).forEach(elm => {
                const brickGap = 12;
                const brickW = 100;
                let totalW = elm.getBoundingClientRect().width;
                let rowsTotal = Math.floor(totalW / brickW);
                const needW = rowsTotal * brickW + (rowsTotal - 1) * brickGap;
                if (needW > totalW) {
                    rowsTotal -= 1;
                }
                totalW = totalW - (rowsTotal - 1) * brickGap;
                const iconW = (totalW / rowsTotal);
                const icons = elm.querySelectorAll("[header001SubitemBoxIconLink]");
                Array.from(icons).forEach(iconItem => {
                    iconItem.style.width = `${iconW}px`;
                })
            })
        }

        if (mode !== prevMode && mode === "lg") {
            // alert("change to lg"+currentWidth)
            const icons = scope.querySelectorAll("[header001SubitemBoxIconLink]");
            Array.from(icons).forEach(iconItem => {
                iconItem.removeAttribute("style");
            })
            navTogglerElm.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "auto";
            document.body.style.position = "static";

            navLv1WrapElm.removeAttribute("style");
            mainNavWrap.removeAttribute("style");


            navAry.forEach(item => {
                item.expanded = false;
                item.navLv1.dispatchEvent(new Event('mouseleave'))
            });

            navLv2Ary.forEach(item => {
                item.active = false;
                item.elm.removeAttribute("style");
                item.elm.style.display = "none";
                item.elm.style.position = "relative";
                item.elm.style.top = `0px`;
            })

            Array.from(navLv2Elms).forEach((item) => {
                item.removeAttribute('style');
            })

            navLv3Ary.forEach(item => {
                item.elm.removeAttribute("style");
            })
        }
        if (mode !== prevMode && mode === "sm") {
            navLv1WrapElm.removeAttribute("style");
            navLv1WrapElm.style.display = "none";
            //
            Array.from(navLv2Elms).forEach((item) => {
                item.removeAttribute('style');
            })
            navLv2Ary.forEach(item => {
                item.active = false;
                item.elm.removeAttribute("style");
                item.elm.style.transform = `translateX(100vw)`;
                item.elm.style.position = "fixed";
                item.elm.style.visibility = "hidden";
                item.elm.style.overflowX = "hidden";
                item.elm.style.overflowY = "auto";
                item.elm.style.top = `${computed.subnavY}px`;
                item.elm.style.left = `0px`;
                item.elm.style.bottom = `0px`;
            })

            navLv3Ary.forEach(item => {
                item.elm.removeAttribute("style");
                item.elm.style.transform = `translateX(100vw)`;
                item.elm.style.position = "fixed";
                item.elm.style.visibility = "hidden";
                item.elm.style.top = `0px`;
                item.elm.style.left = `0px`;
            })
        }
    }

    const computed = {
        get subnavY() {
            const rect = scope.getBoundingClientRect()
            const biz = bizNavWrapElm.getBoundingClientRect()
            return rect.height + rect.y + biz.height
        },
        get subnavYWithoutMsg001() {
            const rect = scope.getBoundingClientRect()
            const biz = bizNavWrapElm.getBoundingClientRect()
            return rect.height + biz.height
        },
        get scrollTop() {
            return window.scrollY || document.documentElement.scrollTop;
        }
    };

    // Add event listeners
    const addEventListener = () => {
        window.removeEventListener('resize', resize);
        window.addEventListener('resize', debounce(resize, 100));
        window.addEventListener("orientationchange", () => {
            if (mode === "lg") {
                navAry.forEach(item => {
                    item.expanded = false;
                    item.navLv1.dispatchEvent(new Event('mouseleave'))
                    item.navLv1.dispatchEvent(new Event('mouseout'))
                });

                navLv2Ary.forEach(item => {
                    item.active = false;
                    item.elm.style.display = "none";
                })
            }
            setTimeout(() => {
                resize();
            }, 500);
        });
        resize();
    };

    const updateNav = () => {
        let hasExpanded = false;
        navAry.forEach(item => {
            if (mode === "lg") {
                if (item.expanded && item.navLv2) {
                    const lv1Rect = item.navLv1.getBoundingClientRect();
                    const lv1Left = lv1Rect.left;

                    item.navLv2.style.display = "block";

                    const navLv2InnerWidth = item.navLv2.querySelector("[header001NavLv2]").getBoundingClientRect().width
                    item.navLv2.style.width = `${navLv2InnerWidth}px`;
                    const lv2Rect = item.navLv2.getBoundingClientRect();

                    item.navLv2.style.position = "relative"
                    item.navLv2.style.left = `${lv1Left}px`;
                    const lv2Shift = -lv2Rect.width / 2 + item.navLv1.clientWidth / 2;
                    const overflowRight = currentWidth - (lv1Left + lv2Rect.width / 2 + item.navLv1.clientWidth / 2 + 40);

                    const overflowLeft = (lv2Rect.width / 2 - lv1Left);

                    // console.log("123",);
                    if (overflowRight < 0) {
                        item.navLv2.style.transform = `translate(${lv2Shift + overflowRight}px,0px)`;
                    } else {
                        if (overflowLeft >= 0) {
                            item.navLv2.style.transform = `translate(${lv2Shift + overflowLeft}px,0px)`;
                        } else {
                            item.navLv2.style.transform = `translate(${lv2Shift}px,0px)`;
                        }
                    }

                    hasExpanded = true;
                }
                if (!item.expanded && item.navLv2) {
                    item.navLv2.style.display = "none";
                }
            }
        })

        if (mode === "sm") {
            mainNavWrap.style.transform = `translateX(0%)`;
            if (currentLv === 0) {
                navLv2Ary.forEach((item, index) => {
                    item.elm.style.transform = `translateX(100%)`;
                    setTimeout(() => {
                        item.elm.style.visibility = "hidden";
                    }, 500)
                })
            }

            if (currentLv === 1) {
                navLv2Ary.forEach((item, index) => {
                    if (item.active === true) {
                        item.elm.style.transform = `translateX(0%)`;
                        item.elm.style.visibility = "visible";
                        item.elm.style.zIndex = "10";
                    } else {
                        item.elm.style.transform = `translateX(100%)`;
                        item.elm.style.zIndex = "5";
                        setTimeout(() => {
                            item.elm.style.visibility = "hidden";
                        }, 500)
                    }
                })

                navLv3Ary.forEach((item, index) => {
                    if (item.active === true) {
                        item.elm.style.transform = `translateX(0%)`;
                        item.elm.style.visibility = "visible";
                        item.elm.style.zIndex = "10";
                    } else {
                        item.elm.style.transform = `translateX(100%)`;
                        item.elm.style.zIndex = "5";
                        setTimeout(() => {
                            item.elm.style.visibility = "hidden";
                        }, 500)
                    }
                })
            }

            if (currentLv === 2) {
                navLv3Ary.forEach((item, index) => {
                    if (item.active === true) {
                        item.elm.style.transform = `translateX(0%)`;
                        item.elm.style.visibility = "visible";
                        item.elm.style.zIndex = "10";
                    } else {
                        item.elm.style.transform = `translateX(100%)`;
                        item.elm.style.visibility = "hidden";
                        item.elm.style.zIndex = "5";
                    }
                })
            }
        }
    }
    const lockBody = (isLock) => {
        if (isLock) {
            scrollTop = computed.scrollTop;
            document.body.style.top = `-${scrollTop}px`;
            document.body.style.width = `100%`;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
        } else {

            document.body.style.overflow = "auto";
            document.body.style.top = "auto";
            document.body.style.position = "static";

            window.scrollTo({
                top: scrollTop,
                behavior: 'instant'
            });
        }
    }
    // Main functionality 
    const main = (a_scope) => {
        scope = a_scope instanceof HTMLElement ? a_scope : document.querySelector(a_scope);
        if (!scope) {
            console.error(`Element not found: ${a_scope}`);
            return;
        }
        navAry = [];
        mainNavWrap = scope.querySelector("[header001MainNavWrap]");

        iconWrap = scope.querySelectorAll("[header001SubitemBoxIconLinkWrap]")

        navLv1WrapElm = scope.querySelector("[header001ItemWrap]");

        bizNavWrapElm = scope.querySelector("[header001BizItemWrap]");
        navLv1Elms = scope.querySelectorAll("[header001NavLv1]");
        navLv2WrapElms = scope.querySelectorAll("[header001NavLv2Wrap]");
        navLv2Elms = scope.querySelectorAll("[header001NavLv2]");
        navLv3WrapElms = scope.querySelectorAll("[header001NavLv3Wrap]");

        // NavToggler
        navTogglerElm = scope.querySelector("[header001NavToggler]");
        navTogglerElm.addEventListener("click", (event) => {
            const isOpen = navTogglerElm.getAttribute("aria-expanded") === "true";
            if (isOpen) {
                currentLv = 0;
                navTogglerElm.setAttribute("aria-expanded", "false");
                navLv1WrapElm.style.display = "none";
                lockBody(false);
                navLv2Ary.forEach(item => {
                    item.active = false;
                    item.elm.style.visibility = "hidden";
                    item.elm.style.transform = `translateX(100vw)`;
                })
                navLv3Ary.forEach(item => {
                    item.active = false;
                    item.elm.style.visibility = "hidden";
                    item.elm.style.transform = `translateX(100vw)`;
                })
            } else {
                lockBody(true);
                currentLv = 0;
                navTogglerElm.setAttribute("aria-expanded", "true");
                mainNavWrap.style.height = `calc(100vh - ${computed.subnavY}px)`;
                mainNavWrap.style.maxHeight = `calc(100vh - ${computed.subnavY}px)`;
                mainNavWrap.style.overflowY = `auto`;
                mainNavWrap.style.paddingBottom = `${EXTRA_SPACE}px`;

                navLv1WrapElm.style.display = "block";
                navLv2Ary.forEach(item => {
                    item.elm.style.transform = `translateX(100vw)`;
                    item.elm.style.position = "fixed";
                    item.elm.style.visibility = "hidden";
                    item.elm.style.overflowX = "hidden";
                    item.elm.style.overflowY = "auto";
                    item.elm.style.transition = "transform 500ms,top 300ms";
                    item.elm.style.willChange = "transform";
                    item.elm.style.top = `${computed.subnavY}px`;
                    item.elm.style.height = `calc(100vh - ${computed.subnavY}px)`;
                    item.elm.style.maxHeight = `calc(100vh - ${computed.subnavY}px)`;
                    item.elm.style.paddingBottom = `${EXTRA_SPACE}px`;
                    item.elm.style.left = `0px`;
                    item.elm.style.bottom = `0px`;
                })
                navLv3Ary.forEach(item => {
                    item.active = false;
                    item.elm.style.visibility = "hidden";
                    item.elm.style.transform = `translateX(100vw)`;
                    item.elm.style.transition = "transform 500ms";
                    item.elm.style.willChange = "transform";
                    item.elm.style.height = `calc(100vh - ${computed.subnavY}px)`;
                    item.elm.style.maxHeight = `calc(100vh - ${computed.subnavY}px)`;
                    item.elm.style.overflowY = `auto`;
                })
            }
        });

        Array.from(navLv1Elms).forEach((navLv1, index) => {
            const lv1Id = "header001NavLv1-" + index;
            navLv1.setAttribute("data-id", lv1Id);
            navLv1.addEventListener("mouseenter", (event) => {

                if (mode === "sm") return;
                const id = event.currentTarget.getAttribute("data-id");
                const currentNav = navAry.find(item => item.id === id);
                if (currentNav.expanded) return false;
                currentNav.expanded = true;
                updateNav();
            });

            navLv1.addEventListener("mouseleave", (event) => {
                if (mode === "sm") return;
                const id = event.currentTarget.getAttribute("data-id");
                const currentNav = navAry.find(item => item.id === id);
                if (!currentNav.expanded) return false;
                currentNav.expanded = false;
                updateNav();
            });

            //if (navLv1.getAttribute("data-lg-active") === 'disabled') {
            //    navLv1.classList.add("lg:tw-cursor-default");
            //}

            navLv1.addEventListener("click", (event) => {
                if (mode === "lg" && (event.currentTarget.getAttribute("data-lg-active") === 'disabled')) {
                    event.preventDefault();
                    return false;
                }
                if (mode === "lg") return;
                const id = event.currentTarget.getAttribute("data-id");
                const href = event.currentTarget.getAttribute("href");
                if (href === "javascript:;") {
                    const currentNav = navAry.find(item => item.id === id);
                    navLv2Ary.forEach(item => { item.active = false })
                    const foundItem = navLv2Ary.find(item => item.parent === id);
                    currentNav.expanded = true;
                    if (foundItem) {
                        foundItem.active = true;
                    }
                    currentLv = 1;
                    updateNav();
                }
            });
            //lv2
            const lv2Ary = {};
            const target = navLv1.getAttribute("data-target");
            const navLv2 = document.querySelector(target);
            const lv2Id = "header001NavLv2-" + index;
            let navLv2BackBtn;
            if (navLv2) {
                lv2Ary.main = [navLv2];
                lv2Ary.id = lv2Id;
                lv2Ary.name = target;
                navLv2Ary.push({
                    "id": lv2Id,
                    "parent": lv1Id,
                    "elm": navLv2,
                    "active": false
                })
                navLv2.setAttribute("data-id", lv2Id)
                navLv2.setAttribute("data-parent", lv1Id)
                navLv2.addEventListener("mouseenter", (event) => {
                    if (mode === "sm") return;
                    const id = event.currentTarget.getAttribute("data-parent");
                    const currentNav = navAry.find(item => item.id === id);
                    if (currentNav.expanded) return false;
                    if (currentNav) {
                        currentNav.expanded = true;
                    }
                    updateNav();
                });
                navLv2.addEventListener("mouseleave", (event) => {
                    if (mode === "sm") return;
                    const id = event.currentTarget.getAttribute("data-parent");
                    const currentNav = navAry.find(item => item.id === id);
                    if (!currentNav.expanded) return false;
                    if (currentNav) {
                        currentNav.expanded = false;
                    }
                    updateNav();
                });

                navLv2BackBtn = navLv2.querySelector("[header001NavBack]");
                if (navLv2BackBtn) {
                    navLv2BackBtn.setAttribute("data-parent", lv1Id);
                    navLv2BackBtn.addEventListener("click", (event) => {
                        currentLv = 0;
                        navLv2Ary.forEach(item => { item.active = false })
                        navLv3Ary.forEach(item => { item.active = false })

                        updateNav();
                    });
                }

                //lv3
                const navLv3WrapElms = navLv2.querySelectorAll("[header001NavLv3Wrap]");
                let lv3Ary = [];
                navLv3TriggerElms = navLv2.querySelectorAll("[header001NavLv3Trigger]");
                if (navLv3TriggerElms) {
                    Array.from(navLv3TriggerElms).forEach((navLv3Trigger, index) => {
                        const lv3Id = "header001NavLv3-" + index;
                        const navLv3 = navLv3WrapElms[index];
                        navLv3.setAttribute("data-id", lv3Id);
                        navLv3Trigger.setAttribute("data-id", lv3Id);
                        navLv3.setAttribute("data-parent", lv2Id);
                        navLv3Ary.push({
                            "id": lv3Id,
                            "parent": lv2Id,
                            "trigger": navLv3Trigger,
                            "elm": navLv3,
                            "active": false
                        });
                        //
                        navLv3Trigger.addEventListener("click", (event) => {
                            if (mode !== "sm") return;
                            currentLv = 2;
                            const id = event.currentTarget.getAttribute("data-id");
                            navLv3Ary.forEach(item => {
                                item.active = false;
                            })
                            const foundItem = navLv3Ary.find(item => item.id === id)
                            foundItem.active = true;

                            updateNav();
                        });

                        navLv3BackBtn = navLv3.querySelector("[header001NavBack]");
                        if (navLv3BackBtn) {
                            navLv3BackBtn.setAttribute("data-parent", lv2Id);
                            navLv3BackBtn.addEventListener("click", (event) => {
                                currentLv = 1;

                                navLv3Ary.forEach(item => {
                                    item.active = false;
                                })
                                updateNav();
                            });
                        }
                    });
                }

                lv2Ary.child = lv3Ary;
            } else {
                const iconElm = navLv1.querySelector("[header001NavLv1Icon]");
                if (iconElm) {
                    iconElm.remove();
                }

            }
            navAry.push({ "id": lv1Id, "navLv1": navLv1, "navLv2": navLv2, "data": lv2Ary, "expanded": false });
        });

        document.addEventListener('onMsg001Close', function (event) {
            if (mode === "sm") {
                navLv2Ary.forEach(item => {
                    item.elm.style.top = `${computed.subnavYWithoutMsg001}px`;
                })
            } else {
                navLv2Ary.forEach(item => {
                    item.elm.style.top = `0px`;
                })
            }
        });

        updateNav();
        addEventListener();
    }

    return {
        init: (elementOrSelector) => {
            main(elementOrSelector);
        }
    }
}