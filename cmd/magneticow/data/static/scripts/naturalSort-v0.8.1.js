function naturalSort(e, r) {
	let a = e.split("/").length,
		t = r.split("/").length;
	if (a !== t) return a - t;
	var l, n, i = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
		s = /^\s+|\s+$/g,
		p = /\s+/g,
		c = /^0x[0-9a-f]+$/i,
		u = /^0/,
		f = function (e) {
			return (naturalSort.insensitive && ("" + e).toLowerCase() || "" + e).replace(s, "")
		},
		d = f(e),
		o = f(r),
		h = d.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
		g = o.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
		w = parseInt(d.match(c), 16) || 1 !== h.length && Date.parse(d),
		$ = parseInt(o.match(c), 16) || w && o.match(/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/) && Date.parse(o) || null,
		m = function (e, r) {
			return (!e.match(u) || 1 == r) && parseFloat(e) || e.replace(p, " ").replace(s, "") || 0
		};
	if ($) {
		if (w < $) return -1;
		if (w > $) return 1
	}
	for (var N = 0, x = h.length, v = g.length, C = Math.max(x, v); N < C; N++) {
		if (l = m(h[N] || "", x), n = m(g[N] || "", v), isNaN(l) !== isNaN(n)) return isNaN(l) ? 1 : -1;
		if (/[^\x00-\x80]/.test(l + n) && l.localeCompare) {
			var D = l.localeCompare(n);
			return D / Math.abs(D)
		}
		if (l < n) return -1;
		if (l > n) return 1
	}
}
