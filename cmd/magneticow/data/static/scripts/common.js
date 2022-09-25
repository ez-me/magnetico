"use strict";

function encodeQueryData(e) {
	let t = [];
	for (let n in e) null !== e[n] && void 0 !== e[n] && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
	return t.join("&")
}

function fileSize(e) {
	let t = -1;
	do {
		e /= 1024, t++
	} while (e > 1024);
	return Math.max(e, .1).toFixed(1) + [" KiB", " MiB", " GiB", " TiB", " PiB", " EiB", " ZiB", " YiB"][t]
}

function humaniseDate(e) {
	return new Date(1e3 * e).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	})
}

function myFetch(e, t) {
	return null == t && (t = {}), null == t.credentials && (t.credentials = "same-origin"), fetch(e, t).then(function (e) {
		if (e.status >= 200 && e.status < 300) return Promise.resolve(e);
		var t = new Error(e.statusText || e.status);
		return t.response = e, Promise.reject(t)
	})
}
Date.prototype.getWeek = function (e) {
	let t = new Date(this.getFullYear(), 0, 1),
		n = t.getDay() - 1;
	n = n >= 0 ? n : n + 7;
	let i, r = Math.floor((this.getTime() - t.getTime() - 6e4 * (this.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5) + 1;
	return n < 4 ? (i = Math.floor((r + n - 1) / 7) + 1) > 52 && (nYear = new Date(this.getFullYear() + 1, 0, 1), nday = nYear.getDay() - 1, nday = nday >= 0 ? nday : nday + 7, i = nday < 4 ? 1 : 53) : i = Math.floor((r + n - 1) / 7), i
};
