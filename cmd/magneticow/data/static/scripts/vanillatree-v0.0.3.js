! function (e, t) {
	"function" == typeof define && define.amd ? define(t) : "object" == typeof module && module.exports ? module.exports = t() : e.VanillaTree = t()
}(this, function () {
	"use strict";
	var e, t, n, i, r, a, s, l, o, c, d, h, u = (e = window, t = document, n = [], i = /\.(.+)/, r = 0, a = "EventListener", s = "MatchesSelector", (h = function (e, t) {
			return new h.i(e, t)
		}).i = function (i, r) {
			n.push.apply(this, i ? i.nodeType || i == e ? [i] : "" + i === i ? /</.test(i) ? ((l = t.createElement(r || "q")).innerHTML = i, l.children) : (r && h(r)[0] || t).querySelectorAll(i) : /f/.test(typeof i) ? /c/.test(t.readyState) ? i() : h(t).on("DOMContentLoaded", i) : i : n)
		}, h.i[d = "prototype"] = (h.extend = function (e) {
			for (c = arguments, l = 1; l < c.length; l++)
				if (d = c[l])
					for (o in d) e[o] = d[o];
			return e
		})(h.fn = h[d] = n, {
			on: function (e, t) {
				return e = e.split(i), this.map(function (n) {
					(i[l = e[0] + (n.b$ = n.b$ || ++r)] = i[l] || []).push([t, e[1]]), n["add" + a](e[0], t)
				}), this
			},
			off: function (e, t) {
				return e = e.split(i), d = "remove" + a, this.map(function (n) {
					if (l = (c = i[e[0] + n.b$]) && c.length)
						for (; o = c[--l];) t && t != o[0] || e[1] && e[1] != o[1] || (n[d](e[0], o[0]), c.splice(l, 1));
					else !e[1] && n[d](e[0], t)
				}), this
			},
			is: function (e) {
				return !!(o = (l = this[0]) && (l.matches || l["webkit" + s] || l["moz" + s] || l["ms" + s])) && o.call(l, e)
			}
		}), h),
		f = function (e, t) {
			return u.extend(document.createElement(e), t)
		},
		p = function (e, t) {
			var n = this,
				i = n.container = u(e)[0],
				r = n.tree = i.appendChild(f("ul", {
					className: "vtree"
				}));
			n.placeholder = t && t.placeholder, n._placeholder(), n.leafs = {}, r.addEventListener("click", function (e) {
				u(e.target).is(".vtree-leaf-label") ? n.select(e.target.parentNode.getAttribute("data-vtree-id")) : u(e.target).is(".vtree-toggle") && n.toggle(e.target.parentNode.getAttribute("data-vtree-id"))
			}), t && t.contextmenu && (r.addEventListener("contextmenu", function (e) {
				var n;
				if (u(".vtree-contextmenu").forEach(function (e) {
						e.parentNode.removeChild(e)
					}), u(e.target).is(".vtree-leaf-label")) {
					e.preventDefault(), e.stopPropagation(), n = f("menu", {
						className: "vtree-contextmenu"
					});
					var i = e.target.getBoundingClientRect();
					u.extend(n.style, {
						top: (e.target.offsetTop + i.height).toString() + "px",
						left: e.target.offsetLeft.toString() + "px",
						display: "block"
					}), t.contextmenu.forEach(function (t) {
						n.appendChild(f("li", {
							className: "vtree-contextmenu-item",
							innerHTML: t.label
						})).addEventListener("click", t.action.bind(t, e.target.parentNode.getAttribute("data-vtree-id")))
					}), e.target.parentNode.appendChild(n)
				}
			}), document.addEventListener("click", function (e) {
				2 !== e.button && u(".vtree-contextmenu").forEach(function (e) {
					e.parentNode.removeChild(e)
				})
			}))
		};
	return p.prototype = {
		constructor: p,
		_dispatch: function (e, t) {
			var n;
			try {
				n = new CustomEvent("vtree-" + e, {
					bubbles: !0,
					cancelable: !0,
					detail: {
						id: t
					}
				})
			} catch (i) {
				(n = document.createEvent("CustomEvent")).initCustomEvent("vtree-" + e, !0, !0, {
					id: t
				})
			}
			return (this.getLeaf(t, !0) || this.tree).dispatchEvent(n), this
		},
		_placeholder: function () {
			var e;
			return !this.tree.children.length && this.placeholder ? this.tree.innerHTML = '<li class="vtree-placeholder">' + this.placeholder + "</li>" : (e = this.tree.querySelector(".vtree-placeholder")) && this.tree.removeChild(e), this
		},
		getLeaf: function (e, t) {
			var n = u('[data-vtree-id="' + e + '"]', this.tree)[0];
			if (!t && !n) throw Error('No VanillaTree leaf with id "' + e + '"');
			return n
		},
		getChildList: function (e) {
			var t, n;
			return e ? (n = this.getLeaf(e), (t = u("ul", n)[0]) || (t = n.appendChild(f("ul", {
				className: "vtree-subtree"
			})))) : t = this.tree, t
		},
		add: function (e) {
			if (!this.getLeaf(e.id, !0)) {
				var t, n = f("li", {
						className: "vtree-leaf"
					}),
					i = this.getChildList(e.parent);
				return n.setAttribute("data-vtree-id", t = e.id || Math.random()), n.appendChild(f("span", {
					className: "vtree-toggle"
				})), n.appendChild(f("a", {
					className: "vtree-leaf-label",
					innerHTML: e.label
				})), i.appendChild(n), i !== this.tree && i.parentNode.classList.add("vtree-has-children"), this.leafs[t] = e, e.opened || this.close(t), e.selected && this.select(t), this._placeholder()._dispatch("add", t)
			}
		},
		move: function (e, t) {
			var n = this.getLeaf(e),
				i = n.parentNode,
				r = this.getLeaf(t, !0);
			return r && r.classList.add("vtree-has-children"), this.getChildList(t).appendChild(n), i.parentNode.classList.toggle("vtree-has-children", !!i.children.length), this._dispatch("move", e)
		},
		remove: function (e) {
			var t = this.getLeaf(e),
				n = t.parentNode;
			return n.removeChild(t), n.parentNode.classList.toggle("vtree-has-children", !!n.children.length), this._placeholder()._dispatch("remove", e)
		},
		open: function (e) {
			return this.getLeaf(e).classList.remove("closed"), this._dispatch("open", e)
		},
		close: function (e) {
			return this.getLeaf(e).classList.add("closed"), this._dispatch("close", e)
		},
		toggle: function (e) {
			return this[this.getLeaf(e).classList.contains("closed") ? "open" : "close"](e)
		},
		select: function (e) {
			var t = this.getLeaf(e);
			return t.classList.contains("vtree-selected") || (u("li.vtree-leaf", this.tree).forEach(function (e) {
				e.classList.remove("vtree-selected")
			}), t.classList.add("vtree-selected"), this._dispatch("select", e)), this
		}
	}, p
});
