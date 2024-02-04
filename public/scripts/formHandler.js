/*
Some JS to give the form a little more life
*/
(()=>{

	//Watch the images and display preview UI
	const imagesInput = document.querySelector("#image-upload input[type='file']");
	const preview = document.querySelector("#image-upload #preview");
	imagesInput.addEventListener("change", ({target}) => {
		preview.innerHTML ='';
		for(const k in target.files){
			if(!parseInt(k)) continue;
			const f = target.files[k];
			const img = new Image();
			const input = document.createElement("input");
			input.name = "Image";
			input.value = `n-`+k; //prefixed index so server can easily separate existing image new image
			input.type = "radio";
			const lbl = document.createElement("label");
			lbl.appendChild(img);
			lbl.appendChild(input);
			lbl.className = "image-selection";
			preview.appendChild(lbl);

			const fr = new FileReader();
			fr.onload = e => {
				img.src = e.target.result;
			}
			fr.readAsDataURL(f);
		}
	});
})();