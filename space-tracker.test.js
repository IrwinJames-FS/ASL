const axios = require("axios");
const qs = require("qs")
let galaxy = -1;
let star = -1;
let planet = -1
const groups = [
	[
		`⁉️ Server is available`, 
		[
			[
				`Server is running`,
				async () => {
					try {
						const response = await axios.get("http://localhost:3000/");
						expect(response.status).toBe(200);
						expect(response.data).toBe("Welcome to Star Tracker Library");
					} catch (e) {
						throw e;
					}
				}
			]
		]
	],
	[
		`⁉️ Galaxy resource is available`,
		[
			[
				`Galaxies List is available`,
				async () => {
					try {
						const response = await axios.get("http://localhost:3000/galaxies");
						expect(Array.isArray(response.data)).toBe(true);
					} catch (e){
						throw e;
					}
				}
			],
			[
				`Creating a Galaxy works`,
				async () => {
					try {
						const response = await axios.post("http://localhost:3000/galaxies", qs.stringify({
							name: "Milky Way",
							size: 1e5,
							description: "The Milky Way is a barred spiral galaxy"
						}));
						galaxy = response.data.id;
						expect(response.status).toBe(200);

					} catch (e) {
						throw e;
					}
				}
			],
			[
				`Duplicate names are prevented`,
				async () => {
					try {
						const response = await axios.post("http://localhost:3000/galaxies", qs.stringify({
							name: "Milky Way",
							size: 1e5,
							description: "The Milky Way is a barred spiral galaxy"
						}));
						throw {response};
					} catch ({response:e}) {
						expect(e.status).toBe(422);
					}
				}
			],
			[
				`Missing Field insertions are prevented`,
				async () => {
					try {
						const response = await axios.post("http://localhost:3000/galaxies", qs.stringify({}));
						throw {response};
					} catch ({response:e}) {
						expect(e.status).toBe(422);
					}
				}
			],
			[
				`Able to update a galaxy`,
				async () => {
					if(!~galaxy) throw new Error("No entry ID");
					try {
						const response = await axios.put("http://localhost:3000/galaxies/"+galaxy, qs.stringify({
							name: "The Large Magellanic (LMC)",
							size: 7e3,
							description: "LMC is an irregular dwarf galaxies"
						}));
						expect(response.status).toBe(200);
						expect(response.data.name).toBe("The Large Magellanic (LMC)");
					} catch (e) {
						throw e;
					}
				}
			]
		]
	],
	[
		`⁉️ Star resource is available`,
		[
			[
				`Stars List is available`,
				async () => {
					try {
						const response = await axios.get("http://localhost:3000/stars");
						expect(Array.isArray(response.data)).toBe(true);
					} catch (e){
						throw e;
					}
				}
			],
			[
				`Creating a Star`,
				async () => {
					if (!~galaxy) throw new Error("No Galaxy")
					try {
						const response = await axios.post("http://localhost:3000/stars", qs.stringify({
							name: "Sun",
							size: 865000,
							description: "The Sun is informally called a yellow dwarf",
							GalaxyId: galaxy
						}));
						console.log(response.data);
						star = response.data.id;
						expect(response.status).toBe(200);

					} catch (e) {
						throw e;
					}
				}
			],
			[
				`Duplicate names are prevented`,
				async () => {
					try {
						const response = await axios.post("http://localhost:3000/stars", qs.stringify({
							name: "Sun",
							size: 865000,
							description: "The Sun is informally called a yellow dwarf",
						}));
						throw {response};
					} catch ({response:e}) {
						expect(e.status).toBe(422);
					}
				}
			],
			[
				`Missing Field insertions are prevented`,
				async () => {
					try {
						const response = await axios.post("http://localhost:3000/stars", qs.stringify({}));
						throw {response};
					} catch ({response:e}) {
						expect(e.status).toBe(422);
					}
				}
			],
			[
				`Able to update a star`,
				async () => {
					if(!~star) throw new Error("No entry ID");
					try {
						console.log(star);
						const response = await axios.put("http://localhost:3000/stars/"+star, qs.stringify({
							name: "Proxima Centauri",
							size: 133320,
							description: "Proxima Centauri is a red dwarf"
						}));
						console.log(response);
						expect(response.status).toBe(200);
						expect(response.data.name).toBe("Proxima Centauri");
					} catch (e) {
						throw e;
					}
				}
			]
		]
	],
	[
		`Cleaning up`,
		[
			[
				`Deleting the Star made`,
				async () => {
					if (!~star) throw new Error("No entry ID");
					try {
						const response = await axios.delete(`http://localhost:3000/stars/${star}`);
						expect(response.status).toBe(200);
					} catch (e) {
						throw e;
					}
				}
			],
			[
				`Deleting the Galaxy made`,
				async () => {
					if (!~galaxy) throw new Error("No entry ID");
					try {
						const response = await axios.delete(`http://localhost:3000/galaxies/${galaxy}`);
						expect(response.status).toBe(200);
					} catch (e) {
						throw e;
					}
				}
			]
		]
	]
]

groups.forEach(group => describe(group[0], ()=> group[1].forEach(async t => await test(...t))));