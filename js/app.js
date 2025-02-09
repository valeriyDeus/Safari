(() => {
    "use strict";
    var __webpack_modules__ = {
        990: () => {
            if (typeof Object.assign !== "function") Object.assign = function(target) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                if (!target) throw TypeError("Cannot convert undefined or null to object");
                var _loop_1 = function(source) {
                    if (source) Object.keys(source).forEach((function(key) {
                        return target[key] = source[key];
                    }));
                };
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var source = args_1[_a];
                    _loop_1(source);
                }
                return target;
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    const objectModules = {};
    class FormsValidation {
        constructor(options) {
            let config = {
                viewpass: false,
                autoHeight: false,
                logging: true,
                attributes: {
                    required: "data-required",
                    validate: "data-validate",
                    noValidate: "data-no-validate",
                    noFocusClasses: "data-no-focus-classes",
                    modalMessage: "data-modal-message",
                    gotoError: "data-goto-error",
                    autoHeight: "data-autoheight",
                    autoHeightMin: "data-autoheight-min",
                    autoHeightMax: "data-autoheight-max",
                    error: "data-error",
                    ajax: "data-ajax",
                    dev: "data-dev"
                },
                classes: {
                    formFocus: "form-focus",
                    formSuccess: "form-success",
                    formError: "form-error",
                    formSending: "form-sending",
                    viewPass: "viewpass",
                    viewPassActive: "viewpass-active"
                },
                errorMesseges: {
                    valueMissing: "Будь ласка, заповніть це поле",
                    tooShort: _ref => {
                        let {minLength} = _ref;
                        return `Занадто коротке значення, мінімум символів — ${minLength}`;
                    },
                    tooLong: _ref2 => {
                        let {maxLength} = _ref2;
                        return `Занадто довге значення, обмеження символів — ${maxLength}`;
                    },
                    email: {
                        invalidEmail: value => `Адреса електронної пошти повинна мати символ "@".В адресі "${value}" немає символу "@".`
                    },
                    phone: {
                        enterPhone: "Будь ласка, введіть Ваш номер телефону",
                        invalidPhone: "Ви ввели некоректний номер"
                    }
                },
                reqexp: {
                    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/,
                    phone: /^\+38\(\d{3}\)\d{3}\s\d{2}\s\d{2}$/
                },
                on: {
                    formSend: () => {}
                }
            };
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                attributes: {
                    ...config.attributes,
                    ...options?.attributes
                },
                errorMesseges: {
                    ...config.errorMesseges,
                    ...options?.errorMesseges
                },
                reqexp: {
                    ...config.reqexp,
                    ...options?.reqexp
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.eventsForm();
            this.options.autoHeight ? this.autoHeight() : null;
        }
        eventsForm() {
            document.addEventListener("focusin", (_ref3 => {
                let {target} = _ref3;
                this.focusIn(target);
            }));
            document.addEventListener("focusout", (_ref4 => {
                let {target} = _ref4;
                this.focusOut(target);
            }));
            document.addEventListener("change", (_ref5 => {
                let {target} = _ref5;
                this.inputChange(target);
            }));
            if (this.options.viewpass) document.addEventListener("click", (_ref6 => {
                let {target} = _ref6;
                this.inputViewPass(target);
            }));
            document.addEventListener("submit", (e => this.formSubmit(e)));
        }
        formSubmit(e) {
            const formElement = e.target.closest("[data-form]");
            if (!formElement) return;
            this.formSubmitAction(formElement, e);
        }
        async formSubmitAction(form, e) {
            e.preventDefault();
            const error = !form.hasAttribute(this.options.attributes.noValidate) ? this.getErrorField(form) : 0;
            if (error !== 0) {
                if (form.querySelector(this.options.classes.formError) && form.hasAttribute(this.options.attributes.gotoError)) {
                    const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : ".form-error";
                    gotoBlock(formGoToErrorClass, {
                        noHeader: true,
                        speed: 1e3
                    });
                }
                return;
            }
            const ajax = form.hasAttribute(this.options.attributes.ajax);
            const dev = form.hasAttribute(this.options.attributes.dev);
            try {
                if (ajax) {
                    const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                    const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                    const formData = new FormData(form);
                    form.classList.add(this.options.classes.formSending);
                    const response = await fetch(formAction, {
                        method: formMethod,
                        body: formMethod !== "GET" ? formData : null
                    });
                    if (!response.ok) {
                        const errorMassage = "Щось пішло не так!";
                        throw new Error(errorMassage);
                    }
                    const responseData = await response.json();
                    this.formSending(form, responseData);
                }
                if (dev) this.formSending(form);
            } catch (error) {
                this.formLogging(error);
            } finally {
                form.classList.remove(this.options.classes.formSending);
            }
        }
        formSending(form) {
            arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
            document.dispatchEvent(new CustomEvent("formSent", {
                detail: {
                    form
                }
            }));
            setTimeout((() => {
                if (objectModules.modal) {
                    const {modalMessage} = form.dataset;
                    modalMessage ? objectModules.modal.open(modalMessage) : null;
                }
            }), 0);
            this.options.on.formSend(form);
            this.formClean(form);
            this.formLogging(`Форму відправлено!`);
        }
        formClean(form) {
            form.reset();
            setTimeout((() => {
                const inputs = form.querySelectorAll("input,textarea");
                const checkboxes = form.querySelectorAll("input[type=checkbox]");
                const radioButtons = form.querySelectorAll("input[type=radio]");
                inputs.forEach((input => this.removeError(input)));
                if (checkboxes.length > 0) checkboxes.forEach((checkbox => checkbox.checked = false));
                if (radioButtons.length > 0) radioButtons.forEach((radio => radio.checked = false));
                if (objectModules.select) objectModules.select.removeActiveItems();
                if (objectModules.selects) objectModules.selects.forEach((select => {
                    console.log(select);
                    select.removeActiveItems();
                }));
            }), 0);
        }
        inputViewPass(target) {
            if (target.closest(`[class*="__${this.options.classes.viewPass}"]`)) {
                let inputType = target.classList.contains(this.options.classes.viewPassActive) ? "password" : "text";
                target.parentElement.querySelector("input").setAttribute("type", inputType);
                target.classList.toggle(this.options.classes.viewPassActive);
            }
        }
        autoHeight() {
            const textareas = document.querySelectorAll(`textarea[${this.options.attributes.autoHeight}]`);
            if (textareas.length > 0) textareas.forEach((textarea => {
                const startHeight = textarea.hasAttribute(this.options.attributes.autoHeightMin) ? +textarea.dataset.autoheightMin : +textarea.offsetHeight;
                const maxHeight = textarea.hasAttribute(this.options.attributes.autoHeightMax) ? +textarea.dataset.autoheightMax : 1 / 0;
                this._setTextAreaHeight(textarea, Math.min(startHeight, maxHeight));
                textarea.addEventListener("input", function() {
                    if (textarea.scrollHeight > startHeight) {
                        textarea.style.height = `auto`;
                        this._setTextAreaHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                    }
                }.bind(this));
            }));
        }
        _setTextAreaHeight(textarea, height) {
            textarea.style.height = `${height}px`;
        }
        inputChange(target) {
            const {type} = target;
            if (type === "checkbox" || type === "radio") this.validateField(target);
        }
        focusIn(target) {
            const {tagName} = target;
            if (tagName === "INPUT" || tagName === "TEXTAREA") {
                if (!target.hasAttribute(this.options.attributes.noFocusClasses)) {
                    target.classList.add(this.options.classes.formFocus);
                    target.parentElement.classList.add(this.options.classes.formFocus);
                }
                target.hasAttribute("data-validate") ? this.removeError(target) : null;
            }
        }
        focusOut(target) {
            const {tagName} = target;
            if (tagName === "INPUT" || tagName === "TEXTAREA") {
                if (!target.hasAttribute(this.options.attributes.noFocusClasses)) {
                    target.classList.remove(this.options.classes.formFocus);
                    target.parentElement.classList.remove(this.options.classes.formFocus);
                }
                target.hasAttribute(this.options.attributes.validate) ? this.validateField(target) : null;
            }
        }
        getErrorField(form) {
            let error = 0;
            const formRequiredItems = form.querySelectorAll(`*[${this.options.attributes.required}]`);
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateField(formRequiredItem);
            }));
            return error;
        }
        validateField(formRequiredItem) {
            if (!formRequiredItem.closest("[data-form]")) return;
            const {required} = formRequiredItem.dataset;
            const {type} = formRequiredItem;
            let error = 0;
            if (required === "name") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (formRequiredItem.value === "") {
                    this.addError(formRequiredItem);
                    this.removeSuccess(formRequiredItem);
                    error++;
                } else {
                    this.removeError(formRequiredItem);
                    this.addSuccess(formRequiredItem);
                    formRequiredItem.ariaInvalid = false;
                }
            }
            if (required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this._emailTest(formRequiredItem) && formRequiredItem.value !== "") {
                    this.addError(formRequiredItem);
                    this.removeSuccess(formRequiredItem);
                    if (!formRequiredItem.value.includes("@")) this.addError(formRequiredItem, this.options.errorMesseges.email.invalidEmail(formRequiredItem.value));
                    error++;
                } else {
                    this.removeError(formRequiredItem);
                    this.addSuccess(formRequiredItem);
                    formRequiredItem.ariaInvalid = false;
                }
            }
            if (required === "phone") if (this._phoneTest(formRequiredItem)) {
                this.addError(formRequiredItem, this.options.errorMesseges.phone.invalidPhone);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
                formRequiredItem.ariaInvalid = false;
            }
            if (type === "checkbox") if (!formRequiredItem.checked) {
                this.addError(formRequiredItem, this.options.errorMesseges.valueMissing);
                this.removeSuccess(formRequiredItem);
                error++;
            } else {
                this.removeError(formRequiredItem);
                this.addSuccess(formRequiredItem);
                formRequiredItem.ariaInvalid = false;
            }
            if (type === "radio") {
                const {name} = formRequiredItem;
                const isChecked = [ ...document.querySelectorAll(`input[name="${name}"]`) ].some((radio => radio.checked));
                if (!isChecked) {
                    document.querySelectorAll(`input[name="${name}"]`).forEach((radio => {
                        this.addError(radio, this.options.errorMesseges.valueMissing);
                        this.removeSuccess(radio);
                        radio.setAttribute("aria-invalid", "true");
                    }));
                    error++;
                } else document.querySelectorAll(`input[name="${name}"]`).forEach((radio => {
                    this.removeError(radio);
                    this.addSuccess(radio);
                    radio.setAttribute("aria-invalid", "false");
                }));
            }
            if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem, this.options.errorMesseges.valueMissing);
                this.removeSuccess(formRequiredItem);
                if (required === "phone") this.addError(formRequiredItem, this.options.errorMesseges.phone.enterPhone);
                error++;
            }
            return error;
        }
        addError(formRequiredItem) {
            let errorMessage = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
            const parentFormField = formRequiredItem.parentElement;
            const inputError = parentFormField.querySelector(".form__error");
            inputError ? parentFormField.removeChild(inputError) : null;
            formRequiredItem.classList.add(this.options.classes.formError);
            parentFormField.classList.add(this.options.classes.formError);
            formRequiredItem.ariaInvalid = true;
            if (formRequiredItem.hasAttribute(this.options.attributes.error)) {
                const {error} = formRequiredItem.dataset;
                formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${errorMessage || error}</div>`);
            }
        }
        removeError(formRequiredItem) {
            const parentFormField = formRequiredItem.parentElement;
            formRequiredItem.classList.remove(this.options.classes.formError);
            parentFormField.classList.remove(this.options.classes.formError);
            if (parentFormField.querySelector(".form__error")) parentFormField.removeChild(parentFormField.querySelector(".form__error"));
        }
        addSuccess(formRequiredItem) {
            formRequiredItem.classList.add(this.options.classes.formSuccess);
            formRequiredItem.parentElement.classList.add(this.options.classes.formSuccess);
        }
        removeSuccess(formRequiredItem) {
            formRequiredItem.classList.remove(this.options.classes.formSuccess);
            formRequiredItem.parentElement.classList.remove(this.options.classes.formSuccess);
        }
        _emailTest(formRequiredItem) {
            return !this.options.reqexp.email.test(formRequiredItem.value);
        }
        _phoneTest(formRequiredItem) {
            return !this.options.reqexp.phone.test(formRequiredItem.value);
        }
        formLogging(message) {
            this.options.logging ? console.log(`[Форми]: ${message}`) : null;
        }
    }
    objectModules.formsValidation = new FormsValidation({});
    const headerHeight = () => {
        const header = document.querySelector("header.header");
        function updateSectionHeight() {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
        }
        window.addEventListener("resize", updateSectionHeight);
        updateSectionHeight();
    };
    const getHash = () => location.hash ? location.hash.replace("#", "") : null;
    const setHash = hash => {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    };
    const _slideUp = function(target) {
        let duration = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500;
        let showmore = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        if (!target.classList.contains("slide")) {
            target.classList.add("slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    const _slideDown = function(target) {
        let duration = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500;
        let showmore = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        if (!target.classList.contains("slide")) {
            target.classList.add("slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let bodyLockStatus = true;
    const bodyLockToggle = function() {
        let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
        document.documentElement.classList.contains("lock") ? bodyUnlock(delay) : bodyLock(delay);
    };
    const bodyUnlock = function() {
        let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((() => {
                bodyLockStatus = true;
            }), delay);
        }
    };
    const bodyLock = function() {
        let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((() => {
                bodyLockStatus = true;
            }), delay);
        }
    };
    const FLS = message => {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    };
    const uniqArray = array => array.filter(((item, index, self) => self.indexOf(item) === index));
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((item => item.dataset[dataSetValue] ? item.dataset[dataSetValue].split(",")[0] : null));
        if (!media.length) return;
        const breakpointsArray = [];
        media.forEach((item => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        }));
        let mdQueries = breakpointsArray.map((item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`));
        mdQueries = uniqArray(mdQueries);
        const mdQueriesArray = [];
        if (mdQueries.length) {
            mdQueries.forEach((breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                const itemsArray = breakpointsArray.filter((item => {
                    if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                }));
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia
                });
            }));
            return mdQueriesArray;
        }
    }
    function burgerMenu() {
        const burger = document.querySelector(".burger-menu");
        if (burger) document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (bodyLockStatus && target.closest(".burger-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
                if (document.documentElement.classList.contains("filter-menu-open")) document.documentElement.classList.remove("filter-menu-open");
            }
            if (bodyLockStatus && !target.closest(".burger-menu") && !target.closest(".menu__body") && document.documentElement.classList.contains("menu-open")) {
                bodyLockToggle();
                document.documentElement.classList.remove("menu-open");
            }
        }));
    }
    function searchHeaderShow() {
        document.addEventListener("click", (e => {
            const {target} = e;
            if (target.closest(".search-button--icon")) {
                e.preventDefault();
                document.documentElement.classList.add("search-show");
            }
            if (!target.closest(".search-header") && document.documentElement.classList.contains("search-show")) document.documentElement.classList.remove("search-show");
        }));
    }
    const gotoBlock_gotoBlock = function(targetSelector) {
        let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const targetBlockElement = document.querySelector(targetSelector);
        if (!targetBlockElement) {
            FLS(`[gotoBlock]: Такого блоку немає на сторінці: ${targetSelector}`);
            return;
        }
        let defaultConfig = {
            noHeader: false,
            speed: 500,
            offsetTop: 0
        };
        const {noHeader, speed, offsetTop} = {
            ...defaultConfig,
            ...config
        };
        const getHeaderHeight = () => {
            const headerElement = document.querySelector("header.header");
            let headerHeight = 0;
            if (!headerElement.classList.contains("header-scroll")) {
                headerElement.style.cssText = `transition-duration: 0s;`;
                headerElement.classList.add("header-scroll");
                headerHeight = headerElement.offsetHeight;
                headerElement.classList.remove("header-scroll");
                setTimeout((() => {
                    headerElement.style.cssText = ``;
                }), 0);
            } else headerHeight = headerElement.offsetHeight;
            return headerHeight;
        };
        const headerItemHeight = noHeader ? getHeaderHeight() : 0;
        const smoothScrollOptions = {
            speedAsDuration: true,
            speed,
            header: noHeader ? "header.header" : "",
            offset: offsetTop,
            easing: "easeOutQuad"
        };
        document.documentElement.classList.contains("menu-open") ? menuClose() : null;
        if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", smoothScrollOptions); else {
            const targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY - headerItemHeight - offsetTop;
            window.scrollTo({
                top: targetBlockElementPosition,
                behavior: "smooth"
            });
        }
        FLS(`[gotoBlock]: Їдемо до ${targetSelector}`);
    };
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if (e.type === "click") {
                const {target} = e;
                if (target.closest("[data-goto]")) {
                    const gotoLink = target.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    if (objectModules.fullpage) {
                        const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                        const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                        if (fullpageSectionId !== null) {
                            objectModules.fullpage.switchingSection(fullpageSectionId);
                            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                        }
                    } else gotoBlock_gotoBlock(gotoLinkSelector, {
                        noHeader,
                        speed: gotoSpeed,
                        offsetTop
                    });
                    e.preventDefault();
                }
            }
            if (e.type === "watcherCallback" && e.detail) {
                const {entry: {target, isIntersecting}} = e.detail;
                if (target.dataset.watch === "navigator") {
                    let navigatorCurrentItem;
                    if (target.id && document.querySelector(`[data-goto="#${target.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${target.id}"]`); else if (target.classList.length) for (let index = 0; index < target.classList.length; index++) {
                        const element = target.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoBlock_gotoBlock(goToHash, {
                noHeader: true,
                speed: 500,
                offsetTop: 20
            }) : null;
        }
    }
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target, src) {
        if (target === void 0) target = {};
        if (src === void 0) src = {};
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function utils_classesToTokens(classes) {
        if (classes === void 0) classes = "";
        return classes.trim().split(" ").filter((c => !!c.trim()));
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay) {
        if (delay === void 0) delay = 0;
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis) {
        if (axis === void 0) axis = "x";
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend() {
        const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < arguments.length; i += 1) {
            const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll(_ref) {
        let {swiper, targetPosition, side} = _ref;
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_elementChildren(element, selector) {
        if (selector === void 0) selector = "";
        const window = ssr_window_esm_getWindow();
        const children = [ ...element.children ];
        if (window.HTMLSlotElement && element instanceof HTMLSlotElement) children.push(...element.assignedElements());
        if (!selector) return children;
        return children.filter((el => el.matches(selector)));
    }
    function elementIsChildOfSlot(el, slot) {
        const elementsQueue = [ slot ];
        while (elementsQueue.length > 0) {
            const elementToCheck = elementsQueue.shift();
            if (el === elementToCheck) return true;
            elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot?.children || [], ...elementToCheck.assignedElements?.() || []);
        }
    }
    function elementIsChildOf(el, parent) {
        const window = ssr_window_esm_getWindow();
        let isChild = parent.contains(el);
        if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
            const children = [ ...parent.assignedElements() ];
            isChild = children.includes(el);
            if (!isChild) isChild = elementIsChildOfSlot(el, parent);
        }
        return isChild;
    }
    function showWarning(text) {
        try {
            console.warn(text);
            return;
        } catch (err) {}
    }
    function utils_createElement(tag, classes) {
        if (classes === void 0) classes = [];
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
        return el;
    }
    function utils_elementOffset(el) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        const box = el.getBoundingClientRect();
        const body = document.body;
        const clientTop = el.clientTop || body.clientTop || 0;
        const clientLeft = el.clientLeft || body.clientLeft || 0;
        const scrollTop = el === window ? window.scrollY : el.scrollTop;
        const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    function utils_makeElementsArray(el) {
        return (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice(_temp) {
        let {userAgent} = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides) {
        if (overrides === void 0) overrides = {};
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        const device = getDevice();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
        const isSafariBrowser = isSafari();
        const need3dFix = isSafariBrowser || isWebView && device.ios;
        return {
            isSafari: needPerspectiveFix || isSafariBrowser,
            needPerspectiveFix,
            need3dFix,
            isWebView
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize(_ref) {
        let {swiper, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((_ref2 => {
                        let {contentBoxSize, contentRect, target} = _ref2;
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = function(target, options) {
            if (options === void 0) options = {};
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.hostEl);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.hostEl, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler() {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit() {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
            if (slides[i] && elementStyle(slide, "display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[swiper.getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
            snapGrid = snapGrid.map((snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
            if (allSlidesSize + offsetSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        swiper.emit("slidesUpdated");
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    const toggleSlideClasses$1 = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
    };
    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = this && this.translate || 0;
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
            }
            toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
            toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    const toggleSlideClasses = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
    };
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        let activeSlide;
        let prevSlide;
        let nextSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
            activeSlide = slides.find((slideEl => slideEl.column === activeIndex));
            nextSlide = slides.find((slideEl => slideEl.column === activeIndex + 1));
            prevSlide = slides.find((slideEl => slideEl.column === activeIndex - 1));
        } else activeSlide = slides[activeIndex];
        if (activeSlide) if (!gridEnabled) {
            nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !nextSlide) nextSlide = slides[0];
            prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
        }
        slides.forEach((slideEl => {
            toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
            toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
            toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
        }));
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                if (slideEl.shadowRoot) {
                    lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                    if (lazyEl) lazyEl.remove();
                }
            }));
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map(((_, i) => activeColumn + slidesPerView + i)));
            swiper.slides.forEach(((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            }));
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex && !swiper.params.loop) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
            swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
            const firstSlideInColumn = swiper.slides.find((slideEl => slideEl.column === activeIndex));
            let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
            if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
            realIndex = Math.floor(activeSlideIndex / params.grid.rows);
        } else if (swiper.slides[activeIndex]) {
            const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
            if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
        } else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            swiper.emit("slideChange");
        }
    }
    function updateClickedSlide(el, path) {
        const swiper = this;
        const params = swiper.params;
        let slide = el.closest(`.${params.slideClass}, swiper-slide`);
        if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
            if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
        }));
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) translate = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (translateBounds === void 0) translateBounds = true;
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    swiper.animating = false;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
            swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
        }
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit(_ref) {
        let {swiper, runCallbacks, direction, step} = _ref;
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) index = 0;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) return false;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        const isInitialVirtual = isVirtual && initial;
        if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
            let targetSlideIndex;
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                targetSlideIndex = swiper.slides.find((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)).column;
            } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
            const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
            const {centeredSlides} = swiper.params;
            let slidesPerView = swiper.params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            let needLoopFix = cols - targetSlideIndex < slidesPerView;
            if (centeredSlides) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
            if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) needLoopFix = false;
            if (needLoopFix) {
                const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                swiper.loopFix({
                    direction,
                    slideTo: true,
                    activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                    slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                });
            }
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                newIndex = swiper.slides.find((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)).column;
            } else newIndex = swiper.getSlideIndexByData(newIndex);
        }
        requestAnimationFrame((() => {
            swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }));
        return swiper;
    }
    function slideNext(speed, runCallbacks, internal) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled || swiper.destroyed) return swiper;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
            if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                }));
                return true;
            }
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks, internal) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled || swiper.destroyed) return swiper;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
            requestAnimationFrame((() => {
                swiper.slideTo(prevIndex, speed, runCallbacks, internal);
            }));
            return true;
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks, internal) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (runCallbacks === void 0) runCallbacks = true;
        if (threshold === void 0) threshold = .5;
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        if (swiper.destroyed) return;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const initSlides = () => {
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            slides.forEach(((el, index) => {
                el.setAttribute("data-swiper-slide-index", index);
            }));
        };
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
        const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
        const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
        const addBlankSlides = amountOfSlides => {
            for (let i = 0; i < amountOfSlides; i += 1) {
                const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                swiper.slidesEl.append(slideEl);
            }
        };
        if (shouldFillGroup) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else if (shouldFillGrid) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else initSlides();
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix(_temp) {
        let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        const {centeredSlides} = params;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        let slidesPerView = params.slidesPerView;
        if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
            slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
            if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
        }
        const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
        let loopedSlides = slidesPerGroup;
        if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
        loopedSlides += params.loopAdditionalSlides;
        swiper.loopedSlides = loopedSlides;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        if (slides.length < slidesPerView + loopedSlides) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.find((el => el.classList.contains(params.slideActiveClass)))); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
        const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
        const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
        if (activeColIndexWithShift < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) {
                    const colIndexToPrepend = cols - index - 1;
                    for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                } else prependSlidesIndexes.push(cols - index - 1);
            }
        } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
            slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) slides.forEach(((slide, slideIndex) => {
                    if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                })); else appendSlidesIndexes.push(index);
            }
        }
        swiper.__preventObserver__ = true;
        requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
        if (isPrev) prependSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach(((slide, slideIndex) => {
            swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
        }));
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else if (setTranslate) {
                const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                swiper.touchEventsData.currentTranslate = swiper.translate;
            }
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) {
                    swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                    swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                }
            }
        } else {
            const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix({
                    ...loopParams,
                    slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                ...loopParams,
                slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
            });
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base) {
        if (base === void 0) base = this;
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function preventEdgeSwipe(swiper, event, startX) {
        const window = ssr_window_esm_getWindow();
        const {params} = swiper;
        const edgeSwipeDetection = params.edgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
            if (edgeSwipeDetection === "prevent") {
                event.preventDefault();
                return true;
            }
            return false;
        }
        return true;
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        const data = swiper.touchEventsData;
        if (e.type === "pointerdown") {
            if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
            data.pointerId = e.pointerId;
        } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
        if (e.type === "touchstart") {
            preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
            return;
        }
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = e.composedPath ? e.composedPath() : e.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        if (!preventEdgeSwipe(swiper, e, startX)) return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (e.type === "pointermove") {
            if (data.touchId !== null) return;
            const id = e.pointerId;
            if (id !== data.pointerId) return;
        }
        let targetTouch;
        if (e.type === "touchmove") {
            targetTouch = [ ...e.changedTouches ].find((t => t.identifier === data.touchId));
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        } else targetTouch = e;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== "mouse") document.activeElement.blur();
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        touches.previousX = touches.currentX;
        touches.previousY = touches.currentY;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
        if (!data.isMoved) {
            if (isLoop && allowLoopFix) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        bySwiperTouchMove: true
                    }
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        (new Date).getTime();
        if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
            Object.assign(touches, {
                startX: pageX,
                startY: pageY,
                currentX: pageX,
                currentY: pageY,
                startTranslate: data.currentTranslate
            });
            data.loopSwapReset = true;
            data.startTranslate = data.currentTranslate;
            return;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetTouch;
        const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
        if (!isTouchEvent) {
            if (data.touchId !== null) return;
            if (e.pointerId !== data.pointerId) return;
            targetTouch = e;
        } else {
            targetTouch = [ ...e.changedTouches ].find((t => t.identifier === data.touchId));
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        }
        if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
            const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        data.pointerId = null;
        data.touchId = null;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    function onDocumentTouchStart() {
        const swiper = this;
        if (swiper.documentTouchHandlerProceeded) return;
        swiper.documentTouchHandlerProceeded = true;
        if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
    }
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!el || typeof el === "string") return;
        document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
            passive: false,
            capture
        });
        el[domMethod]("touchstart", swiper.onTouchStart, {
            passive: false
        });
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("touchmove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("touchend", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("touchcancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("contextmenu", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const document = ssr_window_esm_getDocument();
        const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
        const breakpointContainer = [ "window", "container" ].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
        const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasGrabCursor = swiper.params.grabCursor;
        const isGrabCursor = breakpointParams.grabCursor;
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        if (wasGrabCursor && !isGrabCursor) swiper.unsetGrabCursor(); else if (!wasGrabCursor && isGrabCursor) swiper.setGrabCursor();
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        const wasLoop = params.loop;
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        const hasLoop = swiper.params.loop;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (initialized) if (needsReLoop) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (!wasLoop && hasLoop) {
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (wasLoop && !hasLoop) swiper.loopDestroy();
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) base = "window";
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function swiper_core_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        if (!el || typeof el === "string") return;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses: swiper_core_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        eventsPrefix: "swiper",
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopAddBlankSlides: true,
        loopAdditionalSlides: 0,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
            if (obj === void 0) obj = {};
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
            if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class Swiper {
        constructor() {
            let el;
            let params;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getDirectionLabel(property) {
            if (this.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.find((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)));
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
            if (view === void 0) view = "current";
            if (exact === void 0) exact = false;
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (typeof params.slidesPerView === "number") return params.slidesPerView;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += Math.ceil(slides[i].swiperSlideSize);
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
            if (needUpdate === void 0) needUpdate = true;
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
            if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
            lazyElements.forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                if (el && typeof el !== "string") el.removeAttribute("style");
                if (wrapperEl) wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                if (swiper.el && typeof swiper.el !== "string") swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
            const modules = Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => Swiper.installModule(m)));
                return Swiper;
            }
            Swiper.installModule(module);
            return Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    Swiper.use([ Resize, Observer ]);
    function Keyboard(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const document = ssr_window_esm_getDocument();
        const window = ssr_window_esm_getWindow();
        swiper.keyboard = {
            enabled: false
        };
        extendParams({
            keyboard: {
                enabled: false,
                onlyInViewport: true,
                pageUpDown: true
            }
        });
        function handle(event) {
            if (!swiper.enabled) return;
            const {rtlTranslate: rtl} = swiper;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            const kc = e.keyCode || e.charCode;
            const pageUpDown = swiper.params.keyboard.pageUpDown;
            const isPageUp = pageUpDown && kc === 33;
            const isPageDown = pageUpDown && kc === 34;
            const isArrowLeft = kc === 37;
            const isArrowRight = kc === 39;
            const isArrowUp = kc === 38;
            const isArrowDown = kc === 40;
            if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) return false;
            if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) return false;
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === "input" || document.activeElement.nodeName.toLowerCase() === "textarea")) return;
            if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
                let inView = false;
                if (utils_elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && utils_elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) return;
                const el = swiper.el;
                const swiperWidth = el.clientWidth;
                const swiperHeight = el.clientHeight;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const swiperOffset = utils_elementOffset(el);
                if (rtl) swiperOffset.left -= el.scrollLeft;
                const swiperCoord = [ [ swiperOffset.left, swiperOffset.top ], [ swiperOffset.left + swiperWidth, swiperOffset.top ], [ swiperOffset.left, swiperOffset.top + swiperHeight ], [ swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight ] ];
                for (let i = 0; i < swiperCoord.length; i += 1) {
                    const point = swiperCoord[i];
                    if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
                        if (point[0] === 0 && point[1] === 0) continue;
                        inView = true;
                    }
                }
                if (!inView) return;
            }
            if (swiper.isHorizontal()) {
                if (isPageUp || isPageDown || isArrowLeft || isArrowRight) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
                if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
            } else {
                if (isPageUp || isPageDown || isArrowUp || isArrowDown) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                if (isPageDown || isArrowDown) swiper.slideNext();
                if (isPageUp || isArrowUp) swiper.slidePrev();
            }
            emit("keyPress", kc);
            return;
        }
        function enable() {
            if (swiper.keyboard.enabled) return;
            document.addEventListener("keydown", handle);
            swiper.keyboard.enabled = true;
        }
        function disable() {
            if (!swiper.keyboard.enabled) return;
            document.removeEventListener("keydown", handle);
            swiper.keyboard.enabled = false;
        }
        on("init", (() => {
            if (swiper.params.keyboard.enabled) enable();
        }));
        on("destroy", (() => {
            if (swiper.keyboard.enabled) disable();
        }));
        Object.assign(swiper.keyboard, {
            enable,
            disable
        });
    }
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function classes_to_selector_classesToSelector(classes) {
        if (classes === void 0) classes = "";
        return `.${classes.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
        }
        function setSideBullets(bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            if (!bulletEl) return;
            bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
            if (bulletEl) {
                bulletEl.classList.add(`${bulletActiveClass}-${position}`);
                bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
                if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
            }
        }
        function getMoveDirection(prevIndex, nextIndex, length) {
            prevIndex %= length;
            nextIndex %= length;
            if (nextIndex === prevIndex + 1) return "next"; else if (nextIndex === prevIndex - 1) return "previous";
            return;
        }
        function onBulletClick(e) {
            const bulletEl = e.target.closest(classes_to_selector_classesToSelector(swiper.params.pagination.bulletClass));
            if (!bulletEl) return;
            e.preventDefault();
            const index = utils_elementIndex(bulletEl) * swiper.params.slidesPerGroup;
            if (swiper.params.loop) {
                if (swiper.realIndex === index) return;
                const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
                if (moveDirection === "next") swiper.slideNext(); else if (moveDirection === "previous") swiper.slidePrev(); else swiper.slideToLoop(index);
            } else swiper.slideTo(index);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            el = utils_makeElementsArray(el);
            let current;
            let previousIndex;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                previousIndex = swiper.previousRealIndex || 0;
                current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
            } else if (typeof swiper.snapIndex !== "undefined") {
                current = swiper.snapIndex;
                previousIndex = swiper.previousSnapIndex;
            } else {
                previousIndex = swiper.previousIndex || 0;
                current = swiper.activeIndex || 0;
            }
            if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
                    el.forEach((subEl => {
                        subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                    }));
                    if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
                        dynamicBulletIndex += current - (previousIndex || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.forEach((bulletEl => {
                    const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)) ].map((s => typeof s === "string" && s.includes(" ") ? s.split(" ") : s)).flat();
                    bulletEl.classList.remove(...classesToRemove);
                }));
                if (el.length > 1) bullets.forEach((bullet => {
                    const bulletIndex = utils_elementIndex(bullet);
                    if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" ")); else if (swiper.isElement) bullet.setAttribute("part", "bullet");
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                    }
                })); else {
                    const bullet = bullets[current];
                    if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                    if (swiper.isElement) bullets.forEach(((bulletEl, bulletIndex) => {
                        bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
                    }));
                    if (params.dynamicBullets) {
                        const firstDisplayedBullet = bullets[firstIndex];
                        const lastDisplayedBullet = bullets[lastIndex];
                        for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        setSideBullets(firstDisplayedBullet, "prev");
                        setSideBullets(lastDisplayedBullet, "next");
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.forEach((bullet => {
                        bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                    }));
                }
            }
            el.forEach(((subEl, subElIndex) => {
                if (params.type === "fraction") {
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.currentClass)).forEach((fractionEl => {
                        fractionEl.textContent = params.formatFractionCurrent(current + 1);
                    }));
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.totalClass)).forEach((totalEl => {
                        totalEl.textContent = params.formatFractionTotal(total);
                    }));
                }
                if (params.type === "progressbar") {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.progressbarFillClass)).forEach((progressEl => {
                        progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                        progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                    }));
                }
                if (params.type === "custom" && params.renderCustom) {
                    subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
                    if (subElIndex === 0) emit("paginationRender", subEl);
                } else {
                    if (subElIndex === 0) emit("paginationRender", subEl);
                    emit("paginationUpdate", subEl);
                }
                if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
            }));
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
            let el = swiper.pagination.el;
            el = utils_makeElementsArray(el);
            let paginationHTML = "";
            if (params.type === "bullets") {
                let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
            if (params.type === "fraction") if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
            if (params.type === "progressbar") if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            swiper.pagination.bullets = [];
            el.forEach((subEl => {
                if (params.type !== "custom") subEl.innerHTML = paginationHTML || "";
                if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classes_to_selector_classesToSelector(params.bulletClass)));
            }));
            if (params.type !== "custom") emit("paginationRender", el[0]);
        }
        function init() {
            swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let el;
            if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
            if (!el && typeof params.el === "string") el = [ ...document.querySelectorAll(params.el) ];
            if (!el) el = params.el;
            if (!el || el.length === 0) return;
            if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
                el = [ ...swiper.el.querySelectorAll(params.el) ];
                if (el.length > 1) el = el.find((subEl => {
                    if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                    return true;
                }));
            }
            if (Array.isArray(el) && el.length === 1) el = el[0];
            Object.assign(swiper.pagination, {
                el
            });
            el = utils_makeElementsArray(el);
            el.forEach((subEl => {
                if (params.type === "bullets" && params.clickable) subEl.classList.add(...(params.clickableClass || "").split(" "));
                subEl.classList.add(params.modifierClass + params.type);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (params.type === "bullets" && params.dynamicBullets) {
                    subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if (params.type === "progressbar" && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
                if (params.clickable) subEl.addEventListener("click", onBulletClick);
                if (!swiper.enabled) subEl.classList.add(params.lockClass);
            }));
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach((subEl => {
                    subEl.classList.remove(params.hiddenClass);
                    subEl.classList.remove(params.modifierClass + params.type);
                    subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                    if (params.clickable) {
                        subEl.classList.remove(...(params.clickableClass || "").split(" "));
                        subEl.removeEventListener("click", onBulletClick);
                    }
                }));
            }
            if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl => subEl.classList.remove(...params.bulletActiveClass.split(" "))));
        }
        on("changeDirection", (() => {
            if (!swiper.pagination || !swiper.pagination.el) return;
            const params = swiper.params.pagination;
            let {el} = swiper.pagination;
            el = utils_makeElementsArray(el);
            el.forEach((subEl => {
                subEl.classList.remove(params.horizontalClass, params.verticalClass);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            }));
        }));
        on("init", (() => {
            if (swiper.params.pagination.enabled === false) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if (typeof swiper.snapIndex === "undefined") update();
        }));
        on("snapIndexChange", (() => {
            update();
        }));
        on("snapGridLengthChange", (() => {
            render();
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {el} = swiper.pagination;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach((subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass)));
            }
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            const el = utils_makeElementsArray(swiper.pagination.el);
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                el.forEach((subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach((subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass)));
            }
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach((subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass)));
            }
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function Autoplay(_ref) {
        let {swiper, extendParams, on, emit, params} = _ref;
        swiper.autoplay = {
            running: false,
            paused: false,
            timeLeft: 0
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        let timeout;
        let raf;
        let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayTimeLeft;
        let autoplayStartTime = (new Date).getTime();
        let wasPaused;
        let isTouched;
        let pausedByTouch;
        let touchStartTimeout;
        let slideChanged;
        let pausedByInteraction;
        let pausedByPointerEnter;
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
            if (e.target !== swiper.wrapperEl) return;
            swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
            if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) return;
            resume();
        }
        const calcTimeLeft = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                autoplayDelayCurrent = autoplayTimeLeft;
                wasPaused = false;
            }
            const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
            swiper.autoplay.timeLeft = timeLeft;
            emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
            raf = requestAnimationFrame((() => {
                calcTimeLeft();
            }));
        };
        const getSlideDelay = () => {
            let activeSlideEl;
            if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.find((slideEl => slideEl.classList.contains("swiper-slide-active"))); else activeSlideEl = swiper.slides[swiper.activeIndex];
            if (!activeSlideEl) return;
            const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
            return currentSlideDelay;
        };
        const run = delayForce => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            cancelAnimationFrame(raf);
            calcTimeLeft();
            let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
            autoplayDelayTotal = swiper.params.autoplay.delay;
            autoplayDelayCurrent = swiper.params.autoplay.delay;
            const currentSlideDelay = getSlideDelay();
            if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                delay = currentSlideDelay;
                autoplayDelayTotal = currentSlideDelay;
                autoplayDelayCurrent = currentSlideDelay;
            }
            autoplayTimeLeft = delay;
            const speed = swiper.params.speed;
            const proceed = () => {
                if (!swiper || swiper.destroyed) return;
                if (swiper.params.autoplay.reverseDirection) {
                    if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                        swiper.slidePrev(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                        emit("autoplay");
                    }
                } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit("autoplay");
                }
                if (swiper.params.cssMode) {
                    autoplayStartTime = (new Date).getTime();
                    requestAnimationFrame((() => {
                        run();
                    }));
                }
            };
            if (delay > 0) {
                clearTimeout(timeout);
                timeout = setTimeout((() => {
                    proceed();
                }), delay);
            } else requestAnimationFrame((() => {
                proceed();
            }));
            return delay;
        };
        const start = () => {
            autoplayStartTime = (new Date).getTime();
            swiper.autoplay.running = true;
            run();
            emit("autoplayStart");
        };
        const stop = () => {
            swiper.autoplay.running = false;
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
            emit("autoplayStop");
        };
        const pause = (internal, reset) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            clearTimeout(timeout);
            if (!internal) pausedByInteraction = true;
            const proceed = () => {
                emit("autoplayPause");
                if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
            };
            swiper.autoplay.paused = true;
            if (reset) {
                if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                slideChanged = false;
                proceed();
                return;
            }
            const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
            autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
            if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
            proceed();
        };
        const resume = () => {
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
            autoplayStartTime = (new Date).getTime();
            if (pausedByInteraction) {
                pausedByInteraction = false;
                run(autoplayTimeLeft);
            } else run();
            swiper.autoplay.paused = false;
            emit("autoplayResume");
        };
        const onVisibilityChange = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            const document = ssr_window_esm_getDocument();
            if (document.visibilityState === "hidden") {
                pausedByInteraction = true;
                pause(true);
            }
            if (document.visibilityState === "visible") resume();
        };
        const onPointerEnter = e => {
            if (e.pointerType !== "mouse") return;
            pausedByInteraction = true;
            pausedByPointerEnter = true;
            if (swiper.animating || swiper.autoplay.paused) return;
            pause(true);
        };
        const onPointerLeave = e => {
            if (e.pointerType !== "mouse") return;
            pausedByPointerEnter = false;
            if (swiper.autoplay.paused) resume();
        };
        const attachMouseEvents = () => {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.el.addEventListener("pointerenter", onPointerEnter);
                swiper.el.addEventListener("pointerleave", onPointerLeave);
            }
        };
        const detachMouseEvents = () => {
            if (swiper.el && typeof swiper.el !== "string") {
                swiper.el.removeEventListener("pointerenter", onPointerEnter);
                swiper.el.removeEventListener("pointerleave", onPointerLeave);
            }
        };
        const attachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.addEventListener("visibilitychange", onVisibilityChange);
        };
        const detachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                attachMouseEvents();
                attachDocumentEvents();
                start();
            }
        }));
        on("destroy", (() => {
            detachMouseEvents();
            detachDocumentEvents();
            if (swiper.autoplay.running) stop();
        }));
        on("_freeModeStaticRelease", (() => {
            if (pausedByTouch || pausedByInteraction) resume();
        }));
        on("_freeModeNoMomentumRelease", (() => {
            if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.params.autoplay.disableOnInteraction) {
                stop();
                return;
            }
            isTouched = true;
            pausedByTouch = false;
            pausedByInteraction = false;
            touchStartTimeout = setTimeout((() => {
                pausedByInteraction = true;
                pausedByTouch = true;
                pause(true);
            }), 200);
        }));
        on("touchEnd", (() => {
            if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
            clearTimeout(touchStartTimeout);
            clearTimeout(timeout);
            if (swiper.params.autoplay.disableOnInteraction) {
                pausedByTouch = false;
                isTouched = false;
                return;
            }
            if (pausedByTouch && swiper.params.cssMode) resume();
            pausedByTouch = false;
            isTouched = false;
        }));
        on("slideChange", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            slideChanged = true;
        }));
        Object.assign(swiper.autoplay, {
            start,
            stop,
            pause,
            resume
        });
    }
    //! Стилі Swiper
    const initSliders = () => {
        if (document.querySelector(".slider-hero")) new Swiper(".slider-hero", {
            modules: [ Pagination, Autoplay, Keyboard ],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: false,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 3e3,
                disableOnInteraction: true
            },
            pagination: {
                el: ".hero__slider-pagination",
                clickable: true
            },
            keyboard: true,
            on: {}
        });
    };
    window.addEventListener("load", (() => {
        initSliders();
    }));
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? +header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? +header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (() => {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                toogleClass(header, "header--scroll", true);
                if (headerShow) {
                    if (scrollTop > scrollDirection) toogleClass(header, "header--show", false); else toogleClass(header, "header--show", true);
                    timer = setTimeout((() => {
                        toogleClass(header, "header--show", true);
                    }), headerShowTimer);
                }
            } else {
                toogleClass(header, "header--scroll", false);
                if (headerShow) toogleClass(header, "header--show", false);
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
        function toogleClass(element, className, condition) {
            if (condition) !element.classList.contains(className) ? element.classList.add(className) : null; else element.classList.contains(className) ? element.classList.remove(className) : null;
        }
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (() => {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function paginationMoveIndicator() {
        const pagination = document.querySelector(".pagination");
        if (pagination) {
            const paginationLine = pagination.querySelector(".pagination__line");
            const paginationItems = pagination.querySelectorAll(".pagination__item");
            const paginationArrowPrev = pagination.querySelector(".pagination__arrow--prev");
            const paginationArrowNext = pagination.querySelector(".pagination__arrow--next");
            updateArrowVisibility();
            positionIndicator();
            window.addEventListener("resize", (() => {
                positionIndicator();
            }));
            pagination.addEventListener("pointerover", (e => {
                const target = e.target.closest(".pagination__item, .pagination__arrow");
                if (target && !target.classList.contains("pagination__item--active")) moveIndicator(target); else positionIndicator();
            }));
            pagination.addEventListener("pointerleave", (() => positionIndicator()));
            function positionIndicator() {
                const activeItem = pagination.querySelector(".pagination__item.pagination__item--active");
                if (activeItem) moveIndicator(activeItem);
            }
            function updateArrowVisibility() {
                const activeIndex = [ ...paginationItems ].findIndex((item => item.classList.contains("pagination__item--active")));
                if (paginationArrowPrev) paginationArrowPrev.style.display = activeIndex === 0 ? "none" : "";
                if (paginationArrowNext) paginationArrowNext.style.display = activeIndex === paginationItems.length - 1 ? "none" : "";
            }
            function moveIndicator(paginationItem) {
                const {offsetWidth, offsetLeft} = paginationItem;
                const percentageWidth = offsetWidth / pagination.offsetWidth * 100;
                paginationLine.style.cssText = `width:${percentageWidth}%;transform:translateX(${offsetLeft}px)`;
            }
        }
    }
    class ScrollWatcher {
        constructor(options) {
            let defaultConfig = {
                logging: true
            };
            this.config = {
                ...defaultConfig,
                ...options
            };
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(watchItems) {
            if (!watchItems.length > 0) {
                this.scrollWatcherLogging("Немає об'єктів для стеження.");
                return;
            }
            this.scrollWatcherLogging(`Стежу за об'єктами (${watchItems.length})...`);
            const uniqParams = uniqArray(Array.from(watchItems).map((item => {
                if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                    let valueOfThreshold;
                    if (item.clientHeight > 2) {
                        valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                        if (valueOfThreshold > 1) valueOfThreshold = 1;
                    } else valueOfThreshold = 1;
                    item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                }
                let {watchRoot, watchMargin, watchThreshold} = item.dataset;
                return `${watchRoot || null}|${watchMargin || "0px"}|${watchThreshold || 0}`;
            })));
            uniqParams.forEach((uniqParam => {
                const [rootParam, marginParam, thresholdParam] = uniqParam.split("|");
                const paramsWatch = {
                    root: rootParam,
                    margin: marginParam,
                    threshold: thresholdParam
                };
                const groupItems = Array.from(watchItems).filter((item => {
                    let {watchRoot, watchMargin, watchThreshold} = item.dataset;
                    watchRoot = watchRoot ? watchRoot : null;
                    watchMargin = watchMargin ? watchMargin : "0px";
                    watchThreshold = watchThreshold ? watchThreshold : 0;
                    if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                }));
                let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                this.scrollWatcherInit(groupItems, configWatcher);
            }));
        }
        getScrollWatcherConfig(paramsWatch) {
            const {root, margin, threshold} = paramsWatch;
            let configWatcher = {};
            if (document.querySelector(root)) configWatcher.root = document.querySelector(root); else if (root !== "null") this.scrollWatcherLogging(`Батьківського об'єкта ${root} немає на сторінці`);
            configWatcher.rootMargin = margin;
            if (margin.indexOf("px") < 0 && margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`Налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            function prxArrThreshold(arr) {
                arr = [];
                for (let i = 0; i <= 1; i += .005) arr.push(i);
                return arr;
            }
            const thresholdArray = threshold === "prx" ? prxArrThreshold(threshold) : threshold.split(",");
            configWatcher.threshold = thresholdArray;
            return configWatcher;
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherCallback(entry, observer) {
            const {target, isIntersecting} = entry;
            this.scrollWatcherIntersecting(isIntersecting, target);
            target.hasAttribute("data-watch-once") && isIntersecting ? this.scrollWatcherOff(target, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
        scrollWatcherIntersecting(isIntersecting, target) {
            if (isIntersecting) {
                !target.classList.contains("watcher-view") ? target.classList.add("watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${target.classList}, додав клас watcher-view`);
            } else {
                target.classList.contains("watcher-view") ? target.classList.remove("watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${target.classList}, прибрав клас watcher-view`);
            }
        }
        scrollWatcherOff(target, observer) {
            observer.unobserve(target);
            this.scrollWatcherLogging(`Я перестав стежити за ${target.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
        }
    }
    objectModules.watcher = new ScrollWatcher({});
    /*! choices.js v11.0.3 | © 2024 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
    }
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var ar, i = 0, l = from.length; i < l; i++) if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    var ActionType = {
        ADD_CHOICE: "ADD_CHOICE",
        REMOVE_CHOICE: "REMOVE_CHOICE",
        FILTER_CHOICES: "FILTER_CHOICES",
        ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
        CLEAR_CHOICES: "CLEAR_CHOICES",
        ADD_GROUP: "ADD_GROUP",
        ADD_ITEM: "ADD_ITEM",
        REMOVE_ITEM: "REMOVE_ITEM",
        HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM"
    };
    var EventType = {
        showDropdown: "showDropdown",
        hideDropdown: "hideDropdown",
        change: "change",
        choice: "choice",
        search: "search",
        addItem: "addItem",
        removeItem: "removeItem",
        highlightItem: "highlightItem",
        highlightChoice: "highlightChoice",
        unhighlightItem: "unhighlightItem"
    };
    var KeyCodeMap = {
        TAB_KEY: 9,
        SHIFT_KEY: 16,
        BACK_KEY: 46,
        DELETE_KEY: 8,
        ENTER_KEY: 13,
        A_KEY: 65,
        ESC_KEY: 27,
        UP_KEY: 38,
        DOWN_KEY: 40,
        PAGE_UP_KEY: 33,
        PAGE_DOWN_KEY: 34
    };
    var ObjectsInConfig = [ "fuseOptions", "classNames" ];
    var PassedElementTypes = {
        Text: "text",
        SelectOne: "select-one",
        SelectMultiple: "select-multiple"
    };
    var addChoice = function(choice) {
        return {
            type: ActionType.ADD_CHOICE,
            choice
        };
    };
    var removeChoice = function(choice) {
        return {
            type: ActionType.REMOVE_CHOICE,
            choice
        };
    };
    var filterChoices = function(results) {
        return {
            type: ActionType.FILTER_CHOICES,
            results
        };
    };
    var activateChoices = function(active) {
        return {
            type: ActionType.ACTIVATE_CHOICES,
            active
        };
    };
    var addGroup = function(group) {
        return {
            type: ActionType.ADD_GROUP,
            group
        };
    };
    var addItem = function(item) {
        return {
            type: ActionType.ADD_ITEM,
            item
        };
    };
    var removeItem$1 = function(item) {
        return {
            type: ActionType.REMOVE_ITEM,
            item
        };
    };
    var highlightItem = function(item, highlighted) {
        return {
            type: ActionType.HIGHLIGHT_ITEM,
            item,
            highlighted
        };
    };
    var getRandomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    var generateChars = function(length) {
        return Array.from({
            length
        }, (function() {
            return getRandomNumber(0, 36).toString(36);
        })).join("");
    };
    var generateId = function(element, prefix) {
        var id = element.id || element.name && "".concat(element.name, "-").concat(generateChars(2)) || generateChars(4);
        id = id.replace(/(:|\.|\[|\]|,)/g, "");
        id = "".concat(prefix, "-").concat(id);
        return id;
    };
    var getAdjacentEl = function(startEl, selector, direction) {
        if (direction === void 0) direction = 1;
        var prop = "".concat(direction > 0 ? "next" : "previous", "ElementSibling");
        var sibling = startEl[prop];
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling[prop];
        }
        return null;
    };
    var isScrolledIntoView = function(element, parent, direction) {
        if (direction === void 0) direction = 1;
        var isVisible;
        if (direction > 0) isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight; else isVisible = element.offsetTop >= parent.scrollTop;
        return isVisible;
    };
    var sanitise = function(value) {
        if (typeof value !== "string") {
            if (value === null || value === void 0) return "";
            if (typeof value === "object") {
                if ("raw" in value) return sanitise(value.raw);
                if ("trusted" in value) return value.trusted;
            }
            return value;
        }
        return value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;");
    };
    var strToEl = function() {
        var tmpEl = document.createElement("div");
        return function(str) {
            tmpEl.innerHTML = str.trim();
            var firstChild = tmpEl.children[0];
            while (tmpEl.firstChild) tmpEl.removeChild(tmpEl.firstChild);
            return firstChild;
        };
    }();
    var resolveNoticeFunction = function(fn, value) {
        return typeof fn === "function" ? fn(sanitise(value), value) : fn;
    };
    var resolveStringFunction = function(fn) {
        return typeof fn === "function" ? fn() : fn;
    };
    var unwrapStringForRaw = function(s) {
        if (typeof s === "string") return s;
        if (typeof s === "object") {
            if ("trusted" in s) return s.trusted;
            if ("raw" in s) return s.raw;
        }
        return "";
    };
    var unwrapStringForEscaped = function(s) {
        if (typeof s === "string") return s;
        if (typeof s === "object") {
            if ("escaped" in s) return s.escaped;
            if ("trusted" in s) return s.trusted;
        }
        return "";
    };
    var escapeForTemplate = function(allowHTML, s) {
        return allowHTML ? unwrapStringForEscaped(s) : sanitise(s);
    };
    var setElementHtml = function(el, allowHtml, html) {
        el.innerHTML = escapeForTemplate(allowHtml, html);
    };
    var sortByAlpha = function(_a, _b) {
        var value = _a.value, _c = _a.label, label = _c === void 0 ? value : _c;
        var value2 = _b.value, _d = _b.label, label2 = _d === void 0 ? value2 : _d;
        return unwrapStringForRaw(label).localeCompare(unwrapStringForRaw(label2), [], {
            sensitivity: "base",
            ignorePunctuation: true,
            numeric: true
        });
    };
    var sortByRank = function(a, b) {
        return a.rank - b.rank;
    };
    var dispatchEvent = function(element, type, customArgs) {
        if (customArgs === void 0) customArgs = null;
        var event = new CustomEvent(type, {
            detail: customArgs,
            bubbles: true,
            cancelable: true
        });
        return element.dispatchEvent(event);
    };
    var diff = function(a, b) {
        var aKeys = Object.keys(a).sort();
        var bKeys = Object.keys(b).sort();
        return aKeys.filter((function(i) {
            return bKeys.indexOf(i) < 0;
        }));
    };
    var getClassNames = function(ClassNames) {
        return Array.isArray(ClassNames) ? ClassNames : [ ClassNames ];
    };
    var getClassNamesSelector = function(option) {
        if (option && Array.isArray(option)) return option.map((function(item) {
            return ".".concat(item);
        })).join("");
        return ".".concat(option);
    };
    var addClassesToElement = function(element, className) {
        var _a;
        (_a = element.classList).add.apply(_a, getClassNames(className));
    };
    var removeClassesFromElement = function(element, className) {
        var _a;
        (_a = element.classList).remove.apply(_a, getClassNames(className));
    };
    var parseCustomProperties = function(customProperties) {
        if (typeof customProperties !== "undefined") try {
            return JSON.parse(customProperties);
        } catch (e) {
            return customProperties;
        }
        return {};
    };
    var updateClassList = function(item, add, remove) {
        var itemEl = item.itemEl;
        if (itemEl) {
            removeClassesFromElement(itemEl, remove);
            addClassesToElement(itemEl, add);
        }
    };
    var Dropdown = function() {
        function Dropdown(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames;
            this.element = element;
            this.classNames = classNames;
            this.type = type;
            this.isActive = false;
        }
        Dropdown.prototype.show = function() {
            addClassesToElement(this.element, this.classNames.activeState);
            this.element.setAttribute("aria-expanded", "true");
            this.isActive = true;
            return this;
        };
        Dropdown.prototype.hide = function() {
            removeClassesFromElement(this.element, this.classNames.activeState);
            this.element.setAttribute("aria-expanded", "false");
            this.isActive = false;
            return this;
        };
        return Dropdown;
    }();
    var Container = function() {
        function Container(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames, position = _a.position;
            this.element = element;
            this.classNames = classNames;
            this.type = type;
            this.position = position;
            this.isOpen = false;
            this.isFlipped = false;
            this.isDisabled = false;
            this.isLoading = false;
        }
        Container.prototype.shouldFlip = function(dropdownPos, dropdownHeight) {
            var shouldFlip = false;
            if (this.position === "auto") shouldFlip = this.element.getBoundingClientRect().top - dropdownHeight >= 0 && !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches; else if (this.position === "top") shouldFlip = true;
            return shouldFlip;
        };
        Container.prototype.setActiveDescendant = function(activeDescendantID) {
            this.element.setAttribute("aria-activedescendant", activeDescendantID);
        };
        Container.prototype.removeActiveDescendant = function() {
            this.element.removeAttribute("aria-activedescendant");
        };
        Container.prototype.open = function(dropdownPos, dropdownHeight) {
            addClassesToElement(this.element, this.classNames.openState);
            this.element.setAttribute("aria-expanded", "true");
            this.isOpen = true;
            if (this.shouldFlip(dropdownPos, dropdownHeight)) {
                addClassesToElement(this.element, this.classNames.flippedState);
                this.isFlipped = true;
            }
        };
        Container.prototype.close = function() {
            removeClassesFromElement(this.element, this.classNames.openState);
            this.element.setAttribute("aria-expanded", "false");
            this.removeActiveDescendant();
            this.isOpen = false;
            if (this.isFlipped) {
                removeClassesFromElement(this.element, this.classNames.flippedState);
                this.isFlipped = false;
            }
        };
        Container.prototype.addFocusState = function() {
            addClassesToElement(this.element, this.classNames.focusState);
        };
        Container.prototype.removeFocusState = function() {
            removeClassesFromElement(this.element, this.classNames.focusState);
        };
        Container.prototype.enable = function() {
            removeClassesFromElement(this.element, this.classNames.disabledState);
            this.element.removeAttribute("aria-disabled");
            if (this.type === PassedElementTypes.SelectOne) this.element.setAttribute("tabindex", "0");
            this.isDisabled = false;
        };
        Container.prototype.disable = function() {
            addClassesToElement(this.element, this.classNames.disabledState);
            this.element.setAttribute("aria-disabled", "true");
            if (this.type === PassedElementTypes.SelectOne) this.element.setAttribute("tabindex", "-1");
            this.isDisabled = true;
        };
        Container.prototype.wrap = function(element) {
            var el = this.element;
            var parentNode = element.parentNode;
            if (parentNode) if (element.nextSibling) parentNode.insertBefore(el, element.nextSibling); else parentNode.appendChild(el);
            el.appendChild(element);
        };
        Container.prototype.unwrap = function(element) {
            var el = this.element;
            var parentNode = el.parentNode;
            if (parentNode) {
                parentNode.insertBefore(element, el);
                parentNode.removeChild(el);
            }
        };
        Container.prototype.addLoadingState = function() {
            addClassesToElement(this.element, this.classNames.loadingState);
            this.element.setAttribute("aria-busy", "true");
            this.isLoading = true;
        };
        Container.prototype.removeLoadingState = function() {
            removeClassesFromElement(this.element, this.classNames.loadingState);
            this.element.removeAttribute("aria-busy");
            this.isLoading = false;
        };
        return Container;
    }();
    var Input = function() {
        function Input(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames, preventPaste = _a.preventPaste;
            this.element = element;
            this.type = type;
            this.classNames = classNames;
            this.preventPaste = preventPaste;
            this.isFocussed = this.element.isEqualNode(document.activeElement);
            this.isDisabled = element.disabled;
            this._onPaste = this._onPaste.bind(this);
            this._onInput = this._onInput.bind(this);
            this._onFocus = this._onFocus.bind(this);
            this._onBlur = this._onBlur.bind(this);
        }
        Object.defineProperty(Input.prototype, "placeholder", {
            set: function(placeholder) {
                this.element.placeholder = placeholder;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "value", {
            get: function() {
                return this.element.value;
            },
            set: function(value) {
                this.element.value = value;
            },
            enumerable: false,
            configurable: true
        });
        Input.prototype.addEventListeners = function() {
            var el = this.element;
            el.addEventListener("paste", this._onPaste);
            el.addEventListener("input", this._onInput, {
                passive: true
            });
            el.addEventListener("focus", this._onFocus, {
                passive: true
            });
            el.addEventListener("blur", this._onBlur, {
                passive: true
            });
        };
        Input.prototype.removeEventListeners = function() {
            var el = this.element;
            el.removeEventListener("input", this._onInput);
            el.removeEventListener("paste", this._onPaste);
            el.removeEventListener("focus", this._onFocus);
            el.removeEventListener("blur", this._onBlur);
        };
        Input.prototype.enable = function() {
            var el = this.element;
            el.removeAttribute("disabled");
            this.isDisabled = false;
        };
        Input.prototype.disable = function() {
            var el = this.element;
            el.setAttribute("disabled", "");
            this.isDisabled = true;
        };
        Input.prototype.focus = function() {
            if (!this.isFocussed) this.element.focus();
        };
        Input.prototype.blur = function() {
            if (this.isFocussed) this.element.blur();
        };
        Input.prototype.clear = function(setWidth) {
            if (setWidth === void 0) setWidth = true;
            this.element.value = "";
            if (setWidth) this.setWidth();
            return this;
        };
        Input.prototype.setWidth = function() {
            var element = this.element;
            element.style.minWidth = "".concat(element.placeholder.length + 1, "ch");
            element.style.width = "".concat(element.value.length + 1, "ch");
        };
        Input.prototype.setActiveDescendant = function(activeDescendantID) {
            this.element.setAttribute("aria-activedescendant", activeDescendantID);
        };
        Input.prototype.removeActiveDescendant = function() {
            this.element.removeAttribute("aria-activedescendant");
        };
        Input.prototype._onInput = function() {
            if (this.type !== PassedElementTypes.SelectOne) this.setWidth();
        };
        Input.prototype._onPaste = function(event) {
            if (this.preventPaste) event.preventDefault();
        };
        Input.prototype._onFocus = function() {
            this.isFocussed = true;
        };
        Input.prototype._onBlur = function() {
            this.isFocussed = false;
        };
        return Input;
    }();
    var SCROLLING_SPEED = 4;
    var List = function() {
        function List(_a) {
            var element = _a.element;
            this.element = element;
            this.scrollPos = this.element.scrollTop;
            this.height = this.element.offsetHeight;
        }
        List.prototype.prepend = function(node) {
            var child = this.element.firstElementChild;
            if (child) this.element.insertBefore(node, child); else this.element.append(node);
        };
        List.prototype.scrollToTop = function() {
            this.element.scrollTop = 0;
        };
        List.prototype.scrollToChildElement = function(element, direction) {
            var _this = this;
            if (!element) return;
            var listHeight = this.element.offsetHeight;
            var listScrollPosition = this.element.scrollTop + listHeight;
            var elementHeight = element.offsetHeight;
            var elementPos = element.offsetTop + elementHeight;
            var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
            requestAnimationFrame((function() {
                _this._animateScroll(destination, direction);
            }));
        };
        List.prototype._scrollDown = function(scrollPos, strength, destination) {
            var easing = (destination - scrollPos) / strength;
            var distance = easing > 1 ? easing : 1;
            this.element.scrollTop = scrollPos + distance;
        };
        List.prototype._scrollUp = function(scrollPos, strength, destination) {
            var easing = (scrollPos - destination) / strength;
            var distance = easing > 1 ? easing : 1;
            this.element.scrollTop = scrollPos - distance;
        };
        List.prototype._animateScroll = function(destination, direction) {
            var _this = this;
            var strength = SCROLLING_SPEED;
            var choiceListScrollTop = this.element.scrollTop;
            var continueAnimation = false;
            if (direction > 0) {
                this._scrollDown(choiceListScrollTop, strength, destination);
                if (choiceListScrollTop < destination) continueAnimation = true;
            } else {
                this._scrollUp(choiceListScrollTop, strength, destination);
                if (choiceListScrollTop > destination) continueAnimation = true;
            }
            if (continueAnimation) requestAnimationFrame((function() {
                _this._animateScroll(destination, direction);
            }));
        };
        return List;
    }();
    var WrappedElement = function() {
        function WrappedElement(_a) {
            var element = _a.element, classNames = _a.classNames;
            this.element = element;
            this.classNames = classNames;
            this.isDisabled = false;
        }
        Object.defineProperty(WrappedElement.prototype, "isActive", {
            get: function() {
                return this.element.dataset.choice === "active";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WrappedElement.prototype, "dir", {
            get: function() {
                return this.element.dir;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WrappedElement.prototype, "value", {
            get: function() {
                return this.element.value;
            },
            set: function(value) {
                this.element.setAttribute("value", value);
                this.element.value = value;
            },
            enumerable: false,
            configurable: true
        });
        WrappedElement.prototype.conceal = function() {
            var el = this.element;
            addClassesToElement(el, this.classNames.input);
            el.hidden = true;
            el.tabIndex = -1;
            var origStyle = el.getAttribute("style");
            if (origStyle) el.setAttribute("data-choice-orig-style", origStyle);
            el.setAttribute("data-choice", "active");
        };
        WrappedElement.prototype.reveal = function() {
            var el = this.element;
            removeClassesFromElement(el, this.classNames.input);
            el.hidden = false;
            el.removeAttribute("tabindex");
            var origStyle = el.getAttribute("data-choice-orig-style");
            if (origStyle) {
                el.removeAttribute("data-choice-orig-style");
                el.setAttribute("style", origStyle);
            } else el.removeAttribute("style");
            el.removeAttribute("data-choice");
        };
        WrappedElement.prototype.enable = function() {
            this.element.removeAttribute("disabled");
            this.element.disabled = false;
            this.isDisabled = false;
        };
        WrappedElement.prototype.disable = function() {
            this.element.setAttribute("disabled", "");
            this.element.disabled = true;
            this.isDisabled = true;
        };
        WrappedElement.prototype.triggerEvent = function(eventType, data) {
            dispatchEvent(this.element, eventType, data || {});
        };
        return WrappedElement;
    }();
    var WrappedInput = function(_super) {
        __extends(WrappedInput, _super);
        function WrappedInput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WrappedInput;
    }(WrappedElement);
    var coerceBool = function(arg, defaultValue) {
        if (defaultValue === void 0) defaultValue = true;
        return typeof arg === "undefined" ? defaultValue : !!arg;
    };
    var stringToHtmlClass = function(input) {
        if (typeof input === "string") input = input.split(" ").filter((function(s) {
            return s.length;
        }));
        if (Array.isArray(input) && input.length) return input;
        return;
    };
    var mapInputToChoice = function(value, allowGroup, allowRawString) {
        if (allowRawString === void 0) allowRawString = true;
        if (typeof value === "string") {
            var sanitisedValue = sanitise(value);
            var userValue = allowRawString || sanitisedValue === value ? value : {
                escaped: sanitisedValue,
                raw: value
            };
            var result_1 = mapInputToChoice({
                value,
                label: userValue,
                selected: true
            }, false);
            return result_1;
        }
        var groupOrChoice = value;
        if ("choices" in groupOrChoice) {
            if (!allowGroup) throw new TypeError("optGroup is not allowed");
            var group = groupOrChoice;
            var choices = group.choices.map((function(e) {
                return mapInputToChoice(e, false);
            }));
            var result_2 = {
                id: 0,
                label: unwrapStringForRaw(group.label) || group.value,
                active: !!choices.length,
                disabled: !!group.disabled,
                choices
            };
            return result_2;
        }
        var choice = groupOrChoice;
        var result = {
            id: 0,
            group: null,
            score: 0,
            rank: 0,
            value: choice.value,
            label: choice.label || choice.value,
            active: coerceBool(choice.active),
            selected: coerceBool(choice.selected, false),
            disabled: coerceBool(choice.disabled, false),
            placeholder: coerceBool(choice.placeholder, false),
            highlighted: false,
            labelClass: stringToHtmlClass(choice.labelClass),
            labelDescription: choice.labelDescription,
            customProperties: choice.customProperties
        };
        return result;
    };
    var isHtmlInputElement = function(e) {
        return e.tagName === "INPUT";
    };
    var isHtmlSelectElement = function(e) {
        return e.tagName === "SELECT";
    };
    var isHtmlOption = function(e) {
        return e.tagName === "OPTION";
    };
    var isHtmlOptgroup = function(e) {
        return e.tagName === "OPTGROUP";
    };
    var WrappedSelect = function(_super) {
        __extends(WrappedSelect, _super);
        function WrappedSelect(_a) {
            var element = _a.element, classNames = _a.classNames, template = _a.template, extractPlaceholder = _a.extractPlaceholder;
            var _this = _super.call(this, {
                element,
                classNames
            }) || this;
            _this.template = template;
            _this.extractPlaceholder = extractPlaceholder;
            return _this;
        }
        Object.defineProperty(WrappedSelect.prototype, "placeholderOption", {
            get: function() {
                return this.element.querySelector('option[value=""]') || this.element.querySelector("option[placeholder]");
            },
            enumerable: false,
            configurable: true
        });
        WrappedSelect.prototype.addOptions = function(choices) {
            var _this = this;
            var fragment = document.createDocumentFragment();
            choices.forEach((function(obj) {
                var choice = obj;
                if (choice.element) return;
                var option = _this.template(choice);
                fragment.appendChild(option);
                choice.element = option;
            }));
            this.element.appendChild(fragment);
        };
        WrappedSelect.prototype.optionsAsChoices = function() {
            var _this = this;
            var choices = [];
            this.element.querySelectorAll(":scope > option, :scope > optgroup").forEach((function(e) {
                if (isHtmlOption(e)) choices.push(_this._optionToChoice(e)); else if (isHtmlOptgroup(e)) choices.push(_this._optgroupToChoice(e));
            }));
            return choices;
        };
        WrappedSelect.prototype._optionToChoice = function(option) {
            if (!option.hasAttribute("value") && option.hasAttribute("placeholder")) {
                option.setAttribute("value", "");
                option.value = "";
            }
            return {
                id: 0,
                group: null,
                score: 0,
                rank: 0,
                value: option.value,
                label: option.innerText,
                element: option,
                active: true,
                selected: this.extractPlaceholder ? option.selected : option.hasAttribute("selected"),
                disabled: option.disabled,
                highlighted: false,
                placeholder: this.extractPlaceholder && (!option.value || option.hasAttribute("placeholder")),
                labelClass: typeof option.dataset.labelClass !== "undefined" ? stringToHtmlClass(option.dataset.labelClass) : void 0,
                labelDescription: typeof option.dataset.labelDescription !== "undefined" ? option.dataset.labelDescription : void 0,
                customProperties: parseCustomProperties(option.dataset.customProperties)
            };
        };
        WrappedSelect.prototype._optgroupToChoice = function(optgroup) {
            var _this = this;
            var options = optgroup.querySelectorAll("option");
            var choices = Array.from(options).map((function(option) {
                return _this._optionToChoice(option);
            }));
            return {
                id: 0,
                label: optgroup.label || "",
                element: optgroup,
                active: !!choices.length,
                disabled: optgroup.disabled,
                choices
            };
        };
        return WrappedSelect;
    }(WrappedElement);
    var DEFAULT_CLASSNAMES = {
        containerOuter: [ "choices" ],
        containerInner: [ "choices__inner" ],
        input: [ "choices__input" ],
        inputCloned: [ "choices__input--cloned" ],
        list: [ "choices__list" ],
        listItems: [ "choices__list--multiple" ],
        listSingle: [ "choices__list--single" ],
        listDropdown: [ "choices__list--dropdown" ],
        item: [ "choices__item" ],
        itemSelectable: [ "choices__item--selectable" ],
        itemDisabled: [ "choices__item--disabled" ],
        itemChoice: [ "choices__item--choice" ],
        description: [ "choices__description" ],
        placeholder: [ "choices__placeholder" ],
        group: [ "choices__group" ],
        groupHeading: [ "choices__heading" ],
        button: [ "choices__button" ],
        activeState: [ "is-active" ],
        focusState: [ "is-focused" ],
        openState: [ "is-open" ],
        disabledState: [ "is-disabled" ],
        highlightedState: [ "is-highlighted" ],
        selectedState: [ "is-selected" ],
        flippedState: [ "is-flipped" ],
        loadingState: [ "is-loading" ],
        notice: [ "choices__notice" ],
        addChoice: [ "choices__item--selectable", "add-choice" ],
        noResults: [ "has-no-results" ],
        noChoices: [ "has-no-choices" ]
    };
    var DEFAULT_CONFIG = {
        items: [],
        choices: [],
        silent: false,
        renderChoiceLimit: -1,
        maxItemCount: -1,
        closeDropdownOnSelect: "auto",
        singleModeForMultiSelect: false,
        addChoices: false,
        addItems: true,
        addItemFilter: function(value) {
            return !!value && value !== "";
        },
        removeItems: true,
        removeItemButton: false,
        removeItemButtonAlignLeft: false,
        editItems: false,
        allowHTML: false,
        allowHtmlUserInput: false,
        duplicateItemsAllowed: true,
        delimiter: ",",
        paste: true,
        searchEnabled: true,
        searchChoices: true,
        searchFloor: 1,
        searchResultLimit: 4,
        searchFields: [ "label", "value" ],
        position: "auto",
        resetScrollPosition: true,
        shouldSort: true,
        shouldSortItems: false,
        sorter: sortByAlpha,
        shadowRoot: null,
        placeholder: true,
        placeholderValue: null,
        searchPlaceholderValue: null,
        prependValue: null,
        appendValue: null,
        renderSelectedChoices: "auto",
        loadingText: "Loading...",
        noResultsText: "No results found",
        noChoicesText: "No choices to choose from",
        itemSelectText: "Press to select",
        uniqueItemText: "Only unique values can be added",
        customAddItemText: "Only values matching specific conditions can be added",
        addItemText: function(value) {
            return 'Press Enter to add <b>"'.concat(value, '"</b>');
        },
        removeItemIconText: function() {
            return "Remove item";
        },
        removeItemLabelText: function(value) {
            return "Remove item: ".concat(value);
        },
        maxItemText: function(maxItemCount) {
            return "Only ".concat(maxItemCount, " values can be added");
        },
        valueComparer: function(value1, value2) {
            return value1 === value2;
        },
        fuseOptions: {
            includeScore: true
        },
        labelId: "",
        callbackOnInit: null,
        callbackOnCreateTemplates: null,
        classNames: DEFAULT_CLASSNAMES,
        appendGroupInSearch: false
    };
    var removeItem = function(item) {
        var itemEl = item.itemEl;
        if (itemEl) {
            itemEl.remove();
            item.itemEl = void 0;
        }
    };
    function items(s, action, context) {
        var state = s;
        var update = true;
        switch (action.type) {
          case ActionType.ADD_ITEM:
            action.item.selected = true;
            var el = action.item.element;
            if (el) {
                el.selected = true;
                el.setAttribute("selected", "");
            }
            state.push(action.item);
            break;

          case ActionType.REMOVE_ITEM:
            action.item.selected = false;
            el = action.item.element;
            if (el) {
                el.selected = false;
                el.removeAttribute("selected");
                var select = el.parentElement;
                if (select && isHtmlSelectElement(select) && select.type === PassedElementTypes.SelectOne) select.value = "";
            }
            removeItem(action.item);
            state = state.filter((function(choice) {
                return choice.id !== action.item.id;
            }));
            break;

          case ActionType.REMOVE_CHOICE:
            removeItem(action.choice);
            state = state.filter((function(item) {
                return item.id !== action.choice.id;
            }));
            break;

          case ActionType.HIGHLIGHT_ITEM:
            var highlighted = action.highlighted;
            var item = state.find((function(obj) {
                return obj.id === action.item.id;
            }));
            if (item && item.highlighted !== highlighted) {
                item.highlighted = highlighted;
                if (context) updateClassList(item, highlighted ? context.classNames.highlightedState : context.classNames.selectedState, highlighted ? context.classNames.selectedState : context.classNames.highlightedState);
            }
            break;

          default:
            update = false;
            break;
        }
        return {
            state,
            update
        };
    }
    function groups(s, action) {
        var state = s;
        var update = true;
        switch (action.type) {
          case ActionType.ADD_GROUP:
            state.push(action.group);
            break;

          case ActionType.CLEAR_CHOICES:
            state = [];
            break;

          default:
            update = false;
            break;
        }
        return {
            state,
            update
        };
    }
    function choices(s, action, context) {
        var state = s;
        var update = true;
        switch (action.type) {
          case ActionType.ADD_CHOICE:
            state.push(action.choice);
            break;

          case ActionType.REMOVE_CHOICE:
            action.choice.choiceEl = void 0;
            if (action.choice.group) action.choice.group.choices = action.choice.group.choices.filter((function(obj) {
                return obj.id !== action.choice.id;
            }));
            state = state.filter((function(obj) {
                return obj.id !== action.choice.id;
            }));
            break;

          case ActionType.ADD_ITEM:
          case ActionType.REMOVE_ITEM:
            action.item.choiceEl = void 0;
            break;

          case ActionType.FILTER_CHOICES:
            var scoreLookup_1 = [];
            action.results.forEach((function(result) {
                scoreLookup_1[result.item.id] = result;
            }));
            state.forEach((function(choice) {
                var result = scoreLookup_1[choice.id];
                if (result !== void 0) {
                    choice.score = result.score;
                    choice.rank = result.rank;
                    choice.active = true;
                } else {
                    choice.score = 0;
                    choice.rank = 0;
                    choice.active = false;
                }
                if (context && context.appendGroupInSearch) choice.choiceEl = void 0;
            }));
            break;

          case ActionType.ACTIVATE_CHOICES:
            state.forEach((function(choice) {
                choice.active = action.active;
                if (context && context.appendGroupInSearch) choice.choiceEl = void 0;
            }));
            break;

          case ActionType.CLEAR_CHOICES:
            state = [];
            break;

          default:
            update = false;
            break;
        }
        return {
            state,
            update
        };
    }
    var reducers = {
        groups,
        items,
        choices
    };
    var Store = function() {
        function Store(context) {
            this._state = this.defaultState;
            this._listeners = [];
            this._txn = 0;
            this._context = context;
        }
        Object.defineProperty(Store.prototype, "defaultState", {
            get: function() {
                return {
                    groups: [],
                    items: [],
                    choices: []
                };
            },
            enumerable: false,
            configurable: true
        });
        Store.prototype.changeSet = function(init) {
            return {
                groups: init,
                items: init,
                choices: init
            };
        };
        Store.prototype.reset = function() {
            this._state = this.defaultState;
            var changes = this.changeSet(true);
            if (this._txn) this._changeSet = changes; else this._listeners.forEach((function(l) {
                return l(changes);
            }));
        };
        Store.prototype.subscribe = function(onChange) {
            this._listeners.push(onChange);
            return this;
        };
        Store.prototype.dispatch = function(action) {
            var _this = this;
            var state = this._state;
            var hasChanges = false;
            var changes = this._changeSet || this.changeSet(false);
            Object.keys(reducers).forEach((function(key) {
                var stateUpdate = reducers[key](state[key], action, _this._context);
                if (stateUpdate.update) {
                    hasChanges = true;
                    changes[key] = true;
                    state[key] = stateUpdate.state;
                }
            }));
            if (hasChanges) if (this._txn) this._changeSet = changes; else this._listeners.forEach((function(l) {
                return l(changes);
            }));
        };
        Store.prototype.withTxn = function(func) {
            this._txn++;
            try {
                func();
            } finally {
                this._txn = Math.max(0, this._txn - 1);
                if (!this._txn) {
                    var changeSet_1 = this._changeSet;
                    if (changeSet_1) {
                        this._changeSet = void 0;
                        this._listeners.forEach((function(l) {
                            return l(changeSet_1);
                        }));
                    }
                }
            }
        };
        Object.defineProperty(Store.prototype, "state", {
            get: function() {
                return this._state;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "items", {
            get: function() {
                return this.state.items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "highlightedActiveItems", {
            get: function() {
                return this.items.filter((function(item) {
                    return !item.disabled && item.active && item.highlighted;
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "choices", {
            get: function() {
                return this.state.choices;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "activeChoices", {
            get: function() {
                return this.choices.filter((function(choice) {
                    return choice.active;
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "searchableChoices", {
            get: function() {
                return this.choices.filter((function(choice) {
                    return !choice.disabled && !choice.placeholder;
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "groups", {
            get: function() {
                return this.state.groups;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "activeGroups", {
            get: function() {
                var _this = this;
                return this.state.groups.filter((function(group) {
                    var isActive = group.active && !group.disabled;
                    var hasActiveOptions = _this.state.choices.some((function(choice) {
                        return choice.active && !choice.disabled;
                    }));
                    return isActive && hasActiveOptions;
                }), []);
            },
            enumerable: false,
            configurable: true
        });
        Store.prototype.inTxn = function() {
            return this._txn > 0;
        };
        Store.prototype.getChoiceById = function(id) {
            return this.activeChoices.find((function(choice) {
                return choice.id === id;
            }));
        };
        Store.prototype.getGroupById = function(id) {
            return this.groups.find((function(group) {
                return group.id === id;
            }));
        };
        return Store;
    }();
    var NoticeTypes = {
        noChoices: "no-choices",
        noResults: "no-results",
        addChoice: "add-choice",
        generic: ""
    };
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter((function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            }))), t.push.apply(t, o);
        }
        return t;
    }
    function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                _defineProperty(e, r, t[r]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }));
        }
        return e;
    }
    function _toPrimitive(t, r) {
        if ("object" != typeof t || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != typeof i) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == typeof i ? i : i + "";
    }
    function isArray(value) {
        return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
    }
    const INFINITY = 1 / 0;
    function baseToString(value) {
        if (typeof value == "string") return value;
        let result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function choices_toString(value) {
        return value == null ? "" : baseToString(value);
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
    }
    function choices_isObject(value) {
        return typeof value === "object";
    }
    function isObjectLike(value) {
        return choices_isObject(value) && value !== null;
    }
    function isDefined(value) {
        return value !== void 0 && value !== null;
    }
    function isBlank(value) {
        return !value.trim().length;
    }
    function getTag(value) {
        return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
    }
    const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
    const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = key => `Invalid value for key ${key}`;
    const PATTERN_LENGTH_TOO_LARGE = max => `Pattern length exceeds max of ${max}.`;
    const MISSING_KEY_PROPERTY = name => `Missing ${name} property in key`;
    const INVALID_KEY_WEIGHT_VALUE = key => `Property 'weight' in key '${key}' must be a positive integer`;
    const hasOwn = Object.prototype.hasOwnProperty;
    class KeyStore {
        constructor(keys) {
            this._keys = [];
            this._keyMap = {};
            let totalWeight = 0;
            keys.forEach((key => {
                let obj = createKey(key);
                this._keys.push(obj);
                this._keyMap[obj.id] = obj;
                totalWeight += obj.weight;
            }));
            this._keys.forEach((key => {
                key.weight /= totalWeight;
            }));
        }
        get(keyId) {
            return this._keyMap[keyId];
        }
        keys() {
            return this._keys;
        }
        toJSON() {
            return JSON.stringify(this._keys);
        }
    }
    function createKey(key) {
        let path = null;
        let id = null;
        let src = null;
        let weight = 1;
        let getFn = null;
        if (isString(key) || isArray(key)) {
            src = key;
            path = createKeyPath(key);
            id = createKeyId(key);
        } else {
            if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
            const name = key.name;
            src = name;
            if (hasOwn.call(key, "weight")) {
                weight = key.weight;
                if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
            }
            path = createKeyPath(name);
            id = createKeyId(name);
            getFn = key.getFn;
        }
        return {
            path,
            id,
            weight,
            src,
            getFn
        };
    }
    function createKeyPath(key) {
        return isArray(key) ? key : key.split(".");
    }
    function createKeyId(key) {
        return isArray(key) ? key.join(".") : key;
    }
    function get(obj, path) {
        let list = [];
        let arr = false;
        const deepGet = (obj, path, index) => {
            if (!isDefined(obj)) return;
            if (!path[index]) list.push(obj); else {
                let key = path[index];
                const value = obj[key];
                if (!isDefined(value)) return;
                if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) list.push(choices_toString(value)); else if (isArray(value)) {
                    arr = true;
                    for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path, index + 1);
                } else if (path.length) deepGet(value, path, index + 1);
            }
        };
        deepGet(obj, isString(path) ? path.split(".") : path, 0);
        return arr ? list : list[0];
    }
    const MatchOptions = {
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1
    };
    const BasicOptions = {
        isCaseSensitive: false,
        includeScore: false,
        keys: [],
        shouldSort: true,
        sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
    };
    const FuzzyOptions = {
        location: 0,
        threshold: .6,
        distance: 100
    };
    const AdvancedOptions = {
        useExtendedSearch: false,
        getFn: get,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        fieldNormWeight: 1
    };
    var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);
    const SPACE = /[^ ]+/g;
    function norm(weight = 1, mantissa = 3) {
        const cache = new Map;
        const m = Math.pow(10, mantissa);
        return {
            get(value) {
                const numTokens = value.match(SPACE).length;
                if (cache.has(numTokens)) return cache.get(numTokens);
                const norm = 1 / Math.pow(numTokens, .5 * weight);
                const n = parseFloat(Math.round(norm * m) / m);
                cache.set(numTokens, n);
                return n;
            },
            clear() {
                cache.clear();
            }
        };
    }
    class FuseIndex {
        constructor({getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight} = {}) {
            this.norm = norm(fieldNormWeight, 3);
            this.getFn = getFn;
            this.isCreated = false;
            this.setIndexRecords();
        }
        setSources(docs = []) {
            this.docs = docs;
        }
        setIndexRecords(records = []) {
            this.records = records;
        }
        setKeys(keys = []) {
            this.keys = keys;
            this._keysMap = {};
            keys.forEach(((key, idx) => {
                this._keysMap[key.id] = idx;
            }));
        }
        create() {
            if (this.isCreated || !this.docs.length) return;
            this.isCreated = true;
            if (isString(this.docs[0])) this.docs.forEach(((doc, docIndex) => {
                this._addString(doc, docIndex);
            })); else this.docs.forEach(((doc, docIndex) => {
                this._addObject(doc, docIndex);
            }));
            this.norm.clear();
        }
        add(doc) {
            const idx = this.size();
            if (isString(doc)) this._addString(doc, idx); else this._addObject(doc, idx);
        }
        removeAt(idx) {
            this.records.splice(idx, 1);
            for (let i = idx, len = this.size(); i < len; i += 1) this.records[i].i -= 1;
        }
        getValueForItemAtKeyId(item, keyId) {
            return item[this._keysMap[keyId]];
        }
        size() {
            return this.records.length;
        }
        _addString(doc, docIndex) {
            if (!isDefined(doc) || isBlank(doc)) return;
            let record = {
                v: doc,
                i: docIndex,
                n: this.norm.get(doc)
            };
            this.records.push(record);
        }
        _addObject(doc, docIndex) {
            let record = {
                i: docIndex,
                $: {}
            };
            this.keys.forEach(((key, keyIndex) => {
                let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
                if (!isDefined(value)) return;
                if (isArray(value)) {
                    let subRecords = [];
                    const stack = [ {
                        nestedArrIndex: -1,
                        value
                    } ];
                    while (stack.length) {
                        const {nestedArrIndex, value} = stack.pop();
                        if (!isDefined(value)) continue;
                        if (isString(value) && !isBlank(value)) {
                            let subRecord = {
                                v: value,
                                i: nestedArrIndex,
                                n: this.norm.get(value)
                            };
                            subRecords.push(subRecord);
                        } else if (isArray(value)) value.forEach(((item, k) => {
                            stack.push({
                                nestedArrIndex: k,
                                value: item
                            });
                        }));
                    }
                    record.$[keyIndex] = subRecords;
                } else if (isString(value) && !isBlank(value)) {
                    let subRecord = {
                        v: value,
                        n: this.norm.get(value)
                    };
                    record.$[keyIndex] = subRecord;
                }
            }));
            this.records.push(record);
        }
        toJSON() {
            return {
                keys: this.keys,
                records: this.records
            };
        }
    }
    function createIndex(keys, docs, {getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight} = {}) {
        const myIndex = new FuseIndex({
            getFn,
            fieldNormWeight
        });
        myIndex.setKeys(keys.map(createKey));
        myIndex.setSources(docs);
        myIndex.create();
        return myIndex;
    }
    function parseIndex(data, {getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight} = {}) {
        const {keys, records} = data;
        const myIndex = new FuseIndex({
            getFn,
            fieldNormWeight
        });
        myIndex.setKeys(keys);
        myIndex.setIndexRecords(records);
        return myIndex;
    }
    function computeScore$1(pattern, {errors = 0, currentLocation = 0, expectedLocation = 0, distance = Config.distance, ignoreLocation = Config.ignoreLocation} = {}) {
        const accuracy = errors / pattern.length;
        if (ignoreLocation) return accuracy;
        const proximity = Math.abs(expectedLocation - currentLocation);
        if (!distance) return proximity ? 1 : accuracy;
        return accuracy + proximity / distance;
    }
    function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
        let indices = [];
        let start = -1;
        let end = -1;
        let i = 0;
        for (let len = matchmask.length; i < len; i += 1) {
            let match = matchmask[i];
            if (match && start === -1) start = i; else if (!match && start !== -1) {
                end = i - 1;
                if (end - start + 1 >= minMatchCharLength) indices.push([ start, end ]);
                start = -1;
            }
        }
        if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([ start, i - 1 ]);
        return indices;
    }
    const MAX_BITS = 32;
    function search(text, pattern, patternAlphabet, {location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation} = {}) {
        if (pattern.length > MAX_BITS) throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
        const patternLen = pattern.length;
        const textLen = text.length;
        const expectedLocation = Math.max(0, Math.min(location, textLen));
        let currentThreshold = threshold;
        let bestLocation = expectedLocation;
        const computeMatches = minMatchCharLength > 1 || includeMatches;
        const matchMask = computeMatches ? Array(textLen) : [];
        let index;
        while ((index = text.indexOf(pattern, bestLocation)) > -1) {
            let score = computeScore$1(pattern, {
                currentLocation: index,
                expectedLocation,
                distance,
                ignoreLocation
            });
            currentThreshold = Math.min(score, currentThreshold);
            bestLocation = index + patternLen;
            if (computeMatches) {
                let i = 0;
                while (i < patternLen) {
                    matchMask[index + i] = 1;
                    i += 1;
                }
            }
        }
        bestLocation = -1;
        let lastBitArr = [];
        let finalScore = 1;
        let binMax = patternLen + textLen;
        const mask = 1 << patternLen - 1;
        for (let i = 0; i < patternLen; i += 1) {
            let binMin = 0;
            let binMid = binMax;
            while (binMin < binMid) {
                const score = computeScore$1(pattern, {
                    errors: i,
                    currentLocation: expectedLocation + binMid,
                    expectedLocation,
                    distance,
                    ignoreLocation
                });
                if (score <= currentThreshold) binMin = binMid; else binMax = binMid;
                binMid = Math.floor((binMax - binMin) / 2 + binMin);
            }
            binMax = binMid;
            let start = Math.max(1, expectedLocation - binMid + 1);
            let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
            let bitArr = Array(finish + 2);
            bitArr[finish + 1] = (1 << i) - 1;
            for (let j = finish; j >= start; j -= 1) {
                let currentLocation = j - 1;
                let charMatch = patternAlphabet[text.charAt(currentLocation)];
                if (computeMatches) matchMask[currentLocation] = +!!charMatch;
                bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
                if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
                if (bitArr[j] & mask) {
                    finalScore = computeScore$1(pattern, {
                        errors: i,
                        currentLocation,
                        expectedLocation,
                        distance,
                        ignoreLocation
                    });
                    if (finalScore <= currentThreshold) {
                        currentThreshold = finalScore;
                        bestLocation = currentLocation;
                        if (bestLocation <= expectedLocation) break;
                        start = Math.max(1, 2 * expectedLocation - bestLocation);
                    }
                }
            }
            const score = computeScore$1(pattern, {
                errors: i + 1,
                currentLocation: expectedLocation,
                expectedLocation,
                distance,
                ignoreLocation
            });
            if (score > currentThreshold) break;
            lastBitArr = bitArr;
        }
        const result = {
            isMatch: bestLocation >= 0,
            score: Math.max(.001, finalScore)
        };
        if (computeMatches) {
            const indices = convertMaskToIndices(matchMask, minMatchCharLength);
            if (!indices.length) result.isMatch = false; else if (includeMatches) result.indices = indices;
        }
        return result;
    }
    function createPatternAlphabet(pattern) {
        let mask = {};
        for (let i = 0, len = pattern.length; i < len; i += 1) {
            const char = pattern.charAt(i);
            mask[char] = (mask[char] || 0) | 1 << len - i - 1;
        }
        return mask;
    }
    class BitapSearch {
        constructor(pattern, {location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreLocation = Config.ignoreLocation} = {}) {
            this.options = {
                location,
                threshold,
                distance,
                includeMatches,
                findAllMatches,
                minMatchCharLength,
                isCaseSensitive,
                ignoreLocation
            };
            this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
            this.chunks = [];
            if (!this.pattern.length) return;
            const addChunk = (pattern, startIndex) => {
                this.chunks.push({
                    pattern,
                    alphabet: createPatternAlphabet(pattern),
                    startIndex
                });
            };
            const len = this.pattern.length;
            if (len > MAX_BITS) {
                let i = 0;
                const remainder = len % MAX_BITS;
                const end = len - remainder;
                while (i < end) {
                    addChunk(this.pattern.substr(i, MAX_BITS), i);
                    i += MAX_BITS;
                }
                if (remainder) {
                    const startIndex = len - MAX_BITS;
                    addChunk(this.pattern.substr(startIndex), startIndex);
                }
            } else addChunk(this.pattern, 0);
        }
        searchIn(text) {
            const {isCaseSensitive, includeMatches} = this.options;
            if (!isCaseSensitive) text = text.toLowerCase();
            if (this.pattern === text) {
                let result = {
                    isMatch: true,
                    score: 0
                };
                if (includeMatches) result.indices = [ [ 0, text.length - 1 ] ];
                return result;
            }
            const {location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation} = this.options;
            let allIndices = [];
            let totalScore = 0;
            let hasMatches = false;
            this.chunks.forEach((({pattern, alphabet, startIndex}) => {
                const {isMatch, score, indices} = search(text, pattern, alphabet, {
                    location: location + startIndex,
                    distance,
                    threshold,
                    findAllMatches,
                    minMatchCharLength,
                    includeMatches,
                    ignoreLocation
                });
                if (isMatch) hasMatches = true;
                totalScore += score;
                if (isMatch && indices) allIndices = [ ...allIndices, ...indices ];
            }));
            let result = {
                isMatch: hasMatches,
                score: hasMatches ? totalScore / this.chunks.length : 1
            };
            if (hasMatches && includeMatches) result.indices = allIndices;
            return result;
        }
    }
    class BaseMatch {
        constructor(pattern) {
            this.pattern = pattern;
        }
        static isMultiMatch(pattern) {
            return getMatch(pattern, this.multiRegex);
        }
        static isSingleMatch(pattern) {
            return getMatch(pattern, this.singleRegex);
        }
        search() {}
    }
    function getMatch(pattern, exp) {
        const matches = pattern.match(exp);
        return matches ? matches[1] : null;
    }
    class ExactMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "exact";
        }
        static get multiRegex() {
            return /^="(.*)"$/;
        }
        static get singleRegex() {
            return /^=(.*)$/;
        }
        search(text) {
            const isMatch = text === this.pattern;
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [ 0, this.pattern.length - 1 ]
            };
        }
    }
    class InverseExactMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "inverse-exact";
        }
        static get multiRegex() {
            return /^!"(.*)"$/;
        }
        static get singleRegex() {
            return /^!(.*)$/;
        }
        search(text) {
            const index = text.indexOf(this.pattern);
            const isMatch = index === -1;
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [ 0, text.length - 1 ]
            };
        }
    }
    class PrefixExactMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "prefix-exact";
        }
        static get multiRegex() {
            return /^\^"(.*)"$/;
        }
        static get singleRegex() {
            return /^\^(.*)$/;
        }
        search(text) {
            const isMatch = text.startsWith(this.pattern);
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [ 0, this.pattern.length - 1 ]
            };
        }
    }
    class InversePrefixExactMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "inverse-prefix-exact";
        }
        static get multiRegex() {
            return /^!\^"(.*)"$/;
        }
        static get singleRegex() {
            return /^!\^(.*)$/;
        }
        search(text) {
            const isMatch = !text.startsWith(this.pattern);
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [ 0, text.length - 1 ]
            };
        }
    }
    class SuffixExactMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "suffix-exact";
        }
        static get multiRegex() {
            return /^"(.*)"\$$/;
        }
        static get singleRegex() {
            return /^(.*)\$$/;
        }
        search(text) {
            const isMatch = text.endsWith(this.pattern);
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [ text.length - this.pattern.length, text.length - 1 ]
            };
        }
    }
    class InverseSuffixExactMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "inverse-suffix-exact";
        }
        static get multiRegex() {
            return /^!"(.*)"\$$/;
        }
        static get singleRegex() {
            return /^!(.*)\$$/;
        }
        search(text) {
            const isMatch = !text.endsWith(this.pattern);
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices: [ 0, text.length - 1 ]
            };
        }
    }
    class FuzzyMatch extends BaseMatch {
        constructor(pattern, {location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreLocation = Config.ignoreLocation} = {}) {
            super(pattern);
            this._bitapSearch = new BitapSearch(pattern, {
                location,
                threshold,
                distance,
                includeMatches,
                findAllMatches,
                minMatchCharLength,
                isCaseSensitive,
                ignoreLocation
            });
        }
        static get type() {
            return "fuzzy";
        }
        static get multiRegex() {
            return /^"(.*)"$/;
        }
        static get singleRegex() {
            return /^(.*)$/;
        }
        search(text) {
            return this._bitapSearch.searchIn(text);
        }
    }
    class IncludeMatch extends BaseMatch {
        constructor(pattern) {
            super(pattern);
        }
        static get type() {
            return "include";
        }
        static get multiRegex() {
            return /^'"(.*)"$/;
        }
        static get singleRegex() {
            return /^'(.*)$/;
        }
        search(text) {
            let location = 0;
            let index;
            const indices = [];
            const patternLen = this.pattern.length;
            while ((index = text.indexOf(this.pattern, location)) > -1) {
                location = index + patternLen;
                indices.push([ index, location - 1 ]);
            }
            const isMatch = !!indices.length;
            return {
                isMatch,
                score: isMatch ? 0 : 1,
                indices
            };
        }
    }
    const searchers = [ ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch ];
    const searchersLen = searchers.length;
    const SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
    const OR_TOKEN = "|";
    function parseQuery(pattern, options = {}) {
        return pattern.split(OR_TOKEN).map((item => {
            let query = item.trim().split(SPACE_RE).filter((item => item && !!item.trim()));
            let results = [];
            for (let i = 0, len = query.length; i < len; i += 1) {
                const queryItem = query[i];
                let found = false;
                let idx = -1;
                while (!found && ++idx < searchersLen) {
                    const searcher = searchers[idx];
                    let token = searcher.isMultiMatch(queryItem);
                    if (token) {
                        results.push(new searcher(token, options));
                        found = true;
                    }
                }
                if (found) continue;
                idx = -1;
                while (++idx < searchersLen) {
                    const searcher = searchers[idx];
                    let token = searcher.isSingleMatch(queryItem);
                    if (token) {
                        results.push(new searcher(token, options));
                        break;
                    }
                }
            }
            return results;
        }));
    }
    const MultiMatchSet = new Set([ FuzzyMatch.type, IncludeMatch.type ]);
    class ExtendedSearch {
        constructor(pattern, {isCaseSensitive = Config.isCaseSensitive, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance} = {}) {
            this.query = null;
            this.options = {
                isCaseSensitive,
                includeMatches,
                minMatchCharLength,
                findAllMatches,
                ignoreLocation,
                location,
                threshold,
                distance
            };
            this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
            this.query = parseQuery(this.pattern, this.options);
        }
        static condition(_, options) {
            return options.useExtendedSearch;
        }
        searchIn(text) {
            const query = this.query;
            if (!query) return {
                isMatch: false,
                score: 1
            };
            const {includeMatches, isCaseSensitive} = this.options;
            text = isCaseSensitive ? text : text.toLowerCase();
            let numMatches = 0;
            let allIndices = [];
            let totalScore = 0;
            for (let i = 0, qLen = query.length; i < qLen; i += 1) {
                const searchers = query[i];
                allIndices.length = 0;
                numMatches = 0;
                for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
                    const searcher = searchers[j];
                    const {isMatch, indices, score} = searcher.search(text);
                    if (isMatch) {
                        numMatches += 1;
                        totalScore += score;
                        if (includeMatches) {
                            const type = searcher.constructor.type;
                            if (MultiMatchSet.has(type)) allIndices = [ ...allIndices, ...indices ]; else allIndices.push(indices);
                        }
                    } else {
                        totalScore = 0;
                        numMatches = 0;
                        allIndices.length = 0;
                        break;
                    }
                }
                if (numMatches) {
                    let result = {
                        isMatch: true,
                        score: totalScore / numMatches
                    };
                    if (includeMatches) result.indices = allIndices;
                    return result;
                }
            }
            return {
                isMatch: false,
                score: 1
            };
        }
    }
    const registeredSearchers = [];
    function register(...args) {
        registeredSearchers.push(...args);
    }
    function createSearcher(pattern, options) {
        for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
            let searcherClass = registeredSearchers[i];
            if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
        }
        return new BitapSearch(pattern, options);
    }
    const LogicalOperator = {
        AND: "$and",
        OR: "$or"
    };
    const KeyType = {
        PATH: "$path",
        PATTERN: "$val"
    };
    const isExpression = query => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
    const isPath = query => !!query[KeyType.PATH];
    const isLeaf = query => !isArray(query) && choices_isObject(query) && !isExpression(query);
    const convertToExplicit = query => ({
        [LogicalOperator.AND]: Object.keys(query).map((key => ({
            [key]: query[key]
        })))
    });
    function parse(query, options, {auto = true} = {}) {
        const next = query => {
            let keys = Object.keys(query);
            const isQueryPath = isPath(query);
            if (!isQueryPath && keys.length > 1 && !isExpression(query)) return next(convertToExplicit(query));
            if (isLeaf(query)) {
                const key = isQueryPath ? query[KeyType.PATH] : keys[0];
                const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
                if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
                const obj = {
                    keyId: createKeyId(key),
                    pattern
                };
                if (auto) obj.searcher = createSearcher(pattern, options);
                return obj;
            }
            let node = {
                children: [],
                operator: keys[0]
            };
            keys.forEach((key => {
                const value = query[key];
                if (isArray(value)) value.forEach((item => {
                    node.children.push(next(item));
                }));
            }));
            return node;
        };
        if (!isExpression(query)) query = convertToExplicit(query);
        return next(query);
    }
    function computeScore(results, {ignoreFieldNorm = Config.ignoreFieldNorm}) {
        results.forEach((result => {
            let totalScore = 1;
            result.matches.forEach((({key, norm, score}) => {
                const weight = key ? key.weight : null;
                totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
            }));
            result.score = totalScore;
        }));
    }
    function transformMatches(result, data) {
        const matches = result.matches;
        data.matches = [];
        if (!isDefined(matches)) return;
        matches.forEach((match => {
            if (!isDefined(match.indices) || !match.indices.length) return;
            const {indices, value} = match;
            let obj = {
                indices,
                value
            };
            if (match.key) obj.key = match.key.src;
            if (match.idx > -1) obj.refIndex = match.idx;
            data.matches.push(obj);
        }));
    }
    function transformScore(result, data) {
        data.score = result.score;
    }
    function format(results, docs, {includeMatches = Config.includeMatches, includeScore = Config.includeScore} = {}) {
        const transformers = [];
        if (includeMatches) transformers.push(transformMatches);
        if (includeScore) transformers.push(transformScore);
        return results.map((result => {
            const {idx} = result;
            const data = {
                item: docs[idx],
                refIndex: idx
            };
            if (transformers.length) transformers.forEach((transformer => {
                transformer(result, data);
            }));
            return data;
        }));
    }
    class Fuse {
        constructor(docs, options = {}, index) {
            this.options = _objectSpread2(_objectSpread2({}, Config), options);
            if (this.options.useExtendedSearch && !true) ;
            this._keyStore = new KeyStore(this.options.keys);
            this.setCollection(docs, index);
        }
        setCollection(docs, index) {
            this._docs = docs;
            if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
            this._myIndex = index || createIndex(this.options.keys, this._docs, {
                getFn: this.options.getFn,
                fieldNormWeight: this.options.fieldNormWeight
            });
        }
        add(doc) {
            if (!isDefined(doc)) return;
            this._docs.push(doc);
            this._myIndex.add(doc);
        }
        remove(predicate = () => false) {
            const results = [];
            for (let i = 0, len = this._docs.length; i < len; i += 1) {
                const doc = this._docs[i];
                if (predicate(doc, i)) {
                    this.removeAt(i);
                    i -= 1;
                    len -= 1;
                    results.push(doc);
                }
            }
            return results;
        }
        removeAt(idx) {
            this._docs.splice(idx, 1);
            this._myIndex.removeAt(idx);
        }
        getIndex() {
            return this._myIndex;
        }
        search(query, {limit = -1} = {}) {
            const {includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm} = this.options;
            let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
            computeScore(results, {
                ignoreFieldNorm
            });
            if (shouldSort) results.sort(sortFn);
            if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
            return format(results, this._docs, {
                includeMatches,
                includeScore
            });
        }
        _searchStringList(query) {
            const searcher = createSearcher(query, this.options);
            const {records} = this._myIndex;
            const results = [];
            records.forEach((({v: text, i: idx, n: norm}) => {
                if (!isDefined(text)) return;
                const {isMatch, score, indices} = searcher.searchIn(text);
                if (isMatch) results.push({
                    item: text,
                    idx,
                    matches: [ {
                        score,
                        value: text,
                        norm,
                        indices
                    } ]
                });
            }));
            return results;
        }
        _searchLogical(query) {
            const expression = parse(query, this.options);
            const evaluate = (node, item, idx) => {
                if (!node.children) {
                    const {keyId, searcher} = node;
                    const matches = this._findMatches({
                        key: this._keyStore.get(keyId),
                        value: this._myIndex.getValueForItemAtKeyId(item, keyId),
                        searcher
                    });
                    if (matches && matches.length) return [ {
                        idx,
                        item,
                        matches
                    } ];
                    return [];
                }
                const res = [];
                for (let i = 0, len = node.children.length; i < len; i += 1) {
                    const child = node.children[i];
                    const result = evaluate(child, item, idx);
                    if (result.length) res.push(...result); else if (node.operator === LogicalOperator.AND) return [];
                }
                return res;
            };
            const records = this._myIndex.records;
            const resultMap = {};
            const results = [];
            records.forEach((({$: item, i: idx}) => {
                if (isDefined(item)) {
                    let expResults = evaluate(expression, item, idx);
                    if (expResults.length) {
                        if (!resultMap[idx]) {
                            resultMap[idx] = {
                                idx,
                                item,
                                matches: []
                            };
                            results.push(resultMap[idx]);
                        }
                        expResults.forEach((({matches}) => {
                            resultMap[idx].matches.push(...matches);
                        }));
                    }
                }
            }));
            return results;
        }
        _searchObjectList(query) {
            const searcher = createSearcher(query, this.options);
            const {keys, records} = this._myIndex;
            const results = [];
            records.forEach((({$: item, i: idx}) => {
                if (!isDefined(item)) return;
                let matches = [];
                keys.forEach(((key, keyIndex) => {
                    matches.push(...this._findMatches({
                        key,
                        value: item[keyIndex],
                        searcher
                    }));
                }));
                if (matches.length) results.push({
                    idx,
                    item,
                    matches
                });
            }));
            return results;
        }
        _findMatches({key, value, searcher}) {
            if (!isDefined(value)) return [];
            let matches = [];
            if (isArray(value)) value.forEach((({v: text, i: idx, n: norm}) => {
                if (!isDefined(text)) return;
                const {isMatch, score, indices} = searcher.searchIn(text);
                if (isMatch) matches.push({
                    score,
                    key,
                    value: text,
                    idx,
                    norm,
                    indices
                });
            })); else {
                const {v: text, n: norm} = value;
                const {isMatch, score, indices} = searcher.searchIn(text);
                if (isMatch) matches.push({
                    score,
                    key,
                    value: text,
                    norm,
                    indices
                });
            }
            return matches;
        }
    }
    Fuse.version = "7.0.0";
    Fuse.createIndex = createIndex;
    Fuse.parseIndex = parseIndex;
    Fuse.config = Config;
    Fuse.parseQuery = parse;
    register(ExtendedSearch);
    var SearchByFuse = function() {
        function SearchByFuse(config) {
            this._haystack = [];
            this._fuseOptions = __assign(__assign({}, config.fuseOptions), {
                keys: __spreadArray([], config.searchFields, true),
                includeMatches: true
            });
        }
        SearchByFuse.prototype.index = function(data) {
            this._haystack = data;
            if (this._fuse) this._fuse.setCollection(data);
        };
        SearchByFuse.prototype.reset = function() {
            this._haystack = [];
            this._fuse = void 0;
        };
        SearchByFuse.prototype.isEmptyIndex = function() {
            return !this._haystack.length;
        };
        SearchByFuse.prototype.search = function(needle) {
            if (!this._fuse) this._fuse = new Fuse(this._haystack, this._fuseOptions);
            var results = this._fuse.search(needle);
            return results.map((function(value, i) {
                return {
                    item: value.item,
                    score: value.score || 0,
                    rank: i + 1
                };
            }));
        };
        return SearchByFuse;
    }();
    function getSearcher(config) {
        return new SearchByFuse(config);
    }
    var isEmptyObject = function(obj) {
        for (var prop in obj) if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
        return true;
    };
    var assignCustomProperties = function(el, choice, withCustomProperties) {
        var dataset = el.dataset;
        var customProperties = choice.customProperties, labelClass = choice.labelClass, labelDescription = choice.labelDescription;
        if (labelClass) dataset.labelClass = getClassNames(labelClass).join(" ");
        if (labelDescription) dataset.labelDescription = labelDescription;
        if (withCustomProperties && customProperties) if (typeof customProperties === "string") dataset.customProperties = customProperties; else if (typeof customProperties === "object" && !isEmptyObject(customProperties)) dataset.customProperties = JSON.stringify(customProperties);
    };
    var addAriaLabel = function(docRoot, id, element) {
        var label = id && docRoot.querySelector("label[for='".concat(id, "']"));
        var text = label && label.innerText;
        if (text) element.setAttribute("aria-label", text);
    };
    var templates = {
        containerOuter: function(_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
            var containerOuter = _a.classNames.containerOuter;
            var div = document.createElement("div");
            addClassesToElement(div, containerOuter);
            div.dataset.type = passedElementType;
            if (dir) div.dir = dir;
            if (isSelectOneElement) div.tabIndex = 0;
            if (isSelectElement) {
                div.setAttribute("role", searchEnabled ? "combobox" : "listbox");
                if (searchEnabled) div.setAttribute("aria-autocomplete", "list"); else if (!labelId) addAriaLabel(this._docRoot, this.passedElement.element.id, div);
                div.setAttribute("aria-haspopup", "true");
                div.setAttribute("aria-expanded", "false");
            }
            if (labelId) div.setAttribute("aria-labelledby", labelId);
            return div;
        },
        containerInner: function(_a) {
            var containerInner = _a.classNames.containerInner;
            var div = document.createElement("div");
            addClassesToElement(div, containerInner);
            return div;
        },
        itemList: function(_a, isSelectOneElement) {
            var searchEnabled = _a.searchEnabled, _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
            var div = document.createElement("div");
            addClassesToElement(div, list);
            addClassesToElement(div, isSelectOneElement ? listSingle : listItems);
            if (this._isSelectElement && searchEnabled) div.setAttribute("role", "listbox");
            return div;
        },
        placeholder: function(_a, value) {
            var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
            var div = document.createElement("div");
            addClassesToElement(div, placeholder);
            setElementHtml(div, allowHTML, value);
            return div;
        },
        item: function(_a, choice, removeItemButton) {
            var allowHTML = _a.allowHTML, removeItemButtonAlignLeft = _a.removeItemButtonAlignLeft, removeItemIconText = _a.removeItemIconText, removeItemLabelText = _a.removeItemLabelText, _b = _a.classNames, item = _b.item, button = _b.button, highlightedState = _b.highlightedState, itemSelectable = _b.itemSelectable, placeholder = _b.placeholder;
            var rawValue = unwrapStringForRaw(choice.value);
            var div = document.createElement("div");
            addClassesToElement(div, item);
            if (choice.labelClass) {
                var spanLabel = document.createElement("span");
                setElementHtml(spanLabel, allowHTML, choice.label);
                addClassesToElement(spanLabel, choice.labelClass);
                div.appendChild(spanLabel);
            } else setElementHtml(div, allowHTML, choice.label);
            div.dataset.item = "";
            div.dataset.id = choice.id;
            div.dataset.value = rawValue;
            assignCustomProperties(div, choice, true);
            if (choice.disabled || this.containerOuter.isDisabled) div.setAttribute("aria-disabled", "true");
            if (this._isSelectElement) {
                div.setAttribute("aria-selected", "true");
                div.setAttribute("role", "option");
            }
            if (choice.placeholder) {
                addClassesToElement(div, placeholder);
                div.dataset.placeholder = "";
            }
            addClassesToElement(div, choice.highlighted ? highlightedState : itemSelectable);
            if (removeItemButton) {
                if (choice.disabled) removeClassesFromElement(div, itemSelectable);
                div.dataset.deletable = "";
                var removeButton = document.createElement("button");
                removeButton.type = "button";
                addClassesToElement(removeButton, button);
                setElementHtml(removeButton, true, resolveNoticeFunction(removeItemIconText, choice.value));
                var REMOVE_ITEM_LABEL = resolveNoticeFunction(removeItemLabelText, choice.value);
                if (REMOVE_ITEM_LABEL) removeButton.setAttribute("aria-label", REMOVE_ITEM_LABEL);
                removeButton.dataset.button = "";
                if (removeItemButtonAlignLeft) div.insertAdjacentElement("afterbegin", removeButton); else div.appendChild(removeButton);
            }
            return div;
        },
        choiceList: function(_a, isSelectOneElement) {
            var list = _a.classNames.list;
            var div = document.createElement("div");
            addClassesToElement(div, list);
            if (!isSelectOneElement) div.setAttribute("aria-multiselectable", "true");
            div.setAttribute("role", "listbox");
            return div;
        },
        choiceGroup: function(_a, _b) {
            var allowHTML = _a.allowHTML, _c = _a.classNames, group = _c.group, groupHeading = _c.groupHeading, itemDisabled = _c.itemDisabled;
            var id = _b.id, label = _b.label, disabled = _b.disabled;
            var rawLabel = unwrapStringForRaw(label);
            var div = document.createElement("div");
            addClassesToElement(div, group);
            if (disabled) addClassesToElement(div, itemDisabled);
            div.setAttribute("role", "group");
            div.dataset.group = "";
            div.dataset.id = id;
            div.dataset.value = rawLabel;
            if (disabled) div.setAttribute("aria-disabled", "true");
            var heading = document.createElement("div");
            addClassesToElement(heading, groupHeading);
            setElementHtml(heading, allowHTML, label || "");
            div.appendChild(heading);
            return div;
        },
        choice: function(_a, choice, selectText, groupName) {
            var allowHTML = _a.allowHTML, _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, itemSelectable = _b.itemSelectable, selectedState = _b.selectedState, itemDisabled = _b.itemDisabled, description = _b.description, placeholder = _b.placeholder;
            var label = choice.label;
            var rawValue = unwrapStringForRaw(choice.value);
            var div = document.createElement("div");
            div.id = choice.elementId;
            addClassesToElement(div, item);
            addClassesToElement(div, itemChoice);
            if (groupName && typeof label === "string") {
                label = escapeForTemplate(allowHTML, label);
                label += " (".concat(groupName, ")");
                label = {
                    trusted: label
                };
            }
            var describedBy = div;
            if (choice.labelClass) {
                var spanLabel = document.createElement("span");
                setElementHtml(spanLabel, allowHTML, label);
                addClassesToElement(spanLabel, choice.labelClass);
                describedBy = spanLabel;
                div.appendChild(spanLabel);
            } else setElementHtml(div, allowHTML, label);
            if (choice.labelDescription) {
                var descId = "".concat(choice.elementId, "-description");
                describedBy.setAttribute("aria-describedby", descId);
                var spanDesc = document.createElement("span");
                setElementHtml(spanDesc, allowHTML, choice.labelDescription);
                spanDesc.id = descId;
                addClassesToElement(spanDesc, description);
                div.appendChild(spanDesc);
            }
            if (choice.selected) addClassesToElement(div, selectedState);
            if (choice.placeholder) addClassesToElement(div, placeholder);
            div.setAttribute("role", choice.group ? "treeitem" : "option");
            div.dataset.choice = "";
            div.dataset.id = choice.id;
            div.dataset.value = rawValue;
            if (selectText) div.dataset.selectText = selectText;
            if (choice.group) div.dataset.groupId = "".concat(choice.group.id);
            assignCustomProperties(div, choice, false);
            if (choice.disabled) {
                addClassesToElement(div, itemDisabled);
                div.dataset.choiceDisabled = "";
                div.setAttribute("aria-disabled", "true");
            } else {
                addClassesToElement(div, itemSelectable);
                div.dataset.choiceSelectable = "";
            }
            return div;
        },
        input: function(_a, placeholderValue) {
            var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned, labelId = _a.labelId;
            var inp = document.createElement("input");
            inp.type = "search";
            addClassesToElement(inp, input);
            addClassesToElement(inp, inputCloned);
            inp.autocomplete = "off";
            inp.autocapitalize = "off";
            inp.spellcheck = false;
            inp.setAttribute("role", "textbox");
            inp.setAttribute("aria-autocomplete", "list");
            if (placeholderValue) inp.setAttribute("aria-label", placeholderValue); else if (!labelId) addAriaLabel(this._docRoot, this.passedElement.element.id, inp);
            return inp;
        },
        dropdown: function(_a) {
            var _b = _a.classNames, list = _b.list, listDropdown = _b.listDropdown;
            var div = document.createElement("div");
            addClassesToElement(div, list);
            addClassesToElement(div, listDropdown);
            div.setAttribute("aria-expanded", "false");
            return div;
        },
        notice: function(_a, innerHTML, type) {
            var _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, addChoice = _b.addChoice, noResults = _b.noResults, noChoices = _b.noChoices, noticeItem = _b.notice;
            if (type === void 0) type = NoticeTypes.generic;
            var notice = document.createElement("div");
            setElementHtml(notice, true, innerHTML);
            addClassesToElement(notice, item);
            addClassesToElement(notice, itemChoice);
            addClassesToElement(notice, noticeItem);
            switch (type) {
              case NoticeTypes.addChoice:
                addClassesToElement(notice, addChoice);
                break;

              case NoticeTypes.noResults:
                addClassesToElement(notice, noResults);
                break;

              case NoticeTypes.noChoices:
                addClassesToElement(notice, noChoices);
                break;
            }
            if (type === NoticeTypes.addChoice) {
                notice.dataset.choiceSelectable = "";
                notice.dataset.choice = "";
            }
            return notice;
        },
        option: function(choice) {
            var labelValue = unwrapStringForRaw(choice.label);
            var opt = new Option(labelValue, choice.value, false, choice.selected);
            assignCustomProperties(opt, choice, true);
            opt.disabled = choice.disabled;
            if (choice.selected) opt.setAttribute("selected", "");
            return opt;
        }
    };
    var IS_IE11 = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
    var USER_DEFAULTS = {};
    var parseDataSetId = function(element) {
        if (!element) return;
        return element.dataset.id ? parseInt(element.dataset.id, 10) : void 0;
    };
    var selectableChoiceIdentifier = "[data-choice-selectable]";
    var Choices = function() {
        function Choices(element, userConfig) {
            if (element === void 0) element = "[data-choice]";
            if (userConfig === void 0) userConfig = {};
            var _this = this;
            this.initialisedOK = void 0;
            this._hasNonChoicePlaceholder = false;
            this._lastAddedChoiceId = 0;
            this._lastAddedGroupId = 0;
            var defaults = Choices.defaults;
            this.config = __assign(__assign(__assign({}, defaults.allOptions), defaults.options), userConfig);
            ObjectsInConfig.forEach((function(key) {
                _this.config[key] = __assign(__assign(__assign({}, defaults.allOptions[key]), defaults.options[key]), userConfig[key]);
            }));
            var config = this.config;
            if (!config.silent) this._validateConfig();
            var docRoot = config.shadowRoot || document.documentElement;
            this._docRoot = docRoot;
            var passedElement = typeof element === "string" ? docRoot.querySelector(element) : element;
            if (!passedElement || typeof passedElement !== "object" || !(isHtmlInputElement(passedElement) || isHtmlSelectElement(passedElement))) {
                if (!passedElement && typeof element === "string") throw TypeError("Selector ".concat(element, " failed to find an element"));
                throw TypeError("Expected one of the following types text|select-one|select-multiple");
            }
            var elementType = passedElement.type;
            var isText = elementType === PassedElementTypes.Text;
            if (isText || config.maxItemCount !== 1) config.singleModeForMultiSelect = false;
            if (config.singleModeForMultiSelect) elementType = PassedElementTypes.SelectMultiple;
            var isSelectOne = elementType === PassedElementTypes.SelectOne;
            var isSelectMultiple = elementType === PassedElementTypes.SelectMultiple;
            var isSelect = isSelectOne || isSelectMultiple;
            this._elementType = elementType;
            this._isTextElement = isText;
            this._isSelectOneElement = isSelectOne;
            this._isSelectMultipleElement = isSelectMultiple;
            this._isSelectElement = isSelectOne || isSelectMultiple;
            this._canAddUserChoices = isText && config.addItems || isSelect && config.addChoices;
            if (typeof config.renderSelectedChoices !== "boolean") config.renderSelectedChoices = config.renderSelectedChoices === "always" || isSelectOne;
            if (config.closeDropdownOnSelect === "auto") config.closeDropdownOnSelect = isText || isSelectOne || config.singleModeForMultiSelect; else config.closeDropdownOnSelect = coerceBool(config.closeDropdownOnSelect);
            if (config.placeholder) if (config.placeholderValue) this._hasNonChoicePlaceholder = true; else if (passedElement.dataset.placeholder) {
                this._hasNonChoicePlaceholder = true;
                config.placeholderValue = passedElement.dataset.placeholder;
            }
            if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== "function") {
                var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
                config.addItemFilter = re.test.bind(re);
            }
            if (this._isTextElement) this.passedElement = new WrappedInput({
                element: passedElement,
                classNames: config.classNames
            }); else {
                var selectEl = passedElement;
                this.passedElement = new WrappedSelect({
                    element: selectEl,
                    classNames: config.classNames,
                    template: function(data) {
                        return _this._templates.option(data);
                    },
                    extractPlaceholder: config.placeholder && !this._hasNonChoicePlaceholder
                });
            }
            this.initialised = false;
            this._store = new Store(config);
            this._currentValue = "";
            config.searchEnabled = !isText && config.searchEnabled || isSelectMultiple;
            this._canSearch = config.searchEnabled;
            this._isScrollingOnIe = false;
            this._highlightPosition = 0;
            this._wasTap = true;
            this._placeholderValue = this._generatePlaceholderValue();
            this._baseId = generateId(passedElement, "choices-");
            this._direction = passedElement.dir;
            if (!this._direction) {
                var elementDirection = window.getComputedStyle(passedElement).direction;
                var documentDirection = window.getComputedStyle(document.documentElement).direction;
                if (elementDirection !== documentDirection) this._direction = elementDirection;
            }
            this._idNames = {
                itemChoice: "item-choice"
            };
            this._templates = defaults.templates;
            this._render = this._render.bind(this);
            this._onFocus = this._onFocus.bind(this);
            this._onBlur = this._onBlur.bind(this);
            this._onKeyUp = this._onKeyUp.bind(this);
            this._onKeyDown = this._onKeyDown.bind(this);
            this._onInput = this._onInput.bind(this);
            this._onClick = this._onClick.bind(this);
            this._onTouchMove = this._onTouchMove.bind(this);
            this._onTouchEnd = this._onTouchEnd.bind(this);
            this._onMouseDown = this._onMouseDown.bind(this);
            this._onMouseOver = this._onMouseOver.bind(this);
            this._onFormReset = this._onFormReset.bind(this);
            this._onSelectKey = this._onSelectKey.bind(this);
            this._onEnterKey = this._onEnterKey.bind(this);
            this._onEscapeKey = this._onEscapeKey.bind(this);
            this._onDirectionKey = this._onDirectionKey.bind(this);
            this._onDeleteKey = this._onDeleteKey.bind(this);
            if (this.passedElement.isActive) {
                if (!config.silent) console.warn("Trying to initialise Choices on element already initialised", {
                    element
                });
                this.initialised = true;
                this.initialisedOK = false;
                return;
            }
            this.init();
            this._initialItems = this._store.items.map((function(choice) {
                return choice.value;
            }));
        }
        Object.defineProperty(Choices, "defaults", {
            get: function() {
                return Object.preventExtensions({
                    get options() {
                        return USER_DEFAULTS;
                    },
                    get allOptions() {
                        return DEFAULT_CONFIG;
                    },
                    get templates() {
                        return templates;
                    }
                });
            },
            enumerable: false,
            configurable: true
        });
        Choices.prototype.init = function() {
            if (this.initialised || this.initialisedOK !== void 0) return;
            this._searcher = getSearcher(this.config);
            this._loadChoices();
            this._createTemplates();
            this._createElements();
            this._createStructure();
            if (this._isTextElement && !this.config.addItems || this.passedElement.element.hasAttribute("disabled") || !!this.passedElement.element.closest("fieldset:disabled")) this.disable(); else {
                this.enable();
                this._addEventListeners();
            }
            this._initStore();
            this.initialised = true;
            this.initialisedOK = true;
            var callbackOnInit = this.config.callbackOnInit;
            if (typeof callbackOnInit === "function") callbackOnInit.call(this);
        };
        Choices.prototype.destroy = function() {
            if (!this.initialised) return;
            this._removeEventListeners();
            this.passedElement.reveal();
            this.containerOuter.unwrap(this.passedElement.element);
            this._store._listeners = [];
            this.clearStore(false);
            this._stopSearch();
            this._templates = Choices.defaults.templates;
            this.initialised = false;
            this.initialisedOK = void 0;
        };
        Choices.prototype.enable = function() {
            if (this.passedElement.isDisabled) this.passedElement.enable();
            if (this.containerOuter.isDisabled) {
                this._addEventListeners();
                this.input.enable();
                this.containerOuter.enable();
            }
            return this;
        };
        Choices.prototype.disable = function() {
            if (!this.passedElement.isDisabled) this.passedElement.disable();
            if (!this.containerOuter.isDisabled) {
                this._removeEventListeners();
                this.input.disable();
                this.containerOuter.disable();
            }
            return this;
        };
        Choices.prototype.highlightItem = function(item, runEvent) {
            if (runEvent === void 0) runEvent = true;
            if (!item || !item.id) return this;
            var choice = this._store.items.find((function(c) {
                return c.id === item.id;
            }));
            if (!choice || choice.highlighted) return this;
            this._store.dispatch(highlightItem(choice, true));
            if (runEvent) this.passedElement.triggerEvent(EventType.highlightItem, this._getChoiceForOutput(choice));
            return this;
        };
        Choices.prototype.unhighlightItem = function(item, runEvent) {
            if (runEvent === void 0) runEvent = true;
            if (!item || !item.id) return this;
            var choice = this._store.items.find((function(c) {
                return c.id === item.id;
            }));
            if (!choice || !choice.highlighted) return this;
            this._store.dispatch(highlightItem(choice, false));
            if (runEvent) this.passedElement.triggerEvent(EventType.unhighlightItem, this._getChoiceForOutput(choice));
            return this;
        };
        Choices.prototype.highlightAll = function() {
            var _this = this;
            this._store.withTxn((function() {
                _this._store.items.forEach((function(item) {
                    if (!item.highlighted) {
                        _this._store.dispatch(highlightItem(item, true));
                        _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
                    }
                }));
            }));
            return this;
        };
        Choices.prototype.unhighlightAll = function() {
            var _this = this;
            this._store.withTxn((function() {
                _this._store.items.forEach((function(item) {
                    if (item.highlighted) {
                        _this._store.dispatch(highlightItem(item, false));
                        _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
                    }
                }));
            }));
            return this;
        };
        Choices.prototype.removeActiveItemsByValue = function(value) {
            var _this = this;
            this._store.withTxn((function() {
                _this._store.items.filter((function(item) {
                    return item.value === value;
                })).forEach((function(item) {
                    return _this._removeItem(item);
                }));
            }));
            return this;
        };
        Choices.prototype.removeActiveItems = function(excludedId) {
            var _this = this;
            this._store.withTxn((function() {
                _this._store.items.filter((function(_a) {
                    var id = _a.id;
                    return id !== excludedId;
                })).forEach((function(item) {
                    return _this._removeItem(item);
                }));
            }));
            return this;
        };
        Choices.prototype.removeHighlightedItems = function(runEvent) {
            var _this = this;
            if (runEvent === void 0) runEvent = false;
            this._store.withTxn((function() {
                _this._store.highlightedActiveItems.forEach((function(item) {
                    _this._removeItem(item);
                    if (runEvent) _this._triggerChange(item.value);
                }));
            }));
            return this;
        };
        Choices.prototype.showDropdown = function(preventInputFocus) {
            var _this = this;
            if (this.dropdown.isActive) return this;
            if (preventInputFocus === void 0) preventInputFocus = !this._canSearch;
            requestAnimationFrame((function() {
                _this.dropdown.show();
                var rect = _this.dropdown.element.getBoundingClientRect();
                _this.containerOuter.open(rect.bottom, rect.height);
                if (!preventInputFocus) _this.input.focus();
                _this.passedElement.triggerEvent(EventType.showDropdown);
            }));
            return this;
        };
        Choices.prototype.hideDropdown = function(preventInputBlur) {
            var _this = this;
            if (!this.dropdown.isActive) return this;
            requestAnimationFrame((function() {
                _this.dropdown.hide();
                _this.containerOuter.close();
                if (!preventInputBlur && _this._canSearch) {
                    _this.input.removeActiveDescendant();
                    _this.input.blur();
                }
                _this.passedElement.triggerEvent(EventType.hideDropdown);
            }));
            return this;
        };
        Choices.prototype.getValue = function(valueOnly) {
            var _this = this;
            var values = this._store.items.map((function(item) {
                return valueOnly ? item.value : _this._getChoiceForOutput(item);
            }));
            return this._isSelectOneElement || this.config.singleModeForMultiSelect ? values[0] : values;
        };
        Choices.prototype.setValue = function(items) {
            var _this = this;
            if (!this.initialisedOK) {
                this._warnChoicesInitFailed("setValue");
                return this;
            }
            this._store.withTxn((function() {
                items.forEach((function(value) {
                    if (value) _this._addChoice(mapInputToChoice(value, false));
                }));
            }));
            this._searcher.reset();
            return this;
        };
        Choices.prototype.setChoiceByValue = function(value) {
            var _this = this;
            if (!this.initialisedOK) {
                this._warnChoicesInitFailed("setChoiceByValue");
                return this;
            }
            if (this._isTextElement) return this;
            this._store.withTxn((function() {
                var choiceValue = Array.isArray(value) ? value : [ value ];
                choiceValue.forEach((function(val) {
                    return _this._findAndSelectChoiceByValue(val);
                }));
                _this.unhighlightAll();
            }));
            this._searcher.reset();
            return this;
        };
        Choices.prototype.setChoices = function(choicesArrayOrFetcher, value, label, replaceChoices, clearSearchFlag) {
            var _this = this;
            if (choicesArrayOrFetcher === void 0) choicesArrayOrFetcher = [];
            if (value === void 0) value = "value";
            if (label === void 0) label = "label";
            if (replaceChoices === void 0) replaceChoices = false;
            if (clearSearchFlag === void 0) clearSearchFlag = true;
            if (!this.initialisedOK) {
                this._warnChoicesInitFailed("setChoices");
                return this;
            }
            if (!this._isSelectElement) throw new TypeError("setChoices can't be used with INPUT based Choices");
            if (typeof value !== "string" || !value) throw new TypeError("value parameter must be a name of 'value' field in passed objects");
            if (replaceChoices) this.clearChoices();
            if (typeof choicesArrayOrFetcher === "function") {
                var fetcher_1 = choicesArrayOrFetcher(this);
                if (typeof Promise === "function" && fetcher_1 instanceof Promise) return new Promise((function(resolve) {
                    return requestAnimationFrame(resolve);
                })).then((function() {
                    return _this._handleLoadingState(true);
                })).then((function() {
                    return fetcher_1;
                })).then((function(data) {
                    return _this.setChoices(data, value, label, replaceChoices);
                })).catch((function(err) {
                    if (!_this.config.silent) console.error(err);
                })).then((function() {
                    return _this._handleLoadingState(false);
                })).then((function() {
                    return _this;
                }));
                if (!Array.isArray(fetcher_1)) throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
                return this.setChoices(fetcher_1, value, label, false);
            }
            if (!Array.isArray(choicesArrayOrFetcher)) throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
            this.containerOuter.removeLoadingState();
            this._store.withTxn((function() {
                if (clearSearchFlag) _this._isSearching = false;
                var isDefaultValue = value === "value";
                var isDefaultLabel = label === "label";
                choicesArrayOrFetcher.forEach((function(groupOrChoice) {
                    if ("choices" in groupOrChoice) {
                        var group = groupOrChoice;
                        if (!isDefaultLabel) group = __assign(__assign({}, group), {
                            label: group[label]
                        });
                        _this._addGroup(mapInputToChoice(group, true));
                    } else {
                        var choice = groupOrChoice;
                        if (!isDefaultLabel || !isDefaultValue) choice = __assign(__assign({}, choice), {
                            value: choice[value],
                            label: choice[label]
                        });
                        _this._addChoice(mapInputToChoice(choice, false));
                    }
                }));
                _this.unhighlightAll();
            }));
            this._searcher.reset();
            return this;
        };
        Choices.prototype.refresh = function(withEvents, selectFirstOption, deselectAll) {
            var _this = this;
            if (withEvents === void 0) withEvents = false;
            if (selectFirstOption === void 0) selectFirstOption = false;
            if (deselectAll === void 0) deselectAll = false;
            if (!this._isSelectElement) {
                if (!this.config.silent) console.warn("refresh method can only be used on choices backed by a <select> element");
                return this;
            }
            this._store.withTxn((function() {
                var choicesFromOptions = _this.passedElement.optionsAsChoices();
                var existingItems = {};
                if (!deselectAll) _this._store.items.forEach((function(choice) {
                    if (choice.id && choice.active && choice.selected && !choice.disabled) existingItems[choice.value] = true;
                }));
                _this.clearStore(false);
                var updateChoice = function(choice) {
                    if (deselectAll) _this._store.dispatch(removeItem$1(choice)); else if (existingItems[choice.value]) choice.selected = true;
                };
                choicesFromOptions.forEach((function(groupOrChoice) {
                    if ("choices" in groupOrChoice) {
                        groupOrChoice.choices.forEach(updateChoice);
                        return;
                    }
                    updateChoice(groupOrChoice);
                }));
                _this._addPredefinedChoices(choicesFromOptions, selectFirstOption, withEvents);
                if (_this._isSearching) _this._searchChoices(_this.input.value);
            }));
            return this;
        };
        Choices.prototype.removeChoice = function(value) {
            var choice = this._store.choices.find((function(c) {
                return c.value === value;
            }));
            if (!choice) return this;
            this._clearNotice();
            this._store.dispatch(removeChoice(choice));
            this._searcher.reset();
            if (choice.selected) this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(choice));
            return this;
        };
        Choices.prototype.clearChoices = function() {
            var _this = this;
            this._store.withTxn((function() {
                _this._store.choices.forEach((function(choice) {
                    if (!choice.selected) _this._store.dispatch(removeChoice(choice));
                }));
            }));
            this._searcher.reset();
            return this;
        };
        Choices.prototype.clearStore = function(clearOptions) {
            if (clearOptions === void 0) clearOptions = true;
            this._stopSearch();
            if (clearOptions) this.passedElement.element.replaceChildren("");
            this.itemList.element.replaceChildren("");
            this.choiceList.element.replaceChildren("");
            this._clearNotice();
            this._store.reset();
            this._lastAddedChoiceId = 0;
            this._lastAddedGroupId = 0;
            this._searcher.reset();
            return this;
        };
        Choices.prototype.clearInput = function() {
            var shouldSetInputWidth = !this._isSelectOneElement;
            this.input.clear(shouldSetInputWidth);
            this._stopSearch();
            return this;
        };
        Choices.prototype._validateConfig = function() {
            var config = this.config;
            var invalidConfigOptions = diff(config, DEFAULT_CONFIG);
            if (invalidConfigOptions.length) console.warn("Unknown config option(s) passed", invalidConfigOptions.join(", "));
            if (config.allowHTML && config.allowHtmlUserInput) {
                if (config.addItems) console.warn("Warning: allowHTML/allowHtmlUserInput/addItems all being true is strongly not recommended and may lead to XSS attacks");
                if (config.addChoices) console.warn("Warning: allowHTML/allowHtmlUserInput/addChoices all being true is strongly not recommended and may lead to XSS attacks");
            }
        };
        Choices.prototype._render = function(changes) {
            if (changes === void 0) changes = {
                choices: true,
                groups: true,
                items: true
            };
            if (this._store.inTxn()) return;
            if (this._isSelectElement) if (changes.choices || changes.groups) this._renderChoices();
            if (changes.items) this._renderItems();
        };
        Choices.prototype._renderChoices = function() {
            var _this = this;
            if (!this._canAddItems()) return;
            var _a = this, config = _a.config, isSearching = _a._isSearching;
            var _b = this._store, activeGroups = _b.activeGroups, activeChoices = _b.activeChoices;
            var renderLimit = 0;
            if (isSearching && config.searchResultLimit > 0) renderLimit = config.searchResultLimit; else if (config.renderChoiceLimit > 0) renderLimit = config.renderChoiceLimit;
            if (this._isSelectElement) {
                var backingOptions = activeChoices.filter((function(choice) {
                    return !choice.element;
                }));
                if (backingOptions.length) this.passedElement.addOptions(backingOptions);
            }
            var fragment = document.createDocumentFragment();
            var renderableChoices = function(choices) {
                return choices.filter((function(choice) {
                    return !choice.placeholder && (isSearching ? !!choice.rank : config.renderSelectedChoices || !choice.selected);
                }));
            };
            var selectableChoices = false;
            var renderChoices = function(choices, withinGroup, groupLabel) {
                if (isSearching) choices.sort(sortByRank); else if (config.shouldSort) choices.sort(config.sorter);
                var choiceLimit = choices.length;
                choiceLimit = !withinGroup && renderLimit && choiceLimit > renderLimit ? renderLimit : choiceLimit;
                choiceLimit--;
                choices.every((function(choice, index) {
                    var dropdownItem = choice.choiceEl || _this._templates.choice(config, choice, config.itemSelectText, groupLabel);
                    choice.choiceEl = dropdownItem;
                    fragment.appendChild(dropdownItem);
                    if (!choice.disabled && (isSearching || !choice.selected)) selectableChoices = true;
                    return index < choiceLimit;
                }));
            };
            if (activeChoices.length) {
                if (config.resetScrollPosition) requestAnimationFrame((function() {
                    return _this.choiceList.scrollToTop();
                }));
                if (!this._hasNonChoicePlaceholder && !isSearching && this._isSelectOneElement) renderChoices(activeChoices.filter((function(choice) {
                    return choice.placeholder && !choice.group;
                })), false, void 0);
                if (activeGroups.length && !isSearching) {
                    if (config.shouldSort) activeGroups.sort(config.sorter);
                    renderChoices(activeChoices.filter((function(choice) {
                        return !choice.placeholder && !choice.group;
                    })), false, void 0);
                    activeGroups.forEach((function(group) {
                        var groupChoices = renderableChoices(group.choices);
                        if (groupChoices.length) {
                            if (group.label) {
                                var dropdownGroup = group.groupEl || _this._templates.choiceGroup(_this.config, group);
                                group.groupEl = dropdownGroup;
                                dropdownGroup.remove();
                                fragment.appendChild(dropdownGroup);
                            }
                            renderChoices(groupChoices, true, config.appendGroupInSearch && isSearching ? group.label : void 0);
                        }
                    }));
                } else renderChoices(renderableChoices(activeChoices), false, void 0);
            }
            if (!selectableChoices) {
                if (!this._notice) this._notice = {
                    text: resolveStringFunction(isSearching ? config.noResultsText : config.noChoicesText),
                    type: isSearching ? NoticeTypes.noResults : NoticeTypes.noChoices
                };
                fragment.replaceChildren("");
            }
            this._renderNotice(fragment);
            this.choiceList.element.replaceChildren(fragment);
            if (selectableChoices) this._highlightChoice();
        };
        Choices.prototype._renderItems = function() {
            var _this = this;
            var items = this._store.items || [];
            var itemList = this.itemList.element;
            var config = this.config;
            var fragment = document.createDocumentFragment();
            var itemFromList = function(item) {
                return itemList.querySelector('[data-item][data-id="'.concat(item.id, '"]'));
            };
            var addItemToFragment = function(item) {
                var el = item.itemEl;
                if (el && el.parentElement) return;
                el = itemFromList(item) || _this._templates.item(config, item, config.removeItemButton);
                item.itemEl = el;
                fragment.appendChild(el);
            };
            items.forEach(addItemToFragment);
            var addItems = !!fragment.childNodes.length;
            if (this._isSelectOneElement && this._hasNonChoicePlaceholder) {
                var existingItems = itemList.children.length;
                if (addItems || existingItems > 1) {
                    var placeholder = itemList.querySelector(getClassNamesSelector(config.classNames.placeholder));
                    if (placeholder) placeholder.remove();
                } else if (!existingItems) {
                    addItems = true;
                    addItemToFragment(mapInputToChoice({
                        selected: true,
                        value: "",
                        label: config.placeholderValue || "",
                        placeholder: true
                    }, false));
                }
            }
            if (addItems) {
                itemList.append(fragment);
                if (config.shouldSortItems && !this._isSelectOneElement) {
                    items.sort(config.sorter);
                    items.forEach((function(item) {
                        var el = itemFromList(item);
                        if (el) {
                            el.remove();
                            fragment.append(el);
                        }
                    }));
                    itemList.append(fragment);
                }
            }
            if (this._isTextElement) this.passedElement.value = items.map((function(_a) {
                var value = _a.value;
                return value;
            })).join(config.delimiter);
        };
        Choices.prototype._displayNotice = function(text, type, openDropdown) {
            if (openDropdown === void 0) openDropdown = true;
            var oldNotice = this._notice;
            if (oldNotice && (oldNotice.type === type && oldNotice.text === text || oldNotice.type === NoticeTypes.addChoice && (type === NoticeTypes.noResults || type === NoticeTypes.noChoices))) {
                if (openDropdown) this.showDropdown(true);
                return;
            }
            this._clearNotice();
            this._notice = text ? {
                text,
                type
            } : void 0;
            this._renderNotice();
            if (openDropdown && text) this.showDropdown(true);
        };
        Choices.prototype._clearNotice = function() {
            if (!this._notice) return;
            var noticeElement = this.choiceList.element.querySelector(getClassNamesSelector(this.config.classNames.notice));
            if (noticeElement) noticeElement.remove();
            this._notice = void 0;
        };
        Choices.prototype._renderNotice = function(fragment) {
            var noticeConf = this._notice;
            if (noticeConf) {
                var notice = this._templates.notice(this.config, noticeConf.text, noticeConf.type);
                if (fragment) fragment.append(notice); else this.choiceList.prepend(notice);
            }
        };
        Choices.prototype._getChoiceForOutput = function(choice, keyCode) {
            return {
                id: choice.id,
                highlighted: choice.highlighted,
                labelClass: choice.labelClass,
                labelDescription: choice.labelDescription,
                customProperties: choice.customProperties,
                disabled: choice.disabled,
                active: choice.active,
                label: choice.label,
                placeholder: choice.placeholder,
                value: choice.value,
                groupValue: choice.group ? choice.group.label : void 0,
                element: choice.element,
                keyCode
            };
        };
        Choices.prototype._triggerChange = function(value) {
            if (value === void 0 || value === null) return;
            this.passedElement.triggerEvent(EventType.change, {
                value
            });
        };
        Choices.prototype._handleButtonAction = function(element) {
            var _this = this;
            var items = this._store.items;
            if (!items.length || !this.config.removeItems || !this.config.removeItemButton) return;
            var id = element && parseDataSetId(element.parentElement);
            var itemToRemove = id && items.find((function(item) {
                return item.id === id;
            }));
            if (!itemToRemove) return;
            this._store.withTxn((function() {
                _this._removeItem(itemToRemove);
                _this._triggerChange(itemToRemove.value);
                if (_this._isSelectOneElement && !_this._hasNonChoicePlaceholder) {
                    var placeholderChoice = _this._store.choices.reverse().find((function(choice) {
                        return !choice.disabled && choice.placeholder;
                    }));
                    if (placeholderChoice) {
                        _this._addItem(placeholderChoice);
                        _this.unhighlightAll();
                        if (placeholderChoice.value) _this._triggerChange(placeholderChoice.value);
                    }
                }
            }));
        };
        Choices.prototype._handleItemAction = function(element, hasShiftKey) {
            var _this = this;
            if (hasShiftKey === void 0) hasShiftKey = false;
            var items = this._store.items;
            if (!items.length || !this.config.removeItems || this._isSelectOneElement) return;
            var id = parseDataSetId(element);
            if (!id) return;
            items.forEach((function(item) {
                if (item.id === id && !item.highlighted) _this.highlightItem(item); else if (!hasShiftKey && item.highlighted) _this.unhighlightItem(item);
            }));
            this.input.focus();
        };
        Choices.prototype._handleChoiceAction = function(element) {
            var _this = this;
            var id = parseDataSetId(element);
            var choice = id && this._store.getChoiceById(id);
            if (!choice || choice.disabled) return false;
            var hasActiveDropdown = this.dropdown.isActive;
            if (!choice.selected) {
                if (!this._canAddItems()) return true;
                this._store.withTxn((function() {
                    _this._addItem(choice, true, true);
                    _this.clearInput();
                    _this.unhighlightAll();
                }));
                this._triggerChange(choice.value);
            }
            if (hasActiveDropdown && this.config.closeDropdownOnSelect) {
                this.hideDropdown(true);
                this.containerOuter.element.focus();
            }
            return true;
        };
        Choices.prototype._handleBackspace = function(items) {
            var config = this.config;
            if (!config.removeItems || !items.length) return;
            var lastItem = items[items.length - 1];
            var hasHighlightedItems = items.some((function(item) {
                return item.highlighted;
            }));
            if (config.editItems && !hasHighlightedItems && lastItem) {
                this.input.value = lastItem.value;
                this.input.setWidth();
                this._removeItem(lastItem);
                this._triggerChange(lastItem.value);
            } else {
                if (!hasHighlightedItems) this.highlightItem(lastItem, false);
                this.removeHighlightedItems(true);
            }
        };
        Choices.prototype._loadChoices = function() {
            var _a;
            var _this = this;
            var config = this.config;
            if (this._isTextElement) {
                this._presetChoices = config.items.map((function(e) {
                    return mapInputToChoice(e, false);
                }));
                if (this.passedElement.value) {
                    var elementItems = this.passedElement.value.split(config.delimiter).map((function(e) {
                        return mapInputToChoice(e, false, _this.config.allowHtmlUserInput);
                    }));
                    this._presetChoices = this._presetChoices.concat(elementItems);
                }
                this._presetChoices.forEach((function(choice) {
                    choice.selected = true;
                }));
            } else if (this._isSelectElement) {
                this._presetChoices = config.choices.map((function(e) {
                    return mapInputToChoice(e, true);
                }));
                var choicesFromOptions = this.passedElement.optionsAsChoices();
                if (choicesFromOptions) (_a = this._presetChoices).push.apply(_a, choicesFromOptions);
            }
        };
        Choices.prototype._handleLoadingState = function(setLoading) {
            if (setLoading === void 0) setLoading = true;
            var el = this.itemList.element;
            if (setLoading) {
                this.disable();
                this.containerOuter.addLoadingState();
                if (this._isSelectOneElement) el.replaceChildren(this._templates.placeholder(this.config, this.config.loadingText)); else this.input.placeholder = this.config.loadingText;
            } else {
                this.enable();
                this.containerOuter.removeLoadingState();
                if (this._isSelectOneElement) {
                    el.replaceChildren("");
                    this._render();
                } else this.input.placeholder = this._placeholderValue || "";
            }
        };
        Choices.prototype._handleSearch = function(value) {
            if (!this.input.isFocussed) return;
            if (value !== null && typeof value !== "undefined" && value.length >= this.config.searchFloor) {
                var resultCount = this.config.searchChoices ? this._searchChoices(value) : 0;
                if (resultCount !== null) this.passedElement.triggerEvent(EventType.search, {
                    value,
                    resultCount
                });
            } else if (this._store.choices.some((function(option) {
                return !option.active;
            }))) this._stopSearch();
        };
        Choices.prototype._canAddItems = function() {
            var config = this.config;
            var maxItemCount = config.maxItemCount, maxItemText = config.maxItemText;
            if (!config.singleModeForMultiSelect && maxItemCount > 0 && maxItemCount <= this._store.items.length) {
                this.choiceList.element.replaceChildren("");
                this._notice = void 0;
                this._displayNotice(typeof maxItemText === "function" ? maxItemText(maxItemCount) : maxItemText, NoticeTypes.addChoice);
                return false;
            }
            return true;
        };
        Choices.prototype._canCreateItem = function(value) {
            var config = this.config;
            var canAddItem = true;
            var notice = "";
            if (canAddItem && typeof config.addItemFilter === "function" && !config.addItemFilter(value)) {
                canAddItem = false;
                notice = resolveNoticeFunction(config.customAddItemText, value);
            }
            if (canAddItem) {
                var foundChoice = this._store.choices.find((function(choice) {
                    return config.valueComparer(choice.value, value);
                }));
                if (this._isSelectElement) {
                    if (foundChoice) {
                        this._displayNotice("", NoticeTypes.addChoice);
                        return false;
                    }
                } else if (this._isTextElement && !config.duplicateItemsAllowed) if (foundChoice) {
                    canAddItem = false;
                    notice = resolveNoticeFunction(config.uniqueItemText, value);
                }
            }
            if (canAddItem) notice = resolveNoticeFunction(config.addItemText, value);
            if (notice) this._displayNotice(notice, NoticeTypes.addChoice);
            return canAddItem;
        };
        Choices.prototype._searchChoices = function(value) {
            var newValue = value.trim().replace(/\s{2,}/, " ");
            if (!newValue.length || newValue === this._currentValue) return null;
            var searcher = this._searcher;
            if (searcher.isEmptyIndex()) searcher.index(this._store.searchableChoices);
            var results = searcher.search(newValue);
            this._currentValue = newValue;
            this._highlightPosition = 0;
            this._isSearching = true;
            var notice = this._notice;
            var noticeType = notice && notice.type;
            if (noticeType !== NoticeTypes.addChoice) if (!results.length) this._displayNotice(resolveStringFunction(this.config.noResultsText), NoticeTypes.noResults); else this._clearNotice();
            this._store.dispatch(filterChoices(results));
            return results.length;
        };
        Choices.prototype._stopSearch = function() {
            if (this._isSearching) {
                this._currentValue = "";
                this._isSearching = false;
                this._clearNotice();
                this._store.dispatch(activateChoices(true));
                this.passedElement.triggerEvent(EventType.search, {
                    value: "",
                    resultCount: 0
                });
            }
        };
        Choices.prototype._addEventListeners = function() {
            var documentElement = this._docRoot;
            var outerElement = this.containerOuter.element;
            var inputElement = this.input.element;
            documentElement.addEventListener("touchend", this._onTouchEnd, true);
            outerElement.addEventListener("keydown", this._onKeyDown, true);
            outerElement.addEventListener("mousedown", this._onMouseDown, true);
            documentElement.addEventListener("click", this._onClick, {
                passive: true
            });
            documentElement.addEventListener("touchmove", this._onTouchMove, {
                passive: true
            });
            this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
                passive: true
            });
            if (this._isSelectOneElement) {
                outerElement.addEventListener("focus", this._onFocus, {
                    passive: true
                });
                outerElement.addEventListener("blur", this._onBlur, {
                    passive: true
                });
            }
            inputElement.addEventListener("keyup", this._onKeyUp, {
                passive: true
            });
            inputElement.addEventListener("input", this._onInput, {
                passive: true
            });
            inputElement.addEventListener("focus", this._onFocus, {
                passive: true
            });
            inputElement.addEventListener("blur", this._onBlur, {
                passive: true
            });
            if (inputElement.form) inputElement.form.addEventListener("reset", this._onFormReset, {
                passive: true
            });
            this.input.addEventListeners();
        };
        Choices.prototype._removeEventListeners = function() {
            var documentElement = this._docRoot;
            var outerElement = this.containerOuter.element;
            var inputElement = this.input.element;
            documentElement.removeEventListener("touchend", this._onTouchEnd, true);
            outerElement.removeEventListener("keydown", this._onKeyDown, true);
            outerElement.removeEventListener("mousedown", this._onMouseDown, true);
            documentElement.removeEventListener("click", this._onClick);
            documentElement.removeEventListener("touchmove", this._onTouchMove);
            this.dropdown.element.removeEventListener("mouseover", this._onMouseOver);
            if (this._isSelectOneElement) {
                outerElement.removeEventListener("focus", this._onFocus);
                outerElement.removeEventListener("blur", this._onBlur);
            }
            inputElement.removeEventListener("keyup", this._onKeyUp);
            inputElement.removeEventListener("input", this._onInput);
            inputElement.removeEventListener("focus", this._onFocus);
            inputElement.removeEventListener("blur", this._onBlur);
            if (inputElement.form) inputElement.form.removeEventListener("reset", this._onFormReset);
            this.input.removeEventListeners();
        };
        Choices.prototype._onKeyDown = function(event) {
            var keyCode = event.keyCode;
            var hasActiveDropdown = this.dropdown.isActive;
            var wasPrintableChar = event.key.length === 1 || event.key.length === 2 && event.key.charCodeAt(0) >= 55296 || event.key === "Unidentified";
            if (!this._isTextElement && !hasActiveDropdown && keyCode !== KeyCodeMap.ESC_KEY && keyCode !== KeyCodeMap.TAB_KEY && keyCode !== KeyCodeMap.SHIFT_KEY) {
                this.showDropdown();
                if (!this.input.isFocussed && wasPrintableChar) {
                    this.input.value += event.key;
                    if (event.key === " ") event.preventDefault();
                }
            }
            switch (keyCode) {
              case KeyCodeMap.A_KEY:
                return this._onSelectKey(event, this.itemList.element.hasChildNodes());

              case KeyCodeMap.ENTER_KEY:
                return this._onEnterKey(event, hasActiveDropdown);

              case KeyCodeMap.ESC_KEY:
                return this._onEscapeKey(event, hasActiveDropdown);

              case KeyCodeMap.UP_KEY:
              case KeyCodeMap.PAGE_UP_KEY:
              case KeyCodeMap.DOWN_KEY:
              case KeyCodeMap.PAGE_DOWN_KEY:
                return this._onDirectionKey(event, hasActiveDropdown);

              case KeyCodeMap.DELETE_KEY:
              case KeyCodeMap.BACK_KEY:
                return this._onDeleteKey(event, this._store.items, this.input.isFocussed);
            }
        };
        Choices.prototype._onKeyUp = function() {
            this._canSearch = this.config.searchEnabled;
        };
        Choices.prototype._onInput = function() {
            var value = this.input.value;
            if (!value) {
                if (this._isTextElement) this.hideDropdown(true); else this._stopSearch();
                return;
            }
            if (!this._canAddItems()) return;
            if (this._canSearch) this._handleSearch(value);
            if (!this._canAddUserChoices) return;
            this._canCreateItem(value);
            if (this._isSelectElement) {
                this._highlightPosition = 0;
                this._highlightChoice();
            }
        };
        Choices.prototype._onSelectKey = function(event, hasItems) {
            if ((event.ctrlKey || event.metaKey) && hasItems) {
                this._canSearch = false;
                var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
                if (shouldHightlightAll) this.highlightAll();
            }
        };
        Choices.prototype._onEnterKey = function(event, hasActiveDropdown) {
            var _this = this;
            var value = this.input.value;
            var target = event.target;
            event.preventDefault();
            if (target && target.hasAttribute("data-button")) {
                this._handleButtonAction(target);
                return;
            }
            if (!hasActiveDropdown) {
                if (this._isSelectElement || this._notice) this.showDropdown();
                return;
            }
            var highlightedChoice = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
            if (highlightedChoice && this._handleChoiceAction(highlightedChoice)) return;
            if (!target || !value) {
                this.hideDropdown(true);
                return;
            }
            if (!this._canAddItems()) return;
            var addedItem = false;
            this._store.withTxn((function() {
                addedItem = _this._findAndSelectChoiceByValue(value, true);
                if (!addedItem) {
                    if (!_this._canAddUserChoices) return;
                    if (!_this._canCreateItem(value)) return;
                    _this._addChoice(mapInputToChoice(value, false, _this.config.allowHtmlUserInput), true, true);
                    addedItem = true;
                }
                _this.clearInput();
                _this.unhighlightAll();
            }));
            if (!addedItem) return;
            this._triggerChange(value);
            if (this.config.closeDropdownOnSelect) this.hideDropdown(true);
        };
        Choices.prototype._onEscapeKey = function(event, hasActiveDropdown) {
            if (hasActiveDropdown) {
                event.stopPropagation();
                this.hideDropdown(true);
                this._stopSearch();
                this.containerOuter.element.focus();
            }
        };
        Choices.prototype._onDirectionKey = function(event, hasActiveDropdown) {
            var keyCode = event.keyCode;
            if (hasActiveDropdown || this._isSelectOneElement) {
                this.showDropdown();
                this._canSearch = false;
                var directionInt = keyCode === KeyCodeMap.DOWN_KEY || keyCode === KeyCodeMap.PAGE_DOWN_KEY ? 1 : -1;
                var skipKey = event.metaKey || keyCode === KeyCodeMap.PAGE_DOWN_KEY || keyCode === KeyCodeMap.PAGE_UP_KEY;
                var nextEl = void 0;
                if (skipKey) if (directionInt > 0) nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type")); else nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier); else {
                    var currentEl = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
                    if (currentEl) nextEl = getAdjacentEl(currentEl, selectableChoiceIdentifier, directionInt); else nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                }
                if (nextEl) {
                    if (!isScrolledIntoView(nextEl, this.choiceList.element, directionInt)) this.choiceList.scrollToChildElement(nextEl, directionInt);
                    this._highlightChoice(nextEl);
                }
                event.preventDefault();
            }
        };
        Choices.prototype._onDeleteKey = function(event, items, hasFocusedInput) {
            if (!this._isSelectOneElement && !event.target.value && hasFocusedInput) {
                this._handleBackspace(items);
                event.preventDefault();
            }
        };
        Choices.prototype._onTouchMove = function() {
            if (this._wasTap) this._wasTap = false;
        };
        Choices.prototype._onTouchEnd = function(event) {
            var target = (event || event.touches[0]).target;
            var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
            if (touchWasWithinContainer) {
                var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
                if (containerWasExactTarget) if (this._isTextElement) this.input.focus(); else if (this._isSelectMultipleElement) this.showDropdown();
                event.stopPropagation();
            }
            this._wasTap = true;
        };
        Choices.prototype._onMouseDown = function(event) {
            var target = event.target;
            if (!(target instanceof HTMLElement)) return;
            if (IS_IE11 && this.choiceList.element.contains(target)) {
                var firstChoice = this.choiceList.element.firstElementChild;
                this._isScrollingOnIe = this._direction === "ltr" ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
            }
            if (target === this.input.element) return;
            var item = target.closest("[data-button],[data-item],[data-choice]");
            if (item instanceof HTMLElement) if ("button" in item.dataset) this._handleButtonAction(item); else if ("item" in item.dataset) this._handleItemAction(item, event.shiftKey); else if ("choice" in item.dataset) this._handleChoiceAction(item);
            event.preventDefault();
        };
        Choices.prototype._onMouseOver = function(_a) {
            var target = _a.target;
            if (target instanceof HTMLElement && "choice" in target.dataset) this._highlightChoice(target);
        };
        Choices.prototype._onClick = function(_a) {
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var clickWasWithinContainer = containerOuter.element.contains(target);
            if (clickWasWithinContainer) {
                if (!this.dropdown.isActive && !containerOuter.isDisabled) if (this._isTextElement) {
                    if (document.activeElement !== this.input.element) this.input.focus();
                } else {
                    this.showDropdown();
                    containerOuter.element.focus();
                } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) this.hideDropdown();
            } else {
                containerOuter.removeFocusState();
                this.hideDropdown(true);
                this.unhighlightAll();
            }
        };
        Choices.prototype._onFocus = function(_a) {
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var focusWasWithinContainer = target && containerOuter.element.contains(target);
            if (!focusWasWithinContainer) return;
            var targetIsInput = target === this.input.element;
            if (this._isTextElement) {
                if (targetIsInput) containerOuter.addFocusState();
            } else if (this._isSelectMultipleElement) {
                if (targetIsInput) {
                    this.showDropdown(true);
                    containerOuter.addFocusState();
                }
            } else {
                containerOuter.addFocusState();
                if (targetIsInput) this.showDropdown(true);
            }
        };
        Choices.prototype._onBlur = function(_a) {
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var blurWasWithinContainer = target && containerOuter.element.contains(target);
            if (blurWasWithinContainer && !this._isScrollingOnIe) {
                if (target === this.input.element) {
                    containerOuter.removeFocusState();
                    this.hideDropdown(true);
                    if (this._isTextElement || this._isSelectMultipleElement) this.unhighlightAll();
                } else if (target === this.containerOuter.element) containerOuter.removeFocusState();
            } else {
                this._isScrollingOnIe = false;
                this.input.element.focus();
            }
        };
        Choices.prototype._onFormReset = function() {
            var _this = this;
            this._store.withTxn((function() {
                _this.clearInput();
                _this.hideDropdown();
                _this.refresh(false, false, true);
                if (_this._initialItems.length) _this.setChoiceByValue(_this._initialItems);
            }));
        };
        Choices.prototype._highlightChoice = function(el) {
            if (el === void 0) el = null;
            var choices = Array.from(this.dropdown.element.querySelectorAll(selectableChoiceIdentifier));
            if (!choices.length) return;
            var passedEl = el;
            var highlightedState = this.config.classNames.highlightedState;
            var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(getClassNamesSelector(highlightedState)));
            highlightedChoices.forEach((function(choice) {
                removeClassesFromElement(choice, highlightedState);
                choice.setAttribute("aria-selected", "false");
            }));
            if (passedEl) this._highlightPosition = choices.indexOf(passedEl); else {
                if (choices.length > this._highlightPosition) passedEl = choices[this._highlightPosition]; else passedEl = choices[choices.length - 1];
                if (!passedEl) passedEl = choices[0];
            }
            addClassesToElement(passedEl, highlightedState);
            passedEl.setAttribute("aria-selected", "true");
            this.passedElement.triggerEvent(EventType.highlightChoice, {
                el: passedEl
            });
            if (this.dropdown.isActive) {
                this.input.setActiveDescendant(passedEl.id);
                this.containerOuter.setActiveDescendant(passedEl.id);
            }
        };
        Choices.prototype._addItem = function(item, withEvents, userTriggered) {
            if (withEvents === void 0) withEvents = true;
            if (userTriggered === void 0) userTriggered = false;
            if (!item.id) throw new TypeError("item.id must be set before _addItem is called for a choice/item");
            if (this.config.singleModeForMultiSelect || this._isSelectOneElement) this.removeActiveItems(item.id);
            this._store.dispatch(addItem(item));
            if (withEvents) {
                this.passedElement.triggerEvent(EventType.addItem, this._getChoiceForOutput(item));
                if (userTriggered) this.passedElement.triggerEvent(EventType.choice, this._getChoiceForOutput(item));
            }
        };
        Choices.prototype._removeItem = function(item) {
            if (!item.id) return;
            this._store.dispatch(removeItem$1(item));
            var notice = this._notice;
            if (notice && notice.type === NoticeTypes.noChoices) this._clearNotice();
            this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(item));
        };
        Choices.prototype._addChoice = function(choice, withEvents, userTriggered) {
            if (withEvents === void 0) withEvents = true;
            if (userTriggered === void 0) userTriggered = false;
            if (choice.id) throw new TypeError("Can not re-add a choice which has already been added");
            var config = this.config;
            if ((this._isSelectElement || !config.duplicateItemsAllowed) && this._store.choices.find((function(c) {
                return config.valueComparer(c.value, choice.value);
            }))) return;
            this._lastAddedChoiceId++;
            choice.id = this._lastAddedChoiceId;
            choice.elementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choice.id);
            var prependValue = config.prependValue, appendValue = config.appendValue;
            if (prependValue) choice.value = prependValue + choice.value;
            if (appendValue) choice.value += appendValue.toString();
            if ((prependValue || appendValue) && choice.element) choice.element.value = choice.value;
            this._clearNotice();
            this._store.dispatch(addChoice(choice));
            if (choice.selected) this._addItem(choice, withEvents, userTriggered);
        };
        Choices.prototype._addGroup = function(group, withEvents) {
            var _this = this;
            if (withEvents === void 0) withEvents = true;
            if (group.id) throw new TypeError("Can not re-add a group which has already been added");
            this._store.dispatch(addGroup(group));
            if (!group.choices) return;
            this._lastAddedGroupId++;
            group.id = this._lastAddedGroupId;
            group.choices.forEach((function(item) {
                item.group = group;
                if (group.disabled) item.disabled = true;
                _this._addChoice(item, withEvents);
            }));
        };
        Choices.prototype._createTemplates = function() {
            var _this = this;
            var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
            var userTemplates = {};
            if (typeof callbackOnCreateTemplates === "function") userTemplates = callbackOnCreateTemplates.call(this, strToEl, escapeForTemplate, getClassNames);
            var templating = {};
            Object.keys(this._templates).forEach((function(name) {
                if (name in userTemplates) templating[name] = userTemplates[name].bind(_this); else templating[name] = _this._templates[name].bind(_this);
            }));
            this._templates = templating;
        };
        Choices.prototype._createElements = function() {
            var templating = this._templates;
            var _a = this, config = _a.config, isSelectOneElement = _a._isSelectOneElement;
            var position = config.position, classNames = config.classNames;
            var elementType = this._elementType;
            this.containerOuter = new Container({
                element: templating.containerOuter(config, this._direction, this._isSelectElement, isSelectOneElement, config.searchEnabled, elementType, config.labelId),
                classNames,
                type: elementType,
                position
            });
            this.containerInner = new Container({
                element: templating.containerInner(config),
                classNames,
                type: elementType,
                position
            });
            this.input = new Input({
                element: templating.input(config, this._placeholderValue),
                classNames,
                type: elementType,
                preventPaste: !config.paste
            });
            this.choiceList = new List({
                element: templating.choiceList(config, isSelectOneElement)
            });
            this.itemList = new List({
                element: templating.itemList(config, isSelectOneElement)
            });
            this.dropdown = new Dropdown({
                element: templating.dropdown(config),
                classNames,
                type: elementType
            });
        };
        Choices.prototype._createStructure = function() {
            var _a = this, containerInner = _a.containerInner, containerOuter = _a.containerOuter, passedElement = _a.passedElement;
            var dropdownElement = this.dropdown.element;
            passedElement.conceal();
            containerInner.wrap(passedElement.element);
            containerOuter.wrap(containerInner.element);
            if (this._isSelectOneElement) this.input.placeholder = this.config.searchPlaceholderValue || ""; else {
                if (this._placeholderValue) this.input.placeholder = this._placeholderValue;
                this.input.setWidth();
            }
            containerOuter.element.appendChild(containerInner.element);
            containerOuter.element.appendChild(dropdownElement);
            containerInner.element.appendChild(this.itemList.element);
            dropdownElement.appendChild(this.choiceList.element);
            if (!this._isSelectOneElement) containerInner.element.appendChild(this.input.element); else if (this.config.searchEnabled) dropdownElement.insertBefore(this.input.element, dropdownElement.firstChild);
            this._highlightPosition = 0;
            this._isSearching = false;
        };
        Choices.prototype._initStore = function() {
            var _this = this;
            this._store.subscribe(this._render).withTxn((function() {
                _this._addPredefinedChoices(_this._presetChoices, _this._isSelectOneElement && !_this._hasNonChoicePlaceholder, false);
            }));
            if (!this._store.choices.length || this._isSelectOneElement && this._hasNonChoicePlaceholder) this._render();
        };
        Choices.prototype._addPredefinedChoices = function(choices, selectFirstOption, withEvents) {
            var _this = this;
            if (selectFirstOption === void 0) selectFirstOption = false;
            if (withEvents === void 0) withEvents = true;
            if (selectFirstOption) {
                var noSelectedChoices = choices.findIndex((function(choice) {
                    return choice.selected;
                })) === -1;
                if (noSelectedChoices) choices.some((function(choice) {
                    if (choice.disabled || "choices" in choice) return false;
                    choice.selected = true;
                    return true;
                }));
            }
            choices.forEach((function(item) {
                if ("choices" in item) {
                    if (_this._isSelectElement) _this._addGroup(item, withEvents);
                } else _this._addChoice(item, withEvents);
            }));
        };
        Choices.prototype._findAndSelectChoiceByValue = function(value, userTriggered) {
            var _this = this;
            if (userTriggered === void 0) userTriggered = false;
            var foundChoice = this._store.choices.find((function(choice) {
                return _this.config.valueComparer(choice.value, value);
            }));
            if (foundChoice && !foundChoice.disabled && !foundChoice.selected) {
                this._addItem(foundChoice, true, userTriggered);
                return true;
            }
            return false;
        };
        Choices.prototype._generatePlaceholderValue = function() {
            var config = this.config;
            if (!config.placeholder) return null;
            if (this._hasNonChoicePlaceholder) return config.placeholderValue;
            if (this._isSelectElement) {
                var placeholderOption = this.passedElement.placeholderOption;
                return placeholderOption ? placeholderOption.text : null;
            }
            return null;
        };
        Choices.prototype._warnChoicesInitFailed = function(caller) {
            if (this.config.silent) return;
            if (!this.initialised) throw new TypeError("".concat(caller, " called on a non-initialised instance of Choices")); else if (!this.initialisedOK) throw new TypeError("".concat(caller, " called for an element which has multiple instances of Choices initialised on it"));
        };
        Choices.version = "11.0.3";
        return Choices;
    }();
    const selectCatalog = document.querySelector(".select-catalog");
    const selectsUserForm = document.querySelectorAll(".form-user__select");
    if (selectCatalog) {
        objectModules.select = new Choices(selectCatalog, {
            shouldSort: false,
            position: "bottom",
            searchEnabled: false,
            itemSelectText: ""
        });
        addSpanSelectItem();
        objectModules.select.passedElement.element.addEventListener("change", (function(e) {
            addSpanSelectItem();
        }));
        function addSpanSelectItem() {
            const choicesInner = document.querySelector(".choices__inner");
            const choicesItem = choicesInner.querySelector(".choices__item.choices__item--selectable");
            choicesItem.insertAdjacentHTML("afterbegin", `<span>Sort by:</span>`);
        }
    }
    if (selectsUserForm.length > 0) {
        objectModules.selects = [];
        selectsUserForm.forEach((selectUserForm => {
            const select = new Choices(selectUserForm, {
                shouldSort: false,
                position: "bottom",
                placeholder: true,
                placeholderValue: " ",
                searchEnabled: false,
                itemSelectText: ""
            });
            objectModules.selects.push(select);
        }));
    }
    function filterBlockClear() {
        document.addEventListener("click", (e => {
            const {target} = e;
            if (target.closest("input[type=checkbox]") && target.closest("[data-filter]")) {
                const filterBlock = target.closest(".filter__block");
                clearButtonShowHide(target, checkedInputs(filterBlock));
            }
            if (target.closest(".filter__clear") && target.closest("[data-filter]")) {
                const filterBlock = target.closest(".filter__block");
                clearCheckedInputs(filterBlock);
                clearButtonShowHide(target, false);
            }
        }));
        function clearButtonShowHide(target) {
            let show = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            const filterBlock = target.closest(".filter__block");
            const clearButton = filterBlock.querySelector(".filter__clear");
            show ? clearButton.classList.add("is-visible") : clearButton.classList.remove("is-visible");
        }
        function checkedInputs(filterBlock) {
            const checkboxInputs = filterBlock.querySelectorAll(".checkbox__input");
            return [ ...checkboxInputs ].some((checkbox => checkbox.checked));
        }
        function clearCheckedInputs(filterBlock) {
            const checkboxInputs = filterBlock.querySelectorAll(".checkbox__input");
            checkboxInputs.forEach((checkbox => checkbox.checked ? checkbox.checked = false : null));
        }
    }
    function openFilterMenu() {
        document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (bodyLockStatus && target.closest("[data-button-filter-menu]")) {
                document.documentElement.classList.add("filter-menu-open");
                return;
            }
            if (target.closest(".filter__close") && document.documentElement.classList.contains("filter-menu-open")) document.documentElement.classList.remove("filter-menu-open");
            if (!target.closest("[data-filter]") && document.documentElement.classList.contains("filter-menu-open")) document.documentElement.classList.remove("filter-menu-open");
        }));
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        if (!tabs.length > 0) return;
        const hash = getHash();
        let tabsActiveHash = hash && hash.startsWith("tab-") ? hash.replace("tab-", "").split("-") : [];
        tabs.forEach(((tabsBlock, index) => {
            initTabs(tabsBlock, index);
            tabsBlock.addEventListener("click", tabsAction);
            tabsBlock.addEventListener("keydown", keyDownAction);
        }));
        let mdQueriesArray = dataMediaQueries(tabs, "tabs");
        if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
            mdQueriesItem.matchMedia.addEventListener("change", (() => {
                updateControlPosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            updateControlPosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        }));
        function updateControlPosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                const tabsControl = tabsMediaItem.querySelector("[data-tabs-controls]");
                const tabsControls = tabsMediaItem.querySelectorAll("[data-tabs-control]");
                const tabsContent = tabsMediaItem.querySelector("[data-tabs-content]");
                const tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                const tabsControlArray = Array.from(tabsControls).filter((tabControl => tabControl.closest("[data-tabs]") === tabsMediaItem));
                const tabsContentArray = Array.from(tabsContentItems).filter((tabContentItem => tabContentItem.closest("[data-tabs]") === tabsMediaItem));
                tabsContentArray.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsControlArray[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("tab-accordion");
                    } else {
                        tabsControl.append(tabsControlArray[index]);
                        tabsMediaItem.classList.remove("tab-accordion");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock, index) {
            tabsBlock.classList.add("tab-init");
            tabsBlock.setAttribute("data-tabs-index", index);
            const tabsControlNavigation = tabsBlock.querySelector("[data-tabs-controls]");
            const tabsControlButtons = tabsBlock.querySelectorAll("[data-tabs-controls]>*");
            const tabsContentItems = tabsBlock.querySelectorAll("[data-tabs-content]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabControlActive = tabsBlock.querySelector("[data-tabs-controls]>.is-active");
                tabControlActive ? tabControlActive.classList.remove("is-active") : null;
            }
            tabsControlNavigation.setAttribute("role", "tablist");
            tabsContentItems.forEach(((tabsContentItem, index) => {
                tabsControlButtons[index].setAttribute("data-tabs-control", "");
                tabsControlButtons[index].setAttribute("role", "tab");
                tabsControlButtons[index].setAttribute("id", `${tabsBlock.classList[0]}-${index + 1}`);
                tabsControlButtons[index].setAttribute("aria-selected", true);
                tabsContentItem.setAttribute("role", "tabpanel");
                tabsContentItem.setAttribute("data-tabs-item", "");
                tabsContentItem.setAttribute("aria-labelledby", tabsControlButtons[index].id);
                if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsControlButtons[index].classList.add("is-active");
                if (!tabsControlButtons[index].classList.contains("is-active")) {
                    tabsContentItem.hidden = true;
                    tabsContentItem.setAttribute("tabindex", "-1");
                    tabsControlButtons[index].setAttribute("tabindex", "-1");
                    tabsControlButtons[index].setAttribute("aria-selected", false);
                }
            }));
        }
        function updateTabsStatus(tabsBlock) {
            const tabsControls = tabsBlock.querySelectorAll("[data-tabs-control]");
            const tabsContentItems = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockAnimateDuration = getTabsAnimateDuration(tabsBlock);
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            if (tabsContentItems.length > 0) {
                const tabsContentArray = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsBlock));
                const tabsControlsArray = Array.from(tabsControls).filter((item => item.closest("[data-tabs]") === tabsBlock));
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContentArray.forEach(((tabsContentItem, index) => {
                    if (tabsControlsArray[index].classList.contains("is-active")) {
                        tabsContentItem.removeAttribute("tabindex");
                        contentTabsToggle(tabsContentItem, tabsBlockAnimateDuration);
                        if (isHash && !tabsContentItem.closest(".modal")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else {
                        tabsContentItem.setAttribute("tabindex", "-1");
                        contentTabsToggle(tabsContentItem, tabsBlockAnimateDuration, false);
                    }
                }));
            }
        }
        function contentTabsToggle(tabsContentItem, animateDuration) {
            let isActive = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
            if (isActive) {
                animateDuration ? _slideDown(tabsContentItem, animateDuration) : tabsContentItem.hidden = false;
                window.scrollTo({
                    top: tabsContentItem,
                    behavior: "smooth"
                });
            } else animateDuration ? _slideUp(tabsContentItem, animateDuration) : tabsContentItem.hidden = true;
        }
        function tabsAction(e) {
            const {target} = e;
            if (!target.closest("[data-tabs-control]")) return;
            const tabControl = target.closest("[data-tabs-control]");
            const tabsBlock = tabControl.closest("[data-tabs]");
            const tabsControlItems = tabsBlock.querySelectorAll("[data-tabs-control]");
            if (!tabControl.classList.contains("is-active") && !tabsBlock.querySelector(".slide")) {
                const [tabActiveControl] = Array.from(tabsControlItems).filter((item => item.classList.contains("is-active") && item.closest("[data-tabs]") === tabsBlock));
                tabActiveControl ? toggleTabSelected(tabActiveControl) : null;
                toggleTabSelected(tabControl, true);
                updateTabsStatus(tabsBlock);
            }
            e.preventDefault();
        }
        function keyDownAction(e) {
            const {target, key} = e;
            if (!target.closest("[data-tabs-control]")) return;
            const tabControl = target.closest("[data-tabs-control]");
            const tabsBlock = tabControl.closest("[data-tabs]");
            const tabsControls = Array.from(tabsBlock.querySelectorAll("[data-tabs-control]"));
            if (tabControl.classList.contains("is-active") && !tabsBlock.querySelector(".slide")) {
                const currentIndex = tabsControls.findIndex((itemIndex => itemIndex === tabControl));
                const [tabActiveControl] = tabsControls.filter((item => item.classList.contains("is-active") && item.closest("[data-tabs]") === tabsBlock));
                let nextIndex;
                if (key === "ArrowRight" || key === "ArrowDown") nextIndex = currentIndex === tabsControls.length - 1 ? 0 : currentIndex + 1; else if (key === "ArrowLeft" || key === "ArrowUp") nextIndex = currentIndex === 0 ? tabsControls.length - 1 : currentIndex - 1; else return;
                tabActiveControl ? toggleTabSelected(tabActiveControl) : null;
                toggleTabSelected(tabsControls[nextIndex], true);
                tabsControls[nextIndex].focus();
                updateTabsStatus(tabsBlock);
            }
        }
        function getTabsAnimateDuration(tabsBlock) {
            if (tabsBlock.hasAttribute("data-tabs-animate")) return +tabsBlock.dataset.tabsAnimate || 500;
        }
        function toggleTabSelected(tabControl) {
            let isActive = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            !isActive ? tabControl.setAttribute("tabindex", "-1") : tabControl.removeAttribute("tabindex");
            tabControl.setAttribute("aria-selected", `${!isActive ? false : true}`);
            tabControl.classList.toggle("is-active");
        }
    }
    var HOOKS = [ "onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition" ];
    var options_defaults = {
        _disable: [],
        allowInput: false,
        allowInvalidPreload: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: true,
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enableSeconds: false,
        enableTime: false,
        errorHandler: function(err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function(givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            var week1 = new Date(date.getFullYear(), 0, 4);
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date,
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: void 0,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false
    };
    var english = {
        weekdays: {
            shorthand: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            longhand: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
        },
        months: {
            shorthand: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            longhand: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        },
        daysInMonth: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
        firstDayOfWeek: 0,
        ordinal: function(nth) {
            var s = nth % 100;
            if (s > 3 && s < 21) return "th";
            switch (s % 10) {
              case 1:
                return "st";

              case 2:
                return "nd";

              case 3:
                return "rd";

              default:
                return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: [ "AM", "PM" ],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: false
    };
    const l10n_default = english;
    var pad = function(number, length) {
        if (length === void 0) length = 2;
        return ("000" + number).slice(length * -1);
    };
    var utils_int = function(bool) {
        return bool === true ? 1 : 0;
    };
    function utils_debounce(fn, wait) {
        var t;
        return function() {
            var _this = this;
            var args = arguments;
            clearTimeout(t);
            t = setTimeout((function() {
                return fn.apply(_this, args);
            }), wait);
        };
    }
    var arrayify = function(obj) {
        return obj instanceof Array ? obj : [ obj ];
    };
    function toggleClass(elem, className, bool) {
        if (bool === true) return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function dom_createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== void 0) e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while (node.firstChild) node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node)) return node; else if (node.parentNode) return findParent(node.parentNode, condition);
        return;
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = dom_createElement("div", "numInputWrapper"), numInput = dom_createElement("input", "numInput " + inputClassName), arrowUp = dom_createElement("span", "arrowUp"), arrowDown = dom_createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) numInput.type = "number"; else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== void 0) for (var key in opts) numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        } catch (error) {
            return event.target;
        }
    }
    var doNothing = function() {
        return;
    };
    var monthToStr = function(monthNumber, shorthand, locale) {
        return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
    };
    var revFormat = {
        D: doNothing,
        F: function(dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function(dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        H: function(dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function(dateObj, amPM, locale) {
            dateObj.setHours(dateObj.getHours() % 12 + 12 * utils_int(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function(dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function(_, unixSeconds) {
            return new Date(parseFloat(unixSeconds) * 1e3);
        },
        W: function(dateObj, weekNum, locale) {
            var weekNumber = parseInt(weekNum);
            var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: function(dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function(_, ISODate) {
            return new Date(ISODate);
        },
        d: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function(dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        i: function(dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: function(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function(_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: doNothing,
        y: function(dateObj, year) {
            dateObj.setFullYear(2e3 + parseFloat(year));
        }
    };
    var tokenRegex = {
        D: "",
        F: "",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
    };
    var formats = {
        Z: function(date) {
            return date.toISOString();
        },
        D: function(date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        F: function(date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        G: function(date, locale, options) {
            return pad(formats.h(date, locale, options));
        },
        H: function(date) {
            return pad(date.getHours());
        },
        J: function(date, locale) {
            return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
        },
        K: function(date, locale) {
            return locale.amPM[utils_int(date.getHours() > 11)];
        },
        M: function(date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        S: function(date) {
            return pad(date.getSeconds());
        },
        U: function(date) {
            return date.getTime() / 1e3;
        },
        W: function(date, _, options) {
            return options.getWeek(date);
        },
        Y: function(date) {
            return pad(date.getFullYear(), 4);
        },
        d: function(date) {
            return pad(date.getDate());
        },
        h: function(date) {
            return date.getHours() % 12 ? date.getHours() % 12 : 12;
        },
        i: function(date) {
            return pad(date.getMinutes());
        },
        j: function(date) {
            return date.getDate();
        },
        l: function(date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        m: function(date) {
            return pad(date.getMonth() + 1);
        },
        n: function(date) {
            return date.getMonth() + 1;
        },
        s: function(date) {
            return date.getSeconds();
        },
        u: function(date) {
            return date.getTime();
        },
        w: function(date) {
            return date.getDay();
        },
        y: function(date) {
            return String(date.getFullYear()).substring(2);
        }
    };
    var createDateFormatter = function(_a) {
        var _b = _a.config, config = _b === void 0 ? options_defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
        return function(dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== void 0 && !isMobile) return config.formatDate(dateObj, frmt, locale);
            return frmt.split("").map((function(c, i, arr) {
                return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
            })).join("");
        };
    };
    var createDateParser = function(_a) {
        var _b = _a.config, config = _b === void 0 ? options_defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function(date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date) return;
            var locale = customLocale || l10n;
            var parsedDate;
            var dateOrig = date;
            if (date instanceof Date) parsedDate = new Date(date.getTime()); else if (typeof date !== "string" && date.toFixed !== void 0) parsedDate = new Date(date); else if (typeof date === "string") {
                var format = givenFormat || (config || options_defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date;
                    timeless = true;
                } else if (config && config.parseDate) parsedDate = config.parseDate(date, format); else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) parsedDate = new Date(date); else {
                    var matched = void 0, ops = [];
                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token = format[i];
                        var isBackSlash = token === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (tokenRegex[token] && !escaped) {
                            regexStr += tokenRegex[token];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex]
                            });
                        } else if (!isBackSlash) regexStr += ".";
                    }
                    parsedDate = !config || !config.noCalendar ? new Date((new Date).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((new Date).setHours(0, 0, 0, 0));
                    ops.forEach((function(_a) {
                        var fn = _a.fn, val = _a.val;
                        return parsedDate = fn(parsedDate, val, locale) || parsedDate;
                    }));
                    parsedDate = matched ? parsedDate : void 0;
                }
            }
            if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                return;
            }
            if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    function compareDates(date1, date2, timeless) {
        if (timeless === void 0) timeless = true;
        if (timeless !== false) return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
        return date1.getTime() - date2.getTime();
    }
    var isBetween = function(ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    var calculateSecondsSinceMidnight = function(hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    };
    var parseSeconds = function(secondsSinceMidnight) {
        var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
        return [ hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60 ];
    };
    var duration = {
        DAY: 864e5
    };
    function getDefaultHours(config) {
        var hours = config.defaultHour;
        var minutes = config.defaultMinute;
        var seconds = config.defaultSeconds;
        if (config.minDate !== void 0) {
            var minHour = config.minDate.getHours();
            var minMinutes = config.minDate.getMinutes();
            var minSeconds = config.minDate.getSeconds();
            if (hours < minHour) hours = minHour;
            if (hours === minHour && minutes < minMinutes) minutes = minMinutes;
            if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
        }
        if (config.maxDate !== void 0) {
            var maxHr = config.maxDate.getHours();
            var maxMinutes = config.maxDate.getMinutes();
            hours = Math.min(hours, maxHr);
            if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
            if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
        }
        return {
            hours,
            minutes,
            seconds
        };
    }
    __webpack_require__(990);
    var esm_assign = void 0 && (void 0).__assign || function() {
        esm_assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return esm_assign.apply(this, arguments);
    };
    var __spreadArrays = void 0 && (void 0).__spreadArrays || function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        var r = Array(s), k = 0;
        for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
        k++) r[k] = a[j];
        return r;
    };
    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self = {
            config: esm_assign(esm_assign({}, options_defaults), flatpickr.defaultConfig),
            l10n: l10n_default
        };
        self.parseDate = createDateParser({
            config: self.config,
            l10n: self.l10n
        });
        self._handlers = [];
        self.pluginElements = [];
        self.loadedPlugins = [];
        self._bind = bind;
        self._setHoursFromDate = setHoursFromDate;
        self._positionCalendar = positionCalendar;
        self.changeMonth = changeMonth;
        self.changeYear = changeYear;
        self.clear = clear;
        self.close = close;
        self.onMouseOver = onMouseOver;
        self._createElement = dom_createElement;
        self.createDay = createDay;
        self.destroy = destroy;
        self.isEnabled = isEnabled;
        self.jumpToDate = jumpToDate;
        self.updateValue = updateValue;
        self.open = open;
        self.redraw = redraw;
        self.set = set;
        self.setDate = setDate;
        self.toggle = toggle;
        function setupHelperFunctions() {
            self.utils = {
                getDaysInMonth: function(month, yr) {
                    if (month === void 0) month = self.currentMonth;
                    if (yr === void 0) yr = self.currentYear;
                    if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
                    return self.l10n.daysInMonth[month];
                }
            };
        }
        function init() {
            self.element = self.input = element;
            self.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self.isMobile) build();
            bindEvents();
            if (self.selectedDates.length || self.config.noCalendar) {
                if (self.config.enableTime) setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : void 0);
                updateValue(false);
            }
            setCalendarWidth();
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (!self.isMobile && isSafari) positionCalendar();
            triggerEvent("onReady");
        }
        function getClosestActiveElement() {
            var _a;
            return ((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
        }
        function bindToInstance(fn) {
            return fn.bind(self);
        }
        function setCalendarWidth() {
            var config = self.config;
            if (config.weekNumbers === false && config.showMonths === 1) return; else if (config.noCalendar !== true) window.requestAnimationFrame((function() {
                if (self.calendarContainer !== void 0) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== void 0) {
                    var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== void 0 ? self.weekWrapper.offsetWidth : 0) + "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            }));
        }
        function updateTime(e) {
            if (self.selectedDates.length === 0) {
                var defaultDate = self.config.minDate === void 0 || compareDates(new Date, self.config.minDate) >= 0 ? new Date : new Date(self.config.minDate.getTime());
                var defaults = getDefaultHours(self.config);
                defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                self.selectedDates = [ defaultDate ];
                self.latestSelectedDateObj = defaultDate;
            }
            if (e !== void 0 && e.type !== "blur") timeWrapper(e);
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) self._debouncedChange();
        }
        function ampm2military(hour, amPM) {
            return hour % 12 + 12 * utils_int(amPM === self.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch (hour % 24) {
              case 0:
              case 12:
                return 12;

              default:
                return hour % 12;
            }
        }
        function setHoursFromInputs() {
            if (self.hourElement === void 0 || self.minuteElement === void 0) return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== void 0 ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
            if (self.amPM !== void 0) hours = ampm2military(hours, self.amPM.textContent);
            var limitMinHours = self.config.minTime !== void 0 || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
            var limitMaxHours = self.config.maxTime !== void 0 || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
            if (self.config.maxTime !== void 0 && self.config.minTime !== void 0 && self.config.minTime > self.config.maxTime) {
                var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
                var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
                var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
                if (currentTime > maxBound && currentTime < minBound) {
                    var result = parseSeconds(minBound);
                    hours = result[0];
                    minutes = result[1];
                    seconds = result[2];
                }
            } else {
                if (limitMaxHours) {
                    var maxTime = self.config.maxTime !== void 0 ? self.config.maxTime : self.config.maxDate;
                    hours = Math.min(hours, maxTime.getHours());
                    if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
                    if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
                }
                if (limitMinHours) {
                    var minTime = self.config.minTime !== void 0 ? self.config.minTime : self.config.minDate;
                    hours = Math.max(hours, minTime.getHours());
                    if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
                    if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
                }
            }
            setHours(hours, minutes, seconds);
        }
        function setHoursFromDate(dateObj) {
            var date = dateObj || self.latestSelectedDateObj;
            if (date && date instanceof Date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
        function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== void 0) self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            if (!self.hourElement || !self.minuteElement || self.isMobile) return;
            self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * utils_int(hours % 12 === 0) : hours);
            self.minuteElement.value = pad(minutes);
            if (self.amPM !== void 0) self.amPM.textContent = self.l10n.amPM[utils_int(hours >= 12)];
            if (self.secondElement !== void 0) self.secondElement.value = pad(seconds);
        }
        function onYearInput(event) {
            var eventTarget = getEventTarget(event);
            var year = parseInt(eventTarget.value) + (event.delta || 0);
            if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) changeYear(year);
        }
        function bind(element, event, handler, options) {
            if (event instanceof Array) return event.forEach((function(ev) {
                return bind(element, ev, handler, options);
            }));
            if (element instanceof Array) return element.forEach((function(el) {
                return bind(el, event, handler, options);
            }));
            element.addEventListener(event, handler, options);
            self._handlers.push({
                remove: function() {
                    return element.removeEventListener(event, handler, options);
                }
            });
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        function bindEvents() {
            if (self.config.wrap) [ "open", "close", "toggle", "clear" ].forEach((function(evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), (function(el) {
                    return bind(el, "click", self[evt]);
                }));
            }));
            if (self.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = utils_debounce(onResize, 50);
            self._debouncedChange = utils_debounce(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self.daysContainer, "mouseover", (function(e) {
                if (self.config.mode === "range") onMouseOver(getEventTarget(e));
            }));
            bind(self._input, "keydown", onKeyDown);
            if (self.calendarContainer !== void 0) bind(self.calendarContainer, "keydown", onKeyDown);
            if (!self.config.inline && !self.config.static) bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== void 0) bind(window.document, "touchstart", documentClick); else bind(window.document, "mousedown", documentClick);
            bind(window.document, "focus", documentClick, {
                capture: true
            });
            if (self.config.clickOpens === true) {
                bind(self._input, "focus", self.open);
                bind(self._input, "click", self.open);
            }
            if (self.daysContainer !== void 0) {
                bind(self.monthNav, "click", onMonthNavClick);
                bind(self.monthNav, [ "keyup", "increment" ], onYearInput);
                bind(self.daysContainer, "click", selectDate);
            }
            if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0) {
                var selText = function(e) {
                    return getEventTarget(e).select();
                };
                bind(self.timeContainer, [ "increment" ], updateTime);
                bind(self.timeContainer, "blur", updateTime, {
                    capture: true
                });
                bind(self.timeContainer, "click", timeIncrement);
                bind([ self.hourElement, self.minuteElement ], [ "focus", "click" ], selText);
                if (self.secondElement !== void 0) bind(self.secondElement, "focus", (function() {
                    return self.secondElement && self.secondElement.select();
                }));
                if (self.amPM !== void 0) bind(self.amPM, "click", (function(e) {
                    updateTime(e);
                }));
            }
            if (self.config.allowInput) bind(self._input, "blur", onBlur);
        }
        function jumpToDate(jumpDate, triggerChange) {
            var jumpTo = jumpDate !== void 0 ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
            var oldYear = self.currentYear;
            var oldMonth = self.currentMonth;
            try {
                if (jumpTo !== void 0) {
                    self.currentYear = jumpTo.getFullYear();
                    self.currentMonth = jumpTo.getMonth();
                }
            } catch (e) {
                e.message = "Invalid date supplied: " + jumpTo;
                self.config.errorHandler(e);
            }
            if (triggerChange && self.currentYear !== oldYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            if (triggerChange && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) triggerEvent("onMonthChange");
            self.redraw();
        }
        function timeIncrement(e) {
            var eventTarget = getEventTarget(e);
            if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }
        function incrementNumInput(e, delta, inputElem) {
            var target = e && getEventTarget(e);
            var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self.calendarContainer = dom_createElement("div", "flatpickr-calendar");
            self.calendarContainer.tabIndex = -1;
            if (!self.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self.innerContainer = dom_createElement("div", "flatpickr-innerContainer");
                if (self.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self.innerContainer.appendChild(weekWrapper);
                    self.weekNumbers = weekNumbers;
                    self.weekWrapper = weekWrapper;
                }
                self.rContainer = dom_createElement("div", "flatpickr-rContainer");
                self.rContainer.appendChild(buildWeekdays());
                if (!self.daysContainer) {
                    self.daysContainer = dom_createElement("div", "flatpickr-days");
                    self.daysContainer.tabIndex = -1;
                }
                buildDays();
                self.rContainer.appendChild(self.daysContainer);
                self.innerContainer.appendChild(self.rContainer);
                fragment.appendChild(self.innerContainer);
            }
            if (self.config.enableTime) fragment.appendChild(buildTime());
            toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
            toggleClass(self.calendarContainer, "animate", self.config.animate === true);
            toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
            self.calendarContainer.appendChild(fragment);
            var customAppend = self.config.appendTo !== void 0 && self.config.appendTo.nodeType !== void 0;
            if (self.config.inline || self.config.static) {
                self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                if (self.config.inline) if (!customAppend && self.element.parentNode) self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling); else if (self.config.appendTo !== void 0) self.config.appendTo.appendChild(self.calendarContainer);
                if (self.config.static) {
                    var wrapper = dom_createElement("div", "flatpickr-wrapper");
                    if (self.element.parentNode) self.element.parentNode.insertBefore(wrapper, self.element);
                    wrapper.appendChild(self.element);
                    if (self.altInput) wrapper.appendChild(self.altInput);
                    wrapper.appendChild(self.calendarContainer);
                }
            }
            if (!self.config.static && !self.config.inline) (self.config.appendTo !== void 0 ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
        }
        function createDay(className, date, _dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = dom_createElement("span", className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
                self.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self.selectedDateElem = dayElement;
                    if (self.config.mode === "range") {
                        toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
                        toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay") dayElement.classList.add("inRange");
                    }
                }
            } else dayElement.classList.add("flatpickr-disabled");
            if (self.config.mode === "range") if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");
            if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self.config.mode === "range") onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            for (var m = startMonth; m != endMonth; m += delta) {
                var month = self.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for (var i = startIndex; i != endIndex; i += delta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
                }
            }
            return;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                var month = self.daysContainer.children[m];
                var startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
                var numMonthDays = month.children.length;
                for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
                }
            }
            self.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return;
        }
        function focusOnDay(current, offset) {
            var activeElement = getClosestActiveElement();
            var dayFocused = isInView(activeElement || document.body);
            var startElem = current !== void 0 ? current : dayFocused ? activeElement : self.selectedDateElem !== void 0 && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== void 0 && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === void 0) self._input.focus(); else if (!dayFocused) focusOnDayElem(startElem); else getNextAvailableDay(startElem, offset);
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
            var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            for (;dayNumber <= prevMonthDays; dayNumber++, dayIndex++) days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
            for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, 
            dayIndex++) days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            var dayContainer = dom_createElement("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self.daysContainer === void 0) return;
            clearNode(self.daysContainer);
            if (self.weekNumbers) clearNode(self.weekNumbers);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < self.config.showMonths; i++) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self.daysContainer.appendChild(frag);
            self.days = self.daysContainer.firstChild;
            if (self.config.mode === "range" && self.selectedDates.length === 1) onMouseOver();
        }
        function buildMonthSwitch() {
            if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown") return;
            var shouldBuildMonth = function(month) {
                if (self.config.minDate !== void 0 && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) return false;
                return !(self.config.maxDate !== void 0 && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
            };
            self.monthsDropdownContainer.tabIndex = -1;
            self.monthsDropdownContainer.innerHTML = "";
            for (var i = 0; i < 12; i++) {
                if (!shouldBuildMonth(i)) continue;
                var month = dom_createElement("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self.currentYear, i).getMonth().toString();
                month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                month.tabIndex = -1;
                if (self.currentMonth === i) month.selected = true;
                self.monthsDropdownContainer.appendChild(month);
            }
        }
        function buildMonth() {
            var container = dom_createElement("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement;
            if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") monthElement = dom_createElement("span", "cur-month"); else {
                self.monthsDropdownContainer = dom_createElement("select", "flatpickr-monthDropdown-months");
                self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
                bind(self.monthsDropdownContainer, "change", (function(e) {
                    var target = getEventTarget(e);
                    var selectedMonth = parseInt(target.value, 10);
                    self.changeMonth(selectedMonth - self.currentMonth);
                    triggerEvent("onMonthChange");
                }));
                buildMonthSwitch();
                monthElement = self.monthsDropdownContainer;
            }
            var yearInput = createNumberInput("cur-year", {
                tabindex: "-1"
            });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
            if (self.config.minDate) yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
            if (self.config.maxDate) {
                yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
            }
            var currentMonth = dom_createElement("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container,
                yearElement,
                monthElement
            };
        }
        function buildMonths() {
            clearNode(self.monthNav);
            self.monthNav.appendChild(self.prevMonthNav);
            if (self.config.showMonths) {
                self.yearElements = [];
                self.monthElements = [];
            }
            for (var m = self.config.showMonths; m--; ) {
                var month = buildMonth();
                self.yearElements.push(month.yearElement);
                self.monthElements.push(month.monthElement);
                self.monthNav.appendChild(month.container);
            }
            self.monthNav.appendChild(self.nextMonthNav);
        }
        function buildMonthNav() {
            self.monthNav = dom_createElement("div", "flatpickr-months");
            self.yearElements = [];
            self.monthElements = [];
            self.prevMonthNav = dom_createElement("span", "flatpickr-prev-month");
            self.prevMonthNav.innerHTML = self.config.prevArrow;
            self.nextMonthNav = dom_createElement("span", "flatpickr-next-month");
            self.nextMonthNav.innerHTML = self.config.nextArrow;
            buildMonths();
            Object.defineProperty(self, "_hidePrevMonthArrow", {
                get: function() {
                    return self.__hidePrevMonthArrow;
                },
                set: function(bool) {
                    if (self.__hidePrevMonthArrow !== bool) {
                        toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                        self.__hidePrevMonthArrow = bool;
                    }
                }
            });
            Object.defineProperty(self, "_hideNextMonthArrow", {
                get: function() {
                    return self.__hideNextMonthArrow;
                },
                set: function(bool) {
                    if (self.__hideNextMonthArrow !== bool) {
                        toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                        self.__hideNextMonthArrow = bool;
                    }
                }
            });
            self.currentYearElement = self.yearElements[0];
            updateNavigationCurrentMonth();
            return self.monthNav;
        }
        function buildTime() {
            self.calendarContainer.classList.add("hasTime");
            if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
            var defaults = getDefaultHours(self.config);
            self.timeContainer = dom_createElement("div", "flatpickr-time");
            self.timeContainer.tabIndex = -1;
            var separator = dom_createElement("span", "flatpickr-time-separator", ":");
            var hourInput = createNumberInput("flatpickr-hour", {
                "aria-label": self.l10n.hourAriaLabel
            });
            self.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = createNumberInput("flatpickr-minute", {
                "aria-label": self.l10n.minuteAriaLabel
            });
            self.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
            self.hourElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults.hours : military2ampm(defaults.hours));
            self.minuteElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults.minutes);
            self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
            self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
            self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
            self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
            self.hourElement.setAttribute("maxlength", "2");
            self.minuteElement.setAttribute("min", "0");
            self.minuteElement.setAttribute("max", "59");
            self.minuteElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild(hourInput);
            self.timeContainer.appendChild(separator);
            self.timeContainer.appendChild(minuteInput);
            if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");
            if (self.config.enableSeconds) {
                self.timeContainer.classList.add("hasSeconds");
                var secondInput = createNumberInput("flatpickr-second");
                self.secondElement = secondInput.getElementsByTagName("input")[0];
                self.secondElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults.seconds);
                self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                self.secondElement.setAttribute("min", "0");
                self.secondElement.setAttribute("max", "59");
                self.secondElement.setAttribute("maxlength", "2");
                self.timeContainer.appendChild(dom_createElement("span", "flatpickr-time-separator", ":"));
                self.timeContainer.appendChild(secondInput);
            }
            if (!self.config.time_24hr) {
                self.amPM = dom_createElement("span", "flatpickr-am-pm", self.l10n.amPM[utils_int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
                self.amPM.title = self.l10n.toggleTitle;
                self.amPM.tabIndex = -1;
                self.timeContainer.appendChild(self.amPM);
            }
            return self.timeContainer;
        }
        function buildWeekdays() {
            if (!self.weekdayContainer) self.weekdayContainer = dom_createElement("div", "flatpickr-weekdays"); else clearNode(self.weekdayContainer);
            for (var i = self.config.showMonths; i--; ) {
                var container = dom_createElement("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }
        function updateWeekdays() {
            if (!self.weekdayContainer) return;
            var firstDayOfWeek = self.l10n.firstDayOfWeek;
            var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
            for (var i = self.config.showMonths; i--; ) self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
        function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = dom_createElement("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild(dom_createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = dom_createElement("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper,
                weekNumbers
            };
        }
        function changeMonth(value, isOffset) {
            if (isOffset === void 0) isOffset = true;
            var delta = isOffset ? value : value - self.currentMonth;
            if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true) return;
            self.currentMonth += delta;
            if (self.currentMonth < 0 || self.currentMonth > 11) {
                self.currentYear += self.currentMonth > 11 ? 1 : -1;
                self.currentMonth = (self.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) triggerChangeEvent = true;
            if (toInitial === void 0) toInitial = true;
            self.input.value = "";
            if (self.altInput !== void 0) self.altInput.value = "";
            if (self.mobileInput !== void 0) self.mobileInput.value = "";
            self.selectedDates = [];
            self.latestSelectedDateObj = void 0;
            if (toInitial === true) {
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
            }
            if (self.config.enableTime === true) {
                var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                setHours(hours, minutes, seconds);
            }
            self.redraw();
            if (triggerChangeEvent) triggerEvent("onChange");
        }
        function close() {
            self.isOpen = false;
            if (!self.isMobile) {
                if (self.calendarContainer !== void 0) self.calendarContainer.classList.remove("open");
                if (self._input !== void 0) self._input.classList.remove("active");
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self.config !== void 0) triggerEvent("onDestroy");
            for (var i = self._handlers.length; i--; ) self._handlers[i].remove();
            self._handlers = [];
            if (self.mobileInput) {
                if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
                self.mobileInput = void 0;
            } else if (self.calendarContainer && self.calendarContainer.parentNode) if (self.config.static && self.calendarContainer.parentNode) {
                var wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild) wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            } else self.calendarContainer.parentNode.removeChild(self.calendarContainer);
            if (self.altInput) {
                self.input.type = "text";
                if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
                delete self.altInput;
            }
            if (self.input) {
                self.input.type = self.input._type;
                self.input.classList.remove("flatpickr-input");
                self.input.removeAttribute("readonly");
            }
            [ "_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config" ].forEach((function(k) {
                try {
                    delete self[k];
                } catch (_) {}
            }));
        }
        function isCalendarElem(elem) {
            return self.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self.isOpen && !self.config.inline) {
                var eventTarget_1 = getEventTarget(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self.input || eventTarget_1 === self.altInput || self.element.contains(eventTarget_1) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
                var lostFocus = !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
                var isIgnored = !self.config.ignoredFocusElements.some((function(elem) {
                    return elem.contains(eventTarget_1);
                }));
                if (lostFocus && isIgnored) {
                    if (self.config.allowInput) self.setDate(self._input.value, false, self.config.altInput ? self.config.altFormat : self.config.dateFormat);
                    if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0 && self.input.value !== "" && self.input.value !== void 0) updateTime();
                    self.close();
                    if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) self.clear(false);
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear()) return;
            var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
            self.currentYear = newYearNum || self.currentYear;
            if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth); else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
            if (isNewYear) {
                self.redraw();
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
        }
        function isEnabled(date, timeless) {
            var _a;
            if (timeless === void 0) timeless = true;
            var dateToCheck = self.parseDate(date, void 0, timeless);
            if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== void 0 ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== void 0 ? timeless : !self.maxDateHasTime) > 0) return false;
            if (!self.config.enable && self.config.disable.length === 0) return true;
            if (dateToCheck === void 0) return false;
            var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
            for (var i = 0, d = void 0; i < array.length; i++) {
                d = array[i];
                if (typeof d === "function" && d(dateToCheck)) return bool; else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime()) return bool; else if (typeof d === "string") {
                    var parsed = self.parseDate(d, void 0, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
                } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime()) return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self.daysContainer !== void 0) return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
            return false;
        }
        function onBlur(e) {
            var isInput = e.target === self._input;
            var valueChanged = self._input.value.trimEnd() !== getDateStr();
            if (isInput && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
        }
        function onKeyDown(e) {
            var eventTarget = getEventTarget(e);
            var isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
            var allowInput = self.config.allowInput;
            var allowKeydown = self.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
                self.close();
                return eventTarget.blur();
            } else self.open(); else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
                var isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
                switch (e.keyCode) {
                  case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    } else selectDate(e);
                    break;

                  case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;

                  case 8:
                  case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;

                  case 37:
                  case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        var activeElement = getClosestActiveElement();
                        if (self.daysContainer !== void 0 && (allowInput === false || activeElement && isInView(activeElement))) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey) focusOnDay(void 0, delta_1); else {
                                e.stopPropagation();
                                changeMonth(delta_1);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    } else if (self.hourElement) self.hourElement.focus();
                    break;

                  case 38:
                  case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if (self.daysContainer && eventTarget.$i !== void 0 || eventTarget === self.input || eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        } else if (!isTimeObj) focusOnDay(void 0, delta * 7);
                    } else if (eventTarget === self.currentYearElement) changeYear(self.currentYear - delta); else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement) self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;

                  case 9:
                    if (isTimeObj) {
                        var elems = [ self.hourElement, self.minuteElement, self.secondElement, self.amPM ].concat(self.pluginElements).filter((function(x) {
                            return x;
                        }));
                        var i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            var target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;

                  default:
                    break;
                }
            }
            if (self.amPM !== void 0 && eventTarget === self.amPM) switch (e.key) {
              case self.l10n.amPM[0].charAt(0):
              case self.l10n.amPM[0].charAt(0).toLowerCase():
                self.amPM.textContent = self.l10n.amPM[0];
                setHoursFromInputs();
                updateValue();
                break;

              case self.l10n.amPM[1].charAt(0):
              case self.l10n.amPM[1].charAt(0).toLowerCase():
                self.amPM.textContent = self.l10n.amPM[1];
                setHoursFromInputs();
                updateValue();
                break;
            }
            if (isInput || isCalendarElem(eventTarget)) triggerEvent("onKeyDown", e);
        }
        function onMouseOver(elem, cellClass) {
            if (cellClass === void 0) cellClass = "flatpickr-day";
            if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled"))) return;
            var hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) if (!isEnabled(new Date(t), true)) {
                containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
                if (t < initialDate && (!minRange || t > minRange)) minRange = t; else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
            }
            var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
            hoverableCells.forEach((function(dayElem) {
                var date = dayElem.dateObj;
                var timestamp = date.getTime();
                var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
                if (outOfRange) {
                    dayElem.classList.add("notAllowed");
                    [ "inRange", "startRange", "endRange" ].forEach((function(c) {
                        dayElem.classList.remove(c);
                    }));
                    return;
                } else if (containsDisabled && !outOfRange) return;
                [ "startRange", "inRange", "endRange", "notAllowed" ].forEach((function(c) {
                    dayElem.classList.remove(c);
                }));
                if (elem !== void 0) {
                    elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange"); else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
                    if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
                }
            }));
        }
        function onResize() {
            if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) positionElement = self._positionElement;
            if (self.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    var eventTarget = getEventTarget(e);
                    if (eventTarget) eventTarget.blur();
                }
                if (self.mobileInput !== void 0) {
                    self.mobileInput.focus();
                    self.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            } else if (self._input.disabled || self.config.inline) return;
            var wasOpen = self.isOpen;
            self.isOpen = true;
            if (!wasOpen) {
                self.calendarContainer.classList.add("open");
                self._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self.config.enableTime === true && self.config.noCalendar === true) if (self.config.allowInput === false && (e === void 0 || !self.timeContainer.contains(e.relatedTarget))) setTimeout((function() {
                return self.hourElement.select();
            }), 50);
        }
        function minMaxDateSetter(type) {
            return function(date) {
                var dateObj = self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat);
                var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== void 0) self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
                if (self.selectedDates) {
                    self.selectedDates = self.selectedDates.filter((function(d) {
                        return isEnabled(d);
                    }));
                    if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self.daysContainer) {
                    redraw();
                    if (dateObj !== void 0) self.currentYearElement[type] = dateObj.getFullYear().toString(); else self.currentYearElement.removeAttribute(type);
                    self.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [ "wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile" ];
            var userConfig = esm_assign(esm_assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
            var formats = {};
            self.config.parseDate = userConfig.parseDate;
            self.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self.config, "enable", {
                get: function() {
                    return self.config._enable;
                },
                set: function(dates) {
                    self.config._enable = parseDateRules(dates);
                }
            });
            Object.defineProperty(self.config, "disable", {
                get: function() {
                    return self.config._disable;
                },
                set: function(dates) {
                    self.config._disable = parseDateRules(dates);
                }
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                var defaultDateFormat = flatpickr.defaultConfig.dateFormat || options_defaults.dateFormat;
                formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
                var defaultAltFormat = flatpickr.defaultConfig.altFormat || options_defaults.altFormat;
                formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + " h:i" + (userConfig.enableSeconds ? ":S" : "") + " K";
            }
            Object.defineProperty(self.config, "minDate", {
                get: function() {
                    return self.config._minDate;
                },
                set: minMaxDateSetter("min")
            });
            Object.defineProperty(self.config, "maxDate", {
                get: function() {
                    return self.config._maxDate;
                },
                set: minMaxDateSetter("max")
            });
            var minMaxTimeSetter = function(type) {
                return function(val) {
                    self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
                };
            };
            Object.defineProperty(self.config, "minTime", {
                get: function() {
                    return self.config._minTime;
                },
                set: minMaxTimeSetter("min")
            });
            Object.defineProperty(self.config, "maxTime", {
                get: function() {
                    return self.config._maxTime;
                },
                set: minMaxTimeSetter("max")
            });
            if (userConfig.mode === "time") {
                self.config.noCalendar = true;
                self.config.enableTime = true;
            }
            Object.assign(self.config, formats, userConfig);
            for (var i = 0; i < boolOpts.length; i++) self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
            HOOKS.filter((function(hook) {
                return self.config[hook] !== void 0;
            })).forEach((function(hook) {
                self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
            }));
            self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for (i = 0; i < self.config.plugins.length; i++) {
                var pluginConf = self.config.plugins[i](self) || {};
                for (var key in pluginConf) if (HOOKS.indexOf(key) > -1) self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]); else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
            }
            if (!userConfig.altInputClass) self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
            triggerEvent("onParseConfig");
        }
        function getInputElem() {
            return self.config.wrap ? element.querySelector("[data-input]") : element;
        }
        function setupLocale() {
            if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = esm_assign(esm_assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : void 0);
            tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
            tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
            tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
            tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
            tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = esm_assign(esm_assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) self.config.time_24hr = self.l10n.time_24hr;
            self.formatDate = createDateFormatter(self);
            self.parseDate = createDateParser({
                config: self.config,
                l10n: self.l10n
            });
        }
        function positionCalendar(customPositionElement) {
            if (typeof self.config.position === "function") return void self.config.position(self, customPositionElement);
            if (self.calendarContainer === void 0) return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function(acc, child) {
                return acc + child.offsetHeight;
            }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
            var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
            toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
            if (self.config.inline) return;
            var left = window.pageXOffset + inputBounds.left;
            var isCenter = false;
            var isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            } else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
            toggleClass(self.calendarContainer, "arrowCenter", isCenter);
            toggleClass(self.calendarContainer, "arrowRight", isRight);
            var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            toggleClass(self.calendarContainer, "rightMost", rightMost);
            if (self.config.static) return;
            self.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self.calendarContainer.style.left = left + "px";
                self.calendarContainer.style.right = "auto";
            } else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = right + "px";
            } else {
                var doc = getDocumentStyleSheet();
                if (doc === void 0) return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                toggleClass(self.calendarContainer, "rightMost", false);
                toggleClass(self.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self.calendarContainer.style.left = centerLeft + "px";
                self.calendarContainer.style.right = "auto";
            }
        }
        function getDocumentStyleSheet() {
            var editableSheet = null;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                if (!sheet.cssRules) continue;
                try {
                    sheet.cssRules;
                } catch (err) {
                    continue;
                }
                editableSheet = sheet;
                break;
            }
            return editableSheet != null ? editableSheet : createStyleSheet();
        }
        function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }
        function redraw() {
            if (self.config.noCalendar || self.isMobile) return;
            buildMonthSwitch();
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) setTimeout(self.close, 0); else self.close();
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function(day) {
                return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
            };
            var t = findParent(getEventTarget(e), isSelectable);
            if (t === void 0) return;
            var target = t;
            var selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
            var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
            self.selectedDateElem = target;
            if (self.config.mode === "single") self.selectedDates = [ selectedDate ]; else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex) self.selectedDates.splice(parseInt(selectedIndex), 1); else self.selectedDates.push(selectedDate);
            } else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) self.clear(false, false);
                self.latestSelectedDateObj = selectedDate;
                self.selectedDates.push(selectedDate);
                if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort((function(a, b) {
                    return a.getTime() - b.getTime();
                }));
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
                if (isNewYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1) focusOnDayElem(target); else if (self.selectedDateElem !== void 0 && self.hourElement === void 0) self.selectedDateElem && self.selectedDateElem.focus();
            if (self.hourElement !== void 0) self.hourElement !== void 0 && self.hourElement.focus();
            if (self.config.closeOnSelect) {
                var single = self.config.mode === "single" && !self.config.enableTime;
                var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
                if (single || range) focusAndClose();
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [ setupLocale, updateWeekdays ],
            showMonths: [ buildMonths, setCalendarWidth, buildWeekdays ],
            minDate: [ jumpToDate ],
            maxDate: [ jumpToDate ],
            positionElement: [ updatePositionElement ],
            clickOpens: [ function() {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                } else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            } ]
        };
        function set(option, value) {
            if (option !== null && typeof option === "object") {
                Object.assign(self.config, option);
                for (var key in option) if (CALLBACKS[key] !== void 0) CALLBACKS[key].forEach((function(x) {
                    return x();
                }));
            } else {
                self.config[option] = value;
                if (CALLBACKS[option] !== void 0) CALLBACKS[option].forEach((function(x) {
                    return x();
                })); else if (HOOKS.indexOf(option) > -1) self.config[option] = arrayify(value);
            }
            self.redraw();
            updateValue(true);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array) dates = inputDate.map((function(d) {
                return self.parseDate(d, format);
            })); else if (inputDate instanceof Date || typeof inputDate === "number") dates = [ self.parseDate(inputDate, format) ]; else if (typeof inputDate === "string") switch (self.config.mode) {
              case "single":
              case "time":
                dates = [ self.parseDate(inputDate, format) ];
                break;

              case "multiple":
                dates = inputDate.split(self.config.conjunction).map((function(date) {
                    return self.parseDate(date, format);
                }));
                break;

              case "range":
                dates = inputDate.split(self.l10n.rangeSeparator).map((function(date) {
                    return self.parseDate(date, format);
                }));
                break;

              default:
                break;
            } else self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter((function(d) {
                return d instanceof Date && isEnabled(d, false);
            }));
            if (self.config.mode === "range") self.selectedDates.sort((function(a, b) {
                return a.getTime() - b.getTime();
            }));
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) triggerChange = false;
            if (format === void 0) format = self.config.dateFormat;
            if (date !== 0 && !date || date instanceof Array && date.length === 0) return self.clear(triggerChange);
            setSelectedDate(date, format);
            self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
            self.redraw();
            jumpToDate(void 0, triggerChange);
            setHoursFromDate();
            if (self.selectedDates.length === 0) self.clear(false);
            updateValue(triggerChange);
            if (triggerChange) triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr.slice().map((function(rule) {
                if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) return self.parseDate(rule, void 0, true); else if (rule && typeof rule === "object" && rule.from && rule.to) return {
                    from: self.parseDate(rule.from, void 0),
                    to: self.parseDate(rule.to, void 0)
                };
                return rule;
            })).filter((function(x) {
                return x;
            }));
        }
        function setupDates() {
            self.selectedDates = [];
            self.now = self.parseDate(self.config.now) || new Date;
            var preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
            if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);
            self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
            if (self.selectedDates.length > 0) self.latestSelectedDateObj = self.selectedDates[0];
            if (self.config.minTime !== void 0) self.config.minTime = self.parseDate(self.config.minTime, "H:i");
            if (self.config.maxTime !== void 0) self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
            self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
            self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
        }
        function setupInputs() {
            self.input = getInputElem();
            if (!self.input) {
                self.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            self.input._type = self.input.type;
            self.input.type = "text";
            self.input.classList.add("flatpickr-input");
            self._input = self.input;
            if (self.config.altInput) {
                self.altInput = dom_createElement(self.input.nodeName, self.config.altInputClass);
                self._input = self.altInput;
                self.altInput.placeholder = self.input.placeholder;
                self.altInput.disabled = self.input.disabled;
                self.altInput.required = self.input.required;
                self.altInput.tabIndex = self.input.tabIndex;
                self.altInput.type = "text";
                self.input.setAttribute("type", "hidden");
                if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
            }
            if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");
            updatePositionElement();
        }
        function updatePositionElement() {
            self._positionElement = self.config.positionElement || self._input;
        }
        function setupMobile() {
            var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
            self.mobileInput = dom_createElement("input", self.input.className + " flatpickr-mobile");
            self.mobileInput.tabIndex = 1;
            self.mobileInput.type = inputType;
            self.mobileInput.disabled = self.input.disabled;
            self.mobileInput.required = self.input.required;
            self.mobileInput.placeholder = self.input.placeholder;
            self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
            if (self.selectedDates.length > 0) self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
            if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
            if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
            if (self.input.getAttribute("step")) self.mobileInput.step = String(self.input.getAttribute("step"));
            self.input.type = "hidden";
            if (self.altInput !== void 0) self.altInput.type = "hidden";
            try {
                if (self.input.parentNode) self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
            } catch (_a) {}
            bind(self.mobileInput, "change", (function(e) {
                self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            }));
        }
        function toggle(e) {
            if (self.isOpen === true) return self.close();
            self.open(e);
        }
        function triggerEvent(event, data) {
            if (self.config === void 0) return;
            var hooks = self.config[event];
            if (hooks !== void 0 && hooks.length > 0) for (var i = 0; hooks[i] && i < hooks.length; i++) hooks[i](self.selectedDates, self.input.value, self, data);
            if (event === "onChange") {
                self.input.dispatchEvent(createEvent("change"));
                self.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                var selectedDate = self.selectedDates[i];
                if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0) return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
            return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
        }
        function updateNavigationCurrentMonth() {
            if (self.config.noCalendar || self.isMobile || !self.monthNav) return;
            self.yearElements.forEach((function(yearElement, i) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " "; else self.monthsDropdownContainer.value = d.getMonth().toString();
                yearElement.value = d.getFullYear().toString();
            }));
            self._hidePrevMonthArrow = self.config.minDate !== void 0 && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
            self._hideNextMonthArrow = self.config.maxDate !== void 0 && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
        }
        function getDateStr(specificFormat) {
            var format = specificFormat || (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
            return self.selectedDates.map((function(dObj) {
                return self.formatDate(dObj, format);
            })).filter((function(d, i, arr) {
                return self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i;
            })).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
        }
        function updateValue(triggerChange) {
            if (triggerChange === void 0) triggerChange = true;
            if (self.mobileInput !== void 0 && self.mobileFormatStr) self.mobileInput.value = self.latestSelectedDateObj !== void 0 ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
            self.input.value = getDateStr(self.config.dateFormat);
            if (self.altInput !== void 0) self.altInput.value = getDateStr(self.config.altFormat);
            if (triggerChange !== false) triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            var eventTarget = getEventTarget(e);
            var isPrevMonth = self.prevMonthNav.contains(eventTarget);
            var isNextMonth = self.nextMonthNav.contains(eventTarget);
            if (isPrevMonth || isNextMonth) changeMonth(isPrevMonth ? -1 : 1); else if (self.yearElements.indexOf(eventTarget) >= 0) eventTarget.select(); else if (eventTarget.classList.contains("arrowUp")) self.changeYear(self.currentYear + 1); else if (eventTarget.classList.contains("arrowDown")) self.changeYear(self.currentYear - 1);
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
            if (self.amPM !== void 0 && eventTarget === self.amPM) self.amPM.textContent = self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                if (newValue < min) {
                    newValue = max + newValue + utils_int(!isHourElem) + (utils_int(isHourElem) && utils_int(!self.amPM));
                    if (isMinuteElem) incrementNumInput(void 0, -1, self.hourElement);
                } else if (newValue > max) {
                    newValue = input === self.hourElement ? newValue - max - utils_int(!self.amPM) : min;
                    if (isMinuteElem) incrementNumInput(void 0, 1, self.hourElement);
                }
                if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self.amPM.textContent = self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
                input.value = pad(newValue);
            }
        }
        init();
        return self;
    }
    function _flatpickr(nodeList, config) {
        var nodes = Array.prototype.slice.call(nodeList).filter((function(x) {
            return x instanceof HTMLElement;
        }));
        var instances = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null) continue;
                if (node._flatpickr !== void 0) {
                    node._flatpickr.destroy();
                    node._flatpickr = void 0;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            } catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function(config) {
            return _flatpickr([ this ], config);
        };
    }
    var flatpickr = function(selector, config) {
        if (typeof selector === "string") return _flatpickr(window.document.querySelectorAll(selector), config); else if (selector instanceof Node) return _flatpickr([ selector ], config); else return _flatpickr(selector, config);
    };
    flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
        en: esm_assign({}, l10n_default),
        default: esm_assign({}, l10n_default)
    };
    flatpickr.localize = function(l10n) {
        flatpickr.l10ns.default = esm_assign(esm_assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = function(config) {
        flatpickr.defaultConfig = esm_assign(esm_assign({}, flatpickr.defaultConfig), config);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") jQuery.fn.flatpickr = function(config) {
        return _flatpickr(this, config);
    };
    Date.prototype.fp_incr = function(days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") window.flatpickr = flatpickr;
    const esm = flatpickr;
    const dateInput = document.querySelector("[data-calendar]");
    if (dateInput) objectModules.datePicker = esm(dateInput, {
        altInput: false,
        dateFormat: "d.m.Y",
        position: "auto center"
    });
    function showInputsPasswords() {
        document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (target.closest("[data-change-password]")) {
                const passwordInputsBlock = document.querySelector(".form-user__password");
                if (passwordInputsBlock && !passwordInputsBlock.classList.contains("is-visible")) passwordInputsBlock.classList.add("is-visible");
            }
        }));
    }
    function openAccountMenu() {
        document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (bodyLockStatus && target.closest("[data-button-account-menu]")) {
                document.documentElement.classList.add("account-menu-open");
                return;
            }
            if (target.closest(".menu-account__close") && document.documentElement.classList.contains("account-menu-open")) document.documentElement.classList.remove("account-menu-open");
            if (!target.closest("[data-menu-account]") && document.documentElement.classList.contains("account-menu-open")) document.documentElement.classList.remove("account-menu-open");
        }));
    }
    function removeOrder() {
        const accountSection = document.querySelector(".account");
        if (!accountSection) return;
        document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (target.closest("[data-remove-order-button]")) {
                const removeButton = target.closest("[data-remove-order-button]");
                const order = removeButton.closest(".order");
                const bodyStyles = window.getComputedStyle(document.body);
                const speedStyle = +bodyStyles.getPropertyValue("--remove-duration").replace("ms", "");
                order ? order.classList.add("remove") : null;
                setTimeout((() => {
                    order.remove();
                }), speedStyle);
            }
        }));
    }
    function quantity() {
        document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (target.closest("[data-quantity-plus]") || target.closest("[data-quantity-minus]")) {
                const targetEl = target.closest("[data-quantity-plus]") || target.closest("[data-quantity-minus]");
                const quantityPlus = target.closest("[data-quantity]").querySelector("[data-quantity-plus]");
                const quantityMinus = target.closest("[data-quantity]").querySelector("[data-quantity-minus]");
                const valueElement = target.closest("[data-quantity]").querySelector("[data-quantity-value]");
                let value = parseInt(valueElement.value);
                if (targetEl.hasAttribute("data-quantity-plus")) {
                    value++;
                    quantityMinus.disabled = false;
                    +valueElement.dataset.quantityMax === value ? quantityPlus.disabled = true : null;
                    if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) value = valueElement.dataset.quantityMax;
                } else if (targetEl.hasAttribute("data-quantity-minus")) {
                    --value;
                    quantityPlus.disabled = false;
                    if (+valueElement.dataset.quantityMin) {
                        +valueElement.dataset.quantityMin === value ? quantityMinus.disabled = true : null;
                        if (+valueElement.dataset.quantityMin > value) value = valueElement.dataset.quantityMin;
                    } else if (value < 1) value = 1;
                }
                target.closest("[data-quantity]").querySelector("[data-quantity-value]").value = value;
            }
        }));
    }
    const cartSection = document.querySelector(".cart");
    if (cartSection) window.addEventListener("load", (() => {
        cartLoad();
    }));
    function cartLoad() {
        const titleCountItems = cartSection.querySelector(".cart__title span");
        const totalBlock = cartSection.querySelector(".total-cart");
        const totalValue = totalBlock.querySelector(".total-cart__value");
        const bodyStyles = window.getComputedStyle(document.body);
        const speedStyle = +bodyStyles.getPropertyValue("--remove-duration").replace("ms", "");
        updateTitleItems();
        productCartPriceTotal();
        totalCart();
        document.addEventListener("click", (_ref => {
            let {target} = _ref;
            if (target.closest("[data-remove-order-button]")) {
                const removeButton = target.closest("[data-remove-order-button]");
                const order = removeButton.closest(".products-cart__item");
                order ? order.classList.add("remove") : null;
                setTimeout((() => {
                    order.remove();
                }), speedStyle);
                updateTitleItems();
                totalCart();
            }
            if (target.closest("[data-quantity-plus]") || target.closest("[data-quantity-minus]")) {
                const quantityInput = target.closest("[data-quantity]").querySelector("[data-quantity-value]");
                updateProductCartPriceTotal(quantityInput);
                totalCart();
            }
        }));
        function totalCart() {
            const totalPriceArr = [];
            let currency;
            const productsCartItems = cartSection.querySelectorAll(".products-cart__item");
            if (productsCartItems.length > 0) {
                productsCartItems.forEach((item => {
                    const product = item.querySelector(".products-cart__order");
                    currency = product.dataset.currency;
                    const {total} = item.querySelector(".products-cart__total").dataset;
                    totalPriceArr.push(+total);
                }));
                const totalSumCart = totalPriceArr.reduce(((sum, price) => sum + price), 0);
                totalValue.innerHTML = `<span>${currency}</span>${totalSumCart}`;
            } else totalValue.innerHTML = `0`;
        }
        function updateProductCartPriceTotal(input) {
            const currentItem = input.closest(".products-cart__item");
            const currentItemProduct = input.closest(".products-cart__item").querySelector(".products-cart__order");
            const totalValue = currentItem.querySelector(".products-cart__total");
            const {price, currency} = currentItemProduct.dataset;
            const totalPrice = +price * +input.value;
            totalValue.innerHTML = `<span>${currency}</span>${totalPrice}`;
            totalValue.setAttribute("data-total", totalPrice);
        }
        function productCartPriceTotal() {
            const productsCartItems = cartSection.querySelectorAll(".products-cart__item");
            productsCartItems.forEach((item => {
                const product = item.querySelector(".products-cart__order");
                const quantity = item.querySelector("[data-quantity-value]").value;
                const totalValue = item.querySelector(".products-cart__total");
                const priceValue = item.querySelector(".products-cart__price");
                const {price, currency} = product.dataset;
                priceValue.innerHTML = `<span>${currency}</span>${price}`;
                totalValue.innerHTML = `<span>${currency}</span>${price * quantity}`;
                totalValue.setAttribute("data-total", price);
            }));
        }
        function productsCartLength(cartSection) {
            const productsCart = cartSection.querySelectorAll(".products-cart__item");
            return productsCart.length;
        }
        function updateTitleItems() {
            titleCountItems.textContent = `(${productsCartLength(cartSection)} item)`;
        }
    }
    const productsContainer = document.querySelector(".catalog-main__items") || document.querySelector(".catalog__items");
    const data = "assets/products.json";
    let productsLoaded = false;
    window.addEventListener("load", (() => {
        if (productsContainer) productsRender(data);
    }));
    document.addEventListener("watcherCallback", (e => {
        const {entry: {target}} = e.detail;
        if (target.classList.contains("catalog-main__items") || target.classList.contains("catalog__items")) productsRender(data);
    }));
    async function productsRender(data) {
        if (!productsContainer.classList.contains("watcher-view") || productsLoaded === true) return;
        let productsData;
        const cachedData = sessionStorage.getItem("productsData");
        if (cachedData) productsData = JSON.parse(cachedData); else {
            try {
                const response = await fetch(data);
                productsContainer.insertAdjacentHTML("beforeend", `<div class="items-catalog__loading"></div>`);
                if (!response.ok) throw new Error("Response is not OK");
                setTimeout((async () => {
                    productsContainer.classList.add("loaded");
                    const productsData = await response.json();
                    productsDisplay(productsData.products);
                    sessionStorage.setItem("productsData", JSON.stringify(productsData));
                }), 1e3);
            } catch (error) {
                setTimeout((() => {
                    productsContainer.classList.add("loaded");
                    productsContainer.insertAdjacentHTML("beforeend", `<div class="items-catalog__error">Failed to load products, please try again</div>`);
                }), 1e3);
            } finally {
                productsLoaded = true;
            }
            return;
        }
        productsContainer.classList.add("loaded");
        productsDisplay(productsData.products);
        productsLoaded = true;
    }
    function productsDisplay(products) {
        products.forEach((product => {
            const {id, image, title, currency, price} = product;
            const templateHTML = `\n                        <article id=${id} data-currency=${currency} data-price=${price} class="items-catalog__item item-catalog">\n                            <div class="item-catalog__header">\n                              <a href="#" class="item-catalog__image">\n                                <img src="img/home/catalog/${image}" width="300" height="455" loading="lazy" alt="${title}">\n                              </a>\n                              <div class="item-catalog__actions actions-catalog">\n                                <button type="button" aria-label="Favorite" class="actions-catalog__favorite">\n                                  <svg>\n                                    <use xlink:href="img/icons/icons.svg#wishlist"></use>\n                                  </svg>\n                                </button>\n                                <button type="button" aria-label="Add to cart" class="actions-catalog__add-to-cart">\n                                  <span>ADD TO CART</span>\n                                  <svg>\n                                    <use xlink:href="img/icons/icons.svg#cart"></use>\n                                  </svg>\n                                </button>\n                              </div>\n                            </div>\n                            <div class="item-catalog__footer">\n                              <h3 class="item-catalog__title">\n                                <a href="#" class="item-catalog__link-title">${title}</a>\n                              </h3>\n                              <div class="item-catalog__price"><span>${currency}</span>${price}</div>\n                            </div>\n                          </article>\n                          `;
            productsContainer.insertAdjacentHTML("beforeend", templateHTML);
        }));
    }
    const checkoutPage = document.querySelector(".checkout");
    if (checkoutPage) {
        const orders = checkoutPage.querySelectorAll(".order-checkout__order");
        const checkSubTotal = checkoutPage.querySelector("[data-orders-sum]");
        checkoutPage.querySelector("[data-orders-delivery]");
        checkoutPage.querySelector("[data-orders-discount]");
        const total = checkoutPage.querySelector(".total-order-checkout__value");
        let cartTotal = [];
        let quantityArr = [];
        let totalCheck = 0;
        if (orders.length > 0) {
            let currency;
            orders.forEach((order => {
                const itemPrice = order.querySelector(".list-order__item--price");
                const quantityValue = order.querySelector("[data-quantity-value]").value;
                const {price} = itemPrice.dataset;
                currency = itemPrice.dataset.currency;
                itemPrice.innerHTML = `<span>${currency}</span>${price}`;
                cartTotal.push(+price);
                quantityArr.push(+quantityValue);
            }));
            totalCheck = [ ...cartTotal ].map(((item, index) => quantityArr[index] !== 0 ? item * quantityArr[index] : item * 1)).reduce(((sum, price) => sum + price), 0);
            checkSubTotal.innerHTML = `<span>${currency}</span>${totalCheck}`;
            checkSubTotal.setAttribute("data-total", totalCheck);
            total.innerHTML = `<span>${currency}</span>${totalCheck}`;
        }
        document.addEventListener("click", checkoutTotalCount);
        function checkoutTotalCount(e) {
            const {target} = e;
            if (target.closest("[data-quantity-plus]") || target.closest("[data-quantity-minus]")) updateCartSubTotal();
        }
        function updateCartSubTotal() {
            cartTotal = [];
            quantityArr = [];
            let currency;
            setTimeout((() => {
                orders.forEach((order => {
                    const itemPrice = order.querySelector(".list-order__item--price");
                    const quantityValue = order.querySelector("[data-quantity-value]").value;
                    const {price} = itemPrice.dataset;
                    currency = itemPrice.dataset.currency;
                    cartTotal.push(+price);
                    quantityArr.push(+quantityValue);
                }));
                totalCheck = [ ...cartTotal ].map(((item, index) => quantityArr[index] !== 0 ? item * quantityArr[index] : item * 1)).reduce(((sum, price) => sum + price), 0);
                checkSubTotal.innerHTML = `<span>${currency}</span>${totalCheck}`;
                checkSubTotal.setAttribute("data-total", totalCheck);
                total.innerHTML = `<span>${currency}</span>${totalCheck}`;
            }), 500);
        }
    }
    window["FLS"] = false;
    headerHeight();
    headerScroll();
    burgerMenu();
    searchHeaderShow();
    pageNavigation();
    paginationMoveIndicator();
    filterBlockClear();
    openFilterMenu();
    tabs();
    showInputsPasswords();
    openAccountMenu();
    removeOrder();
    quantity();
})();