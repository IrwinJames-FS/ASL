
/**
 * A method to create a popup and present it
 * @param {string} title 
 * @param {string} msg 
 * @param {(boolean)=>void} callback 
 */
export const modal = (title, msg, callback) => {
	const finish = b => {
		document.body.removeChild(overlay);
		callback(b);
	}
	const overlay = document.createElement("div");
	overlay.id = 'modal-overlay';
	overlay.onclick = () => finish(false);

	const hero = document.createElement("div");
	hero.className = "modal-hero";
	hero.onclick = e=>e.stopImmediatePropagation(); //prevent bubbling
	hero.innerHTML = `<h4>${title}</h4>
<p>${msg}</p>`;
	overlay.appendChild(hero);
	const row = document.createElement("div");
	row.className = "row justify-end gap-1";
	hero.appendChild(row);
	

	const confirm = document.createElement("button");
	confirm.type="button";
	confirm.className = "success";
	confirm.innerHTML = `<i class="fa fa-check"></i> Do It!`
	confirm.onclick = () => finish(true);

	

	const cancel = document.createElement("button");
	cancel.type="button";
	cancel.className = "error";
	cancel.innerHTML = `<i class="fa fa-times"></i> Nevermind`
	cancel.onclick = () => finish(true);

	row.appendChild(cancel);
	row.appendChild(confirm);
	
	document.body.appendChild(overlay);

}