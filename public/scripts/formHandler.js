import { createComponent, field } from "./jsrender.js";
import { modal } from "./modal.js";
/*
Some JS to give the form a little more life
*/
(()=>{
	const images = window.images ?? [];
	console.log(images);
	//Watch the images and display preview UI
	const imagesInput = document.querySelector("#image-upload input[type='file']");
	const preview = document.querySelector("#image-upload .images");
	
	const updateDom = () => {
		preview.innerHTML ='';
		
		
		for(const k in imagesInput.files){
			if(isNaN(parseInt(k))) continue;
			const f = imagesInput.files[k];
			const img = new Image();
			const row = createComponent({ //Yes I should probably utilize some light weight rendering engine rather then using this method
				t: "div",
				className: "row",
				children: [
					img,
					{
						t: "div",
						className: "column space-between expand",
						children: [
							{
								t: "div",
								className: "row justify-end",
								children: [
									{
										t: "button",
										className: "error",
										type: "button",
										children: [`<i class="fa fa-trash"></i>`]
									}
								]
							},
							field("Caption", `imagesCaption`, "fixed")
						]
					}
				]
			})
			preview.appendChild(row);
			const fr = new FileReader();
			fr.onload = e => {
				img.src = e.target.result;
			}
			fr.readAsDataURL(f);
		}
	};
	imagesInput.addEventListener("change", updateDom);
	updateDom();

	//expose some stuff to the dom
	window.removeImage = (event, id) => {
		modal("Are you sure", "This will remove this image forever", async confirmed => {
			if(!confirmed) return;
			try{
				console.log(id);
				const res = await fetch(`/images/${id}`, {method: "DELETE"});
				let t = event.target;
				while (t) {
					const parent = t.parentElement;
					console.log(t, t.id);
					if(parent.id === "#images-editor"){
						parent.removeChild(t);
						break;
					}
					t = parent;
				}
				console.dir(event.target);
				console.log(event.target.parentElement(), event.target);

			} catch (e) {
				console.log("Failed to delete", e);
			}
		});
	}
})();