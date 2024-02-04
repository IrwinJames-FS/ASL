/**
 * Just a convenience method to quickly make multi element components
 */
export const createComponent = ({t, className, id, children = [], events = {}, ...attributes}) => {
	const elem = document.createElement(t);
	elem.className = className;
	elem.id = id;
	for (const attr in attributes){
		const attribute = attributes[attr];
		elem.setAttribute(attr, attribute);
	}
	for (const child of children) {
		if(typeof child === "string"){
			elem.innerHTML += child;
		} else {
			elem.appendChild(toHTMLElement(child));
		}
	}
	for(const event in events) {
		
		elem.addEventListener(event, events[event]);
	}
	return elem;
}

const toHTMLElement = o => {
	if (o instanceof HTMLElement) return o;
	return createComponent(o);
}

export const field = (lbl, name, cls=[], value="") => createComponent({
	t: "label",
	class: ["field", cls].join(' ').trim(),
	children: [
		`<span>${lbl}</span>`,
		`<input type="text" name="${name}" placeholder="" value="${value}"/>`
	]
});

