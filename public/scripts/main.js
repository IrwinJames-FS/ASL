import { modal } from "./modal.js";

//Just for some basic js on all pages
(()=>{ //quickest way to ensure other js has loaded
	window.dref = (event, title, message) => {
		event.preventDefault();
		event.stopImmediatePropagation();

		return modal(title, message, confirmed => {
			const el = climbTree(event.target, "A");
			window.location.href= el.href;
		});
	}

	const climbTree = (elem, tag) => {
		let e = elem;
		while (e) {
			console.log(e.tagName)
			if(e.tagName === tag) return e;
			e = e.parentElement;
		}
		return null;
	}
})();

