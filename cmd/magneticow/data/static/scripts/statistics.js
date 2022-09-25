"use strict";
let nElem = null,
	unitElem = null;

function plot(e) {
	Plotly.newPlot("nDiscovered", [{
		x: Object.keys(e.nDiscovered),
		y: Object.values(e.nDiscovered),
		mode: "lines+markers"
	}], {
		title: "Torrents Discovered",
		xaxis: {
			title: "Date / Time"
		},
		yaxis: {
			title: "Number of Torrents Discovered"
		}
	}), Plotly.newPlot("nFiles", [{
		x: Object.keys(e.nFiles),
		y: Object.values(e.nFiles),
		mode: "lines+markers"
	}], {
		title: "Files Discovered",
		xaxis: {
			title: "Date / Time"
		},
		yaxis: {
			title: "Number of Files Discovered"
		}
	});
	let t = Object.values(e.totalSize);
	for (let e in t) t[e] = t[e] / 1073741824;
	Plotly.newPlot("totalSize", [{
		x: Object.keys(e.totalSize),
		y: t,
		mode: "lines+markers"
	}], {
		title: "Total Size of Files Discovered",
		xaxis: {
			title: "Date / Time"
		},
		yaxis: {
			title: "Total Size of Files Discovered (in TiB)"
		}
	})
}

function load() {
	const e = nElem.valueAsNumber,
		t = unitElem.options[unitElem.selectedIndex].value,
		n = "/api/v0.1/statistics?" + encodeQueryData({
			from: fromString(e, t),
			n: e
		});
	console.log("reqURL", n);
	let o = new XMLHttpRequest;
	o.onreadystatechange = function () {
		if (4 !== o.readyState) return;
		200 !== o.status && alert(o.responseText), plot(JSON.parse(o.responseText))
	}, o.open("GET", n), o.send()
}

function fromString(e, t) {
	const n = new Date(Date.now() - e * l(t) * 1e3);
	console.log("frommmm", t, l(t), n);
	let o = "" + n.getUTCFullYear();
	return "years" === t ? o : "weeks" === t ? o += "-W" + i(n.getWeek()) : (o += "-" + i(n.getUTCMonth() + 1), "months" === t ? o : (o += "-" + i(n.getUTCDate()), "days" === t ? o : o += "T" + i(n.getUTCHours())));

	function l(e) {
		return "hours" === e ? 3600 : "days" === e ? 86400 : "weeks" === e ? 604800 : "months" === e ? 2592e3 : "years" === e ? 31536e3 : void 0
	}

	function i(e, t, n) {
		void 0 === t && (t = 2), void 0 === n && (n = "0");
		const o = "" + e;
		return t > o.length ? n.repeat(t - o.length) + e : e
	}
}
window.onload = function () {
	nElem = document.getElementById("n"), unitElem = document.getElementById("unit"), nElem.onchange = unitElem.onchange = load, load()
};
