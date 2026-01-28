(() => {
    var __webpack_modules__ = {
        958(module) {
            /*!
 * dist/inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2024 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.9
 */
            !function(e, t) {
                if (true) module.exports = t(); else ;
            }("undefined" != typeof self && self, function() {
                return function() {
                    "use strict";
                    var e = {
                        3976: function(e, t) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = void 0;
                            t.default = {
                                _maxTestPos: 500,
                                placeholder: "_",
                                optionalmarker: [ "[", "]" ],
                                quantifiermarker: [ "{", "}" ],
                                groupmarker: [ "(", ")" ],
                                alternatormarker: "|",
                                escapeChar: "\\",
                                mask: null,
                                regex: null,
                                oncomplete: function() {},
                                onincomplete: function() {},
                                oncleared: function() {},
                                repeat: 0,
                                greedy: !1,
                                autoUnmask: !1,
                                removeMaskOnSubmit: !1,
                                clearMaskOnLostFocus: !0,
                                insertMode: !0,
                                insertModeVisual: !0,
                                clearIncomplete: !1,
                                alias: null,
                                onKeyDown: function() {},
                                onBeforeMask: null,
                                onBeforePaste: function(e, t) {
                                    return "function" == typeof t.onBeforeMask ? t.onBeforeMask.call(this, e, t) : e;
                                },
                                onBeforeWrite: null,
                                onUnMask: null,
                                showMaskOnFocus: !0,
                                showMaskOnHover: !0,
                                onKeyValidation: function() {},
                                skipOptionalPartCharacter: " ",
                                numericInput: !1,
                                rightAlign: !1,
                                undoOnEscape: !0,
                                radixPoint: "",
                                _radixDance: !1,
                                groupSeparator: "",
                                keepStatic: null,
                                positionCaretOnTab: !0,
                                tabThrough: !1,
                                supportsInputType: [ "text", "tel", "url", "password", "search" ],
                                isComplete: null,
                                preValidation: null,
                                postValidation: null,
                                staticDefinitionSymbol: void 0,
                                jitMasking: !1,
                                nullable: !0,
                                inputEventOnly: !1,
                                noValuePatching: !1,
                                positionCaretOnClick: "lvp",
                                casing: null,
                                inputmode: "text",
                                importDataAttributes: !0,
                                shiftPositions: !0,
                                usePrototypeDefinitions: !0,
                                validationEventTimeOut: 3e3,
                                substitutes: {}
                            };
                        },
                        7392: function(e, t) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = void 0;
                            t.default = {
                                9: {
                                    validator: "[0-9０-９]",
                                    definitionSymbol: "*"
                                },
                                a: {
                                    validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                                    definitionSymbol: "*"
                                },
                                "*": {
                                    validator: "[0-9０-９A-Za-zА-яЁёÀ-ÿµ]"
                                }
                            };
                        },
                        253: function(e, t) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = function(e, t, n) {
                                if (void 0 === n) return e.__data ? e.__data[t] : null;
                                e.__data = e.__data || {}, e.__data[t] = n;
                            };
                        },
                        3776: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.Event = void 0, t.off = function(e, t) {
                                var n, i;
                                u(this[0]) && e && (n = this[0].eventRegistry, i = this[0], e.split(" ").forEach(function(e) {
                                    var a = o(e.split("."), 2);
                                    (function(e, i) {
                                        var a, r, o = [];
                                        if (e.length > 0) if (void 0 === t) for (a = 0, r = n[e][i].length; a < r; a++) o.push({
                                            ev: e,
                                            namespace: i && i.length > 0 ? i : "global",
                                            handler: n[e][i][a]
                                        }); else o.push({
                                            ev: e,
                                            namespace: i && i.length > 0 ? i : "global",
                                            handler: t
                                        }); else if (i.length > 0) for (var l in n) for (var s in n[l]) if (s === i) if (void 0 === t) for (a = 0, 
                                        r = n[l][s].length; a < r; a++) o.push({
                                            ev: l,
                                            namespace: s,
                                            handler: n[l][s][a]
                                        }); else o.push({
                                            ev: l,
                                            namespace: s,
                                            handler: t
                                        });
                                        return o;
                                    })(a[0], a[1]).forEach(function(e) {
                                        var t = e.ev, a = e.handler;
                                        !function(e, t, a) {
                                            if (e in n == 1) if (i.removeEventListener ? i.removeEventListener(e, a, !1) : i.detachEvent && i.detachEvent("on".concat(e), a), 
                                            "global" === t) for (var r in n[e]) n[e][r].splice(n[e][r].indexOf(a), 1); else n[e][t].splice(n[e][t].indexOf(a), 1);
                                        }(t, e.namespace, a);
                                    });
                                }));
                                return this;
                            }, t.on = function(e, t) {
                                if (u(this[0])) {
                                    var n = this[0].eventRegistry, i = this[0];
                                    e.split(" ").forEach(function(e) {
                                        var a = o(e.split("."), 2), r = a[0], l = a[1];
                                        !function(e, a) {
                                            i.addEventListener ? i.addEventListener(e, t, !1) : i.attachEvent && i.attachEvent("on".concat(e), t), 
                                            n[e] = n[e] || {}, n[e][a] = n[e][a] || [], n[e][a].push(t);
                                        }(r, void 0 === l ? "global" : l);
                                    });
                                }
                                return this;
                            }, t.trigger = function(e) {
                                var t = arguments;
                                if (u(this[0])) for (var n = this[0].eventRegistry, i = this[0], o = "string" == typeof e ? e.split(" ") : [ e.type ], l = 0; l < o.length; l++) {
                                    var s = o[l].split("."), f = s[0], p = s[1] || "global";
                                    if (void 0 !== c && "global" === p) {
                                        var d, h = {
                                            bubbles: !0,
                                            cancelable: !0,
                                            composed: !0,
                                            detail: arguments[1]
                                        };
                                        if (c.createEvent) {
                                            try {
                                                if ("input" === f) h.inputType = "insertText", d = new InputEvent(f, h); else d = new CustomEvent(f, h);
                                            } catch (e) {
                                                (d = c.createEvent("CustomEvent")).initCustomEvent(f, h.bubbles, h.cancelable, h.detail);
                                            }
                                            e.type && (0, a.default)(d, e), i.dispatchEvent(d);
                                        } else (d = c.createEventObject()).eventType = f, d.detail = arguments[1], e.type && (0, 
                                        a.default)(d, e), i.fireEvent("on" + d.eventType, d);
                                    } else if (void 0 !== n[f]) {
                                        arguments[0] = arguments[0].type ? arguments[0] : r.default.Event(arguments[0]), 
                                        arguments[0].detail = arguments.slice(1);
                                        var v = n[f];
                                        ("global" === p ? Object.values(v).flat() : v[p]).forEach(function(e) {
                                            return e.apply(i, t);
                                        });
                                    }
                                }
                                return this;
                            };
                            var i = s(n(9380)), a = s(n(600)), r = s(n(4963));
                            function o(e, t) {
                                return function(e) {
                                    if (Array.isArray(e)) return e;
                                }(e) || function(e, t) {
                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (null != n) {
                                        var i, a, r, o, l = [], s = !0, c = !1;
                                        try {
                                            if (r = (n = n.call(e)).next, 0 === t) {
                                                if (Object(n) !== n) return;
                                                s = !1;
                                            } else for (;!(s = (i = r.call(n)).done) && (l.push(i.value), l.length !== t); s = !0) ;
                                        } catch (e) {
                                            c = !0, a = e;
                                        } finally {
                                            try {
                                                if (!s && null != n.return && (o = n.return(), Object(o) !== o)) return;
                                            } finally {
                                                if (c) throw a;
                                            }
                                        }
                                        return l;
                                    }
                                }(e, t) || function(e, t) {
                                    if (!e) return;
                                    if ("string" == typeof e) return l(e, t);
                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                    "Object" === n && e.constructor && (n = e.constructor.name);
                                    if ("Map" === n || "Set" === n) return Array.from(e);
                                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return l(e, t);
                                }(e, t) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }();
                            }
                            function l(e, t) {
                                (null == t || t > e.length) && (t = e.length);
                                for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                                return i;
                            }
                            function s(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                            var c = i.default.document;
                            function u(e) {
                                return e instanceof Element;
                            }
                            var f = t.Event = void 0;
                            "function" == typeof i.default.CustomEvent ? t.Event = f = i.default.CustomEvent : i.default.Event && c && c.createEvent ? (t.Event = f = function(e, t) {
                                t = t || {
                                    bubbles: !1,
                                    cancelable: !1,
                                    composed: !0,
                                    detail: void 0
                                };
                                var n = c.createEvent("CustomEvent");
                                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
                            }, f.prototype = i.default.Event.prototype) : "undefined" != typeof Event && (t.Event = f = Event);
                        },
                        600: function(e, t) {
                            function n(e) {
                                return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, n(e);
                            }
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = function e() {
                                var t, i, a, r, o, l, s = arguments[0] || {}, c = 1, u = arguments.length, f = !1;
                                "boolean" == typeof s && (f = s, s = arguments[c] || {}, c++);
                                "object" !== n(s) && "function" != typeof s && (s = {});
                                for (;c < u; c++) if (null != (t = arguments[c])) for (i in t) a = s[i], s !== (r = t[i]) && (f && r && ("[object Object]" === Object.prototype.toString.call(r) || (o = Array.isArray(r))) ? (o ? (o = !1, 
                                l = a && Array.isArray(a) ? a : []) : l = a && "[object Object]" === Object.prototype.toString.call(a) ? a : {}, 
                                s[i] = e(f, l, r)) : void 0 !== r && (s[i] = r));
                                return s;
                            };
                        },
                        4963: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = void 0;
                            var i = l(n(9380)), a = l(n(253)), r = n(3776), o = l(n(600));
                            function l(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                            var s = i.default.document;
                            function c(e) {
                                return e instanceof c ? e : this instanceof c ? void (null != e && e !== i.default && (this[0] = e.nodeName ? e : void 0 !== e[0] && e[0].nodeName ? e[0] : s.querySelector(e), 
                                void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new c(e);
                            }
                            c.prototype = {
                                on: r.on,
                                off: r.off,
                                trigger: r.trigger
                            }, c.extend = o.default, c.data = a.default, c.Event = r.Event;
                            t.default = c;
                        },
                        9845: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.mobile = t.iphone = t.ie = void 0;
                            var i, a = (i = n(9380)) && i.__esModule ? i : {
                                default: i
                            };
                            var r = a.default.navigator && a.default.navigator.userAgent || "";
                            t.ie = r.indexOf("MSIE ") > 0 || r.indexOf("Trident/") > 0, t.mobile = a.default.navigator && a.default.navigator.userAgentData && a.default.navigator.userAgentData.mobile || a.default.navigator && a.default.navigator.maxTouchPoints || "ontouchstart" in a.default, 
                            t.iphone = /iphone/i.test(r);
                        },
                        7184: function(e, t) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = function(e) {
                                return e.replace(n, "\\$1");
                            };
                            var n = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim");
                        },
                        6030: function(e, t, n) {
                            function i(e) {
                                return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, i(e);
                            }
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.EventHandlers = void 0;
                            var a, r = n(9845), o = (a = n(9380)) && a.__esModule ? a : {
                                default: a
                            }, l = n(7760), s = n(2839), c = n(8711), u = n(7215), f = n(4713);
                            function p() {
                                /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ p = function() {
                                    return t;
                                };
                                var e, t = {}, n = Object.prototype, a = n.hasOwnProperty, r = Object.defineProperty || function(e, t, n) {
                                    e[t] = n.value;
                                }, o = "function" == typeof Symbol ? Symbol : {}, l = o.iterator || "@@iterator", s = o.asyncIterator || "@@asyncIterator", c = o.toStringTag || "@@toStringTag";
                                function u(e, t, n) {
                                    return Object.defineProperty(e, t, {
                                        value: n,
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0
                                    }), e[t];
                                }
                                try {
                                    u({}, "");
                                } catch (e) {
                                    u = function(e, t, n) {
                                        return e[t] = n;
                                    };
                                }
                                function f(e, t, n, i) {
                                    var a = t && t.prototype instanceof k ? t : k, o = Object.create(a.prototype), l = new D(i || []);
                                    return r(o, "_invoke", {
                                        value: E(e, n, l)
                                    }), o;
                                }
                                function d(e, t, n) {
                                    try {
                                        return {
                                            type: "normal",
                                            arg: e.call(t, n)
                                        };
                                    } catch (e) {
                                        return {
                                            type: "throw",
                                            arg: e
                                        };
                                    }
                                }
                                t.wrap = f;
                                var h = "suspendedStart", v = "suspendedYield", m = "executing", g = "completed", y = {};
                                function k() {}
                                function b() {}
                                function x() {}
                                var w = {};
                                u(w, l, function() {
                                    return this;
                                });
                                var P = Object.getPrototypeOf, S = P && P(P(L([])));
                                S && S !== n && a.call(S, l) && (w = S);
                                var O = x.prototype = k.prototype = Object.create(w);
                                function _(e) {
                                    [ "next", "throw", "return" ].forEach(function(t) {
                                        u(e, t, function(e) {
                                            return this._invoke(t, e);
                                        });
                                    });
                                }
                                function M(e, t) {
                                    function n(r, o, l, s) {
                                        var c = d(e[r], e, o);
                                        if ("throw" !== c.type) {
                                            var u = c.arg, f = u.value;
                                            return f && "object" == i(f) && a.call(f, "__await") ? t.resolve(f.__await).then(function(e) {
                                                n("next", e, l, s);
                                            }, function(e) {
                                                n("throw", e, l, s);
                                            }) : t.resolve(f).then(function(e) {
                                                u.value = e, l(u);
                                            }, function(e) {
                                                return n("throw", e, l, s);
                                            });
                                        }
                                        s(c.arg);
                                    }
                                    var o;
                                    r(this, "_invoke", {
                                        value: function(e, i) {
                                            function a() {
                                                return new t(function(t, a) {
                                                    n(e, i, t, a);
                                                });
                                            }
                                            return o = o ? o.then(a, a) : a();
                                        }
                                    });
                                }
                                function E(t, n, i) {
                                    var a = h;
                                    return function(r, o) {
                                        if (a === m) throw new Error("Generator is already running");
                                        if (a === g) {
                                            if ("throw" === r) throw o;
                                            return {
                                                value: e,
                                                done: !0
                                            };
                                        }
                                        for (i.method = r, i.arg = o; ;) {
                                            var l = i.delegate;
                                            if (l) {
                                                var s = j(l, i);
                                                if (s) {
                                                    if (s === y) continue;
                                                    return s;
                                                }
                                            }
                                            if ("next" === i.method) i.sent = i._sent = i.arg; else if ("throw" === i.method) {
                                                if (a === h) throw a = g, i.arg;
                                                i.dispatchException(i.arg);
                                            } else "return" === i.method && i.abrupt("return", i.arg);
                                            a = m;
                                            var c = d(t, n, i);
                                            if ("normal" === c.type) {
                                                if (a = i.done ? g : v, c.arg === y) continue;
                                                return {
                                                    value: c.arg,
                                                    done: i.done
                                                };
                                            }
                                            "throw" === c.type && (a = g, i.method = "throw", i.arg = c.arg);
                                        }
                                    };
                                }
                                function j(t, n) {
                                    var i = n.method, a = t.iterator[i];
                                    if (a === e) return n.delegate = null, "throw" === i && t.iterator.return && (n.method = "return", 
                                    n.arg = e, j(t, n), "throw" === n.method) || "return" !== i && (n.method = "throw", 
                                    n.arg = new TypeError("The iterator does not provide a '" + i + "' method")), y;
                                    var r = d(a, t.iterator, n.arg);
                                    if ("throw" === r.type) return n.method = "throw", n.arg = r.arg, n.delegate = null, 
                                    y;
                                    var o = r.arg;
                                    return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", 
                                    n.arg = e), n.delegate = null, y) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), 
                                    n.delegate = null, y);
                                }
                                function T(e) {
                                    var t = {
                                        tryLoc: e[0]
                                    };
                                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                                    this.tryEntries.push(t);
                                }
                                function A(e) {
                                    var t = e.completion || {};
                                    t.type = "normal", delete t.arg, e.completion = t;
                                }
                                function D(e) {
                                    this.tryEntries = [ {
                                        tryLoc: "root"
                                    } ], e.forEach(T, this), this.reset(!0);
                                }
                                function L(t) {
                                    if (t || "" === t) {
                                        var n = t[l];
                                        if (n) return n.call(t);
                                        if ("function" == typeof t.next) return t;
                                        if (!isNaN(t.length)) {
                                            var r = -1, o = function n() {
                                                for (;++r < t.length; ) if (a.call(t, r)) return n.value = t[r], n.done = !1, n;
                                                return n.value = e, n.done = !0, n;
                                            };
                                            return o.next = o;
                                        }
                                    }
                                    throw new TypeError(i(t) + " is not iterable");
                                }
                                return b.prototype = x, r(O, "constructor", {
                                    value: x,
                                    configurable: !0
                                }), r(x, "constructor", {
                                    value: b,
                                    configurable: !0
                                }), b.displayName = u(x, c, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                                    var t = "function" == typeof e && e.constructor;
                                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name));
                                }, t.mark = function(e) {
                                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, x) : (e.__proto__ = x, u(e, c, "GeneratorFunction")), 
                                    e.prototype = Object.create(O), e;
                                }, t.awrap = function(e) {
                                    return {
                                        __await: e
                                    };
                                }, _(M.prototype), u(M.prototype, s, function() {
                                    return this;
                                }), t.AsyncIterator = M, t.async = function(e, n, i, a, r) {
                                    void 0 === r && (r = Promise);
                                    var o = new M(f(e, n, i, a), r);
                                    return t.isGeneratorFunction(n) ? o : o.next().then(function(e) {
                                        return e.done ? e.value : o.next();
                                    });
                                }, _(O), u(O, c, "Generator"), u(O, l, function() {
                                    return this;
                                }), u(O, "toString", function() {
                                    return "[object Generator]";
                                }), t.keys = function(e) {
                                    var t = Object(e), n = [];
                                    for (var i in t) n.push(i);
                                    return n.reverse(), function e() {
                                        for (;n.length; ) {
                                            var i = n.pop();
                                            if (i in t) return e.value = i, e.done = !1, e;
                                        }
                                        return e.done = !0, e;
                                    };
                                }, t.values = L, D.prototype = {
                                    constructor: D,
                                    reset: function(t) {
                                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, 
                                        this.method = "next", this.arg = e, this.tryEntries.forEach(A), !t) for (var n in this) "t" === n.charAt(0) && a.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
                                    },
                                    stop: function() {
                                        this.done = !0;
                                        var e = this.tryEntries[0].completion;
                                        if ("throw" === e.type) throw e.arg;
                                        return this.rval;
                                    },
                                    dispatchException: function(t) {
                                        if (this.done) throw t;
                                        var n = this;
                                        function i(i, a) {
                                            return l.type = "throw", l.arg = t, n.next = i, a && (n.method = "next", n.arg = e), 
                                            !!a;
                                        }
                                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                            var o = this.tryEntries[r], l = o.completion;
                                            if ("root" === o.tryLoc) return i("end");
                                            if (o.tryLoc <= this.prev) {
                                                var s = a.call(o, "catchLoc"), c = a.call(o, "finallyLoc");
                                                if (s && c) {
                                                    if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                                                    if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                                                } else if (s) {
                                                    if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                                                } else {
                                                    if (!c) throw new Error("try statement without catch or finally");
                                                    if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                                                }
                                            }
                                        }
                                    },
                                    abrupt: function(e, t) {
                                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                                            var i = this.tryEntries[n];
                                            if (i.tryLoc <= this.prev && a.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                                                var r = i;
                                                break;
                                            }
                                        }
                                        r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                                        var o = r ? r.completion : {};
                                        return o.type = e, o.arg = t, r ? (this.method = "next", this.next = r.finallyLoc, 
                                        y) : this.complete(o);
                                    },
                                    complete: function(e, t) {
                                        if ("throw" === e.type) throw e.arg;
                                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                                        this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                                        y;
                                    },
                                    finish: function(e) {
                                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                            var n = this.tryEntries[t];
                                            if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), A(n), y;
                                        }
                                    },
                                    catch: function(e) {
                                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                            var n = this.tryEntries[t];
                                            if (n.tryLoc === e) {
                                                var i = n.completion;
                                                if ("throw" === i.type) {
                                                    var a = i.arg;
                                                    A(n);
                                                }
                                                return a;
                                            }
                                        }
                                        throw new Error("illegal catch attempt");
                                    },
                                    delegateYield: function(t, n, i) {
                                        return this.delegate = {
                                            iterator: L(t),
                                            resultName: n,
                                            nextLoc: i
                                        }, "next" === this.method && (this.arg = e), y;
                                    }
                                }, t;
                            }
                            function d(e, t) {
                                var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                if (!n) {
                                    if (Array.isArray(e) || (n = function(e, t) {
                                        if (!e) return;
                                        if ("string" == typeof e) return h(e, t);
                                        var n = Object.prototype.toString.call(e).slice(8, -1);
                                        "Object" === n && e.constructor && (n = e.constructor.name);
                                        if ("Map" === n || "Set" === n) return Array.from(e);
                                        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return h(e, t);
                                    }(e)) || t && e && "number" == typeof e.length) {
                                        n && (e = n);
                                        var i = 0, a = function() {};
                                        return {
                                            s: a,
                                            n: function() {
                                                return i >= e.length ? {
                                                    done: !0
                                                } : {
                                                    done: !1,
                                                    value: e[i++]
                                                };
                                            },
                                            e: function(e) {
                                                throw e;
                                            },
                                            f: a
                                        };
                                    }
                                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }
                                var r, o = !0, l = !1;
                                return {
                                    s: function() {
                                        n = n.call(e);
                                    },
                                    n: function() {
                                        var e = n.next();
                                        return o = e.done, e;
                                    },
                                    e: function(e) {
                                        l = !0, r = e;
                                    },
                                    f: function() {
                                        try {
                                            o || null == n.return || n.return();
                                        } finally {
                                            if (l) throw r;
                                        }
                                    }
                                };
                            }
                            function h(e, t) {
                                (null == t || t > e.length) && (t = e.length);
                                for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                                return i;
                            }
                            function v(e, t, n, i, a, r, o) {
                                try {
                                    var l = e[r](o), s = l.value;
                                } catch (e) {
                                    return void n(e);
                                }
                                l.done ? t(s) : Promise.resolve(s).then(i, a);
                            }
                            var m, g, y = t.EventHandlers = {
                                keyEvent: function(e, t, n, i, a) {
                                    var o = this.inputmask, p = o.opts, d = o.dependencyLib, h = o.maskset, v = this, m = d(v), g = e.key, k = c.caret.call(o, v), b = p.onKeyDown.call(this, e, c.getBuffer.call(o), k, p);
                                    if (void 0 !== b) return b;
                                    if (g === s.keys.Backspace || g === s.keys.Delete || r.iphone && g === s.keys.BACKSPACE_SAFARI || e.ctrlKey && g === s.keys.x && !("oncut" in v)) e.preventDefault(), 
                                    u.handleRemove.call(o, v, g, k), (0, l.writeBuffer)(v, c.getBuffer.call(o, !0), h.p, e, v.inputmask._valueGet() !== c.getBuffer.call(o).join("")); else if (g === s.keys.End || g === s.keys.PageDown) {
                                        e.preventDefault();
                                        var x = c.seekNext.call(o, c.getLastValidPosition.call(o));
                                        c.caret.call(o, v, e.shiftKey ? k.begin : x, x, !0);
                                    } else g === s.keys.Home && !e.shiftKey || g === s.keys.PageUp ? (e.preventDefault(), 
                                    c.caret.call(o, v, 0, e.shiftKey ? k.begin : 0, !0)) : p.undoOnEscape && g === s.keys.Escape && !0 !== e.altKey ? ((0, 
                                    l.checkVal)(v, !0, !1, o.undoValue.split("")), m.trigger("click")) : g !== s.keys.Insert || e.shiftKey || e.ctrlKey || void 0 !== o.userOptions.insertMode ? !0 === p.tabThrough && g === s.keys.Tab ? !0 === e.shiftKey ? (k.end = c.seekPrevious.call(o, k.end, !0), 
                                    !0 === f.getTest.call(o, k.end - 1).match.static && k.end--, k.begin = c.seekPrevious.call(o, k.end, !0), 
                                    k.begin >= 0 && k.end > 0 && (e.preventDefault(), c.caret.call(o, v, k.begin, k.end))) : (k.begin = c.seekNext.call(o, k.begin, !0), 
                                    k.end = c.seekNext.call(o, k.begin, !0), k.end < h.maskLength && k.end--, k.begin <= h.maskLength && (e.preventDefault(), 
                                    c.caret.call(o, v, k.begin, k.end))) : e.shiftKey || (p.insertModeVisual && !1 === p.insertMode ? g === s.keys.ArrowRight ? setTimeout(function() {
                                        var e = c.caret.call(o, v);
                                        c.caret.call(o, v, e.begin);
                                    }, 0) : g === s.keys.ArrowLeft && setTimeout(function() {
                                        var e = c.translatePosition.call(o, v.inputmask.caretPos.begin);
                                        c.translatePosition.call(o, v.inputmask.caretPos.end);
                                        o.isRTL ? c.caret.call(o, v, e + (e === h.maskLength ? 0 : 1)) : c.caret.call(o, v, e - (0 === e ? 0 : 1));
                                    }, 0) : void 0 === o.keyEventHook || o.keyEventHook(e)) : u.isSelection.call(o, k) ? p.insertMode = !p.insertMode : (p.insertMode = !p.insertMode, 
                                    c.caret.call(o, v, k.begin, k.begin));
                                    return o.isComposing = g == s.keys.Process || g == s.keys.Unidentified, o.ignorable = g.length > 1 && !("textarea" === v.tagName.toLowerCase() && g == s.keys.Enter), 
                                    y.keypressEvent.call(this, e, t, n, i, a);
                                },
                                keypressEvent: function(e, t, n, i, a) {
                                    var r = this.inputmask || this, o = r.opts, f = r.dependencyLib, p = r.maskset, d = r.el, h = f(d), v = e.key;
                                    if (!0 === t || e.ctrlKey && e.altKey && !r.ignorable || !(e.ctrlKey || e.metaKey || r.ignorable)) {
                                        if (v) {
                                            var m, g = t ? {
                                                begin: a,
                                                end: a
                                            } : c.caret.call(r, d);
                                            t || (v = o.substitutes[v] || v), p.writeOutBuffer = !0;
                                            var y = u.isValid.call(r, g, v, i, void 0, void 0, void 0, t);
                                            if (!1 !== y && (c.resetMaskSet.call(r, !0), m = void 0 !== y.caret ? y.caret : c.seekNext.call(r, y.pos.begin ? y.pos.begin : y.pos), 
                                            p.p = m), m = o.numericInput && void 0 === y.caret ? c.seekPrevious.call(r, m) : m, 
                                            !1 !== n && (setTimeout(function() {
                                                o.onKeyValidation.call(d, v, y);
                                            }, 0), p.writeOutBuffer && !1 !== y)) {
                                                var k = c.getBuffer.call(r);
                                                (0, l.writeBuffer)(d, k, m, e, !0 !== t);
                                            }
                                            if (e.preventDefault(), t) return !1 !== y && (y.forwardPosition = m), y;
                                        }
                                    } else v === s.keys.Enter && r.undoValue !== r._valueGet(!0) && (r.undoValue = r._valueGet(!0), 
                                    setTimeout(function() {
                                        h.trigger("change");
                                    }, 0));
                                },
                                pasteEvent: (m = p().mark(function e(t) {
                                    var n, i, a, r, s, u;
                                    return p().wrap(function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                          case 0:
                                            n = function(e, n, i, a, o) {
                                                var s = c.caret.call(e, n, void 0, void 0, !0), u = i.substr(0, s.begin), f = i.substr(s.end, i.length);
                                                if (u == (e.isRTL ? c.getBufferTemplate.call(e).slice().reverse() : c.getBufferTemplate.call(e)).slice(0, s.begin).join("") && (u = ""), 
                                                f == (e.isRTL ? c.getBufferTemplate.call(e).slice().reverse() : c.getBufferTemplate.call(e)).slice(s.end).join("") && (f = ""), 
                                                a = u + a + f, e.isRTL && !0 !== r.numericInput) {
                                                    a = a.split("");
                                                    var p, h = d(c.getBufferTemplate.call(e));
                                                    try {
                                                        for (h.s(); !(p = h.n()).done; ) {
                                                            var v = p.value;
                                                            a[0] === v && a.shift();
                                                        }
                                                    } catch (e) {
                                                        h.e(e);
                                                    } finally {
                                                        h.f();
                                                    }
                                                    a = a.reverse().join("");
                                                }
                                                var m = a;
                                                if ("function" == typeof o) {
                                                    if (!1 === (m = o.call(e, m, r))) return !1;
                                                    m || (m = i);
                                                }
                                                (0, l.checkVal)(n, !0, !1, m.toString().split(""), t);
                                            }, i = this, a = this.inputmask, r = a.opts, s = a._valueGet(!0), a.skipInputEvent = !0, 
                                            t.clipboardData && t.clipboardData.getData ? u = t.clipboardData.getData("text/plain") : o.default.clipboardData && o.default.clipboardData.getData && (u = o.default.clipboardData.getData("Text")), 
                                            n(a, i, s, u, r.onBeforePaste), t.preventDefault();

                                          case 7:
                                          case "end":
                                            return e.stop();
                                        }
                                    }, e, this);
                                }), g = function() {
                                    var e = this, t = arguments;
                                    return new Promise(function(n, i) {
                                        var a = m.apply(e, t);
                                        function r(e) {
                                            v(a, n, i, r, o, "next", e);
                                        }
                                        function o(e) {
                                            v(a, n, i, r, o, "throw", e);
                                        }
                                        r(void 0);
                                    });
                                }, function(e) {
                                    return g.apply(this, arguments);
                                }),
                                inputFallBackEvent: function(e) {
                                    var t = this.inputmask, n = t.opts, i = t.dependencyLib;
                                    var a, o = this, u = o.inputmask._valueGet(!0), p = (t.isRTL ? c.getBuffer.call(t).slice().reverse() : c.getBuffer.call(t)).join(""), d = c.caret.call(t, o, void 0, void 0, !0);
                                    if (p !== u) {
                                        if (a = function(e, i, a) {
                                            for (var r, o, l, s = e.substr(0, a.begin).split(""), u = e.substr(a.begin).split(""), p = i.substr(0, a.begin).split(""), d = i.substr(a.begin).split(""), h = s.length >= p.length ? s.length : p.length, v = u.length >= d.length ? u.length : d.length, m = "", g = [], y = "~"; s.length < h; ) s.push(y);
                                            for (;p.length < h; ) p.push(y);
                                            for (;u.length < v; ) u.unshift(y);
                                            for (;d.length < v; ) d.unshift(y);
                                            var k = s.concat(u), b = p.concat(d);
                                            for (o = 0, r = k.length; o < r; o++) switch (l = f.getPlaceholder.call(t, c.translatePosition.call(t, o)), 
                                            m) {
                                              case "insertText":
                                                b[o - 1] === k[o] && a.begin == k.length - 1 && g.push(k[o]), o = r;
                                                break;

                                              case "insertReplacementText":
                                              case "deleteContentBackward":
                                                k[o] === y ? a.end++ : o = r;
                                                break;

                                              default:
                                                k[o] !== b[o] && (k[o + 1] !== y && k[o + 1] !== l && void 0 !== k[o + 1] || (b[o] !== l || b[o + 1] !== y) && b[o] !== y ? b[o + 1] === y && b[o] === k[o + 1] ? (m = "insertText", 
                                                g.push(k[o]), a.begin--, a.end--) : k[o] !== l && k[o] !== y && (k[o + 1] === y || b[o] !== k[o] && b[o + 1] === k[o + 1]) ? (m = "insertReplacementText", 
                                                g.push(k[o]), a.begin--) : k[o] === y ? (m = "deleteContentBackward", (c.isMask.call(t, c.translatePosition.call(t, o), !0) || b[o] === n.radixPoint) && a.end++) : o = r : (m = "insertText", 
                                                g.push(k[o]), a.begin--, a.end--));
                                            }
                                            return {
                                                action: m,
                                                data: g,
                                                caret: a
                                            };
                                        }(u, p, d), (o.inputmask.shadowRoot || o.ownerDocument).activeElement !== o && o.focus(), 
                                        (0, l.writeBuffer)(o, c.getBuffer.call(t)), c.caret.call(t, o, d.begin, d.end, !0), 
                                        !r.mobile && t.skipNextInsert && "insertText" === e.inputType && "insertText" === a.action && t.isComposing) return !1;
                                        switch ("insertCompositionText" === e.inputType && "insertText" === a.action && t.isComposing ? t.skipNextInsert = !0 : t.skipNextInsert = !1, 
                                        a.action) {
                                          case "insertText":
                                          case "insertReplacementText":
                                            a.data.forEach(function(e, n) {
                                                var a = new i.Event("keypress");
                                                a.key = e, t.ignorable = !1, y.keypressEvent.call(o, a);
                                            }), setTimeout(function() {
                                                t.$el.trigger("keyup");
                                            }, 0);
                                            break;

                                          case "deleteContentBackward":
                                            var h = new i.Event("keydown");
                                            h.key = s.keys.Backspace, y.keyEvent.call(o, h);
                                            break;

                                          default:
                                            (0, l.applyInputValue)(o, u), c.caret.call(t, o, d.begin, d.end, !0);
                                        }
                                        e.preventDefault();
                                    }
                                },
                                setValueEvent: function(e) {
                                    var t = this.inputmask, n = t.dependencyLib, i = this, a = e && e.detail ? e.detail[0] : arguments[1];
                                    void 0 === a && (a = i.inputmask._valueGet(!0)), (0, l.applyInputValue)(i, a, new n.Event("input")), 
                                    (e.detail && void 0 !== e.detail[1] || void 0 !== arguments[2]) && c.caret.call(t, i, e.detail ? e.detail[1] : arguments[2]);
                                },
                                focusEvent: function(e) {
                                    var t = this.inputmask, n = t.opts, i = t && t._valueGet();
                                    n.showMaskOnFocus && i !== c.getBuffer.call(t).join("") && (0, l.writeBuffer)(this, c.getBuffer.call(t), c.seekNext.call(t, c.getLastValidPosition.call(t))), 
                                    !0 !== n.positionCaretOnTab || !1 !== t.mouseEnter || u.isComplete.call(t, c.getBuffer.call(t)) && -1 !== c.getLastValidPosition.call(t) || y.clickEvent.apply(this, [ e, !0 ]), 
                                    t.undoValue = t && t._valueGet(!0);
                                },
                                invalidEvent: function(e) {
                                    this.inputmask.validationEvent = !0;
                                },
                                mouseleaveEvent: function() {
                                    var e = this.inputmask, t = e.opts, n = this;
                                    e.mouseEnter = !1, t.clearMaskOnLostFocus && (n.inputmask.shadowRoot || n.ownerDocument).activeElement !== n && (0, 
                                    l.HandleNativePlaceholder)(n, e.originalPlaceholder);
                                },
                                clickEvent: function(e, t) {
                                    var n = this.inputmask;
                                    n.clicked++;
                                    var i = this;
                                    if ((i.inputmask.shadowRoot || i.ownerDocument).activeElement === i) {
                                        var a = c.determineNewCaretPosition.call(n, c.caret.call(n, i), t);
                                        void 0 !== a && c.caret.call(n, i, a);
                                    }
                                },
                                cutEvent: function(e) {
                                    var t = this.inputmask, n = t.maskset, i = this, a = c.caret.call(t, i), r = t.isRTL ? c.getBuffer.call(t).slice(a.end, a.begin) : c.getBuffer.call(t).slice(a.begin, a.end), f = t.isRTL ? r.reverse().join("") : r.join("");
                                    o.default.navigator && o.default.navigator.clipboard ? o.default.navigator.clipboard.writeText(f) : o.default.clipboardData && o.default.clipboardData.getData && o.default.clipboardData.setData("Text", f), 
                                    u.handleRemove.call(t, i, s.keys.Delete, a), (0, l.writeBuffer)(i, c.getBuffer.call(t), n.p, e, t.undoValue !== t._valueGet(!0));
                                },
                                blurEvent: function(e) {
                                    var t = this.inputmask, n = t.opts, i = t.dependencyLib;
                                    t.clicked = 0;
                                    var a = i(this), r = this;
                                    if (r.inputmask) {
                                        (0, l.HandleNativePlaceholder)(r, t.originalPlaceholder);
                                        var o = r.inputmask._valueGet(), s = c.getBuffer.call(t).slice();
                                        "" !== o && (n.clearMaskOnLostFocus && (-1 === c.getLastValidPosition.call(t) && o === c.getBufferTemplate.call(t).join("") ? s = [] : l.clearOptionalTail.call(t, s)), 
                                        !1 === u.isComplete.call(t, s) && (setTimeout(function() {
                                            a.trigger("incomplete");
                                        }, 0), n.clearIncomplete && (c.resetMaskSet.call(t, !1), s = n.clearMaskOnLostFocus ? [] : c.getBufferTemplate.call(t).slice())), 
                                        (0, l.writeBuffer)(r, s, void 0, e)), o = t._valueGet(!0), t.undoValue !== o && ("" != o || t.undoValue != c.getBufferTemplate.call(t).join("") || t.undoValue == c.getBufferTemplate.call(t).join("") && t.maskset.validPositions.length > 0) && (t.undoValue = o, 
                                        a.trigger("change"));
                                    }
                                },
                                mouseenterEvent: function() {
                                    var e = this.inputmask, t = e.opts.showMaskOnHover, n = this;
                                    if (e.mouseEnter = !0, (n.inputmask.shadowRoot || n.ownerDocument).activeElement !== n) {
                                        var i = (e.isRTL ? c.getBufferTemplate.call(e).slice().reverse() : c.getBufferTemplate.call(e)).join("");
                                        t && (0, l.HandleNativePlaceholder)(n, i);
                                    }
                                },
                                submitEvent: function() {
                                    var e = this.inputmask, t = e.opts;
                                    e.undoValue !== e._valueGet(!0) && e.$el.trigger("change"), -1 === c.getLastValidPosition.call(e) && e._valueGet && e._valueGet() === c.getBufferTemplate.call(e).join("") && e._valueSet(""), 
                                    t.clearIncomplete && !1 === u.isComplete.call(e, c.getBuffer.call(e)) && e._valueSet(""), 
                                    t.removeMaskOnSubmit && (e._valueSet(e.unmaskedvalue(), !0), setTimeout(function() {
                                        (0, l.writeBuffer)(e.el, c.getBuffer.call(e));
                                    }, 0));
                                },
                                resetEvent: function() {
                                    var e = this.inputmask;
                                    e.refreshValue = !0, setTimeout(function() {
                                        (0, l.applyInputValue)(e.el, e._valueGet(!0));
                                    }, 0);
                                }
                            };
                        },
                        9716: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.EventRuler = void 0;
                            var i, a = n(7760), r = (i = n(2394)) && i.__esModule ? i : {
                                default: i
                            }, o = n(2839), l = n(8711);
                            t.EventRuler = {
                                on: function(e, t, n) {
                                    var i = e.inputmask.dependencyLib, s = function(t) {
                                        t.originalEvent && (t = t.originalEvent || t, arguments[0] = t);
                                        var s, c = this, u = c.inputmask, f = u ? u.opts : void 0;
                                        if (void 0 === u && "FORM" !== this.nodeName) {
                                            var p = i.data(c, "_inputmask_opts");
                                            i(c).off(), p && new r.default(p).mask(c);
                                        } else {
                                            if ([ "submit", "reset", "setvalue" ].includes(t.type) || "FORM" === this.nodeName || !(c.disabled || c.readOnly && !("keydown" === t.type && t.ctrlKey && t.key === o.keys.c || !1 === f.tabThrough && t.key === o.keys.Tab))) {
                                                switch (t.type) {
                                                  case "input":
                                                    if (!0 === u.skipInputEvent) return u.skipInputEvent = !1, t.preventDefault();
                                                    break;

                                                  case "click":
                                                  case "focus":
                                                    return u.validationEvent ? (u.validationEvent = !1, e.blur(), (0, a.HandleNativePlaceholder)(e, (u.isRTL ? l.getBufferTemplate.call(u).slice().reverse() : l.getBufferTemplate.call(u)).join("")), 
                                                    setTimeout(function() {
                                                        e.focus();
                                                    }, f.validationEventTimeOut), !1) : (s = arguments, void setTimeout(function() {
                                                        e.inputmask && n.apply(c, s);
                                                    }, 0));
                                                }
                                                var d = n.apply(c, arguments);
                                                return !1 === d && (t.preventDefault(), t.stopPropagation()), d;
                                            }
                                            t.preventDefault();
                                        }
                                    };
                                    [ "submit", "reset" ].includes(t) ? (s = s.bind(e), null !== e.form && i(e.form).on(t, s)) : i(e).on(t, s), 
                                    e.inputmask.events[t] = e.inputmask.events[t] || [], e.inputmask.events[t].push(s);
                                },
                                off: function(e, t) {
                                    if (e.inputmask && e.inputmask.events) {
                                        var n = e.inputmask.dependencyLib, i = e.inputmask.events;
                                        for (var a in t && ((i = [])[t] = e.inputmask.events[t]), i) {
                                            for (var r = i[a]; r.length > 0; ) {
                                                var o = r.pop();
                                                [ "submit", "reset" ].includes(a) ? null !== e.form && n(e.form).off(a, o) : n(e).off(a, o);
                                            }
                                            delete e.inputmask.events[a];
                                        }
                                    }
                                }
                            };
                        },
                        219: function(e, t, n) {
                            var i = p(n(7184)), a = p(n(2394)), r = n(2839), o = n(8711), l = n(4713);
                            function s(e, t) {
                                return function(e) {
                                    if (Array.isArray(e)) return e;
                                }(e) || function(e, t) {
                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (null != n) {
                                        var i, a, r, o, l = [], s = !0, c = !1;
                                        try {
                                            if (r = (n = n.call(e)).next, 0 === t) {
                                                if (Object(n) !== n) return;
                                                s = !1;
                                            } else for (;!(s = (i = r.call(n)).done) && (l.push(i.value), l.length !== t); s = !0) ;
                                        } catch (e) {
                                            c = !0, a = e;
                                        } finally {
                                            try {
                                                if (!s && null != n.return && (o = n.return(), Object(o) !== o)) return;
                                            } finally {
                                                if (c) throw a;
                                            }
                                        }
                                        return l;
                                    }
                                }(e, t) || function(e, t) {
                                    if (!e) return;
                                    if ("string" == typeof e) return c(e, t);
                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                    "Object" === n && e.constructor && (n = e.constructor.name);
                                    if ("Map" === n || "Set" === n) return Array.from(e);
                                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return c(e, t);
                                }(e, t) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }();
                            }
                            function c(e, t) {
                                (null == t || t > e.length) && (t = e.length);
                                for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                                return i;
                            }
                            function u(e) {
                                return u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, u(e);
                            }
                            function f(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var i = t[n];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                                    Object.defineProperty(e, (a = i.key, r = void 0, r = function(e, t) {
                                        if ("object" !== u(e) || null === e) return e;
                                        var n = e[Symbol.toPrimitive];
                                        if (void 0 !== n) {
                                            var i = n.call(e, t || "default");
                                            if ("object" !== u(i)) return i;
                                            throw new TypeError("@@toPrimitive must return a primitive value.");
                                        }
                                        return ("string" === t ? String : Number)(e);
                                    }(a, "string"), "symbol" === u(r) ? r : String(r)), i);
                                }
                                var a, r;
                            }
                            function p(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                            n(1313);
                            var d = a.default.dependencyLib, h = function() {
                                function e(t, n, i, a) {
                                    !function(e, t) {
                                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                                    }(this, e), this.mask = t, this.format = n, this.opts = i, this.inputmask = a, this._date = new Date(1, 0, 1), 
                                    this.initDateObject(t, this.opts, this.inputmask);
                                }
                                var t, n, i;
                                return t = e, (n = [ {
                                    key: "date",
                                    get: function() {
                                        return void 0 === this._date && (this._date = new Date(1, 0, 1), this.initDateObject(void 0, this.opts, this.inputmask)), 
                                        this._date;
                                    }
                                }, {
                                    key: "initDateObject",
                                    value: function(e, t, n) {
                                        var i;
                                        for (P(t).lastIndex = 0; i = P(t).exec(this.format); ) {
                                            var a = /\d+$/.exec(i[0]), r = a ? i[0][0] + "x" : i[0], o = void 0;
                                            if (void 0 !== e) {
                                                if (a) {
                                                    var s = P(t).lastIndex, c = j.call(n, i.index, t, n && n.maskset);
                                                    P(t).lastIndex = s, o = e.slice(0, e.indexOf(c.nextMatch[0]));
                                                } else {
                                                    for (var u = i[0][0], f = i.index; n && (t.placeholder[l.getTest.call(n, f).match.placeholder] || l.getTest.call(n, f).match.placeholder) === u; ) f++;
                                                    var p = f - i.index;
                                                    o = e.slice(0, p || y[r] && y[r][4] || r.length);
                                                }
                                                e = e.slice(o.length);
                                            }
                                            Object.prototype.hasOwnProperty.call(y, r) && this.setValue(this, o, r, y[r][2], y[r][1]);
                                        }
                                    }
                                }, {
                                    key: "setValue",
                                    value: function(e, t, n, i, a) {
                                        if (void 0 !== t) switch (i) {
                                          case "ampm":
                                            e[i] = t, e["raw" + i] = t.replace(/\s/g, "_");
                                            break;

                                          case "month":
                                            if ("mmm" === n || "mmmm" === n) {
                                                e[i] = _("mmm" === n ? m.monthNames.slice(0, 12).findIndex(function(e) {
                                                    return t.toLowerCase() === e.toLowerCase();
                                                }) + 1 : m.monthNames.slice(12, 24).findIndex(function(e) {
                                                    return t.toLowerCase() === e.toLowerCase();
                                                }) + 1, 2), e[i] = "00" === e[i] ? "" : e[i].toString(), e["raw" + i] = e[i];
                                                break;
                                            }

                                          default:
                                            e[i] = t.replace(/[^0-9]/g, "0"), e["raw" + i] = t.replace(/\s/g, "_");
                                        }
                                        if (void 0 !== a) {
                                            var r = e[i];
                                            ("day" === i && 29 === parseInt(r) || "month" === i && 2 === parseInt(r)) && (29 !== parseInt(e.day) || 2 !== parseInt(e.month) || "" !== e.year && void 0 !== e.year || e._date.setFullYear(2012, 1, 29)), 
                                            "day" === i && (g = !0, 0 === parseInt(r) && (r = 1)), "month" === i && (g = !0), 
                                            "year" === i && (g = !0, r.length < y[n][4] && (r = _(r, y[n][4], !0))), ("" !== r && !isNaN(r) || "ampm" === i) && a.call(e._date, r);
                                        }
                                    }
                                }, {
                                    key: "reset",
                                    value: function() {
                                        this._date = new Date(1, 0, 1);
                                    }
                                }, {
                                    key: "reInit",
                                    value: function() {
                                        this._date = void 0, this.date;
                                    }
                                } ]) && f(t.prototype, n), i && f(t, i), Object.defineProperty(t, "prototype", {
                                    writable: !1
                                }), e;
                            }(), v = (new Date).getFullYear(), m = a.default.prototype.i18n, g = !1, y = {
                                d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
                                dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
                                    return _(Date.prototype.getDate.call(this), 2);
                                } ],
                                ddd: [ "" ],
                                dddd: [ "" ],
                                m: [ "[1-9]|1[012]", function(e) {
                                    var t = e ? parseInt(e) : 0;
                                    return t > 0 && t--, Date.prototype.setMonth.call(this, t);
                                }, "month", function() {
                                    return Date.prototype.getMonth.call(this) + 1;
                                } ],
                                mm: [ "0[1-9]|1[012]", function(e) {
                                    var t = e ? parseInt(e) : 0;
                                    return t > 0 && t--, Date.prototype.setMonth.call(this, t);
                                }, "month", function() {
                                    return _(Date.prototype.getMonth.call(this) + 1, 2);
                                } ],
                                mmm: [ m.monthNames.slice(0, 12).join("|"), function(e) {
                                    var t = m.monthNames.slice(0, 12).findIndex(function(t) {
                                        return e.toLowerCase() === t.toLowerCase();
                                    });
                                    return -1 !== t && Date.prototype.setMonth.call(this, t);
                                }, "month", function() {
                                    return m.monthNames.slice(0, 12)[Date.prototype.getMonth.call(this)];
                                } ],
                                mmmm: [ m.monthNames.slice(12, 24).join("|"), function(e) {
                                    var t = m.monthNames.slice(12, 24).findIndex(function(t) {
                                        return e.toLowerCase() === t.toLowerCase();
                                    });
                                    return -1 !== t && Date.prototype.setMonth.call(this, t);
                                }, "month", function() {
                                    return m.monthNames.slice(12, 24)[Date.prototype.getMonth.call(this)];
                                } ],
                                yy: [ "[0-9]{2}", function(e) {
                                    var t = (new Date).getFullYear().toString().slice(0, 2);
                                    Date.prototype.setFullYear.call(this, "".concat(t).concat(e));
                                }, "year", function() {
                                    return _(Date.prototype.getFullYear.call(this), 2);
                                }, 2 ],
                                yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
                                    return _(Date.prototype.getFullYear.call(this), 4);
                                }, 4 ],
                                h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                                hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
                                    return _(Date.prototype.getHours.call(this), 2);
                                } ],
                                hx: [ function(e) {
                                    return "[0-9]{".concat(e, "}");
                                }, Date.prototype.setHours, "hours", function(e) {
                                    return Date.prototype.getHours;
                                } ],
                                H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                                HH: [ "0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
                                    return _(Date.prototype.getHours.call(this), 2);
                                } ],
                                Hx: [ function(e) {
                                    return "[0-9]{".concat(e, "}");
                                }, Date.prototype.setHours, "hours", function(e) {
                                    return function() {
                                        return _(Date.prototype.getHours.call(this), e);
                                    };
                                } ],
                                M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
                                MM: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
                                    return _(Date.prototype.getMinutes.call(this), 2);
                                } ],
                                s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
                                ss: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function() {
                                    return _(Date.prototype.getSeconds.call(this), 2);
                                } ],
                                l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
                                    return _(Date.prototype.getMilliseconds.call(this), 3);
                                }, 3 ],
                                L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
                                    return _(Date.prototype.getMilliseconds.call(this), 2);
                                }, 2 ],
                                t: [ "[ap]", b, "ampm", x, 1 ],
                                tt: [ "[ap]m", b, "ampm", x, 2 ],
                                T: [ "[AP]", b, "ampm", x, 1 ],
                                TT: [ "[AP]M", b, "ampm", x, 2 ],
                                Z: [ ".*", void 0, "Z", function() {
                                    var e = this.toString().match(/\((.+)\)/)[1];
                                    e.includes(" ") && (e = (e = e.replace("-", " ").toUpperCase()).split(" ").map(function(e) {
                                        return s(e, 1)[0];
                                    }).join(""));
                                    return e;
                                } ],
                                o: [ "" ],
                                S: [ "" ]
                            }, k = {
                                isoDate: "yyyy-mm-dd",
                                isoTime: "HH:MM:ss",
                                isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
                            };
                            function b(e) {
                                var t = this.getHours();
                                e.toLowerCase().includes("p") ? this.setHours(t + 12) : e.toLowerCase().includes("a") && t >= 12 && this.setHours(t - 12);
                            }
                            function x() {
                                var e = this.getHours();
                                return (e = e || 12) >= 12 ? "PM" : "AM";
                            }
                            function w(e) {
                                var t = /\d+$/.exec(e[0]);
                                if (t && void 0 !== t[0]) {
                                    var n = y[e[0][0] + "x"].slice("");
                                    return n[0] = n[0](t[0]), n[3] = n[3](t[0]), n;
                                }
                                if (y[e[0]]) return y[e[0]];
                            }
                            function P(e) {
                                if (!e.tokenizer) {
                                    var t = [], n = [];
                                    for (var i in y) if (/\.*x$/.test(i)) {
                                        var a = i[0] + "\\d+";
                                        -1 === n.indexOf(a) && n.push(a);
                                    } else -1 === t.indexOf(i[0]) && t.push(i[0]);
                                    e.tokenizer = "(" + (n.length > 0 ? n.join("|") + "|" : "") + t.join("+|") + ")+?|.", 
                                    e.tokenizer = new RegExp(e.tokenizer, "g");
                                }
                                return e.tokenizer;
                            }
                            function S(e, t, n) {
                                if (!g) return !0;
                                if (void 0 === e.rawday || !isFinite(e.rawday) && new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day || "29" == e.day && (!isFinite(e.rawyear) || void 0 === e.rawyear || "" === e.rawyear) || new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day) return t;
                                if ("29" == e.day) {
                                    var i = j.call(this, t.pos, n, this.maskset);
                                    if (i.targetMatch && "yyyy" === i.targetMatch[0] && t.pos - i.targetMatchIndex == 2) return t.remove = t.pos + 1, 
                                    t;
                                } else if (2 == e.date.getMonth() && "30" == e.day && void 0 !== t.c) return e.day = "03", 
                                e.date.setDate(3), e.date.setMonth(1), t.insert = [ {
                                    pos: t.pos,
                                    c: "0"
                                }, {
                                    pos: t.pos + 1,
                                    c: t.c
                                } ], t.caret = o.seekNext.call(this, t.pos + 1), t;
                                return !1;
                            }
                            function O(e, t, n, a) {
                                var r, o, l = "", s = 0, c = {};
                                for (P(n).lastIndex = 0; r = P(n).exec(e); ) {
                                    if (void 0 === t) if (o = w(r)) l += "(" + o[0] + ")", n.placeholder && "" !== n.placeholder ? (c[s] = n.placeholder[r.index % n.placeholder.length], 
                                    c[n.placeholder[r.index % n.placeholder.length]] = r[0].charAt(0)) : c[s] = r[0].charAt(0); else switch (r[0]) {
                                      case "[":
                                        l += "(";
                                        break;

                                      case "]":
                                        l += ")?";
                                        break;

                                      default:
                                        l += (0, i.default)(r[0]), c[s] = r[0].charAt(0);
                                    } else if (o = w(r)) if (!0 !== a && o[3]) l += o[3].call(t.date); else o[2] ? l += t["raw" + o[2]] : l += r[0]; else l += r[0];
                                    s++;
                                }
                                return void 0 === t && (n.placeholder = c), l;
                            }
                            function _(e, t, n) {
                                for (e = String(e), t = t || 2; e.length < t; ) e = n ? e + "0" : "0" + e;
                                return e;
                            }
                            function M(e, t, n) {
                                return "string" == typeof e ? new h(e, t, n, this) : e && "object" === u(e) && Object.prototype.hasOwnProperty.call(e, "date") ? e : void 0;
                            }
                            function E(e, t) {
                                return O(t.inputFormat, {
                                    date: e
                                }, t);
                            }
                            function j(e, t, n) {
                                var i, a, r = this, o = n && n.tests[e] ? t.placeholder[n.tests[e][0].match.placeholder] || n.tests[e][0].match.placeholder : "", s = 0, c = 0;
                                for (P(t).lastIndex = 0; a = P(t).exec(t.inputFormat); ) {
                                    var u = /\d+$/.exec(a[0]);
                                    if (u) c = parseInt(u[0]); else {
                                        for (var f = a[0][0], p = s; r && (t.placeholder[l.getTest.call(r, p).match.placeholder] || l.getTest.call(r, p).match.placeholder) === f; ) p++;
                                        0 === (c = p - s) && (c = a[0].length);
                                    }
                                    if (s += c, -1 != a[0].indexOf(o) || s >= e + 1) {
                                        i = a, a = P(t).exec(t.inputFormat);
                                        break;
                                    }
                                }
                                return {
                                    targetMatchIndex: s - c,
                                    nextMatch: a,
                                    targetMatch: i
                                };
                            }
                            a.default.extendAliases({
                                datetime: {
                                    mask: function(e) {
                                        return e.numericInput = !1, y.S = m.ordinalSuffix.join("|"), e.inputFormat = k[e.inputFormat] || e.inputFormat, 
                                        e.displayFormat = k[e.displayFormat] || e.displayFormat || e.inputFormat, e.outputFormat = k[e.outputFormat] || e.outputFormat || e.inputFormat, 
                                        e.regex = O(e.inputFormat, void 0, e), e.min = M(e.min, e.inputFormat, e), e.max = M(e.max, e.inputFormat, e), 
                                        null;
                                    },
                                    placeholder: "",
                                    inputFormat: "isoDateTime",
                                    displayFormat: null,
                                    outputFormat: null,
                                    min: null,
                                    max: null,
                                    skipOptionalPartCharacter: "",
                                    preValidation: function(e, t, n, i, a, r, o, l) {
                                        if (l) return !0;
                                        if (isNaN(n) && e[t] !== n) {
                                            var s = j.call(this, t, a, r);
                                            if (s.nextMatch && s.nextMatch[0] === n && s.targetMatch[0].length > 1) {
                                                var c = w(s.targetMatch)[0];
                                                if (new RegExp(c).test("0" + e[t - 1])) return e[t] = e[t - 1], e[t - 1] = "0", 
                                                {
                                                    fuzzy: !0,
                                                    buffer: e,
                                                    refreshFromBuffer: {
                                                        start: t - 1,
                                                        end: t + 1
                                                    },
                                                    pos: t + 1
                                                };
                                            }
                                        }
                                        return !0;
                                    },
                                    postValidation: function(e, t, n, i, a, r, o, s) {
                                        var c, u, f = this;
                                        if (o) return !0;
                                        if (!1 === i && (((c = j.call(f, t + 1, a, r)).targetMatch && c.targetMatchIndex === t && c.targetMatch[0].length > 1 && void 0 !== y[c.targetMatch[0]] || (c = j.call(f, t + 2, a, r)).targetMatch && c.targetMatchIndex === t + 1 && c.targetMatch[0].length > 1 && void 0 !== y[c.targetMatch[0]]) && (u = w(c.targetMatch)[0]), 
                                        void 0 !== u && (void 0 !== r.validPositions[t + 1] && new RegExp(u).test(n + "0") ? (e[t] = n, 
                                        e[t + 1] = "0", i = {
                                            pos: t + 2,
                                            caret: t
                                        }) : new RegExp(u).test("0" + n) && (e[t] = "0", e[t + 1] = n, i = {
                                            pos: t + 2
                                        })), !1 === i)) return i;
                                        if (i.fuzzy && (e = i.buffer, t = i.pos), (c = j.call(f, t, a, r)).targetMatch && c.targetMatch[0] && void 0 !== y[c.targetMatch[0]]) {
                                            var p = w(c.targetMatch);
                                            u = p[0];
                                            var d = e.slice(c.targetMatchIndex, c.targetMatchIndex + c.targetMatch[0].length);
                                            if (!1 === new RegExp(u).test(d.join("")) && 2 === c.targetMatch[0].length && r.validPositions[c.targetMatchIndex] && r.validPositions[c.targetMatchIndex + 1] && (r.validPositions[c.targetMatchIndex + 1].input = "0"), 
                                            "year" == p[2]) for (var h = l.getMaskTemplate.call(f, !1, 1, void 0, !0), m = t + 1; m < e.length; m++) e[m] = h[m], 
                                            r.validPositions.splice(t + 1, 1);
                                        }
                                        var g = i, k = M.call(f, e.join(""), a.inputFormat, a);
                                        return g && !isNaN(k.date.getTime()) && (a.prefillYear && (g = function(e, t, n) {
                                            if (e.year !== e.rawyear) {
                                                var i = v.toString(), a = e.rawyear.replace(/[^0-9]/g, ""), r = i.slice(0, a.length), o = i.slice(a.length);
                                                if (2 === a.length && a === r) {
                                                    var l = new Date(v, e.month - 1, e.day);
                                                    e.day == l.getDate() && (!n.max || n.max.date.getTime() >= l.getTime()) && (e.date.setFullYear(v), 
                                                    e.year = i, t.insert = [ {
                                                        pos: t.pos + 1,
                                                        c: o[0]
                                                    }, {
                                                        pos: t.pos + 2,
                                                        c: o[1]
                                                    } ]);
                                                }
                                            }
                                            return t;
                                        }(k, g, a)), g = function(e, t, n, i) {
                                            if (!t) return t;
                                            if (t && n.min && !isNaN(n.min.date.getTime())) {
                                                var r;
                                                for (e.reset(), P(n).lastIndex = 0; r = P(n).exec(n.inputFormat); ) {
                                                    var o;
                                                    if ((o = w(r)) && o[3]) {
                                                        for (var l = o[1], s = e[o[2]], c = n.min[o[2]], u = n.max ? n.max[o[2]] : c + 1, f = [], p = !1, d = 0; d < c.length; d++) void 0 !== i.validPositions[d + r.index] || p ? (f[d] = s[d], 
                                                        p = p || s[d] > c[d]) : (d + r.index == 0 && s[d] < c[d] ? (f[d] = s[d], p = !0) : f[d] = c[d], 
                                                        "year" === o[2] && s.length - 1 == d && c != u && (f = (parseInt(f.join("")) + 1).toString().split("")), 
                                                        "ampm" === o[2] && c != u && n.min.date.getTime() > e.date.getTime() && (f[d] = u[d]));
                                                        l.call(e._date, f.join(""));
                                                    }
                                                }
                                                t = n.min.date.getTime() <= e.date.getTime(), e.reInit();
                                            }
                                            return t && n.max && (isNaN(n.max.date.getTime()) || (t = n.max.date.getTime() >= e.date.getTime())), 
                                            t;
                                        }(k, g = S.call(f, k, g, a), a, r)), void 0 !== t && g && i.pos !== t ? {
                                            buffer: O(a.inputFormat, k, a).split(""),
                                            refreshFromBuffer: {
                                                start: t,
                                                end: i.pos
                                            },
                                            pos: i.caret || i.pos
                                        } : g;
                                    },
                                    onKeyDown: function(e, t, n, i) {
                                        e.ctrlKey && e.key === r.keys.ArrowRight && (this.inputmask._valueSet(E(new Date, i)), 
                                        d(this).trigger("setvalue"));
                                    },
                                    onUnMask: function(e, t, n) {
                                        return t ? O(n.outputFormat, M.call(this, e, n.inputFormat, n), n, !0) : t;
                                    },
                                    casing: function(e, t, n, i) {
                                        if (0 == t.nativeDef.indexOf("[ap]")) return e.toLowerCase();
                                        if (0 == t.nativeDef.indexOf("[AP]")) return e.toUpperCase();
                                        var a = l.getTest.call(this, [ n - 1 ]);
                                        return 0 == a.match.def.indexOf("[AP]") || 0 === n || a && a.input === String.fromCharCode(r.keyCode.Space) || a && a.match.def === String.fromCharCode(r.keyCode.Space) ? e.toUpperCase() : e.toLowerCase();
                                    },
                                    onBeforeMask: function(e, t) {
                                        return "[object Date]" === Object.prototype.toString.call(e) && (e = E(e, t)), e;
                                    },
                                    insertMode: !1,
                                    insertModeVisual: !1,
                                    shiftPositions: !1,
                                    keepStatic: !1,
                                    inputmode: "numeric",
                                    prefillYear: !0
                                }
                            });
                        },
                        1313: function(e, t, n) {
                            var i, a = (i = n(2394)) && i.__esModule ? i : {
                                default: i
                            };
                            a.default.dependencyLib.extend(!0, a.default.prototype.i18n, {
                                dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                                monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                                ordinalSuffix: [ "st", "nd", "rd", "th" ]
                            });
                        },
                        3851: function(e, t, n) {
                            var i, a = (i = n(2394)) && i.__esModule ? i : {
                                default: i
                            }, r = n(8711), o = n(4713);
                            function l(e) {
                                return function(e) {
                                    if (Array.isArray(e)) return s(e);
                                }(e) || function(e) {
                                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
                                }(e) || function(e, t) {
                                    if (!e) return;
                                    if ("string" == typeof e) return s(e, t);
                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                    "Object" === n && e.constructor && (n = e.constructor.name);
                                    if ("Map" === n || "Set" === n) return Array.from(e);
                                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return s(e, t);
                                }(e) || function() {
                                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }();
                            }
                            function s(e, t) {
                                (null == t || t > e.length) && (t = e.length);
                                for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                                return i;
                            }
                            a.default.extendDefinitions({
                                A: {
                                    validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                                    casing: "upper"
                                },
                                "&": {
                                    validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                                    casing: "upper"
                                },
                                "#": {
                                    validator: "[0-9A-Fa-f]",
                                    casing: "upper"
                                }
                            });
                            var c = /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/;
                            function u(e, t, n, i, a) {
                                if (n - 1 > -1 && "." !== t.buffer[n - 1] ? (e = t.buffer[n - 1] + e, e = n - 2 > -1 && "." !== t.buffer[n - 2] ? t.buffer[n - 2] + e : "0" + e) : e = "00" + e, 
                                a.greedy && parseInt(e) > 255 && c.test("00" + e.charAt(2))) {
                                    var r = [].concat(l(t.buffer.slice(0, n)), [ ".", e.charAt(2) ]);
                                    if (r.join("").match(/\./g).length < 4) return {
                                        refreshFromBuffer: !0,
                                        buffer: r,
                                        caret: n + 2
                                    };
                                }
                                return c.test(e);
                            }
                            a.default.extendAliases({
                                cssunit: {
                                    regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
                                },
                                url: {
                                    regex: "(https?|ftp)://.*",
                                    autoUnmask: !1,
                                    keepStatic: !1,
                                    tabThrough: !0
                                },
                                ip: {
                                    mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
                                    definitions: {
                                        i: {
                                            validator: u
                                        },
                                        j: {
                                            validator: u
                                        },
                                        k: {
                                            validator: u
                                        },
                                        l: {
                                            validator: u
                                        }
                                    },
                                    onUnMask: function(e, t, n) {
                                        return e;
                                    },
                                    inputmode: "decimal",
                                    substitutes: {
                                        ",": "."
                                    }
                                },
                                email: {
                                    mask: function(e) {
                                        var t = e.separator, n = e.quantifier, i = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]", a = i;
                                        if (t) for (var r = 0; r < n; r++) a += "[".concat(t).concat(i, "]");
                                        return a;
                                    },
                                    greedy: !1,
                                    casing: "lower",
                                    separator: null,
                                    quantifier: 5,
                                    skipOptionalPartCharacter: "",
                                    onBeforePaste: function(e, t) {
                                        return (e = e.toLowerCase()).replace("mailto:", "");
                                    },
                                    definitions: {
                                        "*": {
                                            validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ!#$%&'*+/=?^_`{|}~-]"
                                        },
                                        "-": {
                                            validator: "[0-9A-Za-z-]"
                                        }
                                    },
                                    onUnMask: function(e, t, n) {
                                        return e;
                                    },
                                    inputmode: "email"
                                },
                                mac: {
                                    mask: "##:##:##:##:##:##"
                                },
                                vin: {
                                    mask: "V{13}9{4}",
                                    definitions: {
                                        V: {
                                            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                                            casing: "upper"
                                        }
                                    },
                                    clearIncomplete: !0,
                                    autoUnmask: !0
                                },
                                ssn: {
                                    mask: "999-99-9999",
                                    postValidation: function(e, t, n, i, a, l, s) {
                                        var c = o.getMaskTemplate.call(this, !0, r.getLastValidPosition.call(this), !0, !0);
                                        return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(c.join(""));
                                    }
                                }
                            });
                        },
                        207: function(e, t, n) {
                            var i = l(n(7184)), a = l(n(2394)), r = n(2839), o = n(8711);
                            function l(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                            var s = a.default.dependencyLib;
                            function c(e, t) {
                                for (var n = "", i = 0; i < e.length; i++) a.default.prototype.definitions[e.charAt(i)] || t.definitions[e.charAt(i)] || t.optionalmarker[0] === e.charAt(i) || t.optionalmarker[1] === e.charAt(i) || t.quantifiermarker[0] === e.charAt(i) || t.quantifiermarker[1] === e.charAt(i) || t.groupmarker[0] === e.charAt(i) || t.groupmarker[1] === e.charAt(i) || t.alternatormarker === e.charAt(i) ? n += "\\" + e.charAt(i) : n += e.charAt(i);
                                return n;
                            }
                            function u(e, t, n, i) {
                                if (e.length > 0 && t > 0 && (!n.digitsOptional || i)) {
                                    var a = e.indexOf(n.radixPoint), r = !1;
                                    n.negationSymbol.back === e[e.length - 1] && (r = !0, e.length--), -1 === a && (e.push(n.radixPoint), 
                                    a = e.length - 1);
                                    for (var o = 1; o <= t; o++) isFinite(e[a + o]) || (e[a + o] = "0");
                                }
                                return r && e.push(n.negationSymbol.back), e;
                            }
                            function f(e, t) {
                                var n = 0;
                                for (var i in "+" === e && (n = o.seekNext.call(this, t.validPositions.length - 1)), 
                                t.tests) if ((i = parseInt(i)) >= n) for (var a = 0, r = t.tests[i].length; a < r; a++) if ((void 0 === t.validPositions[i] || "-" === e) && t.tests[i][a].match.def === e) return i + (void 0 !== t.validPositions[i] && "-" !== e ? 1 : 0);
                                return n;
                            }
                            function p(e, t) {
                                for (var n = -1, i = 0, a = t.validPositions.length; i < a; i++) {
                                    var r = t.validPositions[i];
                                    if (r && r.match.def === e) {
                                        n = i;
                                        break;
                                    }
                                }
                                return n;
                            }
                            function d(e, t, n, i, a) {
                                var r = t.buffer ? t.buffer.indexOf(a.radixPoint) : -1, o = (-1 !== r || i && a.jitMasking) && new RegExp(a.definitions[9].validator).test(e);
                                return !i && a._radixDance && -1 !== r && o && null == t.validPositions[r] ? {
                                    insert: {
                                        pos: r === n ? r + 1 : r,
                                        c: a.radixPoint
                                    },
                                    pos: n
                                } : o;
                            }
                            a.default.extendAliases({
                                numeric: {
                                    mask: function(e) {
                                        e.repeat = 0, e.groupSeparator === e.radixPoint && e.digits && "0" !== e.digits && ("." === e.radixPoint ? e.groupSeparator = "," : "," === e.radixPoint ? e.groupSeparator = "." : e.groupSeparator = ""), 
                                        " " === e.groupSeparator && (e.skipOptionalPartCharacter = void 0), e.placeholder.length > 1 && (e.placeholder = e.placeholder.charAt(0)), 
                                        "radixFocus" === e.positionCaretOnClick && "" === e.placeholder && (e.positionCaretOnClick = "lvp");
                                        var t = "0", n = e.radixPoint;
                                        !0 === e.numericInput && void 0 === e.__financeInput ? (t = "1", e.positionCaretOnClick = "radixFocus" === e.positionCaretOnClick ? "lvp" : e.positionCaretOnClick, 
                                        e.digitsOptional = !1, isNaN(e.digits) && (e.digits = 2), e._radixDance = !1, n = "," === e.radixPoint ? "?" : "!", 
                                        "" !== e.radixPoint && void 0 === e.definitions[n] && (e.definitions[n] = {}, e.definitions[n].validator = "[" + e.radixPoint + "]", 
                                        e.definitions[n].placeholder = e.radixPoint, e.definitions[n].static = !0, e.definitions[n].generated = !0)) : (e.__financeInput = !1, 
                                        e.numericInput = !0);
                                        var a, r = "[+]";
                                        if (r += c(e.prefix, e), "" !== e.groupSeparator ? (void 0 === e.definitions[e.groupSeparator] && (e.definitions[e.groupSeparator] = {}, 
                                        e.definitions[e.groupSeparator].validator = "[" + e.groupSeparator + "]", e.definitions[e.groupSeparator].placeholder = e.groupSeparator, 
                                        e.definitions[e.groupSeparator].static = !0, e.definitions[e.groupSeparator].generated = !0), 
                                        r += e._mask(e)) : r += "9{+}", void 0 !== e.digits && 0 !== e.digits) {
                                            var o = e.digits.toString().split(",");
                                            isFinite(o[0]) && o[1] && isFinite(o[1]) ? r += n + t + "{" + e.digits + "}" : (isNaN(e.digits) || parseInt(e.digits) > 0) && (e.digitsOptional || e.jitMasking ? (a = r + n + t + "{0," + e.digits + "}", 
                                            e.keepStatic = !0) : r += n + t + "{" + e.digits + "}");
                                        } else e.inputmode = "numeric";
                                        return r += c(e.suffix, e), r += "[-]", a && (r = [ a + c(e.suffix, e) + "[-]", r ]), 
                                        e.greedy = !1, function(e) {
                                            void 0 === e.parseMinMaxOptions && (null !== e.min && (e.min = e.min.toString().replace(new RegExp((0, 
                                            i.default)(e.groupSeparator), "g"), ""), "," === e.radixPoint && (e.min = e.min.replace(e.radixPoint, ".")), 
                                            e.min = isFinite(e.min) ? parseFloat(e.min) : NaN, isNaN(e.min) && (e.min = Number.MIN_VALUE)), 
                                            null !== e.max && (e.max = e.max.toString().replace(new RegExp((0, i.default)(e.groupSeparator), "g"), ""), 
                                            "," === e.radixPoint && (e.max = e.max.replace(e.radixPoint, ".")), e.max = isFinite(e.max) ? parseFloat(e.max) : NaN, 
                                            isNaN(e.max) && (e.max = Number.MAX_VALUE)), e.parseMinMaxOptions = "done");
                                        }(e), "" !== e.radixPoint && e.substituteRadixPoint && (e.substitutes["." == e.radixPoint ? "," : "."] = e.radixPoint), 
                                        r;
                                    },
                                    _mask: function(e) {
                                        return "(" + e.groupSeparator + "999){+|1}";
                                    },
                                    digits: "*",
                                    digitsOptional: !0,
                                    enforceDigitsOnBlur: !1,
                                    radixPoint: ".",
                                    positionCaretOnClick: "radixFocus",
                                    _radixDance: !0,
                                    groupSeparator: "",
                                    allowMinus: !0,
                                    negationSymbol: {
                                        front: "-",
                                        back: ""
                                    },
                                    prefix: "",
                                    suffix: "",
                                    min: null,
                                    max: null,
                                    SetMaxOnOverflow: !1,
                                    step: 1,
                                    inputType: "text",
                                    unmaskAsNumber: !1,
                                    roundingFN: Math.round,
                                    inputmode: "decimal",
                                    shortcuts: {
                                        k: "1000",
                                        m: "1000000"
                                    },
                                    placeholder: "0",
                                    greedy: !1,
                                    rightAlign: !0,
                                    insertMode: !0,
                                    autoUnmask: !1,
                                    skipOptionalPartCharacter: "",
                                    usePrototypeDefinitions: !1,
                                    stripLeadingZeroes: !0,
                                    substituteRadixPoint: !0,
                                    definitions: {
                                        0: {
                                            validator: d
                                        },
                                        1: {
                                            validator: d,
                                            definitionSymbol: "9"
                                        },
                                        9: {
                                            validator: "[0-9０-９٠-٩۰-۹]",
                                            definitionSymbol: "*"
                                        },
                                        "+": {
                                            validator: function(e, t, n, i, a) {
                                                return a.allowMinus && ("-" === e || e === a.negationSymbol.front);
                                            }
                                        },
                                        "-": {
                                            validator: function(e, t, n, i, a) {
                                                return a.allowMinus && e === a.negationSymbol.back;
                                            }
                                        }
                                    },
                                    preValidation: function(e, t, n, i, a, r, o, l) {
                                        var s = this;
                                        if (!1 !== a.__financeInput && n === a.radixPoint) return !1;
                                        var c = e.indexOf(a.radixPoint), u = t;
                                        if (t = function(e, t, n, i, a) {
                                            return a._radixDance && a.numericInput && t !== a.negationSymbol.back && e <= n && (n > 0 || t == a.radixPoint) && (void 0 === i.validPositions[e - 1] || i.validPositions[e - 1].input !== a.negationSymbol.back) && (e -= 1), 
                                            e;
                                        }(t, n, c, r, a), "-" === n || n === a.negationSymbol.front) {
                                            if (!0 !== a.allowMinus) return !1;
                                            var d = !1, h = p("+", r), v = p("-", r);
                                            return -1 !== h && (d = [ h ], -1 !== v && d.push(v)), !1 !== d ? {
                                                remove: d,
                                                caret: u - a.negationSymbol.back.length
                                            } : {
                                                insert: [ {
                                                    pos: f.call(s, "+", r),
                                                    c: a.negationSymbol.front,
                                                    fromIsValid: !0
                                                }, {
                                                    pos: f.call(s, "-", r),
                                                    c: a.negationSymbol.back,
                                                    fromIsValid: void 0
                                                } ],
                                                caret: u + a.negationSymbol.back.length
                                            };
                                        }
                                        if (n === a.groupSeparator) return {
                                            caret: u
                                        };
                                        if (l) return !0;
                                        if (-1 !== c && !0 === a._radixDance && !1 === i && n === a.radixPoint && void 0 !== a.digits && (isNaN(a.digits) || parseInt(a.digits) > 0) && c !== t) {
                                            var m = f.call(s, a.radixPoint, r);
                                            return r.validPositions[m] && (r.validPositions[m].generatedInput = r.validPositions[m].generated || !1), 
                                            {
                                                caret: a._radixDance && t === c - 1 ? c + 1 : c
                                            };
                                        }
                                        if (!1 === a.__financeInput) if (i) {
                                            if (a.digitsOptional) return {
                                                rewritePosition: o.end
                                            };
                                            if (!a.digitsOptional) {
                                                if (o.begin > c && o.end <= c) return n === a.radixPoint ? {
                                                    insert: {
                                                        pos: c + 1,
                                                        c: "0",
                                                        fromIsValid: !0
                                                    },
                                                    rewritePosition: c
                                                } : {
                                                    rewritePosition: c + 1
                                                };
                                                if (o.begin < c) return {
                                                    rewritePosition: o.begin - 1
                                                };
                                            }
                                        } else if (!a.showMaskOnHover && !a.showMaskOnFocus && !a.digitsOptional && a.digits > 0 && "" === this.__valueGet.call(this.el)) return {
                                            rewritePosition: c
                                        };
                                        return {
                                            rewritePosition: t
                                        };
                                    },
                                    postValidation: function(e, t, n, i, a, r, o) {
                                        if (!1 === i) return i;
                                        if (o) return !0;
                                        if (null !== a.min || null !== a.max) {
                                            var l = a.onUnMask(e.slice().reverse().join(""), void 0, s.extend({}, a, {
                                                unmaskAsNumber: !0
                                            }));
                                            if (null !== a.min && l < a.min && (l.toString().length > a.min.toString().length || l < 0)) return !1;
                                            if (null !== a.max && l > a.max) return !!a.SetMaxOnOverflow && {
                                                refreshFromBuffer: !0,
                                                buffer: u(a.max.toString().replace(".", a.radixPoint).split(""), a.digits, a).reverse()
                                            };
                                        }
                                        return i;
                                    },
                                    onUnMask: function(e, t, n) {
                                        if ("" === t && !0 === n.nullable) return t;
                                        var a = e.replace(n.prefix, "");
                                        return a = (a = a.replace(n.suffix, "")).replace(new RegExp((0, i.default)(n.groupSeparator), "g"), ""), 
                                        "" !== n.placeholder.charAt(0) && (a = a.replace(new RegExp(n.placeholder.charAt(0), "g"), "0")), 
                                        n.unmaskAsNumber ? ("" !== n.radixPoint && -1 !== a.indexOf(n.radixPoint) && (a = a.replace(i.default.call(this, n.radixPoint), ".")), 
                                        a = (a = a.replace(new RegExp("^" + (0, i.default)(n.negationSymbol.front)), "-")).replace(new RegExp((0, 
                                        i.default)(n.negationSymbol.back) + "$"), ""), Number(a)) : a;
                                    },
                                    isComplete: function(e, t) {
                                        var n = (t.numericInput ? e.slice().reverse() : e).join("");
                                        return n = (n = (n = (n = (n = n.replace(new RegExp("^" + (0, i.default)(t.negationSymbol.front)), "-")).replace(new RegExp((0, 
                                        i.default)(t.negationSymbol.back) + "$"), "")).replace(t.prefix, "")).replace(t.suffix, "")).replace(new RegExp((0, 
                                        i.default)(t.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === t.radixPoint && (n = n.replace((0, 
                                        i.default)(t.radixPoint), ".")), isFinite(n);
                                    },
                                    onBeforeMask: function(e, t) {
                                        var n;
                                        e = null !== (n = e) && void 0 !== n ? n : "";
                                        var a = t.radixPoint || ",";
                                        isFinite(t.digits) && (t.digits = parseInt(t.digits)), "number" != typeof e && "number" !== t.inputType || "" === a || (e = e.toString().replace(".", a));
                                        var r = "-" === e.charAt(0) || e.charAt(0) === t.negationSymbol.front, o = e.split(a), l = o[0].replace(/[^\-0-9]/g, ""), s = o.length > 1 ? o[1].replace(/[^0-9]/g, "") : "", c = o.length > 1;
                                        e = l + ("" !== s ? a + s : s);
                                        var f = 0;
                                        if ("" !== a && (f = t.digitsOptional ? t.digits < s.length ? t.digits : s.length : t.digits, 
                                        "" !== s || !t.digitsOptional)) {
                                            var p = Math.pow(10, f || 1);
                                            e = e.replace((0, i.default)(a), "."), isNaN(parseFloat(e)) || (e = (t.roundingFN(parseFloat(e) * p) / p).toFixed(f)), 
                                            e = e.toString().replace(".", a);
                                        }
                                        if (0 === t.digits && -1 !== e.indexOf(a) && (e = e.substring(0, e.indexOf(a))), 
                                        null !== t.min || null !== t.max) {
                                            var d = e.toString().replace(a, ".");
                                            null !== t.min && d < t.min ? e = t.min.toString().replace(".", a) : null !== t.max && d > t.max && (e = t.max.toString().replace(".", a));
                                        }
                                        return r && "-" !== e.charAt(0) && (e = "-" + e), u(e.toString().split(""), f, t, c).join("");
                                    },
                                    onBeforeWrite: function(e, t, n, a) {
                                        function r(e, t) {
                                            if (!1 !== a.__financeInput || t) {
                                                var n = e.indexOf(a.radixPoint);
                                                -1 !== n && e.splice(n, 1);
                                            }
                                            if ("" !== a.groupSeparator) for (;-1 !== (n = e.indexOf(a.groupSeparator)); ) e.splice(n, 1);
                                            return e;
                                        }
                                        var o, l;
                                        if (a.stripLeadingZeroes && (l = function(e, t) {
                                            var n = new RegExp("(^" + ("" !== t.negationSymbol.front ? (0, i.default)(t.negationSymbol.front) + "?" : "") + (0, 
                                            i.default)(t.prefix) + ")(.*)(" + (0, i.default)(t.suffix) + ("" != t.negationSymbol.back ? (0, 
                                            i.default)(t.negationSymbol.back) + "?" : "") + "$)").exec(e.slice().reverse().join("")), a = n ? n[2] : "", r = !1;
                                            return a && (a = a.split(t.radixPoint.charAt(0))[0], r = new RegExp("^[0" + t.groupSeparator + "]*").exec(a)), 
                                            !(!r || !(r[0].length > 1 || r[0].length > 0 && r[0].length < a.length)) && r;
                                        }(t, a))) for (var c = t.join("").lastIndexOf(l[0].split("").reverse().join("")) - (l[0] == l.input ? 0 : 1), f = l[0] == l.input ? 1 : 0, p = l[0].length - f; p > 0; p--) this.maskset.validPositions.splice(c + p, 1), 
                                        delete t[c + p];
                                        if (e) switch (e.type) {
                                          case "blur":
                                          case "checkval":
                                            if (null !== a.min) {
                                                var d = a.onUnMask(t.slice().reverse().join(""), void 0, s.extend({}, a, {
                                                    unmaskAsNumber: !0
                                                }));
                                                if (null !== a.min && d < a.min) return {
                                                    refreshFromBuffer: !0,
                                                    buffer: u(a.min.toString().replace(".", a.radixPoint).split(""), a.digits, a).reverse()
                                                };
                                            }
                                            if (t[t.length - 1] === a.negationSymbol.front) {
                                                var h = new RegExp("(^" + ("" != a.negationSymbol.front ? (0, i.default)(a.negationSymbol.front) + "?" : "") + (0, 
                                                i.default)(a.prefix) + ")(.*)(" + (0, i.default)(a.suffix) + ("" != a.negationSymbol.back ? (0, 
                                                i.default)(a.negationSymbol.back) + "?" : "") + "$)").exec(r(t.slice(), !0).reverse().join(""));
                                                0 == (h ? h[2] : "") && (o = {
                                                    refreshFromBuffer: !0,
                                                    buffer: [ 0 ]
                                                });
                                            } else if ("" !== a.radixPoint) t.indexOf(a.radixPoint) === a.suffix.length && (o && o.buffer ? o.buffer.splice(0, 1 + a.suffix.length) : (t.splice(0, 1 + a.suffix.length), 
                                            o = {
                                                refreshFromBuffer: !0,
                                                buffer: r(t)
                                            }));
                                            if (a.enforceDigitsOnBlur) {
                                                var v = (o = o || {}) && o.buffer || t.slice().reverse();
                                                o.refreshFromBuffer = !0, o.buffer = u(v, a.digits, a, !0).reverse();
                                            }
                                        }
                                        return o;
                                    },
                                    onKeyDown: function(e, t, n, i) {
                                        var a, o = s(this);
                                        if (3 != e.location) {
                                            var l, c = e.key;
                                            if ((l = i.shortcuts && i.shortcuts[c]) && l.length > 1) return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) * parseInt(l)), 
                                            o.trigger("setvalue"), !1;
                                        }
                                        if (e.ctrlKey) switch (e.key) {
                                          case r.keys.ArrowUp:
                                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(i.step)), 
                                            o.trigger("setvalue"), !1;

                                          case r.keys.ArrowDown:
                                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(i.step)), 
                                            o.trigger("setvalue"), !1;
                                        }
                                        if (!e.shiftKey && (e.key === r.keys.Delete || e.key === r.keys.Backspace || e.key === r.keys.BACKSPACE_SAFARI) && n.begin !== t.length) {
                                            if (t[e.key === r.keys.Delete ? n.begin - 1 : n.end] === i.negationSymbol.front) return a = t.slice().reverse(), 
                                            "" !== i.negationSymbol.front && a.shift(), "" !== i.negationSymbol.back && a.pop(), 
                                            o.trigger("setvalue", [ a.join(""), n.begin ]), !1;
                                            if (!0 === i._radixDance) {
                                                var f, p = t.indexOf(i.radixPoint);
                                                if (i.digitsOptional) {
                                                    if (0 === p) return (a = t.slice().reverse()).pop(), o.trigger("setvalue", [ a.join(""), n.begin >= a.length ? a.length : n.begin ]), 
                                                    !1;
                                                } else if (-1 !== p && (n.begin < p || n.end < p || e.key === r.keys.Delete && (n.begin === p || n.begin - 1 === p))) return n.begin === n.end && (e.key === r.keys.Backspace || e.key === r.keys.BACKSPACE_SAFARI ? n.begin++ : e.key === r.keys.Delete && n.begin - 1 === p && (f = s.extend({}, n), 
                                                n.begin--, n.end--)), (a = t.slice().reverse()).splice(a.length - n.begin, n.begin - n.end + 1), 
                                                a = u(a, i.digits, i).join(""), f && (n = f), o.trigger("setvalue", [ a, n.begin >= a.length ? p + 1 : n.begin ]), 
                                                !1;
                                            }
                                        }
                                    }
                                },
                                currency: {
                                    prefix: "",
                                    groupSeparator: ",",
                                    alias: "numeric",
                                    digits: 2,
                                    digitsOptional: !1
                                },
                                decimal: {
                                    alias: "numeric"
                                },
                                integer: {
                                    alias: "numeric",
                                    inputmode: "numeric",
                                    digits: 0
                                },
                                percentage: {
                                    alias: "numeric",
                                    min: 0,
                                    max: 100,
                                    suffix: " %",
                                    digits: 0,
                                    allowMinus: !1
                                },
                                indianns: {
                                    alias: "numeric",
                                    _mask: function(e) {
                                        return "(" + e.groupSeparator + "99){*|1}(" + e.groupSeparator + "999){1|1}";
                                    },
                                    groupSeparator: ",",
                                    radixPoint: ".",
                                    placeholder: "0",
                                    digits: 2,
                                    digitsOptional: !1
                                }
                            });
                        },
                        9380: function(e, t) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = void 0;
                            var n = !("undefined" == typeof window || !window.document || !window.document.createElement);
                            t.default = n ? window : {};
                        },
                        7760: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.HandleNativePlaceholder = function(e, t) {
                                var n = e ? e.inputmask : this;
                                if (i.ie) {
                                    if (e.inputmask._valueGet() !== t && (e.placeholder !== t || "" === e.placeholder)) {
                                        var a = o.getBuffer.call(n).slice(), r = e.inputmask._valueGet();
                                        if (r !== t) {
                                            var l = o.getLastValidPosition.call(n);
                                            -1 === l && r === o.getBufferTemplate.call(n).join("") ? a = [] : -1 !== l && u.call(n, a), 
                                            p(e, a);
                                        }
                                    }
                                } else e.placeholder !== t && (e.placeholder = t, "" === e.placeholder && e.removeAttribute("placeholder"));
                            }, t.applyInputValue = c, t.checkVal = f, t.clearOptionalTail = u, t.unmaskedvalue = function(e) {
                                var t = e ? e.inputmask : this, n = t.opts, i = t.maskset;
                                if (e) {
                                    if (void 0 === e.inputmask) return e.value;
                                    e.inputmask && e.inputmask.refreshValue && c(e, e.inputmask._valueGet(!0));
                                }
                                for (var a = [], r = i.validPositions, l = 0, s = r.length; l < s; l++) r[l] && r[l].match && (1 != r[l].match.static || Array.isArray(i.metadata) && !0 !== r[l].generatedInput) && a.push(r[l].input);
                                var u = 0 === a.length ? "" : (t.isRTL ? a.reverse() : a).join("");
                                if ("function" == typeof n.onUnMask) {
                                    var f = (t.isRTL ? o.getBuffer.call(t).slice().reverse() : o.getBuffer.call(t)).join("");
                                    u = n.onUnMask.call(t, f, u, n);
                                }
                                return u;
                            }, t.writeBuffer = p;
                            var i = n(9845), a = n(6030), r = n(2839), o = n(8711), l = n(7215), s = n(4713);
                            function c(e, t, n) {
                                var i = e ? e.inputmask : this, a = i.opts;
                                e.inputmask.refreshValue = !1, "function" == typeof a.onBeforeMask && (t = a.onBeforeMask.call(i, t, a) || t), 
                                f(e, !0, !1, t = (t || "").toString().split(""), n), i.undoValue = i._valueGet(!0), 
                                (a.clearMaskOnLostFocus || a.clearIncomplete) && e.inputmask._valueGet() === o.getBufferTemplate.call(i).join("") && -1 === o.getLastValidPosition.call(i) && e.inputmask._valueSet("");
                            }
                            function u(e) {
                                e.length = 0;
                                for (var t, n = s.getMaskTemplate.call(this, !0, 0, !0, void 0, !0); void 0 !== (t = n.shift()); ) e.push(t);
                                return e;
                            }
                            function f(e, t, n, i, r) {
                                var c, u = e ? e.inputmask : this, f = u.maskset, d = u.opts, h = u.dependencyLib, v = i.slice(), m = "", g = -1, y = d.skipOptionalPartCharacter;
                                d.skipOptionalPartCharacter = "", o.resetMaskSet.call(u, !1), u.clicked = 0, g = d.radixPoint ? o.determineNewCaretPosition.call(u, {
                                    begin: 0,
                                    end: 0
                                }, !1, !1 === d.__financeInput ? "radixFocus" : void 0).begin : 0, f.p = g, u.caretPos = {
                                    begin: g
                                };
                                var k = [], b = u.caretPos;
                                if (v.forEach(function(e, t) {
                                    if (void 0 !== e) {
                                        var i = new h.Event("_checkval");
                                        i.key = e, m += e;
                                        var r = o.getLastValidPosition.call(u, void 0, !0);
                                        !function(e, t) {
                                            for (var n = s.getMaskTemplate.call(u, !0, 0).slice(e, o.seekNext.call(u, e, !1, !1)).join("").replace(/'/g, ""), i = n.indexOf(t); i > 0 && " " === n[i - 1]; ) i--;
                                            var a = 0 === i && !o.isMask.call(u, e) && (s.getTest.call(u, e).match.nativeDef === t.charAt(0) || !0 === s.getTest.call(u, e).match.static && s.getTest.call(u, e).match.nativeDef === "'" + t.charAt(0) || " " === s.getTest.call(u, e).match.nativeDef && (s.getTest.call(u, e + 1).match.nativeDef === t.charAt(0) || !0 === s.getTest.call(u, e + 1).match.static && s.getTest.call(u, e + 1).match.nativeDef === "'" + t.charAt(0)));
                                            if (!a && i > 0 && !o.isMask.call(u, e, !1, !0)) {
                                                var r = o.seekNext.call(u, e);
                                                u.caretPos.begin < r && (u.caretPos = {
                                                    begin: r
                                                });
                                            }
                                            return a;
                                        }(g, m) ? (c = a.EventHandlers.keypressEvent.call(u, i, !0, !1, n, u.caretPos.begin)) && (g = u.caretPos.begin + 1, 
                                        m = "") : c = a.EventHandlers.keypressEvent.call(u, i, !0, !1, n, r + 1), c ? (void 0 !== c.pos && f.validPositions[c.pos] && !0 === f.validPositions[c.pos].match.static && void 0 === f.validPositions[c.pos].alternation && (k.push(c.pos), 
                                        u.isRTL || (c.forwardPosition = c.pos + 1)), p.call(u, void 0, o.getBuffer.call(u), c.forwardPosition, i, !1), 
                                        u.caretPos = {
                                            begin: c.forwardPosition,
                                            end: c.forwardPosition
                                        }, b = u.caretPos) : void 0 === f.validPositions[t] && v[t] === s.getPlaceholder.call(u, t) && o.isMask.call(u, t, !0) ? u.caretPos.begin++ : u.caretPos = b;
                                    }
                                }), k.length > 0) {
                                    var x, w, P = o.seekNext.call(u, -1, void 0, !1);
                                    if (!l.isComplete.call(u, o.getBuffer.call(u)) && k.length <= P || l.isComplete.call(u, o.getBuffer.call(u)) && k.length > 0 && k.length !== P && 0 === k[0]) for (var S = P; void 0 !== (x = k.shift()); ) if (x < S) {
                                        var O = new h.Event("_checkval");
                                        if ((w = f.validPositions[x]).generatedInput = !0, O.key = w.input, (c = a.EventHandlers.keypressEvent.call(u, O, !0, !1, n, S)) && void 0 !== c.pos && c.pos !== x && f.validPositions[c.pos] && !0 === f.validPositions[c.pos].match.static) k.push(c.pos); else if (!c) break;
                                        S++;
                                    }
                                }
                                t && p.call(u, e, o.getBuffer.call(u), c ? c.forwardPosition : u.caretPos.begin, r || new h.Event("checkval"), r && ("input" === r.type && u.undoValue !== o.getBuffer.call(u).join("") || "paste" === r.type)), 
                                d.skipOptionalPartCharacter = y;
                            }
                            function p(e, t, n, i, a) {
                                var s = e ? e.inputmask : this, c = s.opts, u = s.dependencyLib;
                                if (i && "function" == typeof c.onBeforeWrite) {
                                    var f = c.onBeforeWrite.call(s, i, t, n, c);
                                    if (f) {
                                        if (f.refreshFromBuffer) {
                                            var p = f.refreshFromBuffer;
                                            l.refreshFromBuffer.call(s, !0 === p ? p : p.start, p.end, f.buffer || t), t = o.getBuffer.call(s, !0);
                                        }
                                        void 0 !== n && (n = void 0 !== f.caret ? f.caret : n);
                                    }
                                }
                                if (void 0 !== e && (e.inputmask._valueSet(t.join("")), void 0 === n || void 0 !== i && "blur" === i.type || o.caret.call(s, e, n, void 0, void 0, void 0 !== i && "keydown" === i.type && (i.key === r.keys.Delete || i.key === r.keys.Backspace)), 
                                void 0 === e.inputmask.writeBufferHook || e.inputmask.writeBufferHook(n), !0 === a)) {
                                    var d = u(e), h = e.inputmask._valueGet();
                                    e.inputmask.skipInputEvent = !0, d.trigger("input"), setTimeout(function() {
                                        h === o.getBufferTemplate.call(s).join("") ? d.trigger("cleared") : !0 === l.isComplete.call(s, t) && d.trigger("complete");
                                    }, 0);
                                }
                            }
                        },
                        2394: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = void 0;
                            var i = v(n(3976)), a = v(n(7392)), r = v(n(4963)), o = n(9716), l = v(n(9380)), s = n(7760), c = n(157), u = n(2391), f = n(8711), p = n(7215), d = n(4713);
                            function h(e) {
                                return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, h(e);
                            }
                            function v(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                            var m = l.default.document, g = "_inputmask_opts";
                            function y(e, t, n) {
                                if (!(this instanceof y)) return new y(e, t, n);
                                this.dependencyLib = r.default, this.el = void 0, this.events = {}, this.maskset = void 0, 
                                !0 !== n && ("[object Object]" === Object.prototype.toString.call(e) ? t = e : (t = t || {}, 
                                e && (t.alias = e)), this.opts = r.default.extend(!0, {}, this.defaults, t), this.noMasksCache = t && void 0 !== t.definitions, 
                                this.userOptions = t || {}, k(this.opts.alias, t, this.opts)), this.refreshValue = !1, 
                                this.undoValue = void 0, this.$el = void 0, this.skipInputEvent = !1, this.validationEvent = !1, 
                                this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.clicked = 0, this.originalPlaceholder = void 0, 
                                this.isComposing = !1, this.hasAlternator = !1;
                            }
                            function k(e, t, n) {
                                var i = y.prototype.aliases[e];
                                return i ? (i.alias && k(i.alias, void 0, n), r.default.extend(!0, n, i), r.default.extend(!0, n, t), 
                                !0) : (null === n.mask && (n.mask = e), !1);
                            }
                            y.prototype = {
                                dataAttribute: "data-inputmask",
                                defaults: i.default,
                                definitions: a.default,
                                aliases: {},
                                masksCache: {},
                                i18n: {},
                                get isRTL() {
                                    return this.opts.isRTL || this.opts.numericInput;
                                },
                                mask: function(e) {
                                    var t = this;
                                    return "string" == typeof e && (e = m.getElementById(e) || m.querySelectorAll(e)), 
                                    (e = e.nodeName ? [ e ] : Array.isArray(e) ? e : [].slice.call(e)).forEach(function(e, n) {
                                        var i = r.default.extend(!0, {}, t.opts);
                                        if (function(e, t, n, i) {
                                            function a(t, a) {
                                                var r = "" === i ? t : i + "-" + t;
                                                null !== (a = void 0 !== a ? a : e.getAttribute(r)) && ("string" == typeof a && (0 === t.indexOf("on") ? a = l.default[a] : "false" === a ? a = !1 : "true" === a && (a = !0)), 
                                                n[t] = a);
                                            }
                                            if (!0 === t.importDataAttributes) {
                                                var o, s, c, u, f = e.getAttribute(i);
                                                if (f && "" !== f && (f = f.replace(/'/g, '"'), s = JSON.parse("{" + f + "}")), 
                                                s) for (u in c = void 0, s) if ("alias" === u.toLowerCase()) {
                                                    c = s[u];
                                                    break;
                                                }
                                                for (o in a("alias", c), n.alias && k(n.alias, n, t), t) {
                                                    if (s) for (u in c = void 0, s) if (u.toLowerCase() === o.toLowerCase()) {
                                                        c = s[u];
                                                        break;
                                                    }
                                                    a(o, c);
                                                }
                                            }
                                            r.default.extend(!0, t, n), ("rtl" === e.dir || t.rightAlign) && (e.style.textAlign = "right");
                                            ("rtl" === e.dir || t.numericInput) && (e.dir = "ltr", e.removeAttribute("dir"), 
                                            t.isRTL = !0);
                                            return Object.keys(n).length;
                                        }(e, i, r.default.extend(!0, {}, t.userOptions), t.dataAttribute)) {
                                            var a = (0, u.generateMaskSet)(i, t.noMasksCache);
                                            void 0 !== a && (void 0 !== e.inputmask && (e.inputmask.opts.autoUnmask = !0, e.inputmask.remove()), 
                                            e.inputmask = new y(void 0, void 0, !0), e.inputmask.opts = i, e.inputmask.noMasksCache = t.noMasksCache, 
                                            e.inputmask.userOptions = r.default.extend(!0, {}, t.userOptions), e.inputmask.el = e, 
                                            e.inputmask.$el = (0, r.default)(e), e.inputmask.maskset = a, r.default.data(e, g, t.userOptions), 
                                            c.mask.call(e.inputmask));
                                        }
                                    }), e && e[0] && e[0].inputmask || this;
                                },
                                option: function(e, t) {
                                    return "string" == typeof e ? this.opts[e] : "object" === h(e) ? (r.default.extend(this.userOptions, e), 
                                    this.el && !0 !== t && this.mask(this.el), this) : void 0;
                                },
                                unmaskedvalue: function(e) {
                                    if (this.maskset = this.maskset || (0, u.generateMaskSet)(this.opts, this.noMasksCache), 
                                    void 0 === this.el || void 0 !== e) {
                                        var t = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                                        s.checkVal.call(this, void 0, !1, !1, t), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, f.getBuffer.call(this), 0, this.opts);
                                    }
                                    return s.unmaskedvalue.call(this, this.el);
                                },
                                remove: function() {
                                    if (this.el) {
                                        r.default.data(this.el, g, null);
                                        var e = this.opts.autoUnmask ? (0, s.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask);
                                        e !== f.getBufferTemplate.call(this).join("") ? this._valueSet(e, this.opts.autoUnmask) : this._valueSet(""), 
                                        o.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value") && this.__valueGet && Object.defineProperty(this.el, "value", {
                                            get: this.__valueGet,
                                            set: this.__valueSet,
                                            configurable: !0
                                        }) : m.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), 
                                        this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
                                    }
                                    return this.el;
                                },
                                getemptymask: function() {
                                    return this.maskset = this.maskset || (0, u.generateMaskSet)(this.opts, this.noMasksCache), 
                                    (this.isRTL ? f.getBufferTemplate.call(this).reverse() : f.getBufferTemplate.call(this)).join("");
                                },
                                hasMaskedValue: function() {
                                    return !this.opts.autoUnmask;
                                },
                                isComplete: function() {
                                    return this.maskset = this.maskset || (0, u.generateMaskSet)(this.opts, this.noMasksCache), 
                                    p.isComplete.call(this, f.getBuffer.call(this));
                                },
                                getmetadata: function() {
                                    if (this.maskset = this.maskset || (0, u.generateMaskSet)(this.opts, this.noMasksCache), 
                                    Array.isArray(this.maskset.metadata)) {
                                        var e = d.getMaskTemplate.call(this, !0, 0, !1).join("");
                                        return this.maskset.metadata.forEach(function(t) {
                                            return t.mask !== e || (e = t, !1);
                                        }), e;
                                    }
                                    return this.maskset.metadata;
                                },
                                isValid: function(e) {
                                    if (this.maskset = this.maskset || (0, u.generateMaskSet)(this.opts, this.noMasksCache), 
                                    e) {
                                        var t = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                                        s.checkVal.call(this, void 0, !0, !1, t);
                                    } else e = this.isRTL ? f.getBuffer.call(this).slice().reverse().join("") : f.getBuffer.call(this).join("");
                                    for (var n = f.getBuffer.call(this), i = f.determineLastRequiredPosition.call(this), a = n.length - 1; a > i && !f.isMask.call(this, a); a--) ;
                                    return n.splice(i, a + 1 - i), p.isComplete.call(this, n) && e === (this.isRTL ? f.getBuffer.call(this).slice().reverse().join("") : f.getBuffer.call(this).join(""));
                                },
                                format: function(e, t) {
                                    this.maskset = this.maskset || (0, u.generateMaskSet)(this.opts, this.noMasksCache);
                                    var n = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                                    s.checkVal.call(this, void 0, !0, !1, n);
                                    var i = this.isRTL ? f.getBuffer.call(this).slice().reverse().join("") : f.getBuffer.call(this).join("");
                                    return t ? {
                                        value: i,
                                        metadata: this.getmetadata()
                                    } : i;
                                },
                                setValue: function(e) {
                                    this.el && (0, r.default)(this.el).trigger("setvalue", [ e ]);
                                },
                                analyseMask: u.analyseMask
                            }, y.extendDefaults = function(e) {
                                r.default.extend(!0, y.prototype.defaults, e);
                            }, y.extendDefinitions = function(e) {
                                r.default.extend(!0, y.prototype.definitions, e);
                            }, y.extendAliases = function(e) {
                                r.default.extend(!0, y.prototype.aliases, e);
                            }, y.format = function(e, t, n) {
                                return y(t).format(e, n);
                            }, y.unmask = function(e, t) {
                                return y(t).unmaskedvalue(e);
                            }, y.isValid = function(e, t) {
                                return y(t).isValid(e);
                            }, y.remove = function(e) {
                                "string" == typeof e && (e = m.getElementById(e) || m.querySelectorAll(e)), (e = e.nodeName ? [ e ] : e).forEach(function(e) {
                                    e.inputmask && e.inputmask.remove();
                                });
                            }, y.setValue = function(e, t) {
                                "string" == typeof e && (e = m.getElementById(e) || m.querySelectorAll(e)), (e = e.nodeName ? [ e ] : e).forEach(function(e) {
                                    e.inputmask ? e.inputmask.setValue(t) : (0, r.default)(e).trigger("setvalue", [ t ]);
                                });
                            }, y.dependencyLib = r.default, l.default.Inputmask = y;
                            t.default = y;
                        },
                        5296: function(e, t, n) {
                            function i(e) {
                                return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, i(e);
                            }
                            var a = d(n(9380)), r = d(n(2394));
                            function o(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var a = t[n];
                                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                                    Object.defineProperty(e, (r = a.key, o = void 0, o = function(e, t) {
                                        if ("object" !== i(e) || null === e) return e;
                                        var n = e[Symbol.toPrimitive];
                                        if (void 0 !== n) {
                                            var a = n.call(e, t || "default");
                                            if ("object" !== i(a)) return a;
                                            throw new TypeError("@@toPrimitive must return a primitive value.");
                                        }
                                        return ("string" === t ? String : Number)(e);
                                    }(r, "string"), "symbol" === i(o) ? o : String(o)), a);
                                }
                                var r, o;
                            }
                            function l(e) {
                                var t = u();
                                return function() {
                                    var n, a = p(e);
                                    if (t) {
                                        var r = p(this).constructor;
                                        n = Reflect.construct(a, arguments, r);
                                    } else n = a.apply(this, arguments);
                                    return function(e, t) {
                                        if (t && ("object" === i(t) || "function" == typeof t)) return t;
                                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                                        return function(e) {
                                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                            return e;
                                        }(e);
                                    }(this, n);
                                };
                            }
                            function s(e) {
                                var t = "function" == typeof Map ? new Map : void 0;
                                return s = function(e) {
                                    if (null === e || !function(e) {
                                        try {
                                            return -1 !== Function.toString.call(e).indexOf("[native code]");
                                        } catch (t) {
                                            return "function" == typeof e;
                                        }
                                    }(e)) return e;
                                    if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                                    if (void 0 !== t) {
                                        if (t.has(e)) return t.get(e);
                                        t.set(e, n);
                                    }
                                    function n() {
                                        return c(e, arguments, p(this).constructor);
                                    }
                                    return n.prototype = Object.create(e.prototype, {
                                        constructor: {
                                            value: n,
                                            enumerable: !1,
                                            writable: !0,
                                            configurable: !0
                                        }
                                    }), f(n, e);
                                }, s(e);
                            }
                            function c(e, t, n) {
                                return c = u() ? Reflect.construct.bind() : function(e, t, n) {
                                    var i = [ null ];
                                    i.push.apply(i, t);
                                    var a = new (Function.bind.apply(e, i));
                                    return n && f(a, n.prototype), a;
                                }, c.apply(null, arguments);
                            }
                            function u() {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                                    !0;
                                } catch (e) {
                                    return !1;
                                }
                            }
                            function f(e, t) {
                                return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                                    return e.__proto__ = t, e;
                                }, f(e, t);
                            }
                            function p(e) {
                                return p = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                                    return e.__proto__ || Object.getPrototypeOf(e);
                                }, p(e);
                            }
                            function d(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                            var h = a.default.document;
                            if (h && h.head && h.head.attachShadow && a.default.customElements && void 0 === a.default.customElements.get("input-mask")) {
                                var v = function(e) {
                                    !function(e, t) {
                                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                                        e.prototype = Object.create(t && t.prototype, {
                                            constructor: {
                                                value: e,
                                                writable: !0,
                                                configurable: !0
                                            }
                                        }), Object.defineProperty(e, "prototype", {
                                            writable: !1
                                        }), t && f(e, t);
                                    }(s, e);
                                    var t, n, i, a = l(s);
                                    function s() {
                                        var e;
                                        !function(e, t) {
                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                                        }(this, s);
                                        var t = (e = a.call(this)).getAttributeNames(), n = e.attachShadow({
                                            mode: "closed"
                                        });
                                        for (var i in e.input = h.createElement("input"), e.input.type = "text", n.appendChild(e.input), 
                                        t) Object.prototype.hasOwnProperty.call(t, i) && e.input.setAttribute(t[i], e.getAttribute(t[i]));
                                        var o = new r.default;
                                        return o.dataAttribute = "", o.mask(e.input), e.input.inputmask.shadowRoot = n, 
                                        e;
                                    }
                                    return t = s, (n = [ {
                                        key: "attributeChangedCallback",
                                        value: function(e, t, n) {
                                            this.input.setAttribute(e, n);
                                        }
                                    }, {
                                        key: "value",
                                        get: function() {
                                            return this.input.value;
                                        },
                                        set: function(e) {
                                            this.input.value = e;
                                        }
                                    } ]) && o(t.prototype, n), i && o(t, i), Object.defineProperty(t, "prototype", {
                                        writable: !1
                                    }), s;
                                }(s(HTMLElement));
                                a.default.customElements.define("input-mask", v);
                            }
                        },
                        2839: function(e, t) {
                            function n(e) {
                                return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, n(e);
                            }
                            function i(e, t) {
                                return function(e) {
                                    if (Array.isArray(e)) return e;
                                }(e) || function(e, t) {
                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (null != n) {
                                        var i, a, r, o, l = [], s = !0, c = !1;
                                        try {
                                            if (r = (n = n.call(e)).next, 0 === t) {
                                                if (Object(n) !== n) return;
                                                s = !1;
                                            } else for (;!(s = (i = r.call(n)).done) && (l.push(i.value), l.length !== t); s = !0) ;
                                        } catch (e) {
                                            c = !0, a = e;
                                        } finally {
                                            try {
                                                if (!s && null != n.return && (o = n.return(), Object(o) !== o)) return;
                                            } finally {
                                                if (c) throw a;
                                            }
                                        }
                                        return l;
                                    }
                                }(e, t) || function(e, t) {
                                    if (!e) return;
                                    if ("string" == typeof e) return a(e, t);
                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                    "Object" === n && e.constructor && (n = e.constructor.name);
                                    if ("Map" === n || "Set" === n) return Array.from(e);
                                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return a(e, t);
                                }(e, t) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }();
                            }
                            function a(e, t) {
                                (null == t || t > e.length) && (t = e.length);
                                for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                                return i;
                            }
                            function r(e, t) {
                                var n = Object.keys(e);
                                if (Object.getOwnPropertySymbols) {
                                    var i = Object.getOwnPropertySymbols(e);
                                    t && (i = i.filter(function(t) {
                                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                                    })), n.push.apply(n, i);
                                }
                                return n;
                            }
                            function o(e, t, i) {
                                return (t = function(e) {
                                    var t = function(e, t) {
                                        if ("object" !== n(e) || null === e) return e;
                                        var i = e[Symbol.toPrimitive];
                                        if (void 0 !== i) {
                                            var a = i.call(e, t || "default");
                                            if ("object" !== n(a)) return a;
                                            throw new TypeError("@@toPrimitive must return a primitive value.");
                                        }
                                        return ("string" === t ? String : Number)(e);
                                    }(e, "string");
                                    return "symbol" === n(t) ? t : String(t);
                                }(t)) in e ? Object.defineProperty(e, t, {
                                    value: i,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : e[t] = i, e;
                            }
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.keys = t.keyCode = void 0, t.toKey = function(e, t) {
                                return s[e] || (t ? String.fromCharCode(e) : String.fromCharCode(e).toLowerCase());
                            }, t.toKeyCode = function(e) {
                                return l[e];
                            };
                            var l = t.keyCode = function(e) {
                                for (var t = 1; t < arguments.length; t++) {
                                    var n = null != arguments[t] ? arguments[t] : {};
                                    t % 2 ? r(Object(n), !0).forEach(function(t) {
                                        o(e, t, n[t]);
                                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function(t) {
                                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                                    });
                                }
                                return e;
                            }({
                                c: 67,
                                x: 88,
                                z: 90,
                                BACKSPACE_SAFARI: 127,
                                Enter: 13,
                                Meta_LEFT: 91,
                                Meta_RIGHT: 92,
                                Space: 32
                            }, {
                                Alt: 18,
                                AltGraph: 18,
                                ArrowDown: 40,
                                ArrowLeft: 37,
                                ArrowRight: 39,
                                ArrowUp: 38,
                                Backspace: 8,
                                CapsLock: 20,
                                Control: 17,
                                ContextMenu: 93,
                                Dead: 221,
                                Delete: 46,
                                End: 35,
                                Escape: 27,
                                F1: 112,
                                F2: 113,
                                F3: 114,
                                F4: 115,
                                F5: 116,
                                F6: 117,
                                F7: 118,
                                F8: 119,
                                F9: 120,
                                F10: 121,
                                F11: 122,
                                F12: 123,
                                Home: 36,
                                Insert: 45,
                                NumLock: 144,
                                PageDown: 34,
                                PageUp: 33,
                                Pause: 19,
                                PrintScreen: 44,
                                Process: 229,
                                Shift: 16,
                                ScrollLock: 145,
                                Tab: 9,
                                Unidentified: 229
                            }), s = Object.entries(l).reduce(function(e, t) {
                                var n = i(t, 2), a = n[0], r = n[1];
                                return e[r] = void 0 === e[r] ? a : e[r], e;
                            }, {});
                            t.keys = Object.entries(l).reduce(function(e, t) {
                                var n = i(t, 2), a = n[0];
                                n[1];
                                return e[a] = "Space" === a ? " " : a, e;
                            }, {});
                        },
                        2391: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.analyseMask = function(e, t, n) {
                                var i, a, s, c, u, f, p = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g, d = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, h = !1, v = new o.default, m = [], g = [], y = !1;
                                function k(e, i, a) {
                                    a = void 0 !== a ? a : e.matches.length;
                                    var o = e.matches[a - 1];
                                    if (t) {
                                        if (0 === i.indexOf("[") || h && /\\d|\\s|\\w|\\p/i.test(i) || "." === i) {
                                            var s = n.casing ? "i" : "";
                                            /\\p\{.*}/i.test(i) && (s += "u"), e.matches.splice(a++, 0, {
                                                fn: new RegExp(i, s),
                                                static: !1,
                                                optionality: !1,
                                                newBlockMarker: void 0 === o ? "master" : o.def !== i,
                                                casing: null,
                                                def: i,
                                                placeholder: "object" === l(n.placeholder) ? n.placeholder[v.matches.length] : void 0,
                                                nativeDef: i
                                            });
                                        } else h && (i = i[i.length - 1]), i.split("").forEach(function(t, i) {
                                            o = e.matches[a - 1], e.matches.splice(a++, 0, {
                                                fn: /[a-z]/i.test(n.staticDefinitionSymbol || t) ? new RegExp("[" + (n.staticDefinitionSymbol || t) + "]", n.casing ? "i" : "") : null,
                                                static: !0,
                                                optionality: !1,
                                                newBlockMarker: void 0 === o ? "master" : o.def !== t && !0 !== o.static,
                                                casing: null,
                                                def: n.staticDefinitionSymbol || t,
                                                placeholder: void 0 !== n.staticDefinitionSymbol ? t : "object" === l(n.placeholder) ? n.placeholder[v.matches.length] : void 0,
                                                nativeDef: (h ? "'" : "") + t
                                            });
                                        });
                                        h = !1;
                                    } else {
                                        var c = n.definitions && n.definitions[i] || n.usePrototypeDefinitions && r.default.prototype.definitions[i];
                                        c && !h ? e.matches.splice(a++, 0, {
                                            fn: c.validator ? "string" == typeof c.validator ? new RegExp(c.validator, n.casing ? "i" : "") : new function() {
                                                this.test = c.validator;
                                            } : /./,
                                            static: c.static || !1,
                                            optionality: c.optional || !1,
                                            defOptionality: c.optional || !1,
                                            newBlockMarker: void 0 === o || c.optional ? "master" : o.def !== (c.definitionSymbol || i),
                                            casing: c.casing,
                                            def: c.definitionSymbol || i,
                                            placeholder: c.placeholder,
                                            nativeDef: i,
                                            generated: c.generated
                                        }) : (e.matches.splice(a++, 0, {
                                            fn: /[a-z]/i.test(n.staticDefinitionSymbol || i) ? new RegExp("[" + (n.staticDefinitionSymbol || i) + "]", n.casing ? "i" : "") : null,
                                            static: !0,
                                            optionality: !1,
                                            newBlockMarker: void 0 === o ? "master" : o.def !== i && !0 !== o.static,
                                            casing: null,
                                            def: n.staticDefinitionSymbol || i,
                                            placeholder: void 0 !== n.staticDefinitionSymbol ? i : void 0,
                                            nativeDef: (h ? "'" : "") + i
                                        }), h = !1);
                                    }
                                }
                                function b() {
                                    if (m.length > 0) {
                                        if (k(c = m[m.length - 1], a), c.isAlternator) {
                                            u = m.pop();
                                            for (var e = 0; e < u.matches.length; e++) u.matches[e].isGroup && (u.matches[e].isGroup = !1);
                                            m.length > 0 ? (c = m[m.length - 1]).matches.push(u) : v.matches.push(u);
                                        }
                                    } else k(v, a);
                                }
                                function x(e) {
                                    var t = new o.default(!0);
                                    return t.openGroup = !1, t.matches = e, t;
                                }
                                function w() {
                                    if ((s = m.pop()).openGroup = !1, void 0 !== s) if (m.length > 0) {
                                        if ((c = m[m.length - 1]).matches.push(s), c.isAlternator) {
                                            u = m.pop();
                                            for (var e = 0; e < u.matches.length; e++) u.matches[e].isGroup = !1, u.matches[e].alternatorGroup = !1;
                                            m.length > 0 ? (c = m[m.length - 1]).matches.push(u) : v.matches.push(u);
                                        }
                                    } else v.matches.push(s); else b();
                                }
                                function P(e) {
                                    var t = e.pop();
                                    return t.isQuantifier && (t = x([ e.pop(), t ])), t;
                                }
                                t && (n.optionalmarker[0] = void 0, n.optionalmarker[1] = void 0);
                                for (;i = t ? d.exec(e) : p.exec(e); ) {
                                    if (a = i[0], t) {
                                        switch (a.charAt(0)) {
                                          case "?":
                                            a = "{0,1}";
                                            break;

                                          case "+":
                                          case "*":
                                            a = "{" + a + "}";
                                            break;

                                          case "|":
                                            if (0 === m.length) {
                                                var S = x(v.matches);
                                                S.openGroup = !0, m.push(S), v.matches = [], y = !0;
                                            }
                                        }
                                        switch (a) {
                                          case "\\d":
                                            a = "[0-9]";
                                            break;

                                          case "\\p":
                                            a += d.exec(e)[0], a += d.exec(e)[0];
                                        }
                                    }
                                    if (h) b(); else switch (a.charAt(0)) {
                                      case "$":
                                      case "^":
                                        t || b();
                                        break;

                                      case n.escapeChar:
                                        h = !0, t && b();
                                        break;

                                      case n.optionalmarker[1]:
                                      case n.groupmarker[1]:
                                        w();
                                        break;

                                      case n.optionalmarker[0]:
                                        m.push(new o.default(!1, !0));
                                        break;

                                      case n.groupmarker[0]:
                                        m.push(new o.default(!0));
                                        break;

                                      case n.quantifiermarker[0]:
                                        var O = new o.default(!1, !1, !0), _ = (a = a.replace(/[{}?]/g, "")).split("|"), M = _[0].split(","), E = isNaN(M[0]) ? M[0] : parseInt(M[0]), j = 1 === M.length ? E : isNaN(M[1]) ? M[1] : parseInt(M[1]), T = isNaN(_[1]) ? _[1] : parseInt(_[1]);
                                        "*" !== E && "+" !== E || (E = "*" === j ? 0 : 1), O.quantifier = {
                                            min: E,
                                            max: j,
                                            jit: T
                                        };
                                        var A = m.length > 0 ? m[m.length - 1].matches : v.matches;
                                        (i = A.pop()).isGroup || (i = x([ i ])), A.push(i), A.push(O);
                                        break;

                                      case n.alternatormarker:
                                        if (m.length > 0) {
                                            var D = (c = m[m.length - 1]).matches[c.matches.length - 1];
                                            f = c.openGroup && (void 0 === D.matches || !1 === D.isGroup && !1 === D.isAlternator) ? m.pop() : P(c.matches);
                                        } else f = P(v.matches);
                                        if (f.isAlternator) m.push(f); else if (f.alternatorGroup ? (u = m.pop(), f.alternatorGroup = !1) : u = new o.default(!1, !1, !1, !0), 
                                        u.matches.push(f), m.push(u), f.openGroup) {
                                            f.openGroup = !1;
                                            var L = new o.default(!0);
                                            L.alternatorGroup = !0, m.push(L);
                                        }
                                        break;

                                      default:
                                        b();
                                    }
                                }
                                y && w();
                                for (;m.length > 0; ) s = m.pop(), v.matches.push(s);
                                v.matches.length > 0 && (!function e(i) {
                                    i && i.matches && i.matches.forEach(function(a, r) {
                                        var o = i.matches[r + 1];
                                        (void 0 === o || void 0 === o.matches || !1 === o.isQuantifier) && a && a.isGroup && (a.isGroup = !1, 
                                        t || (k(a, n.groupmarker[0], 0), !0 !== a.openGroup && k(a, n.groupmarker[1]))), 
                                        e(a);
                                    });
                                }(v), g.push(v));
                                (n.numericInput || n.isRTL) && function e(t) {
                                    for (var i in t.matches = t.matches.reverse(), t.matches) if (Object.prototype.hasOwnProperty.call(t.matches, i)) {
                                        var a = parseInt(i);
                                        if (t.matches[i].isQuantifier && t.matches[a + 1] && t.matches[a + 1].isGroup) {
                                            var r = t.matches[i];
                                            t.matches.splice(i, 1), t.matches.splice(a + 1, 0, r);
                                        }
                                        void 0 !== t.matches[i].matches ? t.matches[i] = e(t.matches[i]) : t.matches[i] = ((o = t.matches[i]) === n.optionalmarker[0] ? o = n.optionalmarker[1] : o === n.optionalmarker[1] ? o = n.optionalmarker[0] : o === n.groupmarker[0] ? o = n.groupmarker[1] : o === n.groupmarker[1] && (o = n.groupmarker[0]), 
                                        o);
                                    }
                                    var o;
                                    return t;
                                }(g[0]);
                                return g;
                            }, t.generateMaskSet = function(e, t) {
                                var n;
                                function o(e, t) {
                                    var n = t.repeat, i = t.groupmarker, r = t.quantifiermarker, o = t.keepStatic;
                                    if (n > 0 || "*" === n || "+" === n) {
                                        var l = "*" === n ? 0 : "+" === n ? 1 : n;
                                        if (l != n) e = i[0] + e + i[1] + r[0] + l + "," + n + r[1]; else for (var c = e, u = 1; u < l; u++) e += c;
                                    }
                                    if (!0 === o) {
                                        var f = e.match(new RegExp("(.)\\[([^\\]]*)\\]", "g"));
                                        f && f.forEach(function(t, n) {
                                            var i = function(e, t) {
                                                return function(e) {
                                                    if (Array.isArray(e)) return e;
                                                }(e) || function(e, t) {
                                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                                    if (null != n) {
                                                        var i, a, r, o, l = [], s = !0, c = !1;
                                                        try {
                                                            if (r = (n = n.call(e)).next, 0 === t) {
                                                                if (Object(n) !== n) return;
                                                                s = !1;
                                                            } else for (;!(s = (i = r.call(n)).done) && (l.push(i.value), l.length !== t); s = !0) ;
                                                        } catch (e) {
                                                            c = !0, a = e;
                                                        } finally {
                                                            try {
                                                                if (!s && null != n.return && (o = n.return(), Object(o) !== o)) return;
                                                            } finally {
                                                                if (c) throw a;
                                                            }
                                                        }
                                                        return l;
                                                    }
                                                }(e, t) || function(e, t) {
                                                    if (!e) return;
                                                    if ("string" == typeof e) return s(e, t);
                                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                                    "Object" === n && e.constructor && (n = e.constructor.name);
                                                    if ("Map" === n || "Set" === n) return Array.from(e);
                                                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return s(e, t);
                                                }(e, t) || function() {
                                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                                }();
                                            }(t.split("["), 2), r = i[0], o = i[1];
                                            o = o.replace("]", ""), e = e.replace(new RegExp("".concat((0, a.default)(r), "\\[").concat((0, 
                                            a.default)(o), "\\]")), r.charAt(0) === o.charAt(0) ? "(".concat(r, "|").concat(r).concat(o, ")") : "".concat(r, "[").concat(o, "]"));
                                        });
                                    }
                                    return e;
                                }
                                function c(e, n, a) {
                                    var s, c, u = !1;
                                    return null !== e && "" !== e || ((u = null !== a.regex) ? e = (e = a.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (u = !0, 
                                    e = ".*")), 1 === e.length && !1 === a.greedy && 0 !== a.repeat && (a.placeholder = ""), 
                                    e = o(e, a), c = u ? "regex_" + a.regex : a.numericInput ? e.split("").reverse().join("") : e, 
                                    null !== a.keepStatic && (c = "ks_" + a.keepStatic + c), "object" === l(a.placeholder) && (c = "ph_" + JSON.stringify(a.placeholder) + c), 
                                    void 0 === r.default.prototype.masksCache[c] || !0 === t ? (s = {
                                        mask: e,
                                        maskToken: r.default.prototype.analyseMask(e, u, a),
                                        validPositions: [],
                                        _buffer: void 0,
                                        buffer: void 0,
                                        tests: {},
                                        excludes: {},
                                        metadata: n,
                                        maskLength: void 0,
                                        jitOffset: {}
                                    }, !0 !== t && (r.default.prototype.masksCache[c] = s, s = i.default.extend(!0, {}, r.default.prototype.masksCache[c]))) : s = i.default.extend(!0, {}, r.default.prototype.masksCache[c]), 
                                    s;
                                }
                                "function" == typeof e.mask && (e.mask = e.mask(e));
                                if (Array.isArray(e.mask)) {
                                    if (e.mask.length > 1) {
                                        null === e.keepStatic && (e.keepStatic = !0);
                                        var u = e.groupmarker[0];
                                        return (e.isRTL ? e.mask.reverse() : e.mask).forEach(function(t) {
                                            u.length > 1 && (u += e.alternatormarker), void 0 !== t.mask && "function" != typeof t.mask ? u += t.mask : u += t;
                                        }), c(u += e.groupmarker[1], e.mask, e);
                                    }
                                    e.mask = e.mask.pop();
                                }
                                n = e.mask && void 0 !== e.mask.mask && "function" != typeof e.mask.mask ? c(e.mask.mask, e.mask, e) : c(e.mask, e.mask, e);
                                null === e.keepStatic && (e.keepStatic = !1);
                                return n;
                            };
                            var i = c(n(4963)), a = c(n(7184)), r = c(n(2394)), o = c(n(9695));
                            function l(e) {
                                return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, l(e);
                            }
                            function s(e, t) {
                                (null == t || t > e.length) && (t = e.length);
                                for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
                                return i;
                            }
                            function c(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                };
                            }
                        },
                        157: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.mask = function() {
                                var e = this, t = this.opts, n = this.el, c = this.dependencyLib;
                                r.EventRuler.off(n);
                                var u = function(t, n) {
                                    var i = t.getAttribute("type"), a = "input" === t.tagName.toLowerCase() && n.supportsInputType.includes(i) || t.isContentEditable || "textarea" === t.tagName.toLowerCase();
                                    if (!a) if ("input" === t.tagName.toLowerCase()) {
                                        var s = document.createElement("input");
                                        s.setAttribute("type", i), a = "text" === s.type, s = null;
                                    } else a = "partial";
                                    return !1 !== a ? function(t) {
                                        var i, a;
                                        function s() {
                                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== l.getLastValidPosition.call(e) || !0 !== n.nullable ? (this.inputmask.shadowRoot || this.ownerDocument).activeElement === this && n.clearMaskOnLostFocus ? (e.isRTL ? o.clearOptionalTail.call(e, l.getBuffer.call(e).slice()).reverse() : o.clearOptionalTail.call(e, l.getBuffer.call(e).slice())).join("") : i.call(this) : "" : i.call(this);
                                        }
                                        function u(e) {
                                            a.call(this, e), this.inputmask && (0, o.applyInputValue)(this, e);
                                        }
                                        if (!t.inputmask.__valueGet) {
                                            if (!0 !== n.noValuePatching) {
                                                if (Object.getOwnPropertyDescriptor) {
                                                    var f = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), "value") : void 0;
                                                    f && f.get && f.set ? (i = f.get, a = f.set, Object.defineProperty(t, "value", {
                                                        get: s,
                                                        set: u,
                                                        configurable: !0
                                                    })) : "input" !== t.tagName.toLowerCase() && (i = function() {
                                                        return this.textContent;
                                                    }, a = function(e) {
                                                        this.textContent = e;
                                                    }, Object.defineProperty(t, "value", {
                                                        get: s,
                                                        set: u,
                                                        configurable: !0
                                                    }));
                                                } else document.__lookupGetter__ && t.__lookupGetter__("value") && (i = t.__lookupGetter__("value"), 
                                                a = t.__lookupSetter__("value"), t.__defineGetter__("value", s), t.__defineSetter__("value", u));
                                                t.inputmask.__valueGet = i, t.inputmask.__valueSet = a;
                                            }
                                            t.inputmask._valueGet = function(t) {
                                                return e.isRTL && !0 !== t ? i.call(this.el).split("").reverse().join("") : i.call(this.el);
                                            }, t.inputmask._valueSet = function(t, n) {
                                                a.call(this.el, null == t ? "" : !0 !== n && e.isRTL ? t.split("").reverse().join("") : t);
                                            }, void 0 === i && (i = function() {
                                                return this.value;
                                            }, a = function(e) {
                                                this.value = e;
                                            }, function(t) {
                                                if (c.valHooks && (void 0 === c.valHooks[t] || !0 !== c.valHooks[t].inputmaskpatch)) {
                                                    var i = c.valHooks[t] && c.valHooks[t].get ? c.valHooks[t].get : function(e) {
                                                        return e.value;
                                                    }, a = c.valHooks[t] && c.valHooks[t].set ? c.valHooks[t].set : function(e, t) {
                                                        return e.value = t, e;
                                                    };
                                                    c.valHooks[t] = {
                                                        get: function(t) {
                                                            if (t.inputmask) {
                                                                if (t.inputmask.opts.autoUnmask) return t.inputmask.unmaskedvalue();
                                                                var a = i(t);
                                                                return -1 !== l.getLastValidPosition.call(e, void 0, void 0, t.inputmask.maskset.validPositions) || !0 !== n.nullable ? a : "";
                                                            }
                                                            return i(t);
                                                        },
                                                        set: function(e, t) {
                                                            var n = a(e, t);
                                                            return e.inputmask && (0, o.applyInputValue)(e, t), n;
                                                        },
                                                        inputmaskpatch: !0
                                                    };
                                                }
                                            }(t.type), function(e) {
                                                r.EventRuler.on(e, "mouseenter", function() {
                                                    var e = this, t = e.inputmask._valueGet(!0);
                                                    t != (e.inputmask.isRTL ? l.getBuffer.call(e.inputmask).slice().reverse() : l.getBuffer.call(e.inputmask)).join("") && (0, 
                                                    o.applyInputValue)(e, t);
                                                });
                                            }(t));
                                        }
                                    }(t) : t.inputmask = void 0, a;
                                }(n, t);
                                if (!1 !== u) {
                                    e.originalPlaceholder = n.placeholder, e.maxLength = void 0 !== n ? n.maxLength : void 0, 
                                    -1 === e.maxLength && (e.maxLength = void 0), "inputMode" in n && null === n.getAttribute("inputmode") && (n.inputMode = t.inputmode, 
                                    n.setAttribute("inputmode", t.inputmode)), !0 === u && (t.showMaskOnFocus = t.showMaskOnFocus && -1 === [ "cc-number", "cc-exp" ].indexOf(n.autocomplete), 
                                    i.iphone && (t.insertModeVisual = !1, n.setAttribute("autocorrect", "off")), r.EventRuler.on(n, "submit", a.EventHandlers.submitEvent), 
                                    r.EventRuler.on(n, "reset", a.EventHandlers.resetEvent), r.EventRuler.on(n, "blur", a.EventHandlers.blurEvent), 
                                    r.EventRuler.on(n, "focus", a.EventHandlers.focusEvent), r.EventRuler.on(n, "invalid", a.EventHandlers.invalidEvent), 
                                    r.EventRuler.on(n, "click", a.EventHandlers.clickEvent), r.EventRuler.on(n, "mouseleave", a.EventHandlers.mouseleaveEvent), 
                                    r.EventRuler.on(n, "mouseenter", a.EventHandlers.mouseenterEvent), r.EventRuler.on(n, "paste", a.EventHandlers.pasteEvent), 
                                    r.EventRuler.on(n, "cut", a.EventHandlers.cutEvent), r.EventRuler.on(n, "complete", t.oncomplete), 
                                    r.EventRuler.on(n, "incomplete", t.onincomplete), r.EventRuler.on(n, "cleared", t.oncleared), 
                                    !0 !== t.inputEventOnly && r.EventRuler.on(n, "keydown", a.EventHandlers.keyEvent), 
                                    (i.mobile || t.inputEventOnly) && n.removeAttribute("maxLength"), r.EventRuler.on(n, "input", a.EventHandlers.inputFallBackEvent)), 
                                    r.EventRuler.on(n, "setvalue", a.EventHandlers.setValueEvent), void 0 === e.applyMaskHook || e.applyMaskHook(), 
                                    l.getBufferTemplate.call(e).join(""), e.undoValue = e._valueGet(!0);
                                    var f = (n.inputmask.shadowRoot || n.ownerDocument).activeElement;
                                    if ("" !== n.inputmask._valueGet(!0) || !1 === t.clearMaskOnLostFocus || f === n) {
                                        (0, o.applyInputValue)(n, n.inputmask._valueGet(!0), t);
                                        var p = l.getBuffer.call(e).slice();
                                        !1 === s.isComplete.call(e, p) && t.clearIncomplete && l.resetMaskSet.call(e, !1), 
                                        t.clearMaskOnLostFocus && f !== n && (-1 === l.getLastValidPosition.call(e) ? p = [] : o.clearOptionalTail.call(e, p)), 
                                        (!1 === t.clearMaskOnLostFocus || t.showMaskOnFocus && f === n || "" !== n.inputmask._valueGet(!0)) && (0, 
                                        o.writeBuffer)(n, p), f === n && l.caret.call(e, n, l.seekNext.call(e, l.getLastValidPosition.call(e)));
                                    }
                                }
                            };
                            var i = n(9845), a = n(6030), r = n(9716), o = n(7760), l = n(8711), s = n(7215);
                        },
                        9695: function(e, t) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.default = function(e, t, n, i) {
                                this.matches = [], this.openGroup = e || !1, this.alternatorGroup = !1, this.isGroup = e || !1, 
                                this.isOptional = t || !1, this.isQuantifier = n || !1, this.isAlternator = i || !1, 
                                this.quantifier = {
                                    min: 1,
                                    max: 1
                                };
                            };
                        },
                        3194: function() {
                            Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
                                value: function(e, t) {
                                    if (null == this) throw new TypeError('"this" is null or not defined');
                                    var n = Object(this), i = n.length >>> 0;
                                    if (0 === i) return !1;
                                    for (var a = 0 | t, r = Math.max(a >= 0 ? a : i - Math.abs(a), 0); r < i; ) {
                                        if (n[r] === e) return !0;
                                        r++;
                                    }
                                    return !1;
                                }
                            });
                        },
                        9302: function() {
                            var e = Function.bind.call(Function.call, Array.prototype.reduce), t = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable), n = Function.bind.call(Function.call, Array.prototype.concat), i = Object.keys;
                            Object.entries || (Object.entries = function(a) {
                                return e(i(a), function(e, i) {
                                    return n(e, "string" == typeof i && t(a, i) ? [ [ i, a[i] ] ] : []);
                                }, []);
                            });
                        },
                        7149: function() {
                            function e(t) {
                                return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, e(t);
                            }
                            "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === e("test".__proto__) ? function(e) {
                                return e.__proto__;
                            } : function(e) {
                                return e.constructor.prototype;
                            });
                        },
                        4013: function() {
                            String.prototype.includes || (String.prototype.includes = function(e, t) {
                                return "number" != typeof t && (t = 0), !(t + e.length > this.length) && -1 !== this.indexOf(e, t);
                            });
                        },
                        8711: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.caret = function(e, t, n, i, r) {
                                var o, l = this, s = this.opts;
                                if (void 0 === t) return "selectionStart" in e && "selectionEnd" in e ? (t = e.selectionStart, 
                                n = e.selectionEnd) : a.default.getSelection ? (o = a.default.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== e && o.commonAncestorContainer !== e || (t = o.startOffset, 
                                n = o.endOffset) : document.selection && document.selection.createRange && (n = (t = 0 - (o = document.selection.createRange()).duplicate().moveStart("character", -e.inputmask._valueGet().length)) + o.text.length), 
                                {
                                    begin: i ? t : f.call(l, t),
                                    end: i ? n : f.call(l, n)
                                };
                                if (Array.isArray(t) && (n = l.isRTL ? t[0] : t[1], t = l.isRTL ? t[1] : t[0]), 
                                void 0 !== t.begin && (n = l.isRTL ? t.begin : t.end, t = l.isRTL ? t.end : t.begin), 
                                "number" == typeof t) {
                                    t = i ? t : f.call(l, t), n = "number" == typeof (n = i ? n : f.call(l, n)) ? n : t;
                                    var c = parseInt(((e.ownerDocument.defaultView || a.default).getComputedStyle ? (e.ownerDocument.defaultView || a.default).getComputedStyle(e, null) : e.currentStyle).fontSize) * n;
                                    if (e.scrollLeft = c > e.scrollWidth ? c : 0, e.inputmask.caretPos = {
                                        begin: t,
                                        end: n
                                    }, s.insertModeVisual && !1 === s.insertMode && t === n && (r || n++), e === (e.inputmask.shadowRoot || e.ownerDocument).activeElement) {
                                        if ("setSelectionRange" in e) e.setSelectionRange(t, n); else if (a.default.getSelection) {
                                            if (o = document.createRange(), void 0 === e.firstChild || null === e.firstChild) {
                                                var u = document.createTextNode("");
                                                e.appendChild(u);
                                            }
                                            o.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length), 
                                            o.setEnd(e.firstChild, n < e.inputmask._valueGet().length ? n : e.inputmask._valueGet().length), 
                                            o.collapse(!0);
                                            var p = a.default.getSelection();
                                            p.removeAllRanges(), p.addRange(o);
                                        } else e.createTextRange && ((o = e.createTextRange()).collapse(!0), o.moveEnd("character", n), 
                                        o.moveStart("character", t), o.select());
                                        void 0 === e.inputmask.caretHook || e.inputmask.caretHook.call(l, {
                                            begin: t,
                                            end: n
                                        });
                                    }
                                }
                            }, t.determineLastRequiredPosition = function(e) {
                                var t, n, i = this, a = i.maskset, l = i.dependencyLib, c = s.call(i), u = {}, f = a.validPositions[c], p = o.getMaskTemplate.call(i, !0, s.call(i), !0, !0), d = p.length, h = void 0 !== f ? f.locator.slice() : void 0;
                                for (t = c + 1; t < p.length; t++) h = (n = o.getTestTemplate.call(i, t, h, t - 1)).locator.slice(), 
                                u[t] = l.extend(!0, {}, n);
                                var v = f && void 0 !== f.alternation ? f.locator[f.alternation] : void 0;
                                for (t = d - 1; t > c && ((n = u[t]).match.optionality || n.match.optionalQuantifier && n.match.newBlockMarker || v && (v !== u[t].locator[f.alternation] && !0 !== n.match.static || !0 === n.match.static && n.locator[f.alternation] && r.checkAlternationMatch.call(i, n.locator[f.alternation].toString().split(","), v.toString().split(",")) && "" !== o.getTests.call(i, t)[0].def)) && p[t] === o.getPlaceholder.call(i, t, n.match); t--) d--;
                                return e ? {
                                    l: d,
                                    def: u[d] ? u[d].match : void 0
                                } : d;
                            }, t.determineNewCaretPosition = function(e, t, n) {
                                var i, a, r, f = this, p = f.maskset, d = f.opts;
                                t && (f.isRTL ? e.end = e.begin : e.begin = e.end);
                                if (e.begin === e.end) {
                                    switch (n = n || d.positionCaretOnClick) {
                                      case "none":
                                        break;

                                      case "select":
                                        e = {
                                            begin: 0,
                                            end: l.call(f).length
                                        };
                                        break;

                                      case "ignore":
                                        e.end = e.begin = u.call(f, s.call(f));
                                        break;

                                      case "radixFocus":
                                        if (f.clicked > 1 && 0 === p.validPositions.length) break;
                                        if (function(e) {
                                            if ("" !== d.radixPoint && 0 !== d.digits) {
                                                var t = p.validPositions;
                                                if (void 0 === t[e] || void 0 === t[e].input) {
                                                    if (e < u.call(f, -1)) return !0;
                                                    var n = l.call(f).indexOf(d.radixPoint);
                                                    if (-1 !== n) {
                                                        for (var i = 0, a = t.length; i < a; i++) if (t[i] && n < i && t[i].input !== o.getPlaceholder.call(f, i)) return !1;
                                                        return !0;
                                                    }
                                                }
                                            }
                                            return !1;
                                        }(e.begin)) {
                                            var h = l.call(f).join("").indexOf(d.radixPoint);
                                            e.end = e.begin = d.numericInput ? u.call(f, h) : h;
                                            break;
                                        }

                                      default:
                                        if (i = e.begin, a = s.call(f, i, !0), i <= (r = u.call(f, -1 !== a || c.call(f, 0) ? a : -1))) e.end = e.begin = c.call(f, i, !1, !0) ? i : u.call(f, i); else {
                                            var v = p.validPositions[a], m = o.getTestTemplate.call(f, r, v ? v.match.locator : void 0, v), g = o.getPlaceholder.call(f, r, m.match);
                                            if ("" !== g && l.call(f)[r] !== g && !0 !== m.match.optionalQuantifier && !0 !== m.match.newBlockMarker || !c.call(f, r, d.keepStatic, !0) && m.match.def === g) {
                                                var y = u.call(f, r);
                                                (i >= y || i === r) && (r = y);
                                            }
                                            e.end = e.begin = r;
                                        }
                                    }
                                    return e;
                                }
                            }, t.getBuffer = l, t.getBufferTemplate = function() {
                                var e = this.maskset;
                                void 0 === e._buffer && (e._buffer = o.getMaskTemplate.call(this, !1, 1), void 0 === e.buffer && (e.buffer = e._buffer.slice()));
                                return e._buffer;
                            }, t.getLastValidPosition = s, t.isMask = c, t.resetMaskSet = function(e) {
                                var t = this.maskset;
                                t.buffer = void 0, !0 !== e && (t.validPositions = [], t.p = 0);
                                !1 === e && (t.tests = {}, t.jitOffset = {});
                            }, t.seekNext = u, t.seekPrevious = function(e, t) {
                                var n = this, i = e - 1;
                                if (e <= 0) return 0;
                                for (;i > 0 && (!0 === t && (!0 !== o.getTest.call(n, i).match.newBlockMarker || !c.call(n, i, void 0, !0)) || !0 !== t && !c.call(n, i, void 0, !0)); ) i--;
                                return i;
                            }, t.translatePosition = f;
                            var i, a = (i = n(9380)) && i.__esModule ? i : {
                                default: i
                            }, r = n(7215), o = n(4713);
                            function l(e) {
                                var t = this, n = t.maskset;
                                return void 0 !== n.buffer && !0 !== e || (n.buffer = o.getMaskTemplate.call(t, !0, s.call(t), !0), 
                                void 0 === n._buffer && (n._buffer = n.buffer.slice())), n.buffer;
                            }
                            function s(e, t, n) {
                                var i = this.maskset, a = -1, r = -1, o = n || i.validPositions;
                                void 0 === e && (e = -1);
                                for (var l = 0, s = o.length; l < s; l++) o[l] && (t || !0 !== o[l].generatedInput) && (l <= e && (a = l), 
                                l >= e && (r = l));
                                return -1 === a || a === e ? r : -1 === r || e - a < r - e ? a : r;
                            }
                            function c(e, t, n) {
                                var i = this, a = this.maskset, r = o.getTestTemplate.call(i, e).match;
                                if ("" === r.def && (r = o.getTest.call(i, e).match), !0 !== r.static) return r.fn;
                                if (!0 === n && void 0 !== a.validPositions[e] && !0 !== a.validPositions[e].generatedInput) return !0;
                                if (!0 !== t && e > -1) {
                                    if (n) {
                                        var l = o.getTests.call(i, e);
                                        return l.length > 1 + ("" === l[l.length - 1].match.def ? 1 : 0);
                                    }
                                    var s = o.determineTestTemplate.call(i, e, o.getTests.call(i, e)), c = o.getPlaceholder.call(i, e, s.match);
                                    return s.match.def !== c;
                                }
                                return !1;
                            }
                            function u(e, t, n) {
                                var i = this;
                                void 0 === n && (n = !0);
                                for (var a = e + 1; "" !== o.getTest.call(i, a).match.def && (!0 === t && (!0 !== o.getTest.call(i, a).match.newBlockMarker || !c.call(i, a, void 0, !0)) || !0 !== t && !c.call(i, a, void 0, n)); ) a++;
                                return a;
                            }
                            function f(e) {
                                var t = this.opts, n = this.el;
                                return !this.isRTL || "number" != typeof e || t.greedy && "" === t.placeholder || !n || (e = this._valueGet().length - e) < 0 && (e = 0), 
                                e;
                            }
                        },
                        4713: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.determineTestTemplate = f, t.getDecisionTaker = s, t.getMaskTemplate = function(e, t, n, i, a) {
                                var r = this, o = this.opts, l = this.maskset, s = o.greedy;
                                a && o.greedy && (o.greedy = !1, r.maskset.tests = {});
                                t = t || 0;
                                var p, d, v, m, g = [], y = 0;
                                do {
                                    if (!0 === e && l.validPositions[y]) d = (v = a && l.validPositions[y].match.optionality && void 0 === l.validPositions[y + 1] && (!0 === l.validPositions[y].generatedInput || l.validPositions[y].input == o.skipOptionalPartCharacter && y > 0) ? f.call(r, y, h.call(r, y, p, y - 1)) : l.validPositions[y]).match, 
                                    p = v.locator.slice(), g.push(!0 === n ? v.input : !1 === n ? d.nativeDef : c.call(r, y, d)); else {
                                        d = (v = u.call(r, y, p, y - 1)).match, p = v.locator.slice();
                                        var k = !0 !== i && (!1 !== o.jitMasking ? o.jitMasking : d.jit);
                                        (m = (m || l.validPositions[y - 1]) && d.static && d.def !== o.groupSeparator && null === d.fn) || !1 === k || void 0 === k || "number" == typeof k && isFinite(k) && k > y ? g.push(!1 === n ? d.nativeDef : c.call(r, g.length, d)) : m = !1;
                                    }
                                    y++;
                                } while (!0 !== d.static || "" !== d.def || t > y);
                                "" === g[g.length - 1] && g.pop();
                                !1 === n && void 0 !== l.maskLength || (l.maskLength = y - 1);
                                return o.greedy = s, g;
                            }, t.getPlaceholder = c, t.getTest = p, t.getTestTemplate = u, t.getTests = h, t.isSubsetOf = d;
                            var i, a = (i = n(2394)) && i.__esModule ? i : {
                                default: i
                            }, r = n(8711);
                            function o(e) {
                                return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                    return typeof e;
                                } : function(e) {
                                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                }, o(e);
                            }
                            function l(e, t) {
                                var n = (null != e.alternation ? e.mloc[s(e)] : e.locator).join("");
                                if ("" !== n) for (n = n.split(":")[0]; n.length < t; ) n += "0";
                                return n;
                            }
                            function s(e) {
                                var t = e.locator[e.alternation];
                                return "string" == typeof t && t.length > 0 && (t = t.split(",")[0]), void 0 !== t ? t.toString() : "";
                            }
                            function c(e, t, n) {
                                var i = this, a = this.opts, l = this.maskset;
                                if (void 0 !== (t = t || p.call(i, e).match).placeholder || !0 === n) {
                                    if ("" !== t.placeholder && !0 === t.static && !0 !== t.generated) {
                                        var s = r.getLastValidPosition.call(i, e), c = r.seekNext.call(i, s);
                                        return (n ? e <= c : e < c) ? a.staticDefinitionSymbol && t.static ? t.nativeDef : t.def : "function" == typeof t.placeholder ? t.placeholder(a) : t.placeholder;
                                    }
                                    return "function" == typeof t.placeholder ? t.placeholder(a) : t.placeholder;
                                }
                                if (!0 === t.static) {
                                    if (e > -1 && void 0 === l.validPositions[e]) {
                                        var u, f = h.call(i, e), d = [];
                                        if ("string" == typeof a.placeholder && f.length > 1 + ("" === f[f.length - 1].match.def ? 1 : 0)) for (var v = 0; v < f.length; v++) if ("" !== f[v].match.def && !0 !== f[v].match.optionality && !0 !== f[v].match.optionalQuantifier && (!0 === f[v].match.static || void 0 === u || !1 !== f[v].match.fn.test(u.match.def, l, e, !0, a)) && (d.push(f[v]), 
                                        !0 === f[v].match.static && (u = f[v]), d.length > 1 && /[0-9a-bA-Z]/.test(d[0].match.def))) return a.placeholder.charAt(e % a.placeholder.length);
                                    }
                                    return t.def;
                                }
                                return "object" === o(a.placeholder) ? t.def : a.placeholder.charAt(e % a.placeholder.length);
                            }
                            function u(e, t, n) {
                                return this.maskset.validPositions[e] || f.call(this, e, h.call(this, e, t ? t.slice() : t, n));
                            }
                            function f(e, t) {
                                var n = this.opts, i = 0, a = function(e, t) {
                                    var n = 0, i = !1;
                                    t.forEach(function(e) {
                                        e.match.optionality && (0 !== n && n !== e.match.optionality && (i = !0), (0 === n || n > e.match.optionality) && (n = e.match.optionality));
                                    }), n && (0 == e || 1 == t.length ? n = 0 : i || (n = 0));
                                    return n;
                                }(e, t);
                                e = e > 0 ? e - 1 : 0;
                                var r, o, s, c = l(p.call(this, e));
                                n.greedy && t.length > 1 && "" === t[t.length - 1].match.def && (i = 1);
                                for (var u = 0; u < t.length - i; u++) {
                                    var f = t[u];
                                    r = l(f, c.length);
                                    var d = Math.abs(r - c);
                                    (!0 !== f.unMatchedAlternationStopped || t.filter(function(e) {
                                        return !0 !== e.unMatchedAlternationStopped;
                                    }).length <= 1) && (void 0 === o || "" !== r && d < o || s && !n.greedy && s.match.optionality && s.match.optionality - a > 0 && "master" === s.match.newBlockMarker && (!f.match.optionality || f.match.optionality - a < 1 || !f.match.newBlockMarker) || s && !n.greedy && s.match.optionalQuantifier && !f.match.optionalQuantifier) && (o = d, 
                                    s = f);
                                }
                                return s;
                            }
                            function p(e, t) {
                                var n = this.maskset;
                                return n.validPositions[e] ? n.validPositions[e] : (t || h.call(this, e))[0];
                            }
                            function d(e, t, n) {
                                function i(e) {
                                    for (var t, n = [], i = -1, a = 0, r = e.length; a < r; a++) if ("-" === e.charAt(a)) for (t = e.charCodeAt(a + 1); ++i < t; ) n.push(String.fromCharCode(i)); else i = e.charCodeAt(a), 
                                    n.push(e.charAt(a));
                                    return n.join("");
                                }
                                return e.match.def === t.match.nativeDef || !(!(n.regex || e.match.fn instanceof RegExp && t.match.fn instanceof RegExp) || !0 === e.match.static || !0 === t.match.static) && ("." === t.match.fn.source || -1 !== i(t.match.fn.source.replace(/[[\]/]/g, "")).indexOf(i(e.match.fn.source.replace(/[[\]/]/g, ""))));
                            }
                            function h(e, t, n) {
                                var i, r, o = this, l = this.dependencyLib, s = this.maskset, c = this.opts, u = this.el, p = s.maskToken, h = t ? n : 0, v = t ? t.slice() : [ 0 ], m = [], g = !1, y = t ? t.join("") : "", k = !1;
                                function b(t, n, r, l) {
                                    function f(r, l, p) {
                                        function v(e, t) {
                                            var n = 0 === t.matches.indexOf(e);
                                            return n || t.matches.every(function(i, a) {
                                                return !0 === i.isQuantifier ? n = v(e, t.matches[a - 1]) : Object.prototype.hasOwnProperty.call(i, "matches") && (n = v(e, i)), 
                                                !n;
                                            }), n;
                                        }
                                        function w(e, t, n) {
                                            var i, a;
                                            if ((s.tests[e] || s.validPositions[e]) && (s.validPositions[e] ? [ s.validPositions[e] ] : s.tests[e]).every(function(e, r) {
                                                if (e.mloc[t]) return i = e, !1;
                                                var o = void 0 !== n ? n : e.alternation, l = void 0 !== e.locator[o] ? e.locator[o].toString().indexOf(t) : -1;
                                                return (void 0 === a || l < a) && -1 !== l && (i = e, a = l), !0;
                                            }), i) {
                                                var r = i.locator[i.alternation], o = i.mloc[t] || i.mloc[r] || i.locator;
                                                if (-1 !== o[o.length - 1].toString().indexOf(":")) o.pop();
                                                return o.slice((void 0 !== n ? n : i.alternation) + 1);
                                            }
                                            return void 0 !== n ? w(e, t) : void 0;
                                        }
                                        function P(t, n) {
                                            return !0 === t.match.static && !0 !== n.match.static && n.match.fn.test(t.match.def, s, e, !1, c, !1);
                                        }
                                        function S(e, t) {
                                            var n = e.alternation, i = void 0 === t || n <= t.alternation && -1 === e.locator[n].toString().indexOf(t.locator[n]);
                                            if (!i && n > t.alternation) for (var a = 0; a < n; a++) if (e.locator[a] !== t.locator[a]) {
                                                n = a, i = !0;
                                                break;
                                            }
                                            return !!i && function(n) {
                                                e.mloc = e.mloc || {};
                                                var i = e.locator[n];
                                                if (void 0 !== i) {
                                                    if ("string" == typeof i && (i = i.split(",")[0]), void 0 === e.mloc[i] && (e.mloc[i] = e.locator.slice(), 
                                                    e.mloc[i].push(":".concat(e.alternation))), void 0 !== t) {
                                                        for (var a in t.mloc) "string" == typeof a && (a = parseInt(a.split(",")[0])), e.mloc[a + 0] = t.mloc[a];
                                                        e.locator[n] = Object.keys(e.mloc).join(",");
                                                    }
                                                    return e.alternation > n && (e.alternation = n), !0;
                                                }
                                                return e.alternation = void 0, !1;
                                            }(n);
                                        }
                                        function O(e, t) {
                                            if (e.locator.length !== t.locator.length) return !1;
                                            for (var n = e.alternation + 1; n < e.locator.length; n++) if (e.locator[n] !== t.locator[n]) return !1;
                                            return !0;
                                        }
                                        if (h > e + c._maxTestPos) throw new Error("Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. ".concat(s.mask));
                                        if (h === e && void 0 === r.matches) {
                                            if (m.push({
                                                match: r,
                                                locator: l.reverse(),
                                                cd: y,
                                                mloc: {}
                                            }), !r.optionality || void 0 !== p || !(c.definitions && c.definitions[r.nativeDef] && c.definitions[r.nativeDef].optional || a.default.prototype.definitions[r.nativeDef] && a.default.prototype.definitions[r.nativeDef].optional)) return !0;
                                            g = !0, h = e;
                                        } else if (void 0 !== r.matches) {
                                            if (r.isGroup && p !== r) return function() {
                                                if (r = f(t.matches[t.matches.indexOf(r) + 1], l, p)) return !0;
                                            }();
                                            if (r.isOptional) return function() {
                                                var t = r, a = m.length;
                                                if (r = b(r, n, l, p), m.length > 0) {
                                                    if (m.forEach(function(e, t) {
                                                        t >= a && (e.match.optionality = e.match.optionality ? e.match.optionality + 1 : 1);
                                                    }), i = m[m.length - 1].match, void 0 !== p || !v(i, t)) return r;
                                                    g = !0, h = e;
                                                }
                                            }();
                                            if (r.isAlternator) return function() {
                                                function i(e) {
                                                    for (var t, n = e.matches[0].matches ? e.matches[0].matches.length : 1, i = 0; i < e.matches.length && n === (t = e.matches[i].matches ? e.matches[i].matches.length : 1); i++) ;
                                                    return n !== t;
                                                }
                                                o.hasAlternator = !0;
                                                var a, v = r, y = [], b = m.slice(), x = l.length, _ = n.length > 0 ? n.shift() : -1;
                                                if (-1 === _ || "string" == typeof _) {
                                                    var M, E = h, j = n.slice(), T = [];
                                                    if ("string" == typeof _) T = _.split(","); else for (M = 0; M < v.matches.length; M++) T.push(M.toString());
                                                    if (void 0 !== s.excludes[e]) {
                                                        for (var A = T.slice(), D = 0, L = s.excludes[e].length; D < L; D++) {
                                                            var C = s.excludes[e][D].toString().split(":");
                                                            l.length == C[1] && T.splice(T.indexOf(C[0]), 1);
                                                        }
                                                        0 === T.length && (delete s.excludes[e], T = A);
                                                    }
                                                    (!0 === c.keepStatic || isFinite(parseInt(c.keepStatic)) && E >= c.keepStatic) && (T = T.slice(0, 1));
                                                    for (var B = 0; B < T.length; B++) {
                                                        M = parseInt(T[B]), m = [], n = "string" == typeof _ && w(h, M, x) || j.slice();
                                                        var I = v.matches[M];
                                                        if (I && f(I, [ M ].concat(l), p)) r = !0; else if (0 === B && (k = i(v)), I && I.matches && I.matches.length > v.matches[0].matches.length) break;
                                                        a = m.slice(), h = E, m = [];
                                                        for (var R = 0; R < a.length; R++) {
                                                            var F = a[R], N = !1;
                                                            F.alternation = F.alternation || x, S(F);
                                                            for (var V = 0; V < y.length; V++) {
                                                                var G = y[V];
                                                                if ("string" != typeof _ || void 0 !== F.alternation && T.includes(F.locator[F.alternation].toString())) {
                                                                    if (F.match.nativeDef === G.match.nativeDef) {
                                                                        N = !0, S(G, F);
                                                                        break;
                                                                    }
                                                                    if (d(F, G, c)) {
                                                                        S(F, G) && (N = !0, y.splice(y.indexOf(G), 0, F));
                                                                        break;
                                                                    }
                                                                    if (d(G, F, c)) {
                                                                        S(G, F);
                                                                        break;
                                                                    }
                                                                    if (P(F, G)) {
                                                                        O(F, G) || void 0 !== u.inputmask.userOptions.keepStatic ? S(F, G) && (N = !0, y.splice(y.indexOf(G), 0, F)) : c.keepStatic = !0;
                                                                        break;
                                                                    }
                                                                    if (P(G, F)) {
                                                                        S(G, F);
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            N || y.push(F);
                                                        }
                                                    }
                                                    m = b.concat(y), h = e, g = m.length > 0 && k, r = y.length > 0 && !k, k && g && !r && m.forEach(function(e, t) {
                                                        e.unMatchedAlternationStopped = !0;
                                                    }), n = j.slice();
                                                } else r = f(v.matches[_] || t.matches[_], [ _ ].concat(l), p);
                                                if (r) return !0;
                                            }();
                                            if (r.isQuantifier && p !== t.matches[t.matches.indexOf(r) - 1]) return function() {
                                                for (var a = r, o = !1, u = n.length > 0 ? n.shift() : 0; u < (isNaN(a.quantifier.max) ? u + 1 : a.quantifier.max) && h <= e; u++) {
                                                    var p = t.matches[t.matches.indexOf(a) - 1];
                                                    if (r = f(p, [ u ].concat(l), p)) {
                                                        if (m.forEach(function(t, n) {
                                                            (i = x(p, t.match) ? t.match : m[m.length - 1].match).optionalQuantifier = u >= a.quantifier.min, 
                                                            i.jit = (u + 1) * (p.matches.indexOf(i) + 1) > a.quantifier.jit, i.optionalQuantifier && v(i, p) && (g = !0, 
                                                            h = e, c.greedy && null == s.validPositions[e - 1] && u > a.quantifier.min && -1 != [ "*", "+" ].indexOf(a.quantifier.max) && (m.pop(), 
                                                            y = void 0), o = !0, r = !1), !o && i.jit && (s.jitOffset[e] = p.matches.length - p.matches.indexOf(i));
                                                        }), o) break;
                                                        return !0;
                                                    }
                                                }
                                            }();
                                            if (r = b(r, n, l, p)) return !0;
                                        } else h++;
                                    }
                                    for (var p = n.length > 0 ? n.shift() : 0; p < t.matches.length; p++) if (!0 !== t.matches[p].isQuantifier) {
                                        var v = f(t.matches[p], [ p ].concat(r), l);
                                        if (v && h === e) return v;
                                        if (h > e) break;
                                    }
                                }
                                function x(e, t) {
                                    var n = -1 != e.matches.indexOf(t);
                                    return n || e.matches.forEach(function(e, i) {
                                        void 0 === e.matches || n || (n = x(e, t));
                                    }), n;
                                }
                                if (e > -1) {
                                    if (void 0 === t) {
                                        for (var w, P = e - 1; void 0 === (w = s.validPositions[P] || s.tests[P]) && P > -1; ) P--;
                                        void 0 !== w && P > -1 && (v = function(e, t) {
                                            var n, i = [];
                                            return Array.isArray(t) || (t = [ t ]), t.length > 0 && (void 0 === t[0].alternation || !0 === c.keepStatic ? 0 === (i = f.call(o, e, t.slice()).locator.slice()).length && (i = t[0].locator.slice()) : t.forEach(function(e) {
                                                "" !== e.def && (0 === i.length ? (n = e.alternation, i = e.locator.slice()) : e.locator[n] && -1 === i[n].toString().indexOf(e.locator[n]) && (i[n] += "," + e.locator[n]));
                                            })), i;
                                        }(P, w), y = v.join(""), h = P);
                                    }
                                    if (s.tests[e] && s.tests[e][0].cd === y) return s.tests[e];
                                    for (var S = v.shift(); S < p.length; S++) if (b(p[S], v, [ S ]) && h === e || h > e) break;
                                }
                                return (0 === m.length || g) && m.push({
                                    match: {
                                        fn: null,
                                        static: !0,
                                        optionality: !1,
                                        casing: null,
                                        def: "",
                                        placeholder: ""
                                    },
                                    locator: k && 0 === m.filter(function(e) {
                                        return !0 !== e.unMatchedAlternationStopped;
                                    }).length ? [ 0 ] : [],
                                    mloc: {},
                                    cd: y
                                }), void 0 !== t && s.tests[e] ? r = l.extend(!0, [], m) : (s.tests[e] = l.extend(!0, [], m), 
                                r = s.tests[e]), m.forEach(function(e) {
                                    e.match.optionality = e.match.defOptionality || !1;
                                }), r;
                            }
                        },
                        7215: function(e, t, n) {
                            Object.defineProperty(t, "__esModule", {
                                value: !0
                            }), t.alternate = l, t.checkAlternationMatch = function(e, t, n) {
                                for (var i, a = this.opts.greedy ? t : t.slice(0, 1), r = !1, o = void 0 !== n ? n.split(",") : [], l = 0; l < o.length; l++) -1 !== (i = e.indexOf(o[l])) && e.splice(i, 1);
                                for (var s = 0; s < e.length; s++) if (a.includes(e[s])) {
                                    r = !0;
                                    break;
                                }
                                return r;
                            }, t.handleRemove = function(e, t, n, i, s) {
                                var c = this, u = this.maskset, f = this.opts;
                                if ((f.numericInput || c.isRTL) && (t === a.keys.Backspace ? t = a.keys.Delete : t === a.keys.Delete && (t = a.keys.Backspace), 
                                c.isRTL)) {
                                    var p = n.end;
                                    n.end = n.begin, n.begin = p;
                                }
                                var d, h = r.getLastValidPosition.call(c, void 0, !0);
                                n.end >= r.getBuffer.call(c).length && h >= n.end && (n.end = h + 1);
                                t === a.keys.Backspace ? n.end - n.begin < 1 && (n.begin = r.seekPrevious.call(c, n.begin)) : t === a.keys.Delete && n.begin === n.end && (n.end = r.isMask.call(c, n.end, !0, !0) ? n.end + 1 : r.seekNext.call(c, n.end) + 1);
                                !1 !== (d = v.call(c, n)) && ((!0 !== i && !1 !== f.keepStatic || null !== f.regex && -1 !== o.getTest.call(c, n.begin).match.def.indexOf("|")) && l.call(c, !0), 
                                !0 !== i && (u.p = t === a.keys.Delete ? n.begin + d : n.begin, u.p = r.determineNewCaretPosition.call(c, {
                                    begin: u.p,
                                    end: u.p
                                }, !1, !1 === f.insertMode && t === a.keys.Backspace ? "none" : void 0).begin));
                            }, t.isComplete = c, t.isSelection = u, t.isValid = f, t.refreshFromBuffer = d, 
                            t.revalidateMask = v;
                            var i = n(6030), a = n(2839), r = n(8711), o = n(4713);
                            function l(e, t, n, i, a, s) {
                                var c = this, u = this.dependencyLib, p = this.opts, d = c.maskset;
                                if (!c.hasAlternator) return !1;
                                var h, v, m, g, y, k, b, x, w, P, S, O = u.extend(!0, [], d.validPositions), _ = u.extend(!0, {}, d.tests), M = !1, E = !1, j = void 0 !== a ? a : r.getLastValidPosition.call(c);
                                if (s && (P = s.begin, S = s.end, s.begin > s.end && (P = s.end, S = s.begin)), 
                                -1 === j && void 0 === a) h = 0, v = (g = o.getTest.call(c, h)).alternation; else for (;j >= 0; j--) if ((m = d.validPositions[j]) && void 0 !== m.alternation) {
                                    if (j <= (e || 0) && g && g.locator[m.alternation] !== m.locator[m.alternation]) break;
                                    h = j, v = d.validPositions[h].alternation, g = m;
                                }
                                if (void 0 !== v) {
                                    b = parseInt(h), d.excludes[b] = d.excludes[b] || [], !0 !== e && d.excludes[b].push((0, 
                                    o.getDecisionTaker)(g) + ":" + g.alternation);
                                    var T = [], A = -1;
                                    for (y = b; b < r.getLastValidPosition.call(c, void 0, !0) + 1; y++) -1 === A && e <= y && void 0 !== t && (T.push(t), 
                                    A = T.length - 1), (k = d.validPositions[b]) && !0 !== k.generatedInput && (void 0 === s || y < P || y >= S) && T.push(k.input), 
                                    d.validPositions.splice(b, 1);
                                    for (-1 === A && void 0 !== t && (T.push(t), A = T.length - 1); void 0 !== d.excludes[b] && d.excludes[b].length < 10; ) {
                                        for (d.tests = {}, r.resetMaskSet.call(c, !0), M = !0, y = 0; y < T.length && (x = M.caret || 0 == p.insertMode && null != x ? r.seekNext.call(c, x) : r.getLastValidPosition.call(c, void 0, !0) + 1, 
                                        w = T[y], M = f.call(c, x, w, !1, i, !0)); y++) y === A && (E = M), 1 == e && M && (E = {
                                            caretPos: y
                                        });
                                        if (M) break;
                                        if (r.resetMaskSet.call(c), g = o.getTest.call(c, b), d.validPositions = u.extend(!0, [], O), 
                                        d.tests = u.extend(!0, {}, _), !d.excludes[b]) {
                                            E = l.call(c, e, t, n, i, b - 1, s);
                                            break;
                                        }
                                        if (null != g.alternation) {
                                            var D = (0, o.getDecisionTaker)(g);
                                            if (-1 !== d.excludes[b].indexOf(D + ":" + g.alternation)) {
                                                E = l.call(c, e, t, n, i, b - 1, s);
                                                break;
                                            }
                                            for (d.excludes[b].push(D + ":" + g.alternation), y = b; y < r.getLastValidPosition.call(c, void 0, !0) + 1; y++) d.validPositions.splice(b);
                                        } else delete d.excludes[b];
                                    }
                                }
                                return E && !1 === p.keepStatic || delete d.excludes[b], E;
                            }
                            function s(e, t, n) {
                                var i = this.opts, r = this.maskset;
                                switch (i.casing || t.casing) {
                                  case "upper":
                                    e = e.toUpperCase();
                                    break;

                                  case "lower":
                                    e = e.toLowerCase();
                                    break;

                                  case "title":
                                    var o = r.validPositions[n - 1];
                                    e = 0 === n || o && o.input === String.fromCharCode(a.keyCode.Space) ? e.toUpperCase() : e.toLowerCase();
                                    break;

                                  default:
                                    if ("function" == typeof i.casing) {
                                        var l = Array.prototype.slice.call(arguments);
                                        l.push(r.validPositions), e = i.casing.apply(this, l);
                                    }
                                }
                                return e;
                            }
                            function c(e) {
                                var t = this, n = this.opts, i = this.maskset;
                                if ("function" == typeof n.isComplete) return n.isComplete(e, n);
                                if ("*" !== n.repeat) {
                                    var a = !1, l = r.determineLastRequiredPosition.call(t, !0), s = l.l;
                                    if (void 0 === l.def || l.def.newBlockMarker || l.def.optionality || l.def.optionalQuantifier) {
                                        a = !0;
                                        for (var c = 0; c <= s; c++) {
                                            var u = o.getTestTemplate.call(t, c).match;
                                            if (!0 !== u.static && void 0 === i.validPositions[c] && (!1 === u.optionality || void 0 === u.optionality || u.optionality && 0 == u.newBlockMarker) && (!1 === u.optionalQuantifier || void 0 === u.optionalQuantifier) || !0 === u.static && "" != u.def && e[c] !== o.getPlaceholder.call(t, c, u)) {
                                                a = !1;
                                                break;
                                            }
                                        }
                                    }
                                    return a;
                                }
                            }
                            function u(e) {
                                var t = this.opts.insertMode ? 0 : 1;
                                return this.isRTL ? e.begin - e.end > t : e.end - e.begin > t;
                            }
                            function f(e, t, n, i, a, p, m) {
                                var g = this, y = this.dependencyLib, k = this.opts, b = g.maskset;
                                n = !0 === n;
                                var x = e;
                                function w(e) {
                                    if (void 0 !== e) {
                                        if (void 0 !== e.remove && (Array.isArray(e.remove) || (e.remove = [ e.remove ]), 
                                        e.remove.sort(function(e, t) {
                                            return g.isRTL ? e.pos - t.pos : t.pos - e.pos;
                                        }).forEach(function(e) {
                                            v.call(g, {
                                                begin: e,
                                                end: e + 1
                                            });
                                        }), e.remove = void 0), void 0 !== e.insert && (Array.isArray(e.insert) || (e.insert = [ e.insert ]), 
                                        e.insert.sort(function(e, t) {
                                            return g.isRTL ? t.pos - e.pos : e.pos - t.pos;
                                        }).forEach(function(e) {
                                            "" !== e.c && f.call(g, e.pos, e.c, void 0 === e.strict || e.strict, void 0 !== e.fromIsValid ? e.fromIsValid : i);
                                        }), e.insert = void 0), e.refreshFromBuffer && e.buffer) {
                                            var t = e.refreshFromBuffer;
                                            d.call(g, !0 === t ? t : t.start, t.end, e.buffer), e.refreshFromBuffer = void 0;
                                        }
                                        void 0 !== e.rewritePosition && (x = e.rewritePosition, e = !0);
                                    }
                                    return e;
                                }
                                function P(t, n, a) {
                                    var l = !1;
                                    return o.getTests.call(g, t).every(function(c, f) {
                                        var p = c.match;
                                        if (r.getBuffer.call(g, !0), !1 !== (l = (!p.jit || void 0 !== b.validPositions[r.seekPrevious.call(g, t)]) && (null != p.fn ? p.fn.test(n, b, t, a, k, u.call(g, e)) : (n === p.def || n === k.skipOptionalPartCharacter) && "" !== p.def && {
                                            c: o.getPlaceholder.call(g, t, p, !0) || p.def,
                                            pos: t
                                        }))) {
                                            var d = void 0 !== l.c ? l.c : n, h = t;
                                            return d = d === k.skipOptionalPartCharacter && !0 === p.static ? o.getPlaceholder.call(g, t, p, !0) || p.def : d, 
                                            !0 !== (l = w(l)) && void 0 !== l.pos && l.pos !== t && (h = l.pos), !0 !== l && void 0 === l.pos && void 0 === l.c ? !1 : (!1 === v.call(g, e, y.extend({}, c, {
                                                input: s.call(g, d, p, h)
                                            }), i, h) && (l = !1), !1);
                                        }
                                        return !0;
                                    }), l;
                                }
                                void 0 !== e.begin && (x = g.isRTL ? e.end : e.begin);
                                var S = !0, O = y.extend(!0, [], b.validPositions);
                                if (!1 === k.keepStatic && void 0 !== b.excludes[x] && !0 !== a && !0 !== i) for (var _ = x; _ < (g.isRTL ? e.begin : e.end); _++) void 0 !== b.excludes[_] && (b.excludes[_] = void 0, 
                                delete b.tests[_]);
                                if ("function" == typeof k.preValidation && !0 !== i && !0 !== p && (S = w(S = k.preValidation.call(g, r.getBuffer.call(g), x, t, u.call(g, e), k, b, e, n || a))), 
                                !0 === S) {
                                    if (S = P(x, t, n), (!n || !0 === i) && !1 === S && !0 !== p) {
                                        var M = b.validPositions[x];
                                        if (!M || !0 !== M.match.static || M.match.def !== t && t !== k.skipOptionalPartCharacter) {
                                            if (k.insertMode || void 0 === b.validPositions[r.seekNext.call(g, x)] || e.end > x) {
                                                var E = !1;
                                                if (b.jitOffset[x] && void 0 === b.validPositions[r.seekNext.call(g, x)] && !1 !== (S = f.call(g, x + b.jitOffset[x], t, !0, !0)) && (!0 !== a && (S.caret = x), 
                                                E = !0), e.end > x && (b.validPositions[x] = void 0), !E && !r.isMask.call(g, x, k.keepStatic && 0 === x)) for (var j = x + 1, T = r.seekNext.call(g, x, !1, 0 !== x); j <= T; j++) if (!1 !== (S = P(j, t, n))) {
                                                    S = h.call(g, x, void 0 !== S.pos ? S.pos : j) || S, x = j;
                                                    break;
                                                }
                                            }
                                        } else S = {
                                            caret: r.seekNext.call(g, x)
                                        };
                                    }
                                    g.hasAlternator && !0 !== a && !n && (a = !0, !1 === S && k.keepStatic && (c.call(g, r.getBuffer.call(g)) || 0 === x) ? S = l.call(g, x, t, n, i, void 0, e) : (u.call(g, e) && b.tests[x] && b.tests[x].length > 1 && k.keepStatic || 1 == S && !0 !== k.numericInput && b.tests[x] && b.tests[x].length > 1 && r.getLastValidPosition.call(g, void 0, !0) > x) && (S = l.call(g, !0))), 
                                    !0 === S && (S = {
                                        pos: x
                                    });
                                }
                                if ("function" == typeof k.postValidation && !0 !== i && !0 !== p) {
                                    var A = k.postValidation.call(g, r.getBuffer.call(g, !0), void 0 !== e.begin ? g.isRTL ? e.end : e.begin : e, t, S, k, b, n, m);
                                    void 0 !== A && (S = !0 === A ? S : A);
                                }
                                S && void 0 === S.pos && (S.pos = x), !1 === S || !0 === p ? (r.resetMaskSet.call(g, !0), 
                                b.validPositions = y.extend(!0, [], O)) : h.call(g, void 0, x, !0);
                                var D = w(S);
                                void 0 !== g.maxLength && r.getBuffer.call(g).length > g.maxLength && !i && (r.resetMaskSet.call(g, !0), 
                                b.validPositions = y.extend(!0, [], O), D = !1);
                                return D;
                            }
                            function p(e, t, n) {
                                for (var i = this.maskset, a = !1, r = o.getTests.call(this, e), l = 0; l < r.length; l++) {
                                    if (r[l].match && (r[l].match.nativeDef === t.match[n.shiftPositions ? "def" : "nativeDef"] && (!n.shiftPositions || !t.match.static) || r[l].match.nativeDef === t.match.nativeDef || n.regex && !r[l].match.static && r[l].match.fn.test(t.input, i, e, !1, n))) {
                                        a = !0;
                                        break;
                                    }
                                    if (r[l].match && r[l].match.def === t.match.nativeDef) {
                                        a = void 0;
                                        break;
                                    }
                                }
                                return !1 === a && void 0 !== i.jitOffset[e] && (a = p.call(this, e + i.jitOffset[e], t, n)), 
                                a;
                            }
                            function d(e, t, n) {
                                var a, o, l = this, s = this.maskset, c = this.opts, u = this.dependencyLib, f = c.skipOptionalPartCharacter, p = l.isRTL ? n.slice().reverse() : n;
                                if (c.skipOptionalPartCharacter = "", !0 === e) r.resetMaskSet.call(l, !1), e = 0, 
                                t = n.length, o = r.determineNewCaretPosition.call(l, {
                                    begin: 0,
                                    end: 0
                                }, !1).begin; else {
                                    for (a = e; a < t; a++) s.validPositions.splice(e, 0);
                                    o = e;
                                }
                                var d = new u.Event("keypress");
                                for (a = e; a < t; a++) {
                                    d.key = p[a].toString(), l.ignorable = !1;
                                    var h = i.EventHandlers.keypressEvent.call(l, d, !0, !1, !1, o);
                                    !1 !== h && void 0 !== h && (o = h.forwardPosition);
                                }
                                c.skipOptionalPartCharacter = f;
                            }
                            function h(e, t, n) {
                                var i = this, a = this.maskset, l = this.dependencyLib;
                                if (void 0 === e) for (e = t - 1; e > 0 && !a.validPositions[e]; e--) ;
                                for (var s = e; s < t; s++) if (void 0 === a.validPositions[s] && !r.isMask.call(i, s, !1)) if (0 == s ? o.getTest.call(i, s) : a.validPositions[s - 1]) {
                                    var c = o.getTests.call(i, s).slice();
                                    "" === c[c.length - 1].match.def && c.pop();
                                    var u, p = o.determineTestTemplate.call(i, s, c);
                                    if (p && (!0 !== p.match.jit || "master" === p.match.newBlockMarker && (u = a.validPositions[s + 1]) && !0 === u.match.optionalQuantifier) && ((p = l.extend({}, p, {
                                        input: o.getPlaceholder.call(i, s, p.match, !0) || p.match.def
                                    })).generatedInput = !0, v.call(i, s, p, !0), !0 !== n)) {
                                        var d = a.validPositions[t].input;
                                        return a.validPositions[t] = void 0, f.call(i, t, d, !0, !0);
                                    }
                                }
                            }
                            function v(e, t, n, i) {
                                var a = this, l = this.maskset, s = this.opts, c = this.dependencyLib;
                                function d(e, t, n) {
                                    var i = t[e];
                                    if (void 0 !== i && !0 === i.match.static && !0 !== i.match.optionality && (void 0 === t[0] || void 0 === t[0].alternation)) {
                                        var a = n.begin <= e - 1 ? t[e - 1] && !0 === t[e - 1].match.static && t[e - 1] : t[e - 1], r = n.end > e + 1 ? t[e + 1] && !0 === t[e + 1].match.static && t[e + 1] : t[e + 1];
                                        return a && r;
                                    }
                                    return !1;
                                }
                                var h = 0, v = void 0 !== e.begin ? e.begin : e, m = void 0 !== e.end ? e.end : e, g = !0;
                                if (e.begin > e.end && (v = e.end, m = e.begin), i = void 0 !== i ? i : v, void 0 === n && (v !== m || s.insertMode && void 0 !== l.validPositions[i] || void 0 === t || t.match.optionalQuantifier || t.match.optionality)) {
                                    var y, k = c.extend(!0, [], l.validPositions), b = r.getLastValidPosition.call(a, void 0, !0);
                                    l.p = v;
                                    var x = u.call(a, e) ? v : i;
                                    for (y = b; y >= x; y--) l.validPositions.splice(y, 1), void 0 === t && delete l.tests[y + 1];
                                    var w, P, S = i, O = S;
                                    for (t && (l.validPositions[i] = c.extend(!0, {}, t), O++, S++), null == k[m] && l.jitOffset[m] && (m += l.jitOffset[m] + 1), 
                                    y = t ? m : m - 1; y <= b; y++) {
                                        if (void 0 !== (w = k[y]) && !0 !== w.generatedInput && (y >= m || y >= v && d(y, k, {
                                            begin: v,
                                            end: m
                                        }))) {
                                            for (;"" !== o.getTest.call(a, O).match.def; ) {
                                                if (!1 !== (P = p.call(a, O, w, s)) || "+" === w.match.def) {
                                                    "+" === w.match.def && r.getBuffer.call(a, !0);
                                                    var _ = f.call(a, O, w.input, "+" !== w.match.def, !0);
                                                    if (g = !1 !== _, S = (_.pos || O) + 1, !g && P) break;
                                                } else g = !1;
                                                if (g) {
                                                    void 0 === t && w.match.static && y === e.begin && h++;
                                                    break;
                                                }
                                                if (!g && r.getBuffer.call(a), O > l.maskLength) break;
                                                O++;
                                            }
                                            "" == o.getTest.call(a, O).match.def && (g = !1), O = S;
                                        }
                                        if (!g) break;
                                    }
                                    if (!g) return l.validPositions = c.extend(!0, [], k), r.resetMaskSet.call(a, !0), 
                                    !1;
                                } else t && o.getTest.call(a, i).match.cd === t.match.cd && (l.validPositions[i] = c.extend(!0, {}, t));
                                return r.resetMaskSet.call(a, !0), h;
                            }
                        }
                    }, t = {};
                    function n(i) {
                        var a = t[i];
                        if (void 0 !== a) return a.exports;
                        var r = t[i] = {
                            exports: {}
                        };
                        return e[i](r, r.exports, n), r.exports;
                    }
                    var i = {};
                    return function() {
                        var e = i;
                        Object.defineProperty(e, "__esModule", {
                            value: !0
                        }), e.default = void 0, n(7149), n(3194), n(9302), n(4013), n(3851), n(219), n(207), 
                        n(5296);
                        var t, a = (t = n(2394)) && t.__esModule ? t : {
                            default: t
                        };
                        e.default = a.default;
                    }(), i;
                }();
            });
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
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
                        tooShort: ({minLength}) => `Занадто коротке значення, мінімум символів — ${minLength}`,
                        tooLong: ({maxLength}) => `Занадто довге значення, обмеження символів — ${maxLength}`,
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
                document.addEventListener("focusin", ({target}) => {
                    this.focusIn(target);
                });
                document.addEventListener("focusout", ({target}) => {
                    this.focusOut(target);
                });
                document.addEventListener("change", ({target}) => {
                    this.inputChange(target);
                });
                if (this.options.viewpass) document.addEventListener("click", ({target}) => {
                    this.inputViewPass(target);
                });
                document.addEventListener("submit", e => this.formSubmit(e));
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
            formSending(form, responseResult = ``) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout(() => {
                    if (objectModules.modal) {
                        const {modalMessage} = form.dataset;
                        modalMessage ? objectModules.modal.open(modalMessage) : null;
                    }
                }, 0);
                this.options.on.formSend(form);
                this.formClean(form);
                this.formLogging(`Форму відправлено!`);
            }
            formClean(form) {
                form.reset();
                setTimeout(() => {
                    const inputs = form.querySelectorAll("input,textarea");
                    const checkboxes = form.querySelectorAll("input[type=checkbox]");
                    const radioButtons = form.querySelectorAll("input[type=radio]");
                    inputs.forEach(input => this.removeError(input));
                    if (checkboxes.length > 0) checkboxes.forEach(checkbox => checkbox.checked = false);
                    if (radioButtons.length > 0) radioButtons.forEach(radio => radio.checked = false);
                    if (objectModules.select) objectModules.select.removeActiveItems();
                    if (objectModules.selects) objectModules.selects.forEach(select => {
                        console.log(select);
                        select.removeActiveItems();
                    });
                }, 0);
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
                if (textareas.length > 0) textareas.forEach(textarea => {
                    const startHeight = textarea.hasAttribute(this.options.attributes.autoHeightMin) ? +textarea.dataset.autoheightMin : +textarea.offsetHeight;
                    const maxHeight = textarea.hasAttribute(this.options.attributes.autoHeightMax) ? +textarea.dataset.autoheightMax : 1 / 0;
                    this._setTextAreaHeight(textarea, Math.min(startHeight, maxHeight));
                    textarea.addEventListener("input", function() {
                        if (textarea.scrollHeight > startHeight) {
                            textarea.style.height = `auto`;
                            this._setTextAreaHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                        }
                    }.bind(this));
                });
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
                if (formRequiredItems.length) formRequiredItems.forEach(formRequiredItem => {
                    if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateField(formRequiredItem);
                });
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
                    const isChecked = [ ...document.querySelectorAll(`input[name="${name}"]`) ].some(radio => radio.checked);
                    if (!isChecked) {
                        document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                            this.addError(radio, this.options.errorMesseges.valueMissing);
                            this.removeSuccess(radio);
                            radio.setAttribute("aria-invalid", "true");
                        });
                        error++;
                    } else document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                        this.removeError(radio);
                        this.addSuccess(radio);
                        radio.setAttribute("aria-invalid", "false");
                    });
                }
                if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem, this.options.errorMesseges.valueMissing);
                    this.removeSuccess(formRequiredItem);
                    if (required === "phone") this.addError(formRequiredItem, this.options.errorMesseges.phone.enterPhone);
                    error++;
                }
                return error;
            }
            addError(formRequiredItem, errorMessage = "") {
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
        const _slideUp = (target, duration = 500, showmore = 0) => {
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
                window.setTimeout(() => {
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
                }, duration);
            }
        };
        const _slideDown = (target, duration = 500, showmore = 0) => {
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
                window.setTimeout(() => {
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
                }, duration);
            }
        };
        let bodyLockStatus = true;
        const bodyLockToggle = (delay = 500) => {
            document.documentElement.classList.contains("lock") ? bodyUnlock(delay) : bodyLock(delay);
        };
        const bodyUnlock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                setTimeout(() => {
                    lockPaddingElements.forEach(lockPaddingElement => {
                        lockPaddingElement.style.paddingRight = "";
                    });
                    document.body.style.paddingRight = "";
                    document.documentElement.classList.remove("lock");
                }, delay);
                bodyLockStatus = false;
                setTimeout(() => {
                    bodyLockStatus = true;
                }, delay);
            }
        };
        const bodyLock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
                lockPaddingElements.forEach(lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = lockPaddingValue;
                });
                document.body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout(() => {
                    bodyLockStatus = true;
                }, delay);
            }
        };
        const FLS = message => {
            setTimeout(() => {
                if (window.FLS) console.log(message);
            }, 0);
        };
        const uniqArray = array => array.filter((item, index, self) => self.indexOf(item) === index);
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(item => item.dataset[dataSetValue] ? item.dataset[dataSetValue].split(",")[0] : null);
            if (!media.length) return;
            const breakpointsArray = [];
            media.forEach(item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            });
            let mdQueries = breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`);
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach(breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter(item => {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    });
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                });
                return mdQueriesArray;
            }
        }
        function burgerMenu() {
            const burger = document.querySelector(".burger-menu");
            if (burger) document.addEventListener("click", ({target}) => {
                if (bodyLockStatus && target.closest(".burger-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                    if (document.documentElement.classList.contains("filter-menu-open")) document.documentElement.classList.remove("filter-menu-open");
                }
                if (bodyLockStatus && !target.closest(".burger-menu") && !target.closest(".menu__body") && document.documentElement.classList.contains("menu-open")) {
                    bodyLockToggle();
                    document.documentElement.classList.remove("menu-open");
                }
            });
        }
        function searchHeaderShow() {
            document.addEventListener("click", e => {
                const {target} = e;
                if (target.closest(".search-button--icon")) {
                    e.preventDefault();
                    document.documentElement.classList.add("search-show");
                }
                if (!target.closest(".search-header") && document.documentElement.classList.contains("search-show")) document.documentElement.classList.remove("search-show");
            });
        }
        const gotoBlock_gotoBlock = (targetSelector, config = {}) => {
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
                    setTimeout(() => {
                        headerElement.style.cssText = ``;
                    }, 0);
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
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
                if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            });
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
            return classes.trim().split(" ").filter(c => !!c.trim());
        }
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach(key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            });
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
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map(a => a.replace(",", ".")).join(", ");
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
                    const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
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
                    setTimeout(() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    });
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
            return children.filter(el => el.matches(selector));
        }
        function elementIsChildOfSlot(el, slot) {
            const elementsQueue = [ slot ];
            while (elementsQueue.length > 0) {
                const elementToCheck = elementsQueue.shift();
                if (el === elementToCheck) return true;
                elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
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
            return (Array.isArray(el) ? el : [ el ]).filter(e => !!e);
        }
        function utils_setInnerHTML(el, html) {
            if (html === void 0) html = "";
            if (typeof trustedTypes !== "undefined") el.innerHTML = trustedTypes.createPolicy("html", {
                createHTML: s => s
            }).createHTML(html); else el.innerHTML = html;
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
                    const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map(num => Number(num));
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
                observer = new ResizeObserver(entries => {
                    animationFrame = window.requestAnimationFrame(() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach(_ref2 => {
                            let {contentBoxSize, contentRect, target} = _ref2;
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        });
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    });
                });
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
            on("init", () => {
                if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            });
            on("destroy", () => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            });
        }
        function Observer(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = function(target, options) {
                if (options === void 0) options = {};
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc(mutations => {
                    if (swiper.__preventObserver__) return;
                    if (mutations.length === 1) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                });
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
                observers.forEach(observer => {
                    observer.disconnect();
                });
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
                events.split(" ").forEach(event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                });
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
                events.split(" ").forEach(event => {
                    if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    });
                });
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
                eventsArray.forEach(event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach(eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    });
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach(eventHandler => {
                        eventHandler.apply(context, data);
                    });
                });
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
            slides.forEach(slideEl => {
                if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
                slideEl.style.marginBottom = "";
                slideEl.style.marginTop = "";
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
            let slideSize;
            const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter(key => typeof params.breakpoints[key].slidesPerView !== "undefined").length > 0;
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
                slides.filter((_, slideIndex) => {
                    if (!params.cssMode || params.loop) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                }).forEach(slideEl => {
                    slideEl.style[key] = `${spaceBetween}px`;
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach(slideSizeValue => {
                    allSlidesSize += slideSizeValue + (spaceBetween || 0);
                });
                allSlidesSize -= spaceBetween;
                const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
                snapGrid = snapGrid.map(snap => {
                    if (snap <= 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                });
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach(slideSizeValue => {
                    allSlidesSize += slideSizeValue + (spaceBetween || 0);
                });
                allSlidesSize -= spaceBetween;
                const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
                if (allSlidesSize + offsetSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
                    snapGrid.forEach((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    });
                    slidesGrid.forEach((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    });
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
                swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
                swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
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
            if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach(slide => {
                activeSlides.push(slide);
            }); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
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
                activeSlide = slides.find(slideEl => slideEl.column === activeIndex);
                nextSlide = slides.find(slideEl => slideEl.column === activeIndex + 1);
                prevSlide = slides.find(slideEl => slideEl.column === activeIndex - 1);
            } else activeSlide = slides[activeIndex];
            if (activeSlide) if (!gridEnabled) {
                nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !nextSlide) nextSlide = slides[0];
                prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
            }
            slides.forEach(slideEl => {
                toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
                toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
                toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
            });
            swiper.emitSlidesClasses();
        }
        const processLazyPreloader = (swiper, imageEl) => {
            if (!swiper || swiper.destroyed || !swiper.params) return;
            const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
            const slideEl = imageEl.closest(slideSelector());
            if (slideEl) {
                let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame(() => {
                    if (slideEl.shadowRoot) {
                        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                        if (lazyEl) lazyEl.remove();
                    }
                });
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
                }).map((_, i) => activeColumn + slidesPerView + i));
                swiper.slides.forEach((slideEl, i) => {
                    if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
                });
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
                const firstSlideInColumn = swiper.slides.find(slideEl => slideEl.column === activeIndex);
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
            if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach(pathEl => {
                if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
            });
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
            if (runCallbacks && dir === "reset") swiper.emit(`slideResetTransition${step}`); else if (runCallbacks && activeIndex !== previousIndex) {
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
                        requestAnimationFrame(() => {
                            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                        });
                    } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame(() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._immediateVirtual = false;
                    });
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
            const browser = getBrowser();
            const isSafari = browser.isSafari;
            if (isVirtual && !initial && isSafari && swiper.isElement) swiper.virtual.update(false, false, slideIndex);
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
                    targetSlideIndex = swiper.slides.find(slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
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
                    newIndex = swiper.slides.find(slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
                } else newIndex = swiper.getSlideIndexByData(newIndex);
            }
            requestAnimationFrame(() => {
                swiper.slideTo(newIndex, speed, runCallbacks, internal);
            });
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
                    requestAnimationFrame(() => {
                        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                    });
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
            const normalizedSnapGrid = snapGrid.map(val => normalize(val));
            const isFreeMode = params.freeMode && params.freeMode.enabled;
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
                let prevSnapIndex;
                snapGrid.forEach((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                });
                if (typeof prevSnapIndex !== "undefined") prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
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
                requestAnimationFrame(() => {
                    swiper.slideTo(prevIndex, speed, runCallbacks, internal);
                });
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
            let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
            let realIndex;
            const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
            const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
                if (params.centeredSlides) swiper.slideToLoop(realIndex); else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
                    swiper.loopFix();
                    slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                    utils_nextTick(() => {
                        swiper.slideTo(slideToIndex);
                    });
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
        function loopCreate(slideRealIndex, initial) {
            const swiper = this;
            const {params, slidesEl} = swiper;
            if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
            const initSlides = () => {
                const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
                slides.forEach((el, index) => {
                    el.setAttribute("data-swiper-slide-index", index);
                });
            };
            const clearBlankSlides = () => {
                const slides = utils_elementChildren(slidesEl, `.${params.slideBlankClass}`);
                slides.forEach(el => {
                    el.remove();
                });
                if (slides.length > 0) {
                    swiper.recalcSlides();
                    swiper.updateSlides();
                }
            };
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) clearBlankSlides();
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
                direction: params.centeredSlides ? void 0 : "next",
                initial
            });
        }
        function loopFix(_temp) {
            let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, initial, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
            const swiper = this;
            if (!swiper.params.loop) return;
            swiper.emit("beforeLoopFix");
            const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
            const {centeredSlides, initialSlide} = params;
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
            let loopedSlides = centeredSlides ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
            if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
            loopedSlides += params.loopAdditionalSlides;
            swiper.loopedSlides = loopedSlides;
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const prependSlidesIndexes = [];
            const appendSlidesIndexes = [];
            const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
            const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !centeredSlides;
            let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
            if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.find(el => el.classList.contains(params.slideActiveClass))); else activeIndex = activeSlideIndex;
            const isNext = direction === "next" || !direction;
            const isPrev = direction === "prev" || !direction;
            let slidesPrepended = 0;
            let slidesAppended = 0;
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
                if (isInitialOverflow) slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
                for (let i = 0; i < slidesAppended; i += 1) {
                    const index = i - Math.floor(i / cols) * cols;
                    if (gridEnabled) slides.forEach((slide, slideIndex) => {
                        if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                    }); else appendSlidesIndexes.push(index);
                }
            }
            swiper.__preventObserver__ = true;
            requestAnimationFrame(() => {
                swiper.__preventObserver__ = false;
            });
            if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
                if (appendSlidesIndexes.includes(activeSlideIndex)) appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
                if (prependSlidesIndexes.includes(activeSlideIndex)) prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
            }
            if (isPrev) prependSlidesIndexes.forEach(index => {
                slides[index].swiperLoopMoveDOM = true;
                slidesEl.prepend(slides[index]);
                slides[index].swiperLoopMoveDOM = false;
            });
            if (isNext) appendSlidesIndexes.forEach(index => {
                slides[index].swiperLoopMoveDOM = true;
                slidesEl.append(slides[index]);
                slides[index].swiperLoopMoveDOM = false;
            });
            swiper.recalcSlides();
            if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach((slide, slideIndex) => {
                swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
            });
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
                if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach(c => {
                    if (!c.destroyed && c.params.loop) c.loopFix({
                        ...loopParams,
                        slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                    });
                }); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                    ...loopParams,
                    slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            }
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {params, slidesEl} = swiper;
            if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
            swiper.recalcSlides();
            const newSlidesOrder = [];
            swiper.slides.forEach(slideEl => {
                const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
                newSlidesOrder[index] = slideEl;
            });
            swiper.slides.forEach(slideEl => {
                slideEl.removeAttribute("data-swiper-slide-index");
            });
            newSlidesOrder.forEach(slideEl => {
                slidesEl.append(slideEl);
            });
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
            if (swiper.isElement) requestAnimationFrame(() => {
                swiper.__preventObserver__ = false;
            });
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            if (swiper.isElement) swiper.__preventObserver__ = true;
            swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
            if (swiper.isElement) requestAnimationFrame(() => {
                swiper.__preventObserver__ = false;
            });
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
                targetTouch = [ ...e.changedTouches ].find(t => t.identifier === data.touchId);
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
            } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) return; else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) return;
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
            if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
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
                targetTouch = [ ...e.changedTouches ].find(t => t.identifier === data.touchId);
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
            utils_nextTick(() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            });
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
                swiper.autoplay.resizeTimeout = setTimeout(() => {
                    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
                }, 500);
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
            [ "navigation", "pagination", "scrollbar" ].forEach(prop => {
                if (typeof breakpointParams[prop] === "undefined") return;
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            });
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
            const points = Object.keys(breakpoints).map(point => {
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
            });
            points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
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
            entries.forEach(item => {
                if (typeof item === "object") Object.keys(item).forEach(classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                }); else if (typeof item === "string") resultClasses.push(prefix + item);
            });
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
                    document.querySelectorAll(params.el).forEach(containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new Swiper(newParams));
                    });
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
                swiper.modules.forEach(mod => {
                    mod({
                        params,
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                });
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach(eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                });
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
                return this.getSlideIndex(this.slides.find(slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
            }
            getSlideIndexWhenGrid(index) {
                if (this.grid && this.params.grid && this.params.grid.rows > 1) if (this.params.grid.fill === "column") index = Math.floor(index / this.params.grid.rows); else if (this.params.grid.fill === "row") index %= Math.ceil(this.slides.length / this.params.grid.rows);
                return index;
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
                const cls = swiper.el.className.split(" ").filter(className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0);
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter(className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.forEach(slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                });
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
                [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach(imageEl => {
                    if (imageEl.complete) processLazyPreloader(swiper, imageEl);
                });
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
                swiper.slides.forEach(slideEl => {
                    if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
                });
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
                    utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach(slideEl => {
                        wrapperEl.append(slideEl);
                    });
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
                if (swiper.params.loop) swiper.loopCreate(void 0, true);
                swiper.attachEvents();
                const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
                if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
                lazyElements.forEach(imageEl => {
                    if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", e => {
                        processLazyPreloader(swiper, e.target);
                    });
                });
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
                    if (slides && slides.length) slides.forEach(slideEl => {
                        slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                        slideEl.removeAttribute("style");
                        slideEl.removeAttribute("data-swiper-slide-index");
                    });
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach(eventName => {
                    swiper.off(eventName);
                });
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
                    module.forEach(m => Swiper.installModule(m));
                    return Swiper;
                }
                Swiper.installModule(module);
                return Swiper;
            }
        }
        Object.keys(prototypes).forEach(prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
                Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            });
        });
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
                if (document.activeElement && (document.activeElement.isContentEditable || document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === "input" || document.activeElement.nodeName.toLowerCase() === "textarea"))) return;
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
            on("init", () => {
                if (swiper.params.keyboard.enabled) enable();
            });
            on("destroy", () => {
                if (swiper.keyboard.enabled) disable();
            });
            Object.assign(swiper.keyboard, {
                enable,
                disable
            });
        }
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            if (swiper.params.createElements) Object.keys(checkProps).forEach(key => {
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
            });
            return params;
        }
        function classes_to_selector_classesToSelector(classes) {
            if (classes === void 0) classes = "";
            return `.${classes.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`;
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
                        el.forEach(subEl => {
                            subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                        });
                        if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
                            dynamicBulletIndex += current - (previousIndex || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.forEach(bulletEl => {
                        const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map(suffix => `${params.bulletActiveClass}${suffix}`) ].map(s => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
                        bulletEl.classList.remove(...classesToRemove);
                    });
                    if (el.length > 1) bullets.forEach(bullet => {
                        const bulletIndex = utils_elementIndex(bullet);
                        if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" ")); else if (swiper.isElement) bullet.setAttribute("part", "bullet");
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                            if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                        }
                    }); else {
                        const bullet = bullets[current];
                        if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                        if (swiper.isElement) bullets.forEach((bulletEl, bulletIndex) => {
                            bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
                        });
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
                        bullets.forEach(bullet => {
                            bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                        });
                    }
                }
                el.forEach((subEl, subElIndex) => {
                    if (params.type === "fraction") {
                        subEl.querySelectorAll(classes_to_selector_classesToSelector(params.currentClass)).forEach(fractionEl => {
                            fractionEl.textContent = params.formatFractionCurrent(current + 1);
                        });
                        subEl.querySelectorAll(classes_to_selector_classesToSelector(params.totalClass)).forEach(totalEl => {
                            totalEl.textContent = params.formatFractionTotal(total);
                        });
                    }
                    if (params.type === "progressbar") {
                        let progressbarDirection;
                        if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                        const scale = (current + 1) / total;
                        let scaleX = 1;
                        let scaleY = 1;
                        if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                        subEl.querySelectorAll(classes_to_selector_classesToSelector(params.progressbarFillClass)).forEach(progressEl => {
                            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                            progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                        });
                    }
                    if (params.type === "custom" && params.renderCustom) {
                        utils_setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total));
                        if (subElIndex === 0) emit("paginationRender", subEl);
                    } else {
                        if (subElIndex === 0) emit("paginationRender", subEl);
                        emit("paginationUpdate", subEl);
                    }
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                });
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
                el.forEach(subEl => {
                    if (params.type !== "custom") utils_setInnerHTML(subEl, paginationHTML || "");
                    if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classes_to_selector_classesToSelector(params.bulletClass)));
                });
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
                    if (el.length > 1) el = el.find(subEl => {
                        if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                        return true;
                    });
                }
                if (Array.isArray(el) && el.length === 1) el = el[0];
                Object.assign(swiper.pagination, {
                    el
                });
                el = utils_makeElementsArray(el);
                el.forEach(subEl => {
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
                });
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                let el = swiper.pagination.el;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach(subEl => {
                        subEl.classList.remove(params.hiddenClass);
                        subEl.classList.remove(params.modifierClass + params.type);
                        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                        if (params.clickable) {
                            subEl.classList.remove(...(params.clickableClass || "").split(" "));
                            subEl.removeEventListener("click", onBulletClick);
                        }
                    });
                }
                if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
            }
            on("changeDirection", () => {
                if (!swiper.pagination || !swiper.pagination.el) return;
                const params = swiper.params.pagination;
                let {el} = swiper.pagination;
                el = utils_makeElementsArray(el);
                el.forEach(subEl => {
                    subEl.classList.remove(params.horizontalClass, params.verticalClass);
                    subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                });
            });
            on("init", () => {
                if (swiper.params.pagination.enabled === false) disable(); else {
                    init();
                    render();
                    update();
                }
            });
            on("activeIndexChange", () => {
                if (typeof swiper.snapIndex === "undefined") update();
            });
            on("snapIndexChange", () => {
                update();
            });
            on("snapGridLengthChange", () => {
                render();
                update();
            });
            on("destroy", () => {
                destroy();
            });
            on("enable disable", () => {
                let {el} = swiper.pagination;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach(subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
                }
            });
            on("lock unlock", () => {
                update();
            });
            on("click", (_s, e) => {
                const targetEl = e.target;
                const el = utils_makeElementsArray(swiper.pagination.el);
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                    if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                    el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
                }
            });
            const enable = () => {
                swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
                let {el} = swiper.pagination;
                if (el) {
                    el = utils_makeElementsArray(el);
                    el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
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
                    el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
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
                raf = requestAnimationFrame(() => {
                    calcTimeLeft();
                });
            };
            const getSlideDelay = () => {
                let activeSlideEl;
                if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.find(slideEl => slideEl.classList.contains("swiper-slide-active")); else activeSlideEl = swiper.slides[swiper.activeIndex];
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
                        requestAnimationFrame(() => {
                            run();
                        });
                    }
                };
                if (delay > 0) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        proceed();
                    }, delay);
                } else requestAnimationFrame(() => {
                    proceed();
                });
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
            on("init", () => {
                if (swiper.params.autoplay.enabled) {
                    attachMouseEvents();
                    attachDocumentEvents();
                    start();
                }
            });
            on("destroy", () => {
                detachMouseEvents();
                detachDocumentEvents();
                if (swiper.autoplay.running) stop();
            });
            on("_freeModeStaticRelease", () => {
                if (pausedByTouch || pausedByInteraction) resume();
            });
            on("_freeModeNoMomentumRelease", () => {
                if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
            });
            on("beforeTransitionStart", (_s, speed, internal) => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
            });
            on("sliderFirstMove", () => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (swiper.params.autoplay.disableOnInteraction) {
                    stop();
                    return;
                }
                isTouched = true;
                pausedByTouch = false;
                pausedByInteraction = false;
                touchStartTimeout = setTimeout(() => {
                    pausedByInteraction = true;
                    pausedByTouch = true;
                    pause(true);
                }, 200);
            });
            on("touchEnd", () => {
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
            });
            on("slideChange", () => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                slideChanged = true;
            });
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
        window.addEventListener("load", () => {
            initSliders();
        });
        let addWindowScrollEvent = false;
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? +header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? +header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", () => {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    toogleClass(header, "header--scroll", true);
                    if (headerShow) {
                        if (scrollTop > scrollDirection) toogleClass(header, "header--show", false); else toogleClass(header, "header--show", true);
                        timer = setTimeout(() => {
                            toogleClass(header, "header--show", true);
                        }, headerShowTimer);
                    }
                } else {
                    toogleClass(header, "header--scroll", false);
                    if (headerShow) toogleClass(header, "header--show", false);
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            });
            function toogleClass(element, className, condition) {
                if (condition) !element.classList.contains(className) ? element.classList.add(className) : null; else element.classList.contains(className) ? element.classList.remove(className) : null;
            }
        }
        setTimeout(() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", () => {
                    document.dispatchEvent(windowScroll);
                });
            }
        }, 0);
        function paginationMoveIndicator() {
            const pagination = document.querySelector(".pagination");
            if (pagination) {
                const paginationLine = pagination.querySelector(".pagination__line");
                const paginationItems = pagination.querySelectorAll(".pagination__item");
                const paginationArrowPrev = pagination.querySelector(".pagination__arrow--prev");
                const paginationArrowNext = pagination.querySelector(".pagination__arrow--next");
                updateArrowVisibility();
                positionIndicator();
                window.addEventListener("resize", () => {
                    positionIndicator();
                });
                pagination.addEventListener("pointerover", e => {
                    const target = e.target.closest(".pagination__item, .pagination__arrow");
                    if (target && !target.classList.contains("pagination__item--active")) moveIndicator(target); else positionIndicator();
                });
                pagination.addEventListener("pointerleave", () => positionIndicator());
                function positionIndicator() {
                    const activeItem = pagination.querySelector(".pagination__item.pagination__item--active");
                    if (activeItem) moveIndicator(activeItem);
                }
                function updateArrowVisibility() {
                    const activeIndex = [ ...paginationItems ].findIndex(item => item.classList.contains("pagination__item--active"));
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
                const uniqParams = uniqArray(Array.from(watchItems).map(item => {
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
                }));
                uniqParams.forEach(uniqParam => {
                    const [rootParam, marginParam, thresholdParam] = uniqParam.split("|");
                    const paramsWatch = {
                        root: rootParam,
                        margin: marginParam,
                        threshold: thresholdParam
                    };
                    const groupItems = Array.from(watchItems).filter(item => {
                        let {watchRoot, watchMargin, watchThreshold} = item.dataset;
                        watchRoot = watchRoot ? watchRoot : null;
                        watchMargin = watchMargin ? watchMargin : "0px";
                        watchThreshold = watchThreshold ? watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    });
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                });
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
                items.forEach(item => this.observer.observe(item));
            }
            scrollWatcherCreate(configWatcher) {
                this.observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        this.scrollWatcherCallback(entry, observer);
                    });
                }, configWatcher);
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
        /*! choices.js v11.1.0 | © 2025 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
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
            }, function() {
                return getRandomNumber(0, 36).toString(36);
            }).join("");
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
            return aKeys.filter(function(i) {
                return bKeys.indexOf(i) < 0;
            });
        };
        var getClassNames = function(ClassNames) {
            return Array.isArray(ClassNames) ? ClassNames : [ ClassNames ];
        };
        var getClassNamesSelector = function(option) {
            if (option && Array.isArray(option)) return option.map(function(item) {
                return ".".concat(item);
            }).join("");
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
                requestAnimationFrame(function() {
                    _this._animateScroll(destination, direction);
                });
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
                if (continueAnimation) requestAnimationFrame(function() {
                    _this._animateScroll(destination, direction);
                });
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
            if (typeof input === "string") input = input.split(" ").filter(function(s) {
                return s.length;
            });
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
                var choices = group.choices.map(function(e) {
                    return mapInputToChoice(e, false);
                });
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
                choices.forEach(function(obj) {
                    var choice = obj;
                    if (choice.element) return;
                    var option = _this.template(choice);
                    fragment.appendChild(option);
                    choice.element = option;
                });
                this.element.appendChild(fragment);
            };
            WrappedSelect.prototype.optionsAsChoices = function() {
                var _this = this;
                var choices = [];
                this.element.querySelectorAll(":scope > option, :scope > optgroup").forEach(function(e) {
                    if (isHtmlOption(e)) choices.push(_this._optionToChoice(e)); else if (isHtmlOptgroup(e)) choices.push(_this._optgroupToChoice(e));
                });
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
                    label: option.label,
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
                var choices = Array.from(options).map(function(option) {
                    return _this._optionToChoice(option);
                });
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
                state = state.filter(function(choice) {
                    return choice.id !== action.item.id;
                });
                break;

              case ActionType.REMOVE_CHOICE:
                removeItem(action.choice);
                state = state.filter(function(item) {
                    return item.id !== action.choice.id;
                });
                break;

              case ActionType.HIGHLIGHT_ITEM:
                var highlighted = action.highlighted;
                var item = state.find(function(obj) {
                    return obj.id === action.item.id;
                });
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
                if (action.choice.group) action.choice.group.choices = action.choice.group.choices.filter(function(obj) {
                    return obj.id !== action.choice.id;
                });
                state = state.filter(function(obj) {
                    return obj.id !== action.choice.id;
                });
                break;

              case ActionType.ADD_ITEM:
              case ActionType.REMOVE_ITEM:
                action.item.choiceEl = void 0;
                break;

              case ActionType.FILTER_CHOICES:
                var scoreLookup_1 = [];
                action.results.forEach(function(result) {
                    scoreLookup_1[result.item.id] = result;
                });
                state.forEach(function(choice) {
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
                });
                break;

              case ActionType.ACTIVATE_CHOICES:
                state.forEach(function(choice) {
                    choice.active = action.active;
                    if (context && context.appendGroupInSearch) choice.choiceEl = void 0;
                });
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
                if (this._txn) this._changeSet = changes; else this._listeners.forEach(function(l) {
                    return l(changes);
                });
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
                Object.keys(reducers).forEach(function(key) {
                    var stateUpdate = reducers[key](state[key], action, _this._context);
                    if (stateUpdate.update) {
                        hasChanges = true;
                        changes[key] = true;
                        state[key] = stateUpdate.state;
                    }
                });
                if (hasChanges) if (this._txn) this._changeSet = changes; else this._listeners.forEach(function(l) {
                    return l(changes);
                });
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
                            this._listeners.forEach(function(l) {
                                return l(changeSet_1);
                            });
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
                    return this.items.filter(function(item) {
                        return item.active && item.highlighted;
                    });
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
                    return this.choices.filter(function(choice) {
                        return choice.active;
                    });
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Store.prototype, "searchableChoices", {
                get: function() {
                    return this.choices.filter(function(choice) {
                        return !choice.disabled && !choice.placeholder;
                    });
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
                    return this.state.groups.filter(function(group) {
                        var isActive = group.active && !group.disabled;
                        var hasActiveOptions = _this.state.choices.some(function(choice) {
                            return choice.active && !choice.disabled;
                        });
                        return isActive && hasActiveOptions;
                    }, []);
                },
                enumerable: false,
                configurable: true
            });
            Store.prototype.inTxn = function() {
                return this._txn > 0;
            };
            Store.prototype.getChoiceById = function(id) {
                return this.activeChoices.find(function(choice) {
                    return choice.id === id;
                });
            };
            Store.prototype.getGroupById = function(id) {
                return this.groups.find(function(group) {
                    return group.id === id;
                });
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
                r && (o = o.filter(function(r) {
                    return Object.getOwnPropertyDescriptor(e, r).enumerable;
                })), t.push.apply(t, o);
            }
            return t;
        }
        function _objectSpread2(e) {
            for (var r = 1; r < arguments.length; r++) {
                var t = null != arguments[r] ? arguments[r] : {};
                r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
                    _defineProperty(e, r, t[r]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
                    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                });
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
                keys.forEach(key => {
                    let obj = createKey(key);
                    this._keys.push(obj);
                    this._keyMap[obj.id] = obj;
                    totalWeight += obj.weight;
                });
                this._keys.forEach(key => {
                    key.weight /= totalWeight;
                });
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
                keys.forEach((key, idx) => {
                    this._keysMap[key.id] = idx;
                });
            }
            create() {
                if (this.isCreated || !this.docs.length) return;
                this.isCreated = true;
                if (isString(this.docs[0])) this.docs.forEach((doc, docIndex) => {
                    this._addString(doc, docIndex);
                }); else this.docs.forEach((doc, docIndex) => {
                    this._addObject(doc, docIndex);
                });
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
                this.keys.forEach((key, keyIndex) => {
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
                            } else if (isArray(value)) value.forEach((item, k) => {
                                stack.push({
                                    nestedArrIndex: k,
                                    value: item
                                });
                            });
                        }
                        record.$[keyIndex] = subRecords;
                    } else if (isString(value) && !isBlank(value)) {
                        let subRecord = {
                            v: value,
                            n: this.norm.get(value)
                        };
                        record.$[keyIndex] = subRecord;
                    }
                });
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
                this.chunks.forEach(({pattern, alphabet, startIndex}) => {
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
                });
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
            return pattern.split(OR_TOKEN).map(item => {
                let query = item.trim().split(SPACE_RE).filter(item => item && !!item.trim());
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
            });
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
            [LogicalOperator.AND]: Object.keys(query).map(key => ({
                [key]: query[key]
            }))
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
                keys.forEach(key => {
                    const value = query[key];
                    if (isArray(value)) value.forEach(item => {
                        node.children.push(next(item));
                    });
                });
                return node;
            };
            if (!isExpression(query)) query = convertToExplicit(query);
            return next(query);
        }
        function computeScore(results, {ignoreFieldNorm = Config.ignoreFieldNorm}) {
            results.forEach(result => {
                let totalScore = 1;
                result.matches.forEach(({key, norm, score}) => {
                    const weight = key ? key.weight : null;
                    totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
                });
                result.score = totalScore;
            });
        }
        function transformMatches(result, data) {
            const matches = result.matches;
            data.matches = [];
            if (!isDefined(matches)) return;
            matches.forEach(match => {
                if (!isDefined(match.indices) || !match.indices.length) return;
                const {indices, value} = match;
                let obj = {
                    indices,
                    value
                };
                if (match.key) obj.key = match.key.src;
                if (match.idx > -1) obj.refIndex = match.idx;
                data.matches.push(obj);
            });
        }
        function transformScore(result, data) {
            data.score = result.score;
        }
        function format(results, docs, {includeMatches = Config.includeMatches, includeScore = Config.includeScore} = {}) {
            const transformers = [];
            if (includeMatches) transformers.push(transformMatches);
            if (includeScore) transformers.push(transformScore);
            return results.map(result => {
                const {idx} = result;
                const data = {
                    item: docs[idx],
                    refIndex: idx
                };
                if (transformers.length) transformers.forEach(transformer => {
                    transformer(result, data);
                });
                return data;
            });
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
                records.forEach(({v: text, i: idx, n: norm}) => {
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
                });
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
                records.forEach(({$: item, i: idx}) => {
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
                            expResults.forEach(({matches}) => {
                                resultMap[idx].matches.push(...matches);
                            });
                        }
                    }
                });
                return results;
            }
            _searchObjectList(query) {
                const searcher = createSearcher(query, this.options);
                const {keys, records} = this._myIndex;
                const results = [];
                records.forEach(({$: item, i: idx}) => {
                    if (!isDefined(item)) return;
                    let matches = [];
                    keys.forEach((key, keyIndex) => {
                        matches.push(...this._findMatches({
                            key,
                            value: item[keyIndex],
                            searcher
                        }));
                    });
                    if (matches.length) results.push({
                        idx,
                        item,
                        matches
                    });
                });
                return results;
            }
            _findMatches({key, value, searcher}) {
                if (!isDefined(value)) return [];
                let matches = [];
                if (isArray(value)) value.forEach(({v: text, i: idx, n: norm}) => {
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
                }); else {
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
                return results.map(function(value, i) {
                    return {
                        item: value.item,
                        score: value.score || 0,
                        rank: i + 1
                    };
                });
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
                ObjectsInConfig.forEach(function(key) {
                    _this.config[key] = __assign(__assign(__assign({}, defaults.allOptions[key]), defaults.options[key]), userConfig[key]);
                });
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
                this._initialItems = this._store.items.map(function(choice) {
                    return choice.value;
                });
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
                var choice = this._store.items.find(function(c) {
                    return c.id === item.id;
                });
                if (!choice || choice.highlighted) return this;
                this._store.dispatch(highlightItem(choice, true));
                if (runEvent) this.passedElement.triggerEvent(EventType.highlightItem, this._getChoiceForOutput(choice));
                return this;
            };
            Choices.prototype.unhighlightItem = function(item, runEvent) {
                if (runEvent === void 0) runEvent = true;
                if (!item || !item.id) return this;
                var choice = this._store.items.find(function(c) {
                    return c.id === item.id;
                });
                if (!choice || !choice.highlighted) return this;
                this._store.dispatch(highlightItem(choice, false));
                if (runEvent) this.passedElement.triggerEvent(EventType.unhighlightItem, this._getChoiceForOutput(choice));
                return this;
            };
            Choices.prototype.highlightAll = function() {
                var _this = this;
                this._store.withTxn(function() {
                    _this._store.items.forEach(function(item) {
                        if (!item.highlighted) {
                            _this._store.dispatch(highlightItem(item, true));
                            _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
                        }
                    });
                });
                return this;
            };
            Choices.prototype.unhighlightAll = function() {
                var _this = this;
                this._store.withTxn(function() {
                    _this._store.items.forEach(function(item) {
                        if (item.highlighted) {
                            _this._store.dispatch(highlightItem(item, false));
                            _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
                        }
                    });
                });
                return this;
            };
            Choices.prototype.removeActiveItemsByValue = function(value) {
                var _this = this;
                this._store.withTxn(function() {
                    _this._store.items.filter(function(item) {
                        return item.value === value;
                    }).forEach(function(item) {
                        return _this._removeItem(item);
                    });
                });
                return this;
            };
            Choices.prototype.removeActiveItems = function(excludedId) {
                var _this = this;
                this._store.withTxn(function() {
                    _this._store.items.filter(function(_a) {
                        var id = _a.id;
                        return id !== excludedId;
                    }).forEach(function(item) {
                        return _this._removeItem(item);
                    });
                });
                return this;
            };
            Choices.prototype.removeHighlightedItems = function(runEvent) {
                var _this = this;
                if (runEvent === void 0) runEvent = false;
                this._store.withTxn(function() {
                    _this._store.highlightedActiveItems.forEach(function(item) {
                        _this._removeItem(item);
                        if (runEvent) _this._triggerChange(item.value);
                    });
                });
                return this;
            };
            Choices.prototype.showDropdown = function(preventInputFocus) {
                var _this = this;
                if (this.dropdown.isActive) return this;
                if (preventInputFocus === void 0) preventInputFocus = !this._canSearch;
                requestAnimationFrame(function() {
                    _this.dropdown.show();
                    var rect = _this.dropdown.element.getBoundingClientRect();
                    _this.containerOuter.open(rect.bottom, rect.height);
                    if (!preventInputFocus) _this.input.focus();
                    _this.passedElement.triggerEvent(EventType.showDropdown);
                });
                return this;
            };
            Choices.prototype.hideDropdown = function(preventInputBlur) {
                var _this = this;
                if (!this.dropdown.isActive) return this;
                requestAnimationFrame(function() {
                    _this.dropdown.hide();
                    _this.containerOuter.close();
                    if (!preventInputBlur && _this._canSearch) {
                        _this.input.removeActiveDescendant();
                        _this.input.blur();
                    }
                    _this.passedElement.triggerEvent(EventType.hideDropdown);
                });
                return this;
            };
            Choices.prototype.getValue = function(valueOnly) {
                var _this = this;
                var values = this._store.items.map(function(item) {
                    return valueOnly ? item.value : _this._getChoiceForOutput(item);
                });
                return this._isSelectOneElement || this.config.singleModeForMultiSelect ? values[0] : values;
            };
            Choices.prototype.setValue = function(items) {
                var _this = this;
                if (!this.initialisedOK) {
                    this._warnChoicesInitFailed("setValue");
                    return this;
                }
                this._store.withTxn(function() {
                    items.forEach(function(value) {
                        if (value) _this._addChoice(mapInputToChoice(value, false));
                    });
                });
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
                this._store.withTxn(function() {
                    var choiceValue = Array.isArray(value) ? value : [ value ];
                    choiceValue.forEach(function(val) {
                        return _this._findAndSelectChoiceByValue(val);
                    });
                    _this.unhighlightAll();
                });
                this._searcher.reset();
                return this;
            };
            Choices.prototype.setChoices = function(choicesArrayOrFetcher, value, label, replaceChoices, clearSearchFlag, replaceItems) {
                var _this = this;
                if (choicesArrayOrFetcher === void 0) choicesArrayOrFetcher = [];
                if (value === void 0) value = "value";
                if (label === void 0) label = "label";
                if (replaceChoices === void 0) replaceChoices = false;
                if (clearSearchFlag === void 0) clearSearchFlag = true;
                if (replaceItems === void 0) replaceItems = false;
                if (!this.initialisedOK) {
                    this._warnChoicesInitFailed("setChoices");
                    return this;
                }
                if (!this._isSelectElement) throw new TypeError("setChoices can't be used with INPUT based Choices");
                if (typeof value !== "string" || !value) throw new TypeError("value parameter must be a name of 'value' field in passed objects");
                if (typeof choicesArrayOrFetcher === "function") {
                    var fetcher_1 = choicesArrayOrFetcher(this);
                    if (typeof Promise === "function" && fetcher_1 instanceof Promise) return new Promise(function(resolve) {
                        return requestAnimationFrame(resolve);
                    }).then(function() {
                        return _this._handleLoadingState(true);
                    }).then(function() {
                        return fetcher_1;
                    }).then(function(data) {
                        return _this.setChoices(data, value, label, replaceChoices, clearSearchFlag, replaceItems);
                    }).catch(function(err) {
                        if (!_this.config.silent) console.error(err);
                    }).then(function() {
                        return _this._handleLoadingState(false);
                    }).then(function() {
                        return _this;
                    });
                    if (!Array.isArray(fetcher_1)) throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
                    return this.setChoices(fetcher_1, value, label, false);
                }
                if (!Array.isArray(choicesArrayOrFetcher)) throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
                this.containerOuter.removeLoadingState();
                this._store.withTxn(function() {
                    if (clearSearchFlag) _this._isSearching = false;
                    if (replaceChoices) _this.clearChoices(true, replaceItems);
                    var isDefaultValue = value === "value";
                    var isDefaultLabel = label === "label";
                    choicesArrayOrFetcher.forEach(function(groupOrChoice) {
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
                            var choiceFull = mapInputToChoice(choice, false);
                            _this._addChoice(choiceFull);
                            if (choiceFull.placeholder && !_this._hasNonChoicePlaceholder) _this._placeholderValue = unwrapStringForEscaped(choiceFull.label);
                        }
                    });
                    _this.unhighlightAll();
                });
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
                this._store.withTxn(function() {
                    var choicesFromOptions = _this.passedElement.optionsAsChoices();
                    var existingItems = {};
                    if (!deselectAll) _this._store.items.forEach(function(choice) {
                        if (choice.id && choice.active && choice.selected) existingItems[choice.value] = true;
                    });
                    _this.clearStore(false);
                    var updateChoice = function(choice) {
                        if (deselectAll) _this._store.dispatch(removeItem$1(choice)); else if (existingItems[choice.value]) choice.selected = true;
                    };
                    choicesFromOptions.forEach(function(groupOrChoice) {
                        if ("choices" in groupOrChoice) {
                            groupOrChoice.choices.forEach(updateChoice);
                            return;
                        }
                        updateChoice(groupOrChoice);
                    });
                    _this._addPredefinedChoices(choicesFromOptions, selectFirstOption, withEvents);
                    if (_this._isSearching) _this._searchChoices(_this.input.value);
                });
                return this;
            };
            Choices.prototype.removeChoice = function(value) {
                var choice = this._store.choices.find(function(c) {
                    return c.value === value;
                });
                if (!choice) return this;
                this._clearNotice();
                this._store.dispatch(removeChoice(choice));
                this._searcher.reset();
                if (choice.selected) this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(choice));
                return this;
            };
            Choices.prototype.clearChoices = function(clearOptions, clearItems) {
                var _this = this;
                if (clearOptions === void 0) clearOptions = true;
                if (clearItems === void 0) clearItems = false;
                if (clearOptions) if (clearItems) this.passedElement.element.replaceChildren(""); else this.passedElement.element.querySelectorAll(":not([selected])").forEach(function(el) {
                    el.remove();
                });
                this.itemList.element.replaceChildren("");
                this.choiceList.element.replaceChildren("");
                this._clearNotice();
                this._store.withTxn(function() {
                    var items = clearItems ? [] : _this._store.items;
                    _this._store.reset();
                    items.forEach(function(item) {
                        _this._store.dispatch(addChoice(item));
                        _this._store.dispatch(addItem(item));
                    });
                });
                this._searcher.reset();
                return this;
            };
            Choices.prototype.clearStore = function(clearOptions) {
                if (clearOptions === void 0) clearOptions = true;
                this.clearChoices(clearOptions, true);
                this._stopSearch();
                this._lastAddedChoiceId = 0;
                this._lastAddedGroupId = 0;
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
                    var backingOptions = activeChoices.filter(function(choice) {
                        return !choice.element;
                    });
                    if (backingOptions.length) this.passedElement.addOptions(backingOptions);
                }
                var fragment = document.createDocumentFragment();
                var renderableChoices = function(choices) {
                    return choices.filter(function(choice) {
                        return !choice.placeholder && (isSearching ? !!choice.rank : config.renderSelectedChoices || !choice.selected);
                    });
                };
                var selectableChoices = false;
                var renderChoices = function(choices, withinGroup, groupLabel) {
                    if (isSearching) choices.sort(sortByRank); else if (config.shouldSort) choices.sort(config.sorter);
                    var choiceLimit = choices.length;
                    choiceLimit = !withinGroup && renderLimit && choiceLimit > renderLimit ? renderLimit : choiceLimit;
                    choiceLimit--;
                    choices.every(function(choice, index) {
                        var dropdownItem = choice.choiceEl || _this._templates.choice(config, choice, config.itemSelectText, groupLabel);
                        choice.choiceEl = dropdownItem;
                        fragment.appendChild(dropdownItem);
                        if (isSearching || !choice.selected) selectableChoices = true;
                        return index < choiceLimit;
                    });
                };
                if (activeChoices.length) {
                    if (config.resetScrollPosition) requestAnimationFrame(function() {
                        return _this.choiceList.scrollToTop();
                    });
                    if (!this._hasNonChoicePlaceholder && !isSearching && this._isSelectOneElement) renderChoices(activeChoices.filter(function(choice) {
                        return choice.placeholder && !choice.group;
                    }), false, void 0);
                    if (activeGroups.length && !isSearching) {
                        if (config.shouldSort) activeGroups.sort(config.sorter);
                        renderChoices(activeChoices.filter(function(choice) {
                            return !choice.placeholder && !choice.group;
                        }), false, void 0);
                        activeGroups.forEach(function(group) {
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
                        });
                    } else renderChoices(renderableChoices(activeChoices), false, void 0);
                }
                if (!selectableChoices && (isSearching || !fragment.children.length || !config.renderSelectedChoices)) {
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
                var addedItems = !!fragment.childNodes.length;
                if (this._isSelectOneElement) {
                    var existingItems = itemList.children.length;
                    if (addedItems || existingItems > 1) {
                        var placeholder = itemList.querySelector(getClassNamesSelector(config.classNames.placeholder));
                        if (placeholder) placeholder.remove();
                    } else if (!addedItems && !existingItems && this._placeholderValue) {
                        addedItems = true;
                        addItemToFragment(mapInputToChoice({
                            selected: true,
                            value: "",
                            label: this._placeholderValue,
                            placeholder: true
                        }, false));
                    }
                }
                if (addedItems) {
                    itemList.append(fragment);
                    if (config.shouldSortItems && !this._isSelectOneElement) {
                        items.sort(config.sorter);
                        items.forEach(function(item) {
                            var el = itemFromList(item);
                            if (el) {
                                el.remove();
                                fragment.append(el);
                            }
                        });
                        itemList.append(fragment);
                    }
                }
                if (this._isTextElement) this.passedElement.value = items.map(function(_a) {
                    var value = _a.value;
                    return value;
                }).join(config.delimiter);
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
                var itemToRemove = id && items.find(function(item) {
                    return item.id === id;
                });
                if (!itemToRemove) return;
                this._store.withTxn(function() {
                    _this._removeItem(itemToRemove);
                    _this._triggerChange(itemToRemove.value);
                    if (_this._isSelectOneElement && !_this._hasNonChoicePlaceholder) {
                        var placeholderChoice = (_this.config.shouldSort ? _this._store.choices.reverse() : _this._store.choices).find(function(choice) {
                            return choice.placeholder;
                        });
                        if (placeholderChoice) {
                            _this._addItem(placeholderChoice);
                            _this.unhighlightAll();
                            if (placeholderChoice.value) _this._triggerChange(placeholderChoice.value);
                        }
                    }
                });
            };
            Choices.prototype._handleItemAction = function(element, hasShiftKey) {
                var _this = this;
                if (hasShiftKey === void 0) hasShiftKey = false;
                var items = this._store.items;
                if (!items.length || !this.config.removeItems || this._isSelectOneElement) return;
                var id = parseDataSetId(element);
                if (!id) return;
                items.forEach(function(item) {
                    if (item.id === id && !item.highlighted) _this.highlightItem(item); else if (!hasShiftKey && item.highlighted) _this.unhighlightItem(item);
                });
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
                    this._store.withTxn(function() {
                        _this._addItem(choice, true, true);
                        _this.clearInput();
                        _this.unhighlightAll();
                    });
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
                var hasHighlightedItems = items.some(function(item) {
                    return item.highlighted;
                });
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
                    this._presetChoices = config.items.map(function(e) {
                        return mapInputToChoice(e, false);
                    });
                    if (this.passedElement.value) {
                        var elementItems = this.passedElement.value.split(config.delimiter).map(function(e) {
                            return mapInputToChoice(e, false, _this.config.allowHtmlUserInput);
                        });
                        this._presetChoices = this._presetChoices.concat(elementItems);
                    }
                    this._presetChoices.forEach(function(choice) {
                        choice.selected = true;
                    });
                } else if (this._isSelectElement) {
                    this._presetChoices = config.choices.map(function(e) {
                        return mapInputToChoice(e, true);
                    });
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
                } else if (this._store.choices.some(function(option) {
                    return !option.active;
                })) this._stopSearch();
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
                if (this._notice && this._notice.type === NoticeTypes.addChoice) this._clearNotice();
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
                    var foundChoice = this._store.choices.find(function(choice) {
                        return config.valueComparer(choice.value, value);
                    });
                    if (foundChoice) {
                        if (this._isSelectElement) {
                            this._displayNotice("", NoticeTypes.addChoice);
                            return false;
                        }
                        if (!config.duplicateItemsAllowed) {
                            canAddItem = false;
                            notice = resolveNoticeFunction(config.uniqueItemText, value);
                        }
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
                this._store.withTxn(function() {
                    addedItem = _this._findAndSelectChoiceByValue(value, true);
                    if (!addedItem) {
                        if (!_this._canAddUserChoices) return;
                        if (!_this._canCreateItem(value)) return;
                        _this._addChoice(mapInputToChoice(value, false, _this.config.allowHtmlUserInput), true, true);
                        addedItem = true;
                    }
                    _this.clearInput();
                    _this.unhighlightAll();
                });
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
                    } else if (target === this.containerOuter.element) {
                        containerOuter.removeFocusState();
                        if (!this._canSearch) this.hideDropdown(true);
                    }
                } else {
                    this._isScrollingOnIe = false;
                    this.input.element.focus();
                }
            };
            Choices.prototype._onFormReset = function() {
                var _this = this;
                this._store.withTxn(function() {
                    _this.clearInput();
                    _this.hideDropdown();
                    _this.refresh(false, false, true);
                    if (_this._initialItems.length) _this.setChoiceByValue(_this._initialItems);
                });
            };
            Choices.prototype._highlightChoice = function(el) {
                if (el === void 0) el = null;
                var choices = Array.from(this.dropdown.element.querySelectorAll(selectableChoiceIdentifier));
                if (!choices.length) return;
                var passedEl = el;
                var highlightedState = this.config.classNames.highlightedState;
                var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(getClassNamesSelector(highlightedState)));
                highlightedChoices.forEach(function(choice) {
                    removeClassesFromElement(choice, highlightedState);
                    choice.setAttribute("aria-selected", "false");
                });
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
                if (!config.duplicateItemsAllowed && this._store.choices.find(function(c) {
                    return config.valueComparer(c.value, choice.value);
                })) return;
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
                group.choices.forEach(function(item) {
                    item.group = group;
                    if (group.disabled) item.disabled = true;
                    _this._addChoice(item, withEvents);
                });
            };
            Choices.prototype._createTemplates = function() {
                var _this = this;
                var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
                var userTemplates = {};
                if (typeof callbackOnCreateTemplates === "function") userTemplates = callbackOnCreateTemplates.call(this, strToEl, escapeForTemplate, getClassNames);
                var templating = {};
                Object.keys(this._templates).forEach(function(name) {
                    if (name in userTemplates) templating[name] = userTemplates[name].bind(_this); else templating[name] = _this._templates[name].bind(_this);
                });
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
                this._store.subscribe(this._render).withTxn(function() {
                    _this._addPredefinedChoices(_this._presetChoices, _this._isSelectOneElement && !_this._hasNonChoicePlaceholder, false);
                });
                if (!this._store.choices.length || this._isSelectOneElement && this._hasNonChoicePlaceholder) this._render();
            };
            Choices.prototype._addPredefinedChoices = function(choices, selectFirstOption, withEvents) {
                var _this = this;
                if (selectFirstOption === void 0) selectFirstOption = false;
                if (withEvents === void 0) withEvents = true;
                if (selectFirstOption) {
                    var noSelectedChoices = choices.findIndex(function(choice) {
                        return choice.selected;
                    }) === -1;
                    if (noSelectedChoices) choices.some(function(choice) {
                        if (choice.disabled || "choices" in choice) return false;
                        choice.selected = true;
                        return true;
                    });
                }
                choices.forEach(function(item) {
                    if ("choices" in item) {
                        if (_this._isSelectElement) _this._addGroup(item, withEvents);
                    } else _this._addChoice(item, withEvents);
                });
            };
            Choices.prototype._findAndSelectChoiceByValue = function(value, userTriggered) {
                var _this = this;
                if (userTriggered === void 0) userTriggered = false;
                var foundChoice = this._store.choices.find(function(choice) {
                    return _this.config.valueComparer(choice.value, value);
                });
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
            Choices.version = "11.1.0";
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
            objectModules.select.passedElement.element.addEventListener("change", function(e) {
                addSpanSelectItem();
            });
            function addSpanSelectItem() {
                const choicesInner = document.querySelector(".choices__inner");
                const choicesItem = choicesInner.querySelector(".choices__item.choices__item--selectable");
                choicesItem.insertAdjacentHTML("afterbegin", `<span>Sort by:</span>`);
            }
        }
        if (selectsUserForm.length > 0) {
            objectModules.selects = [];
            selectsUserForm.forEach(selectUserForm => {
                const select = new Choices(selectUserForm, {
                    shouldSort: false,
                    position: "bottom",
                    placeholder: true,
                    placeholderValue: " ",
                    searchEnabled: false,
                    itemSelectText: ""
                });
                objectModules.selects.push(select);
            });
        }
        function filterBlockClear() {
            document.addEventListener("click", e => {
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
            });
            function clearButtonShowHide(target, show = true) {
                const filterBlock = target.closest(".filter__block");
                const clearButton = filterBlock.querySelector(".filter__clear");
                show ? clearButton.classList.add("is-visible") : clearButton.classList.remove("is-visible");
            }
            function checkedInputs(filterBlock) {
                const checkboxInputs = filterBlock.querySelectorAll(".checkbox__input");
                return [ ...checkboxInputs ].some(checkbox => checkbox.checked);
            }
            function clearCheckedInputs(filterBlock) {
                const checkboxInputs = filterBlock.querySelectorAll(".checkbox__input");
                checkboxInputs.forEach(checkbox => checkbox.checked ? checkbox.checked = false : null);
            }
        }
        function openFilterMenu() {
            document.addEventListener("click", ({target}) => {
                if (bodyLockStatus && target.closest("[data-button-filter-menu]")) {
                    document.documentElement.classList.add("filter-menu-open");
                    return;
                }
                if (target.closest(".filter__close") && document.documentElement.classList.contains("filter-menu-open")) document.documentElement.classList.remove("filter-menu-open");
                if (!target.closest("[data-filter]") && document.documentElement.classList.contains("filter-menu-open")) document.documentElement.classList.remove("filter-menu-open");
            });
        }
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            if (!tabs.length > 0) return;
            const hash = getHash();
            let tabsActiveHash = hash && hash.startsWith("tab-") ? hash.replace("tab-", "").split("-") : [];
            tabs.forEach((tabsBlock, index) => {
                initTabs(tabsBlock, index);
                tabsBlock.addEventListener("click", tabsAction);
                tabsBlock.addEventListener("keydown", keyDownAction);
            });
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", () => {
                    updateControlPosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                updateControlPosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function updateControlPosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach(tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    const tabsControl = tabsMediaItem.querySelector("[data-tabs-controls]");
                    const tabsControls = tabsMediaItem.querySelectorAll("[data-tabs-control]");
                    const tabsContent = tabsMediaItem.querySelector("[data-tabs-content]");
                    const tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    const tabsControlArray = Array.from(tabsControls).filter(tabControl => tabControl.closest("[data-tabs]") === tabsMediaItem);
                    const tabsContentArray = Array.from(tabsContentItems).filter(tabContentItem => tabContentItem.closest("[data-tabs]") === tabsMediaItem);
                    tabsContentArray.forEach((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsControlArray[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("tab-accordion");
                        } else {
                            tabsControl.append(tabsControlArray[index]);
                            tabsMediaItem.classList.remove("tab-accordion");
                        }
                    });
                });
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
                tabsContentItems.forEach((tabsContentItem, index) => {
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
                });
            }
            function updateTabsStatus(tabsBlock) {
                const tabsControls = tabsBlock.querySelectorAll("[data-tabs-control]");
                const tabsContentItems = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockAnimateDuration = getTabsAnimateDuration(tabsBlock);
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                if (tabsContentItems.length > 0) {
                    const tabsContentArray = Array.from(tabsContentItems).filter(item => item.closest("[data-tabs]") === tabsBlock);
                    const tabsControlsArray = Array.from(tabsControls).filter(item => item.closest("[data-tabs]") === tabsBlock);
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContentArray.forEach((tabsContentItem, index) => {
                        if (tabsControlsArray[index].classList.contains("is-active")) {
                            tabsContentItem.removeAttribute("tabindex");
                            contentTabsToggle(tabsContentItem, tabsBlockAnimateDuration);
                            if (isHash && !tabsContentItem.closest(".modal")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else {
                            tabsContentItem.setAttribute("tabindex", "-1");
                            contentTabsToggle(tabsContentItem, tabsBlockAnimateDuration, false);
                        }
                    });
                }
            }
            function contentTabsToggle(tabsContentItem, animateDuration, isActive = true) {
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
                    const [tabActiveControl] = Array.from(tabsControlItems).filter(item => item.classList.contains("is-active") && item.closest("[data-tabs]") === tabsBlock);
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
                    const currentIndex = tabsControls.findIndex(itemIndex => itemIndex === tabControl);
                    const [tabActiveControl] = tabsControls.filter(item => item.classList.contains("is-active") && item.closest("[data-tabs]") === tabsBlock);
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
            function toggleTabSelected(tabControl, isActive = false) {
                !isActive ? tabControl.setAttribute("tabindex", "-1") : tabControl.removeAttribute("tabindex");
                tabControl.setAttribute("aria-selected", `${!isActive ? false : true}`);
                tabControl.classList.toggle("is-active");
            }
        }
        function showInputsPasswords() {
            document.addEventListener("click", ({target}) => {
                if (target.closest("[data-change-password]")) {
                    const passwordInputsBlock = document.querySelector(".form-user__password");
                    if (passwordInputsBlock && !passwordInputsBlock.classList.contains("is-visible")) passwordInputsBlock.classList.add("is-visible");
                }
            });
        }
        function openAccountMenu() {
            document.addEventListener("click", ({target}) => {
                if (bodyLockStatus && target.closest("[data-button-account-menu]")) {
                    document.documentElement.classList.add("account-menu-open");
                    return;
                }
                if (target.closest(".menu-account__close") && document.documentElement.classList.contains("account-menu-open")) document.documentElement.classList.remove("account-menu-open");
                if (!target.closest("[data-menu-account]") && document.documentElement.classList.contains("account-menu-open")) document.documentElement.classList.remove("account-menu-open");
            });
        }
        function removeOrder() {
            const accountSection = document.querySelector(".account");
            if (!accountSection) return;
            document.addEventListener("click", ({target}) => {
                if (target.closest("[data-remove-order-button]")) {
                    const removeButton = target.closest("[data-remove-order-button]");
                    const order = removeButton.closest(".order");
                    const bodyStyles = window.getComputedStyle(document.body);
                    const speedStyle = +bodyStyles.getPropertyValue("--remove-duration").replace("ms", "");
                    order ? order.classList.add("remove") : null;
                    setTimeout(() => {
                        order.remove();
                    }, speedStyle);
                }
            });
        }
        function quantity() {
            document.addEventListener("click", ({target}) => {
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
                        } else if (value < 1) {
                            value = valueElement.dataset.quantityMin;
                            quantityMinus.disabled = true;
                        }
                    }
                    target.closest("[data-quantity]").querySelector("[data-quantity-value]").value = value;
                }
            });
        }
        const cartSection = document.querySelector(".cart");
        if (cartSection) window.addEventListener("load", () => {
            cartLoad();
        });
        function cartLoad() {
            const titleCountItems = cartSection.querySelector(".cart__title span");
            const totalBlock = cartSection.querySelector(".total-cart");
            const totalValue = totalBlock.querySelector(".total-cart__value");
            const bodyStyles = window.getComputedStyle(document.body);
            const speedStyle = +bodyStyles.getPropertyValue("--remove-duration").replace("ms", "");
            updateTitleItems();
            productCartPriceTotal();
            totalCart();
            document.addEventListener("click", ({target}) => {
                if (target.closest("[data-remove-order-button]")) {
                    const removeButton = target.closest("[data-remove-order-button]");
                    const order = removeButton.closest(".products-cart__item");
                    order ? order.classList.add("remove") : null;
                    setTimeout(() => {
                        order.remove();
                        updateTitleItems();
                        totalCart();
                    }, speedStyle);
                }
                if (target.closest("[data-quantity-plus]") || target.closest("[data-quantity-minus]")) {
                    const quantityInput = target.closest("[data-quantity]").querySelector("[data-quantity-value]");
                    updateProductCartPriceTotal(quantityInput);
                    totalCart();
                }
            });
            function totalCart() {
                const totalPriceArr = [];
                let currency;
                const productsCartItems = cartSection.querySelectorAll(".products-cart__item");
                if (productsCartItems.length > 0) {
                    productsCartItems.forEach(item => {
                        const product = item.querySelector(".products-cart__order");
                        currency = product.dataset.currency;
                        const {total} = item.querySelector(".products-cart__total").dataset;
                        totalPriceArr.push(+total);
                    });
                    const totalSumCart = totalPriceArr.reduce((sum, price) => sum + price, 0);
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
                productsCartItems.forEach(item => {
                    const product = item.querySelector(".products-cart__order");
                    const quantity = item.querySelector("[data-quantity-value]").value;
                    const totalValue = item.querySelector(".products-cart__total");
                    const priceValue = item.querySelector(".products-cart__price");
                    const {price, currency} = product.dataset;
                    priceValue.innerHTML = `<span>${currency}</span>${price}`;
                    totalValue.innerHTML = `<span>${currency}</span>${price * quantity}`;
                    totalValue.setAttribute("data-total", price);
                });
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
        document.addEventListener("watcherCallback", e => {
            const {entry: {target}} = e.detail;
            if (target.classList.contains("catalog-main__items") || target.classList.contains("catalog__items")) productsRender(data);
        });
        async function productsRender(data) {
            if (!productsContainer.classList.contains("watcher-view") || productsLoaded === true) return;
            let productsData;
            const cachedData = sessionStorage.getItem("productsData");
            if (cachedData) productsData = JSON.parse(cachedData); else {
                try {
                    const response = await fetch(data);
                    productsContainer.insertAdjacentHTML("beforeend", `<div class="items-catalog__loading"></div>`);
                    if (!response.ok) throw new Error("Response is not OK");
                    setTimeout(async () => {
                        productsContainer.classList.add("loaded");
                        const productsData = await response.json();
                        productsDisplay(productsData.products);
                        sessionStorage.setItem("productsData", JSON.stringify(productsData));
                    }, 1e3);
                } catch (error) {
                    setTimeout(() => {
                        productsContainer.classList.add("loaded");
                        productsContainer.insertAdjacentHTML("beforeend", `<div class="items-catalog__error">Failed to load products, please try again</div>`);
                    }, 1e3);
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
            products.forEach(product => {
                const {id, image, title, currency, price} = product;
                const templateHTML = `\n          <article id=${id} data-currency=${currency} data-price=${price} class="items-catalog__item item-catalog">\n            <div class="item-catalog__header">\n              <a href="#" class="item-catalog__image">\n                <img src="img/home/catalog/${image}" width="300" height="455" loading="lazy" alt="${title}">\n              </a>\n              <div class="item-catalog__actions actions-catalog">\n                <button type="button" aria-label="Favorite" class="actions-catalog__favorite">\n                  <svg>\n                    <use xlink:href="img/icons/icons.svg#wishlist"></use>\n                  </svg>\n                </button>\n                <button type="button" aria-label="Add to cart" class="actions-catalog__add-to-cart">\n                  <span>ADD TO CART</span>\n                    <svg>\n                      <use xlink:href="img/icons/icons.svg#cart"></use>\n                    </svg>\n                  </button>\n                </div>\n              </div>\n              <div class="item-catalog__footer">\n                <h3 class="item-catalog__title">\n                  <a href="#" class="item-catalog__link-title">${title}</a>\n                </h3>\n                <div class="item-catalog__price"><span>${currency}</span>${price}</div>\n              </div>\n            </article>\n          `;
                productsContainer.insertAdjacentHTML("beforeend", templateHTML);
            });
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
                orders.forEach(order => {
                    const itemPrice = order.querySelector(".list-order__item--price");
                    const quantityValue = order.querySelector("[data-quantity-value]").value;
                    const {price} = itemPrice.dataset;
                    currency = itemPrice.dataset.currency;
                    itemPrice.innerHTML = `<span>${currency}</span>${price}`;
                    cartTotal.push(+price);
                    quantityArr.push(+quantityValue);
                });
                totalCheck = [ ...cartTotal ].map((item, index) => quantityArr[index] !== 0 ? item * quantityArr[index] : item * 1).reduce((sum, price) => sum + price, 0);
                checkSubTotal.innerHTML = `<span>${currency}</span>${totalCheck}`;
                checkSubTotal.setAttribute("data-total", totalCheck);
                total.innerHTML = `<span>${currency}</span>${totalCheck}`;
            }
            document.addEventListener("click", checkoutTotalCount);
            function checkoutTotalCount(e) {
                const {target} = e;
                if (target.closest("[data-quantity-plus]") || target.closest("[data-quantity-minus]")) setTimeout(() => {
                    updateCartSubTotal();
                }, 100);
            }
            function updateCartSubTotal() {
                cartTotal = [];
                quantityArr = [];
                let currency;
                orders.forEach(order => {
                    const itemPrice = order.querySelector(".list-order__item--price");
                    const quantityValue = order.querySelector("[data-quantity-value]").value;
                    const {price} = itemPrice.dataset;
                    currency = itemPrice.dataset.currency;
                    cartTotal.push(+price);
                    quantityArr.push(+quantityValue);
                });
                totalCheck = [ ...cartTotal ].map((item, index) => quantityArr[index] !== 0 ? item * quantityArr[index] : item = 0).reduce((sum, price) => sum + price, 0);
                checkSubTotal.innerHTML = `<span>${currency}</span>${totalCheck}`;
                checkSubTotal.setAttribute("data-total", totalCheck);
                total.innerHTML = `<span>${currency}</span>${totalCheck}`;
            }
        }
        __webpack_require__(958);
        const inputMasks = document.querySelectorAll("[data-date-of-birth]");
        if (inputMasks.length) Inputmask({
            regex: "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.(19|20)\\d{2}$",
            placeholder: "DD.MM.YYYY",
            showMaskOnHover: false,
            showMaskOnFocus: true,
            inputmode: "numeric"
        }).mask(inputMasks);
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
})();