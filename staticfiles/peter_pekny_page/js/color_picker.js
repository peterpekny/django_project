!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ColorPlugin = e() : t.ColorPlugin = e()
}(self, ( () => ( () => {
    var t = {
        424: (t, e, n) => {
            (e = n(645)(!1)).push([t.id, ".picker_wrapper.popup {\n  z-index: 99;\n  width: 170px;\n  margin: 0;\n  box-shadow: 0 0 10px 1px #eaeaea;\n  background: #ffffff;\n}\n\n.picker_arrow {\n  display: none;\n}\n\n.layout_default .picker_slider, .layout_default .picker_selector {\n  padding: 5px;\n}\n\n.colorPlugin.ce-inline-tool {\n  width: 32px;\n  border-radius: 3px;\n}\n\n.colorPlugin.ce-inline-tool--active svg {\n  fill: #3c99ff;\n}\n\n#color-left-btn {\n  height: 35px;\n  width: 18px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n}\n\n#color-left-btn:hover {\n  border-radius: 5px 0 0 5px;\n  background: rgba(203, 203, 203, 0.49);\n}\n\n#color-text {\n  padding: 0 4px;\n}\n\n#color-btn-text {\n  height: 15px;\n}\n\n", ""]),
            t.exports = e
        }
        ,
        645: t => {
            "use strict";
            t.exports = function(t) {
                var e = [];
                return e.toString = function() {
                    return this.map((function(e) {
                        var n = function(t, e) {
                            var n, o, i, s = t[1] || "", r = t[3];
                            if (!r)
                                return s;
                            if (e && "function" == typeof btoa) {
                                var l = (n = r,
                                o = btoa(unescape(encodeURIComponent(JSON.stringify(n)))),
                                i = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),
                                "/*# ".concat(i, " */"))
                                  , a = r.sources.map((function(t) {
                                    return "/*# sourceURL=".concat(r.sourceRoot || "").concat(t, " */")
                                }
                                ));
                                return [s].concat(a).concat([l]).join("\n")
                            }
                            return [s].join("\n")
                        }(e, t);
                        return e[2] ? "@media ".concat(e[2], " {").concat(n, "}") : n
                    }
                    )).join("")
                }
                ,
                e.i = function(t, n, o) {
                    "string" == typeof t && (t = [[null, t, ""]]);
                    var i = {};
                    if (o)
                        for (var s = 0; s < this.length; s++) {
                            var r = this[s][0];
                            null != r && (i[r] = !0)
                        }
                    for (var l = 0; l < t.length; l++) {
                        var a = [].concat(t[l]);
                        o && i[a[0]] || (n && (a[2] ? a[2] = "".concat(n, " and ").concat(a[2]) : a[2] = n),
                        e.push(a))
                    }
                }
                ,
                e
            }
        }
        ,
        548: (t, e, n) => {
            var o = n(379)
              , i = n(424);
            "string" == typeof (i = i.__esModule ? i.default : i) && (i = [[t.id, i, ""]]);
            o(i, {
                insert: "head",
                singleton: !1
            }),
            t.exports = i.locals || {}
        }
        ,
        379: (t, e, n) => {
            "use strict";
            var o, i = function() {
                var t = {};
                return function(e) {
                    if (void 0 === t[e]) {
                        var n = document.querySelector(e);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                            try {
                                n = n.contentDocument.head
                            } catch (t) {
                                n = null
                            }
                        t[e] = n
                    }
                    return t[e]
                }
            }(), s = [];
            function r(t) {
                for (var e = -1, n = 0; n < s.length; n++)
                    if (s[n].identifier === t) {
                        e = n;
                        break
                    }
                return e
            }
            function l(t, e) {
                for (var n = {}, o = [], i = 0; i < t.length; i++) {
                    var l = t[i]
                      , a = e.base ? l[0] + e.base : l[0]
                      , c = n[a] || 0
                      , p = "".concat(a, " ").concat(c);
                    n[a] = c + 1;
                    var d = r(p)
                      , h = {
                        css: l[1],
                        media: l[2],
                        sourceMap: l[3]
                    };
                    -1 !== d ? (s[d].references++,
                    s[d].updater(h)) : s.push({
                        identifier: p,
                        updater: b(h, e),
                        references: 1
                    }),
                    o.push(p)
                }
                return o
            }
            function a(t) {
                var e = document.createElement("style")
                  , o = t.attributes || {};
                if (void 0 === o.nonce) {
                    var s = n.nc;
                    s && (o.nonce = s)
                }
                if (Object.keys(o).forEach((function(t) {
                    e.setAttribute(t, o[t])
                }
                )),
                "function" == typeof t.insert)
                    t.insert(e);
                else {
                    var r = i(t.insert || "head");
                    if (!r)
                        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    r.appendChild(e)
                }
                return e
            }
            var c, p = (c = [],
            function(t, e) {
                return c[t] = e,
                c.filter(Boolean).join("\n")
            }
            );
            function d(t, e, n, o) {
                var i = n ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
                if (t.styleSheet)
                    t.styleSheet.cssText = p(e, i);
                else {
                    var s = document.createTextNode(i)
                      , r = t.childNodes;
                    r[e] && t.removeChild(r[e]),
                    r.length ? t.insertBefore(s, r[e]) : t.appendChild(s)
                }
            }
            function h(t, e, n) {
                var o = n.css
                  , i = n.media
                  , s = n.sourceMap;
                if (i ? t.setAttribute("media", i) : t.removeAttribute("media"),
                s && "undefined" != typeof btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s)))), " */")),
                t.styleSheet)
                    t.styleSheet.cssText = o;
                else {
                    for (; t.firstChild; )
                        t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(o))
                }
            }
            var u = null
              , g = 0;
            function b(t, e) {
                var n, o, i;
                if (e.singleton) {
                    var s = g++;
                    n = u || (u = a(e)),
                    o = d.bind(null, n, s, !1),
                    i = d.bind(null, n, s, !0)
                } else
                    n = a(e),
                    o = h.bind(null, n, e),
                    i = function() {
                        !function(t) {
                            if (null === t.parentNode)
                                return !1;
                            t.parentNode.removeChild(t)
                        }(n)
                    }
                    ;
                return o(t),
                function(e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                            return;
                        o(t = e)
                    } else
                        i()
                }
            }
            t.exports = function(t, e) {
                (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = (void 0 === o && (o = Boolean(window && document && document.all && !window.atob)),
                o));
                var n = l(t = t || [], e);
                return function(t) {
                    if (t = t || [],
                    "[object Array]" === Object.prototype.toString.call(t)) {
                        for (var o = 0; o < n.length; o++) {
                            var i = r(n[o]);
                            s[i].references--
                        }
                        for (var a = l(t, e), c = 0; c < n.length; c++) {
                            var p = r(n[c]);
                            0 === s[p].references && (s[p].updater(),
                            s.splice(p, 1))
                        }
                        n = a
                    }
                }
            }
        }
        ,
        452: t => {
            t.exports = {
                markerIcon: '<svg fill="#000000" height="34px" width="34px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n\t viewBox="0 0 491.644 491.644" xml:space="preserve">\n<g>\n\t<path d="M456.623,2.282c-42.758-20.283-141.107,96.84-223.473,264.224c-2.35,4.776-2.686,10.294-0.936,15.32\n\t\tc1.75,5.026,5.442,9.145,10.251,11.426L366.758,352.2c4.809,2.281,10.332,2.538,15.333,0.714c5.001-1.825,9.059-5.579,11.272-10.42\n\t\tC470.883,172.829,499.385,22.562,456.623,2.282z"/>\n\t<path d="M34.71,461.799l-17.257,16.708c-2.225,2.17-2.934,5.475-1.773,8.363c1.179,2.886,3.985,4.773,7.099,4.773h160.887\n\t\tc-1.364-5.043-0.921-10.445,1.391-15.306l7.919-16.692H40.036C38.036,459.646,36.129,460.419,34.71,461.799z"/>\n\t<path d="M264.766,448.864l-32.615-15.458c-1.046-0.502-2.161-0.744-3.257-0.744c-2.87,0-5.611,1.614-6.901,4.372l-22.001,46.384\n\t\tc-0.871,1.789-0.723,3.895,0.341,5.564c1.046,1.661,2.888,2.661,4.855,2.661h0.046l44.275-0.378\n\t\tc2.206-0.016,4.206-1.299,5.159-3.292l13.724-28.925c0.856-1.838,0.967-3.936,0.29-5.846\n\t\tC268.004,451.292,266.585,449.728,264.766,448.864z"/>\n\t<path d="M348.445,366.038l-112.572-51.392c-8.909-4.067-19.434-0.227-23.63,8.622c-2.551,5.378-3.58,11.353-2.975,17.275\n\t\tl5.2,50.909c0.703,6.882,4.983,12.884,11.261,15.792l60.031,27.797c6.688,3.097,14.548,2.179,20.343-2.375l45.983-36.137\n\t\tc4.931-3.875,7.487-10.041,6.743-16.269C358.086,374.032,354.151,368.642,348.445,366.038z"/>\n</g>\n</svg>',
                textIcon: '<svg fill="#000000" viewBox="-6 0 512 512" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><title>text</title><path d="M365 432L328 352 172 352 135 432 64 432 227 80 272 80 436 432 365 432ZM201 288L299 288 250 183 201 288Z"></path></g></svg>'
            }
        }
        ,
        138: (t, e, n) => {
            const o = n(442)
              , {markerIcon: i, textIcon: s} = n(452)
              , {getDefaultColorCache: r, handleCSSVariables: l} = n(697);
            n(548).toString(),
            t.exports = class {
                constructor({config: t, api: e}) {
                    this.api = e,
                    this.config = t,
                    this.clickedOnLeft = !1,
                    this.pluginType = this.config.type || "text",
                    this.parentTag = "marker" === this.pluginType ? "MARK" : "FONT",
                    this.hasCustomPicker = this.config.customPicker || !1,
                    this.color = l(r(this.config.defaultColor, this.pluginType)),
                    this.picker = null,
                    this.icon = null,
                    this.button = null,
                    this.iconClasses = {
                        base: this.api.styles.inlineToolButton,
                        active: this.api.styles.inlineToolButtonActive
                    }
                }
                static get isInline() {
                    return !0
                }
                render() {
                    return this.button = document.createElement("button"),
                    this.button.type = "button",
                    this.button.classList.add("colorPlugin"),
                    this.button.classList.add(this.iconClasses.base),
                    this.button.appendChild(this.createLeftButton()),
                    this.button.appendChild(this.createRightButton(this)),
                    this.button
                }
                createLeftButton() {
                    return this.icon || (this.icon = document.createElement("div"),
                    this.icon.id = "color-left-btn",
                    this.icon.appendChild(this.createButtonIcon()),
                    this.icon.addEventListener("click", ( () => this.clickedOnLeft = !0))),
                    this.icon
                }
                createButtonIcon() {
                    const t = document.createElement("div");
                    t.id = "color-btn-text";
                    const e = "marker" === this.pluginType ? i : s;
                    return t.innerHTML = this.config.icon || e,
                    t
                }
                createRightButton(t) {
                    return this.picker || (this.picker = new o.ColorPlugin({
                        onColorPicked: function(e) {
                            t.color = e
                        },
                        hasCustomPicker: this.hasCustomPicker,
                        defaultColor: this.config.defaultColor,
                        colorCollections: this.config.colorCollections,
                        type: this.pluginType
                    })),
                    this.picker
                }
                surround(t) {
                    if (!t)
                        return;
                    const e = this.api.selection.findParentTag("SPAN");
                    e && this.unwrap(e);
                    const n = this.api.selection.findParentTag(this.parentTag);
                    n ? this.unwrap(n) : this.wrap(t),
                    this.clickedOnLeft = !1
                }
                wrap(t) {
                    const e = t.extractContents()
                      , n = document.createElement(this.parentTag);
                    n.appendChild(e),
                    t.insertNode(n),
                    "marker" === this.pluginType ? this.wrapMarker(n) : this.wrapTextColor(n),
                    this.api.selection.expandToTag(n)
                }
                wrapMarker(t) {
                    t.style.backgroundColor = this.color;
                    const e = this.api.selection.findParentTag("FONT");
                    e && (t.style.color = e.style.color)
                }
                wrapTextColor(t) {
                    t.style.color = this.color
                }
                unwrap(t) {
                    this.api.selection.expandToTag(t);
                    const e = window.getSelection()
                      , n = e.getRangeAt(0)
                      , o = n.extractContents();
                    this.clickedOnLeft ? this.removeWrapper(t) : this.updateWrapper(t),
                    n.insertNode(o),
                    e.removeAllRanges(),
                    e.addRange(n)
                }
                updateWrapper(t) {
                    "marker" === this.pluginType ? t.style.backgroundColor = this.color : t.style.color = this.color
                }
                removeWrapper(t) {
                    t.parentNode.removeChild(t)
                }
                checkState() {
                    const t = this.api.selection.findParentTag("SPAN")
                      , e = this.api.selection.findParentTag(this.parentTag);
                    let n = t ? this.handleLegacyWrapper(t, e) : e;
                    return this.button.classList.toggle(this.iconClasses.active, !!n),
                    !!n
                }
                handleLegacyWrapper(t, e) {
                    return "marker" === this.pluginType ? t : e & t
                }
                static get sanitize() {
                    return {
                        font: !0,
                        span: !0,
                        mark: !0
                    }
                }
                clear() {
                    this.picker = null,
                    this.icon = null
                }
            }
        }
        ,
        442: (t, e, n) => {
            "use strict";
            n.r(e),
            n.d(e, {
                ColorPlugin: () => c
            });
            class o extends HTMLElement {
                static get observedAttributes() {
                    return ["disabled", "icon", "loading", "href", "htmltype"]
                }
                constructor() {
                    super(),
                    this.attachShadow({
                        mode: "open"
                    }).innerHTML = `\n        <style>\n        :host{ \n            position:relative; \n            display:inline-flex; \n            padding: .25em .625em;\n            box-sizing:border-box; \n            vertical-align: middle;\n            line-height: 1.8;\n            width: 5px;\n            overflow:hidden; \n            align-items:center;\n            justify-content: center;\n            font-size: 14px; \n            color: var(--fontColor,#333);  \n            border-radius: var(--borderRadius,.25em);\n            background: var(--fontColor,#333); \n            transition:background .3s,box-shadow .3s,border-color .3s,color .3s;\n        }\n        :host([shape="circle"]){ \n            border-radius:50%; \n        }\n        /*\n        :host(:not([disabled]):active){\n            z-index:1;\n            transform:translateY(.1em);\n        }\n        */\n        :host([disabled]),:host([loading]){\n            pointer-events: none; \n            opacity:.6; \n        }\n        :host([block]){ \n            display:flex; \n        }\n        :host([disabled]:not([type])){ \n            background:rgba(0,0,0,.1); \n        }\n        :host([disabled]) .btn,:host([loading]) .btn{ \n            cursor: not-allowed; \n            pointer-events: all; \n        }\n        :host(:not([type="primary"]):not([type="danger"]):not([disabled]):hover),\n        :host(:not([type="primary"]):not([type="danger"]):focus-within),\n        :host([type="flat"][focus]){ \n            color:var(--themeColor,#42b983); \n            border-color: var(--themeColor,#42b983); \n        }\n        :host(:not([type="primary"]):not([type="danger"])) .btn::after{ \n            background-image: radial-gradient(circle, var(--themeColor,#42b983) 10%, transparent 10.01%); \n        }\n        :host([type="primary"]){ \n            color: #fff; \n            background:var(--themeBackground,var(--themeColor,#42b983));\n        }\n        :host([type="danger"]){ \n            color: #fff; \n            background:var(--themeBackground,var(--dangerColor,#ff7875));\n        }\n        :host([type="dashed"]){ \n            border-style:dashed \n        }\n        :host([type="flat"]),:host([type="primary"]),:host([type="danger"]){ \n            border:0;\n            padding: calc( .25em + 1px ) calc( .625em + 1px );\n        }\n        :host([type="flat"]) .btn::before{ \n            content:''; \n            position:absolute; \n            background:var(--themeColor,#42b983);\n            pointer-events:none; \n            left:0; \n            right:0; \n            top:0; \n            bottom:0; \n            opacity:0; \n            transition:.3s;\n        }\n        :host([type="flat"]:not([disabled]):hover) .btn::before{ \n            opacity:.1 \n        }\n        :host(:not([disabled]):hover){ \n            z-index:1 \n        }\n        :host([type="flat"]:focus-within) .btn:before,\n        :host([type="flat"][focus]) .btn:before{ \n            opacity:.2; \n        }\n        :host(:focus-within){ \n            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/ \n        }\n        .btn{ \n            background:none; \n            outline:0; \n            border:0; \n            position: \n            absolute; \n            left:0; \n            top:0;\n            width:100%;\n            height:100%;\n            padding:0;\n            user-select: none;\n            cursor: unset;\n        }\n        xy-loading{ \n            margin-right: 0.35em;  \n        }\n        ::-moz-focus-inner{\n            border:0;\n        }\n        .btn::before{\n            content: "";\n            display: block;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            left:0;\n            top:0;\n            transition:.2s;\n            background:#fff;\n            opacity:0;\n        }\n        :host(:not([disabled]):active) .btn::before{ \n            opacity:.2;\n        }\n        .btn::after {\n            content: "";\n            display: block;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            left: var(--x,0); \n            top: var(--y,0);\n            pointer-events: none;\n            background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);\n            background-repeat: no-repeat;\n            background-position: 50%;\n            transform: translate(-50%,-50%) scale(10);\n            opacity: 0;\n            transition: transform .3s, opacity .8s;\n        }\n        .btn:not([disabled]):active::after {\n            transform: translate(-50%,-50%) scale(0);\n            opacity: .3;\n            transition: 0s;\n        }\n        xy-icon{\n            margin-right: 0.35em;\n            transition: none;\n        }\n        :host(:empty) xy-icon{\n            margin: auto;\n        }\n        :host(:empty){\n            padding: .65em;\n        }\n        :host([type="flat"]:empty),:host([type="primary"]:empty){ \n            padding: calc( .65em + 1px );\n        }\n        ::slotted(xy-icon){\n            transition: none;\n        }\n        :host([href]){\n            cursor:pointer;\n        }\n        </style>\n        <${this.href ? "a" : "button"} ${this.htmltype ? 'type="' + this.htmltype + '"' : ""} ${this.download && this.href ? 'download="' + this.download + '"' : ""} ${this.href ? 'href="' + this.href + '" target="' + this.target + '" rel="' + this.rel + '"' : ""} class="btn" id="btn"></${this.href ? "a" : "button"}>${!this.loading && this.icon && "null" != this.icon ? '<xy-icon id="icon" name=' + this.icon + "></xy-icon>" : ""}<slot></slot>\n        `
                }
                focus() {
                    this.btn.focus()
                }
                get disabled() {
                    return null !== this.getAttribute("disabled")
                }
                get toggle() {
                    return null !== this.getAttribute("toggle")
                }
                get htmltype() {
                    return this.getAttribute("htmltype")
                }
                get name() {
                    return this.getAttribute("name")
                }
                get checked() {
                    return null !== this.getAttribute("checked")
                }
                get href() {
                    return this.getAttribute("href")
                }
                get target() {
                    return this.getAttribute("target") || "_blank"
                }
                get rel() {
                    return this.getAttribute("rel")
                }
                get download() {
                    return this.getAttribute("download")
                }
                get icon() {
                    return this.getAttribute("icon")
                }
                get loading() {
                    return null !== this.getAttribute("loading")
                }
                set icon(t) {
                    this.setAttribute("icon", t)
                }
                set htmltype(t) {
                    this.setAttribute("htmltype", t)
                }
                set href(t) {
                    this.setAttribute("href", t)
                }
                set disabled(t) {
                    null === t || !1 === t ? this.removeAttribute("disabled") : this.setAttribute("disabled", "")
                }
                set checked(t) {
                    null === t || !1 === t ? this.removeAttribute("checked") : this.setAttribute("checked", "")
                }
                set loading(t) {
                    null === t || !1 === t ? this.removeAttribute("loading") : this.setAttribute("loading", "")
                }
                connectedCallback() {
                    this.btn = this.shadowRoot.getElementById("btn"),
                    this.ico = this.shadowRoot.getElementById("icon"),
                    this.load = document.createElement("xy-loading"),
                    this.load.style.color = "inherit",
                    this.btn.addEventListener("mousedown", (function(t) {
                        if (!this.disabled) {
                            const {left: e, top: n} = this.getBoundingClientRect();
                            this.style.setProperty("--x", t.clientX - e + "px"),
                            this.style.setProperty("--y", t.clientY - n + "px")
                        }
                    }
                    )),
                    this.addEventListener("click", (function(t) {
                        this.toggle && (this.checked = !this.checked)
                    }
                    )),
                    this.btn.addEventListener("keydown", (t => {
                        13 === t.keyCode && t.stopPropagation()
                    }
                    )),
                    this.disabled = this.disabled,
                    this.loading = this.loading
                }
                attributeChangedCallback(t, e, n) {
                    "disabled" == t && this.btn && (null !== n ? (this.btn.setAttribute("disabled", "disabled"),
                    this.href && this.btn.removeAttribute("href")) : (this.btn.removeAttribute("disabled"),
                    this.href && (this.btn.href = this.href))),
                    "loading" == t && this.btn && (null !== n ? (this.shadowRoot.prepend(this.load),
                    this.btn.setAttribute("disabled", "disabled")) : (this.shadowRoot.removeChild(this.load),
                    this.btn.removeAttribute("disabled"))),
                    "icon" == t && this.ico && (this.ico.name = n),
                    "href" == t && this.btn && (this.disabled || (this.btn.href = n)),
                    "htmltype" == t && this.btn && (this.btn.type = n)
                }
            }
            customElements.get("xy-button") || customElements.define("xy-button", o);
            class i extends HTMLElement {
                static get observedAttributes() {
                    return ["disabled"]
                }
                constructor() {
                    super(),
                    this.attachShadow({
                        mode: "open"
                    }).innerHTML = '\n        <style>\n        :host {\n            display:inline-flex;\n        }\n        ::slotted(xy-button:not(:first-of-type):not(:last-of-type)){\n            border-radius:0;\n        }\n        ::slotted(xy-button){\n            margin:0!important;\n        }\n        ::slotted(xy-button:not(:first-of-type)){\n            margin-left:-1px!important;\n        }\n        ::slotted(xy-button[type]:not([type="dashed"]):not(:first-of-type)){\n            margin-left:1px!important;\n        }\n        ::slotted(xy-button:first-of-type){\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0px;\n        }\n        ::slotted(xy-button:last-of-type){\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n        }\n        </style>\n        <slot></slot>\n        '
                }
                get disabled() {
                    return null !== this.getAttribute("disabled")
                }
                set disabled(t) {
                    null === t || !1 === t ? this.removeAttribute("disabled") : this.setAttribute("disabled", "")
                }
                connectedCallback() {}
                attributeChangedCallback(t, e, n) {}
            }
            customElements.get("xy-button-group") || customElements.define("xy-button-group", i);
            class s extends HTMLElement {
                static get observedAttributes() {
                    return ["open", "title", "oktext", "canceltext", "loading", "type"]
                }
                constructor(t) {
                    super(),
                    this.attachShadow({
                        mode: "open"
                    }).innerHTML = `\n        <style>\n        :host{\n            position:absolute;\n            display:flex;\n            box-shadow: 2px 2px 15px rgba(0,0,0,0.15);\n            box-sizing: border-box;\n            transform:scale(0);\n            opacity:0.5;\n            border-radius: 3px;\n            z-index:10;\n            transition:.3s cubic-bezier(.645, .045, .355, 1);\n            transform-origin:inherit;\n            background:#fff;\n            visibility:hidden;\n        }\n        .popcon-content{\n            box-sizing: border-box;\n            display:flex;\n            width: max-content;\n            padding: 0 15px;\n            flex:1;\n            flex-direction:column;\n        }\n        .popcon-title {\n            line-height: 30px;\n            padding: 15px 30px 0 0;\n            font-weight: 700;\n            font-size: 14px;\n            color: #4c5161;\n            user-select: none;\n            cursor: default;\n        }\n        .popcon-body {\n            flex: 1;\n            padding: 5px 0 15px 0;\n        }\n        .popcon-footer {\n            padding: 3px 0 15px 0;\n            margin-top: -3px;\n            text-align: right;\n            white-space: nowrap;\n        }\n        .btn-close{\n            position:absolute;\n            right:10px;\n            top:10px;\n            border:0;\n        }\n        .popcon-footer xy-button {\n            font-size: .8em;\n            margin-left: .8em;\n        }\n        .popcon-type{\n            display:flex;\n            width:30px;\n            height:30px;\n            font-size:22px;\n            margin: 15px -10px 0 15px;\n        }\n        /*\n        :host(:not([type="confirm"])) .popcon-type,\n        :host(:not([type="confirm"])) .popcon-footer,\n        :host(:not([type])) .popcon-title,\n        :host(:not([type])) .btn-close{\n            display:none;\n        }\n        */\n        :host([type="confirm"]){\n            min-width:250px;\n        }\n        :host([type="confirm"]) .popcon-body{\n            font-size:14px;\n        }\n        :host(:not([type])) .popcon-content,:host(:not([type])) .popcon-body{\n            padding: 0;\n        }\n        </style>\n            ${"confirm" === (t || this.type) ? '<xy-icon id="popcon-type" class="popcon-type" name="question-circle" color="var(--waringColor,#faad14)"></xy-icon>' : ""}\n            <div class="popcon-content">\n                ${null !== (t || this.type) ? '<div class="popcon-title" id="title">' + this.title + '</div><xy-button class="btn-close" id="btn-close" icon="close"></xy-button>' : ""}\n                <div class="popcon-body">\n                    <slot></slot>\n                </div>\n                ${"confirm" === (t || this.type) ? '<div class="popcon-footer"><xy-button id="btn-cancel">' + this.canceltext + '</xy-button><xy-button id="btn-submit" type="primary">' + this.oktext + "</xy-button></div>" : ""}\n            </div>\n        `
                }
                get open() {
                    return null !== this.getAttribute("open")
                }
                get stopfocus() {
                    return null !== this.getAttribute("stopfocus")
                }
                get title() {
                    return this.getAttribute("title") || "popcon"
                }
                get type() {
                    return this.getAttribute("type")
                }
                get oktext() {
                    return this.getAttribute("oktext") || "confirm"
                }
                get canceltext() {
                    return this.getAttribute("canceltext") || "cancel"
                }
                get loading() {
                    return null !== this.getAttribute("loading")
                }
                set title(t) {
                    this.setAttribute("title", t)
                }
                set type(t) {
                    null === t || !1 === t ? this.removeAttribute("type") : this.setAttribute("type", t)
                }
                set oktext(t) {
                    this.setAttribute("oktext", t)
                }
                set canceltext(t) {
                    this.setAttribute("canceltext", t)
                }
                set open(t) {
                    null === t || !1 === t ? (this.removeAttribute("open"),
                    this.parentNode.removeAttribute("open")) : (this.setAttribute("open", ""),
                    this.parentNode.setAttribute("open", ""),
                    this.loading && (this.loading = !1))
                }
                set loading(t) {
                    null === t || !1 === t ? this.removeAttribute("loading") : this.setAttribute("loading", "")
                }
                connectedCallback() {
                    this.remove = !1,
                    this.type && (this.titles = this.shadowRoot.getElementById("title"),
                    this.btnClose = this.shadowRoot.getElementById("btn-close")),
                    "confirm" == this.type && (this.btnCancel = this.shadowRoot.getElementById("btn-cancel"),
                    this.btnSubmit = this.shadowRoot.getElementById("btn-submit")),
                    this.addEventListener("transitionend", (t => {
                        "transform" === t.propertyName && this.open && ("confirm" == this.type && this.btnSubmit.focus(),
                        "pane" == this.type && this.btnClose.focus(),
                        this.dispatchEvent(new CustomEvent("open")))
                    }
                    )),
                    this.addEventListener("transitionend", (t => {
                        "transform" !== t.propertyName || this.open || (this.remove && this.parentNode.removeChild(this),
                        this.dispatchEvent(new CustomEvent("close")))
                    }
                    )),
                    this.addEventListener("click", (t => {
                        t.target.closest("[autoclose]") && (this.open = !1,
                        window.xyActiveElement.focus())
                    }
                    )),
                    this.type && this.btnClose.addEventListener("click", ( () => {
                        this.open = !1,
                        window.xyActiveElement.focus()
                    }
                    )),
                    "confirm" == this.type && (this.btnCancel.addEventListener("click", (async () => {
                        this.dispatchEvent(new CustomEvent("cancel")),
                        this.open = !1,
                        window.xyActiveElement.focus()
                    }
                    )),
                    this.btnSubmit.addEventListener("click", ( () => {
                        this.dispatchEvent(new CustomEvent("submit")),
                        this.loading || (this.open = !1,
                        window.xyActiveElement.focus())
                    }
                    )))
                }
                attributeChangedCallback(t, e, n) {
                    "open" == t && this.shadowRoot && null == n && this.stopfocus,
                    "loading" == t && this.shadowRoot && (this.btnSubmit.loading = null !== n),
                    "title" == t && this.titles && null !== n && (this.titles.innerHTML = n),
                    "oktext" == t && this.btnSubmit && null !== n && (this.btnSubmit.innerHTML = n),
                    "canceltext" == t && this.btnCancel && null !== n && (this.btnCancel.innerHTML = n)
                }
            }
            customElements.get("xy-popcon") || customElements.define("xy-popcon", s);
            class r extends HTMLElement {
                static get observedAttributes() {
                    return ["title", "oktext", "canceltext", "loading", "type"]
                }
                constructor() {
                    super(),
                    this.attachShadow({
                        mode: "open"
                    }).innerHTML = '\n        <style>\n        :host {\n            display:inline-block;\n            position:relative;\n            overflow:visible;\n        }\n        :host([dir="top"]) ::slotted(xy-popcon){\n            bottom:100%;\n            left:50%;\n            transform:translate(-50%,-10px) scale(0);\n            transform-origin: center bottom;\n        }\n        :host([dir="top"]) ::slotted(xy-popcon[open]),\n        :host([dir="top"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="top"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(-50%,-10px) scale(1);\n        }\n        :host([dir="right"]) ::slotted(xy-popcon){\n            left:100%;\n            top:50%;\n            transform:translate(10px,-50%) scale(0);\n            transform-origin: left;\n        }\n        :host([dir="right"]) ::slotted(xy-popcon[open]),\n        :host([dir="right"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="right"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(10px,-50%) scale(1);\n        }\n        :host([dir="bottom"]) ::slotted(xy-popcon){\n            top:100%;\n            left:50%;\n            transform:translate(-50%,10px) scale(0);\n            transform-origin: center top;\n        }\n        :host([dir="bottom"]) ::slotted(xy-popcon[open]),\n        :host([dir="bottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="bottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(-50%,10px) scale(1);\n        }\n        :host([dir="left"]) ::slotted(xy-popcon){\n            right:100%;\n            top:50%;\n            transform:translate(-10px,-50%) scale(0);\n            transform-origin: right;\n        }\n        :host([dir="left"]) ::slotted(xy-popcon[open]),\n        :host([dir="left"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="left"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(-10px,-50%) scale(1);\n        }\n        :host([dir="lefttop"]) ::slotted(xy-popcon){\n            right:100%;\n            top:0;\n            transform:translate(-10px) scale(0);\n            transform-origin: right top;\n        }\n        :host([dir="lefttop"]) ::slotted(xy-popcon[open]),\n        :host([dir="lefttop"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="lefttop"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(-10px) scale(1);\n        }\n        :host([dir="leftbottom"]) ::slotted(xy-popcon){\n            right:100%;\n            bottom:0;\n            transform:translate(-10px) scale(0);\n            transform-origin: right bottom;\n        }\n        :host([dir="leftbottom"]) ::slotted(xy-popcon[open]),\n        :host([dir="leftbottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="leftbottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(-10px) scale(1);\n        }\n        :host([dir="topleft"]) ::slotted(xy-popcon){\n            bottom:100%;\n            left:0;\n            transform:translate(0,-10px) scale(0);\n            transform-origin: left bottom;\n        }\n        :host([dir="topleft"]) ::slotted(xy-popcon[open]),\n        :host([dir="topleft"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="topleft"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(0,-10px) scale(1);\n        }\n        :host([dir="topright"]) ::slotted(xy-popcon){\n            bottom:100%;\n            right:0;\n            transform:translate(0,-10px) scale(0);\n            transform-origin: right bottom;\n        }\n        :host([dir="topright"]) ::slotted(xy-popcon[open]),\n        :host([dir="topright"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="topright"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(0,-10px) scale(1);\n        }\n        :host([dir="righttop"]) ::slotted(xy-popcon){\n            left:100%;\n            top:0;\n            transform:translate(10px) scale(0);\n            transform-origin: left top;\n        }\n        :host([dir="righttop"]) ::slotted(xy-popcon[open]),\n        :host([dir="righttop"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="righttop"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(10px) scale(1);\n        }\n        :host([dir="rightbottom"]) ::slotted(xy-popcon){\n            left:100%;\n            bottom:0;\n            transform:translate(10px) scale(0);\n            transform-origin: left bottom;\n        }\n        :host([dir="rightbottom"]) ::slotted(xy-popcon[open]),\n        :host([dir="rightbottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="rightbottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(10px) scale(1);\n        }\n        :host([dir="bottomleft"]) ::slotted(xy-popcon),\n        :host(:not([dir])) ::slotted(xy-popcon){\n            left:0;\n            top:100%;\n            transform:translate(0,10px) scale(0);\n            transform-origin: left top;\n        }\n        :host(:not([dir])) ::slotted(xy-popcon[open]),\n        :host(:not([dir])[trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host(:not([dir])[trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon),\n        :host([dir="bottomleft"]) ::slotted(xy-popcon[open]),\n        :host([dir="bottomleft"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="bottomleft"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(0,10px) scale(1);\n        }\n        :host([dir="bottomright"]) ::slotted(xy-popcon){\n            right:0;\n            top:100%;\n            transform:translate(0,10px) scale(0);\n            transform-origin: right top;\n        }\n        :host([dir="bottomright"]) ::slotted(xy-popcon[open]),\n        :host([dir="bottomright"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([dir="bottomright"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            transform:translate(0,10px) scale(1);\n        }\n        :host([trigger="contextmenu"]) ::slotted(xy-popcon){\n            right:auto;\n            bottom:auto;\n            left:var(--x,0);\n            top:var(--y,100%);\n            transform-origin: left top;\n            transform:translate(5px,5px) scale(0);\n            transition: .15s;\n        }\n        :host([trigger="contextmenu"]) ::slotted(xy-popcon[open]){\n            transform:translate(5px,5px) scale(1);\n        }\n        :host ::slotted(xy-popcon[open]),\n        :host([trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),\n        :host([trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){\n            opacity:1;\n            visibility:visible;\n        }\n        slot{\n            border-radius: inherit;\n        }\n        </style>\n        <slot></slot>\n        '
                }
                get title() {
                    return this.getAttribute("title") || "popcon"
                }
                get trigger() {
                    return this.getAttribute("trigger")
                }
                get disabled() {
                    return null !== this.getAttribute("disabled")
                }
                get type() {
                    return this.getAttribute("type")
                }
                get accomplish() {
                    return null !== this.getAttribute("accomplish")
                }
                get content() {
                    return this.getAttribute("content")
                }
                get oktext() {
                    return this.getAttribute("oktext")
                }
                get canceltext() {
                    return this.getAttribute("canceltext")
                }
                get dir() {
                    return this.getAttribute("dir")
                }
                get loading() {
                    return null !== this.getAttribute("loading")
                }
                set dir(t) {
                    this.setAttribute("dir", t)
                }
                set title(t) {
                    this.setAttribute("title", t)
                }
                set type(t) {
                    this.setAttribute("type", t)
                }
                set oktext(t) {
                    this.setAttribute("oktext", t)
                }
                set canceltext(t) {
                    this.setAttribute("canceltext", t)
                }
                set loading(t) {
                    null === t || !1 === t ? this.removeAttribute("loading") : this.setAttribute("loading", "")
                }
                set disabled(t) {
                    null === t || !1 === t ? this.removeAttribute("disabled") : this.setAttribute("disabled", "")
                }
                show(t) {
                    if (this.popcon = this.querySelector("xy-popcon"),
                    this.disabled)
                        (this.popcon || this).dispatchEvent(new CustomEvent("submit"));
                    else if (this.popcon || (this.popcon = new s(this.type),
                    this.popcon.type = this.type,
                    this.appendChild(this.popcon),
                    this.popcon.title = this.title || "popover",
                    this.popcon.innerHTML = this.content || "",
                    "confirm" == this.type && (this.popcon.oktext = this.oktext || "confirm",
                    this.popcon.canceltext = this.canceltext || "cancel",
                    this.popcon.onsubmit = () => this.dispatchEvent(new CustomEvent("submit")),
                    this.popcon.oncancel = () => this.dispatchEvent(new CustomEvent("cancel")))),
                    "contextmenu" === this.trigger) {
                        const {x: e, y: n} = this.getBoundingClientRect();
                        this.popcon.style.setProperty("--x", t.clientX - e + "px"),
                        this.popcon.style.setProperty("--y", t.clientY - n + "px"),
                        this.popcon.open = !0
                    } else
                        (t.path || t.composedPath && t.composedPath()).includes(this.popcon) || (window.xyActiveElement = document.activeElement,
                        this.accomplish ? this.popcon.open = !0 : this.popcon.open = !this.popcon.open);
                    return this.popcon
                }
                connectedCallback() {
                    this.popcon = this.querySelector("xy-popcon"),
                    this.trigger && "click" !== this.trigger || this.addEventListener("click", this.show),
                    "contextmenu" === this.trigger && this.addEventListener("contextmenu", (t => {
                        t.preventDefault(),
                        (t.path || t.composedPath && t.composedPath()).includes(this.popcon) || this.show(t)
                    }
                    )),
                    document.addEventListener("mousedown", (t => {
                        const e = t.path || t.composedPath && t.composedPath();
                        (this.popcon && !e.includes(this.popcon) && !this.popcon.loading && !e.includes(this.children[0]) || "contextmenu" === this.trigger && !e.includes(this.popcon) && "1" == t.which) && (this.popcon.open = !1)
                    }
                    ))
                }
                attributeChangedCallback(t, e, n) {
                    "loading" == t && this.popcon && (this.popcon.loading = null !== n),
                    "title" == t && this.popcon && null !== n && (this.popcon.title = n),
                    "oktext" == t && this.popcon && null !== n && (this.popcon.oktext = n),
                    "canceltext" == t && this.popcon && null !== n && (this.popcon.canceltext = n)
                }
            }
            customElements.get("xy-popover") || customElements.define("xy-popover", r);
            var l = n(697);
            const a = ["#ff1300", "#EC7878", "#9C27B0", "#673AB7", "#3F51B5", "#0070FF", "#03A9F4", "#00BCD4", "#4CAF50", "#8BC34A", "#CDDC39", "#FFE500", "#FFBF00", "#FF9800", "#795548", "#9E9E9E", "#5A5A5A", "#FFF"];
            class c extends HTMLElement {
                static get observedAttributes() {
                    return ["disabled", "dir"]
                }
                constructor(t) {
                    super();
                    const e = this.attachShadow({
                        mode: "open"
                    });
                    this.colorCollections = t.colorCollections || a,
                    this.onColorPicked = t.onColorPicked,
                    this.defaulColor = (0,
                    l.handleCSSVariables)(t.defaultColor || this.colorCollections[0]),
                    this.pluginType = t.type,
                    this.hasCustomPicker = t.hasCustomPicker,
                    this.customColor = (0,
                    l.getCustomColorCache)(this.pluginType),
                    e.innerHTML = `\n        <style>\n        :host{\n            display:inline-block;\n            width:15px;\n            font-size:14px;\n            border: none;\n        }\n        :host([block]){\n            display:block;\n        }\n        :host([disabled]){\n            pointer-events:none;\n        }\n        \n        :host(:focus-within) xy-popover,:host(:hover) xy-popover{ \n            z-index: 2;\n        }\n        input[type="color"]{\n            -webkit-appearance: none;\n            outline: none;\n            border: none;\n        }\n        xy-popover{\n            width: 12px;\n            height:35px;\n            padding-right: 1px;\n        }\n        xy-popover:hover {\n            border-radius: 0 5px 5px 0;\n            background: rgba(203, 203, 203, 0.49);\n        }\n        .color-btn {\n            border: 1px solid #cab9b9;\n            margin: 18px 3px 2px 3px;\n            width: 7px;\n            height: 7px;\n            opacity: 0.9;\n            padding: 1px 0 1px 0;\n            color: var(--themeColor, #42b983);\n            background: var(--themeColor, #42b983);\n            font-weight: bolder;\n            border-radius: 2px;\n        }\n        .color-btn:hover {\n            opacity: 1;\n            z-index: auto;\n        }\n        xy-popover{\n            display:block;\n   position: static; \n     }\n        xy-popcon{\n             min-width:100%;\n        }\n        #custom-picker {\n            position: relative;\n            top: -1px;\n            background-color: rgb(250, 250, 250);\n            border-color: rgb(255 118 21) rgb(245 80 80 / 74%) #89c1c9 #95d5b6;\n            border-width: 3px;\n            border-radius: 8px;\n            height: 18px;\n        }\n        .pop-footer{\n            display:flex;\n            justify-content:flex-end;\n            padding:0 .8em .8em;\n        }\n        .pop-footer xy-button{\n            font-size: .8em;\n            margin-left: .8em;\n        }\n        .color-btn::before{\n            content:'';\n            position:absolute;\n            left:5px;\n            top:5px;\n            right:5px;\n            bottom:5px;\n            z-index:-1;\n            background: linear-gradient(45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);\n            background-position: 0 0,5px 5px;\n            background-size: 10px 10px;\n        }\n        .color-sign {\n           max-width: 220px;\n           padding: 10px;\n           display:grid;\n           cursor: default;\n           grid-template-columns: repeat(auto-fit, minmax(15px, 1fr));\n           grid-gap: 10px;     \n        }\n        .color-sign>button {\n            position: relative;\n            width: 16px;\n            height: 16px;\n            border-radius: 6px;\n            border: 1px solid #b8b9b49e;\n            outline: 0;\n            opacity: 0.9;\n        }\n        .color-sign>button:hover {\n            cursor: pointer;\n            opacity: 1;\n        }\n        .color-section {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        .color-fire-btn {\n            font-size: 17px;\n            font-weight: bold;\n            height: 28px;\n            padding-top: 8px;\n            padding-right: 1px;\n            margin-left: 3px;\n            padding-left: 3px;\n            border-radius: 5px 0 0 5px;\n        }\n        .color-fire-btn:hover {\n            font-size: 17px;\n            font-weight: bold;\n            background: rgba(203, 203, 203, 0.49);\n            border-radius: 5px 0 0 5px;\n        }\n        </style>\n        <section class="color-section">\n            <xy-popover id="popover" ${this.dir ? "dir='" + this.dir + "'" : ""}>\n                <xy-button class="color-btn" id="color-btn" ${this.disabled ? "disabled" : ""}>_</xy-button>\n                <xy-popcon id="popcon">\n                    <div class="color-sign" id="colors">\n                        ${this.hasCustomPicker ? '<button id="custom-picker" class="rainbow-mask"/>' : ""}\n                        ${this.colorCollections.map((t => '<button class="color-cube" style="background-color:' + t + '" data-color=' + t + "></button>")).join("")}\n                    </div>\n                </xy-popcon>\n            </xy-popover>\n        </section>`
                }
                focus() {
                    this.colorBtn.focus()
                }
                connectedCallback() {
                    this.$popover = this.shadowRoot.getElementById("popover"),
                    this.popcon = this.shadowRoot.getElementById("popcon"),
                    this.colorBtn = this.shadowRoot.getElementById("color-btn"),
                    this.colors = this.shadowRoot.getElementById("colors"),
                    this.colors.addEventListener("click", (t => {
                        const e = t.target.closest("button");
                        e && "custom-picker" !== e.id && (this.nativeclick = !0,
                        this.value = (0,
                        l.handleCSSVariables)(e.dataset.color),
                        this.onColorPicked(this.value))
                    }
                    )),
                    this.$popover.addEventListener("click", ( () => this.closeConverter())),
                    this.hasCustomPicker && this.setupCustomPicker(),
                    this.value = this.defaultvalue
                }
                closeConverter() {
                    if (document.getElementsByClassName(l.CONVERTER_PANEL)[0]) {
                        const t = document.getElementsByClassName(l.CONVERTER_BTN)[0];
                        t?.click()
                    }
                }
                disconnectedCallback() {
                    this.pickerInput && document.body.removeChild(this.pickerInput)
                }
                setupCustomPicker() {
                    let t = !1;
                    this.customPicker = this.shadowRoot.getElementById("custom-picker");
                    const e = this.customPicker;
                    e.style.backgroundColor = this.customColor,
                    this.customPicker.addEventListener("click", (n => {
                        if (t)
                            return void (t = !1);
                        this.pickerInput && document.body.removeChild(this.pickerInput),
                        this.pickerInput = document.createElement("input");
                        const o = this.pickerInput
                          , i = this.popcon.getBoundingClientRect();
                        o.setAttribute("type", "color"),
                        o.value = this.customColor,
                        o.style.position = "fixed",
                        o.style.left = `${i.x + 3}px`,
                        o.style.top = `${i.y + 10}px`,
                        o.style.pointerEvents = "none",
                        o.style.zIndex = "999",
                        o.style.opacity = "0",
                        o.addEventListener("input", (0,
                        l.throttle)((n => {
                            this.nativeclick = !0,
                            this.value = (0,
                            l.handleCSSVariables)(n.target.value),
                            this.onColorPicked(this.value),
                            (0,
                            l.setCustomColorCache)(this.value, this.pluginType),
                            e.style.backgroundColor = this.value,
                            t = !0,
                            e.click()
                        }
                        ), 30)),
                        document.body.appendChild(o),
                        setTimeout(( () => {
                            o.focus(),
                            o.click()
                        }
                        ), 0)
                    }
                    ))
                }
                get defaultvalue() {
                    return this.defaulColor
                }
                get value() {
                    return this.$value
                }
                get type() {
                    return this.getAttribute("type")
                }
                get disabled() {
                    return null !== this.getAttribute("disabled")
                }
                get dir() {
                    return this.getAttribute("dir")
                }
                set dir(t) {
                    this.setAttribute("dir", t)
                }
                set disabled(t) {
                    null === t || !1 === t ? this.removeAttribute("disabled") : this.setAttribute("disabled", "")
                }
                set defaultvalue(t) {
                    this.setAttribute("defaultvalue", t)
                }
                set value(t) {
                    t && (this.$value = t,
                    this.colorBtn.style.setProperty("--themeColor", this.nativeclick ? (0,
                    l.setDefaultColorCache)(t, this.pluginType) : (0,
                    l.getDefaultColorCache)(t, this.pluginType)),
                    this.nativeclick ? (this.nativeclick = !1,
                    this.dispatchEvent(new CustomEvent("change",{
                        detail: {
                            value: this.value
                        }
                    }))) : this.colorPane ? this.colorPane.value = this.value : this.defaultvalue = this.value)
                }
                attributeChangedCallback(t, e, n) {
                    "disabled" == t && this.colorBtn && (null != n ? this.colorBtn.setAttribute("disabled", "disabled") : this.colorBtn.removeAttribute("disabled")),
                    "dir" == t && this.$popover && null != n && (this.$popover.dir = n)
                }
            }
            customElements.get("xy-color-picker") || customElements.define("xy-color-picker", c)
        }
        ,
        697: (t, e, n) => {
            "use strict";
            n.r(e),
            n.d(e, {
                CONVERTER_BTN: () => p,
                CONVERTER_PANEL: () => d,
                getCustomColorCache: () => c,
                getDefaultColorCache: () => l,
                handleCSSVariables: () => i,
                setCustomColorCache: () => a,
                setDefaultColorCache: () => r,
                throttle: () => s
            });
            const o = "editor-js-text-color-cache";
            function i(t) {
                if (function(t) {
                    return ("string" == typeof (e = t) || e instanceof String) && t.includes("--");
                    var e
                }(t)) {
                    const e = function(t) {
                        const e = /\((.*?)\)/.exec(t);
                        if (e)
                            return e[1]
                    }(t);
                    return function(t) {
                        return window.getComputedStyle(document.documentElement).getPropertyValue(t)
                    }(e)
                }
                return t
            }
            function s(t, e) {
                let n;
                return (...o) => {
                    n || (n = setTimeout(( () => {
                        t(...o),
                        n = null
                    }
                    ), e))
                }
            }
            function r(t, e) {
                return sessionStorage.setItem(`${o}-${e}`, JSON.stringify(t)),
                t
            }
            function l(t, e) {
                const n = sessionStorage.getItem(`${o}-${e}`);
                return n ? JSON.parse(n) : t
            }
            function a(t, e) {
                sessionStorage.setItem(`${o}-${e}-custom`, JSON.stringify(t))
            }
            function c(t) {
                const e = sessionStorage.getItem(`${o}-${t}-custom`);
                return e ? JSON.parse(e) : null
            }
            const p = "ce-inline-toolbar__dropdown"
              , d = "ce-conversion-toolbar--showed"
        }
    }
      , e = {};
    function n(o) {
        var i = e[o];
        if (void 0 !== i)
            return i.exports;
        var s = e[o] = {
            id: o,
            exports: {}
        };
        return t[o](s, s.exports, n),
        s.exports
    }
    return n.d = (t, e) => {
        for (var o in e)
            n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, {
                enumerable: !0,
                get: e[o]
            })
    }
    ,
    n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e),
    n.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    n.nc = void 0,
    n(138)
}
)()));
