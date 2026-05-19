function login001() {
    const COMP_NAME = "login001";
    let scope;
    const BTNATTR = "login001Btn";
    let loginUrl = "",
        loginLinkTitle = "",
        loginLinkTarget = "";

    AbortSignal.timeout ??= function timeout(ms) {
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), ms);
        return ctrl.signal;
    };

    /**
     * 檢驗登入狀態
     * @returns Promise
     */
    async function chkLogin() {
        return;
        return fetch("/INSOCWeb/servlet/HttpDispatcher/OCH1_0000/checkIsLogin", {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            method: "POST",
            body: "",
            signal: AbortSignal.timeout(120 * 1000),
        })
            .then((resp) => resp.json())
            .then((data) => {
                switch (data.status) {
                    case "N":
                        addLoginBtn().then(resetStyle);
                        break;
                    case "Y":
                        addLogoutBtn().then(resetStyle);
                        if (data.uniquePageNo) {
                            const uniqNo = document.createElement("input");
                            uniqNo.value = data.uniquePageNo;
                            uniqNo.name = "uniquePageNo";
                            uniqNo.id = "uniquePageNo";
                            uniqNo.type = "hidden";
                            document.body.appendChild(uniqNo);
                        }
                        break;
                }
            })
            .catch((err) => {
                console.error(err);
                addLoginBtn().then(resetStyle);
            });
    }

    async function resetStyle() {
        //重新設定桌機版的會員中心下拉選單寬度，不讓登入按鈕斷行
        const subnavElm = document.querySelector("[data-is-member]");
        subnavElm.style.display = "block";
        subnavElm.style.width = 'auto';
        const lv2Width = subnavElm.querySelector("[header001NavLv2]").getBoundingClientRect().width;
        subnavElm.style.width = lv2Width;
        subnavElm.style.display = "none";
    }

    /**
     * 登出
     * @returns Promise
     */
    async function logout() {
        let uniqNo = document.getElementById("uniquePageNo");
        if (uniqNo) {
            uniqNo.remove();
        }
        return fetch("/INSOCWeb/servlet/HttpDispatcher/logout/logout", {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            method: "POST",
            body: "",
            signal: AbortSignal.timeout(120 * 1000),
        })
            .then((resp) => resp.json())
            .then(chkLogin)
            .catch((err) => {
                console.log(err);
                chkLogin();
            });
    }

    /**
     * 新增登入按鈕
     * @returns Promise
     */
    async function addLoginBtn() {
        await removeBtn();
        let url = await buildLoginUrl();
        let comp = document.querySelectorAll(`[data-comp-name="${COMP_NAME}"]`);
        comp.forEach((ele) => {
            let tempNode = document.createElement("div");
            let deviceType = ele.dataset.device;
            let cssClass =
                deviceType === "mobile"
                    ? "tw-btn-primary tw-group tw-inline-flex tw-items-center tw-px-36"
                    : "tw-btn-primary tw-group tw-px-36";
            tempNode.innerHTML = `<a ${BTNATTR} href="${url}" class="${cssClass}" title="${loginLinkTitle}" target="${loginLinkTarget}">
                                    <div>登入</div>
                                    <div class="tw-ml-8 tw-h-24 tw-w-25 tw-text-white">
                                        <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <path d="M2.5 15.3332H22.5L14.5 8.6665" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </a>`;
            tempNode.firstElementChild.addEventListener("click", function (e) {
                chkLogin();
            });
            ele.appendChild(tempNode.firstElementChild);
        });
    }

    /**
     * 新增登出按鈕
     * @returns Promise
     */
    async function addLogoutBtn() {
        let comp = document.querySelectorAll(`[data-comp-name="${COMP_NAME}"]`);
        await removeBtn();
        comp.forEach((ele) => {
            let tempNode = document.createElement("div");
            let deviceType = ele.dataset.device;
            let cssClass =
                deviceType === "mobile"
                    ? "tw-min-w-[142px] tw-btn-secondary"
                    : "tw-btn-secondary tw-px-36";
            tempNode.innerHTML = `<a ${BTNATTR} href="javascript:void(0)" class="${cssClass}" title="點擊登出會員中心"><div>登出</div></a>`;
            tempNode.firstElementChild.addEventListener("click", function (e) {
                logout();
            });
            ele.appendChild(tempNode.firstElementChild);
        });
    }

    /**
     * 移除元件按鈕
     * @returns Promise
     */
    async function removeBtn() {
        let comp = document.querySelectorAll('[data-comp-name="login001"]');
        if (comp.length) {
            comp.forEach((e) => {
                // 移除現有連結項目
                let links = e.querySelectorAll(`[${BTNATTR}]`);
                if (links.length) {
                    links.forEach((ele) => {
                        ele.remove();
                    });
                }
            });
        }
    }

    /**
     * 取得登入連結狀態
     * @returns Promise
     */
    async function getLoginUrl() {
        window.loginExecuted = true;
        let comp = document.querySelector(
            `[data-comp-name="${COMP_NAME}"] [${BTNATTR}]`
        );
        if (comp) {
            let href = comp.getAttribute("href");
            if (href) {
                loginUrl = href;
            }
            let title = comp.getAttribute("title");
            if (title) {
                loginLinkTitle = title;
            }
            let target = comp.getAttribute("target");
            if (target) {
                loginLinkTarget = target;
            }
        }
    }

    async function buildLoginUrl() {
        let url = new URL(loginUrl);
        let search = new URLSearchParams(url.search);
        let fromKey = "regFrom";
        //let key = "loginForwardTrx";
        search.delete(fromKey);
        //search.delete(key);
        search.append(fromKey, "cathayins");
        //search.append(key, "OCH1_1000/prompt");
        url.search = search;
        return url.toString();
    }

    // Main functionality
    const main = (a_scope) => {
        scope =
            a_scope instanceof HTMLElement
                ? a_scope
                : document.querySelector(a_scope);

        /** 載入執行*/
        if (!window.loginExecuted) {
            (async () => {
                await getLoginUrl();
                await removeBtn();
                await chkLogin();
            })();
        }
    };

    return {
        init: (elementOrSelector) => {
            main(elementOrSelector);
        },
    };
}