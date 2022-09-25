"use strict";
const query = new URL(location).searchParams.get("query"),
	epoch = Math.floor(Date.now() / 1e3);
let orderBy, ascending, lastOrderedValue, lastID;

function setOrderBy(e) {
	if (!["TOTAL_SIZE", "DISCOVERED_ON", "UPDATED_ON", "N_FILES", "N_SEEDERS", "N_LEECHERS", "RELEVANCE"].includes(e)) throw new Error("invalid value for @orderBy");
	orderBy = e
}

function orderedValue(e) {
	if ("TOTAL_SIZE" === orderBy) return e.size;
	if ("DISCOVERED_ON" === orderBy) return e.discoveredOn;
	if ("UPDATED_ON" === orderBy) alert("implement it server side first!");
	else {
		if ("N_FILES" === orderBy) return e.nFiles;
		if ("N_SEEDERS" === orderBy) alert("implement it server side first!");
		else if ("N_LEECHERS" === orderBy) alert("implement it server side first!");
		else if ("RELEVANCE" === orderBy) return e.relevance
	}
}

function load() {
	const e = document.getElementsByTagName("button")[0];
	e.textContent = "Loading More Results...", e.setAttribute("disabled", "");
	const t = document.querySelector("main ul"),
		r = document.getElementById("item-template").innerHTML,
		n = "/api/v0.1/torrents?" + encodeQueryData({
			query: query,
			epoch: epoch,
			lastID: lastID,
			lastOrderedValue: lastOrderedValue,
			orderBy: orderBy,
			ascending: ascending
		});
	console.log("reqURL", n);
	let o = new XMLHttpRequest;
	o.onreadystatechange = function () {
		if (4 !== o.readyState) return;
		e.textContent = "Load More Results", e.removeAttribute("disabled"), 200 !== o.status && alert(o.responseText);
		let n = JSON.parse(o.responseText);
		if (0 === n.length) return e.textContent = "No More Results", void e.setAttribute("disabled", "");
		const s = n[n.length - 1];
		lastID = s.id, lastOrderedValue = orderedValue(s);
		for (let e of n) e.size = fileSize(e.size), e.discoveredOn = humaniseDate(e.discoveredOn), t.innerHTML += Mustache.render(r, e)
	}, o.open("GET", n), o.send()
}
window.onload = function () {
	null !== query && "" !== query && (orderBy = "RELEVANCE");
	const e = document.getElementsByTagName("title")[0];
	if (query) {
		e.textContent = query + " - magneticow", document.getElementsByTagName("input")[0].setAttribute("value", query), setOrderBy("RELEVANCE")
	} else e.textContent = "Most recent torrents - magneticow", ascending = !1, setOrderBy("DISCOVERED_ON");
	if (query) {
		document.getElementById("feed-anchor").setAttribute("href", "/feed?query=" + encodeURIComponent(query))
	}
	load()
};
