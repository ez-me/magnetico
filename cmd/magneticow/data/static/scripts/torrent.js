"use strict";
window.onload = function () {
	let e = window.location.pathname.split("/")[2];
	fetch("/api/v0.1/torrents/" + e).then(e => e.json()).then(n => {
		document.querySelector("title").innerText = n.name + " - magneticow";
		const t = document.getElementById("main-template").innerHTML;
		document.querySelector("main").innerHTML = Mustache.render(t, {
			name: n.name,
			infoHash: n.infoHash,
			sizeHumanised: fileSize(n.size),
			discoveredOnHumanised: humaniseDate(n.discoveredOn),
			nFiles: n.nFiles
		}), fetch("/api/v0.1/torrents/" + e + "/filelist").then(e => e.json()).then(e => {
			const n = new VanillaTree("#fileTree", {
				placeholder: "Loading..."
			});
			for (let t of e) {
				let e = t.path.split("/");
				for (let i = 0; i < e.length; i++) n.add({
					id: e.slice(0, i + 1).join("/"),
					parent: i >= 1 ? e.slice(0, i).join("/") : void 0,
					label: e[i] + (i === e.length - 1 ? "&emsp;<tt>" + fileSize(t.size) + "</tt>" : ""),
					opened: !0
				})
			}
		}), myFetch("/api/v0.1/torrents/" + e + "/readme").then(e => e.text()).then(e => {
			document.getElementById("readme").innerText = e
		}).catch(e => {
			document.getElementById("readme").innerText = e
		})
	})
};
