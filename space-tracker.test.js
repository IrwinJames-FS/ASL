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
							name: "Neitherlands",
							size: 1e5,
							description: "A Fictional galaxy"
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
							name: "Neitherlands",
							size: 1e5,
							description: "A Fictional galaxy"
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
					if(!~galaxy) throw new Error("No Galaxy Saved");
					try {
						const response = await axios.put("http://localhost:3000/galaxies/"+galaxy, qs.stringify({
							name: "The Great Void",
							size: 7e6,
							description: "The fictional galaxy the neitherlands exists in."
						}));
						expect(response.status).toBe(200);
						expect(response.data.name).toBe("The Great Void");
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
							name: "Umbers Rage",
							size: 865000,
							description: "A fictional star",
							GalaxyId: galaxy
						}));
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
							name: "Umbers Rage",
							size: 865000,
							description: "A fictional star",
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
							name: "Embers entertainment",
							size: 133320,
							description: "A fictional star"
						}));
						expect(response.status).toBe(200);
						expect(response.data.name).toBe("Embers entertainment");
					} catch (e) {
						throw e;
					}
				}
			]
		]
	],
	[
		`⁉️ Planet resource is available`,
		[
			[
				`Planet List is available`,
				async () => {
					try {
						const response = await axios.get("http://localhost:3000/planets");
						expect(Array.isArray(response.data)).toBe(true);
					} catch (e){
						throw e;
					}
				}
			],
			[
				`Creating a Planet`,
				async () => {
					if (!~star) throw new Error("No Star")
					try {
						const qstr = qs.stringify({
							name: "Fillory",
							size: 4e3,
							description: "A magical land where whimsy is a law of physics",
							Stars: [star]
						});
						console.log(qstr);
						const response = await axios.post("http://localhost:3000/planets", qstr);
						planet = response.data.id;
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
						const response = await axios.post("http://localhost:3000/planets", qs.stringify({
							name: "Fillory",
							size: 4e3,
							description: "A magical land where whimsy is a law of physics",
							Stars: [star]
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
						const response = await axios.post("http://localhost:3000/planets", qs.stringify({}));
						throw {response};
					} catch ({response:e}) {
						expect(e.status).toBe(422);
					}
				}
			],
			[
				`Able to update a planet`,
				async () => {
					if(!~planet) throw new Error("No Planet");
					console.log(planet);
					try {
						const response = await axios.put("http://localhost:3000/planets/"+planet, qs.stringify({
							name: "Fillory",
							size: 2e3,
							description: "A magical land where whimsy is a law of physics",
						}));
						console.log(response);
						expect(response.status).toBe(200);
						expect(response.data.size).toBe(2e3);
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
				`Deleting the Planet made`,
				async () => {
					if (!~planet) throw new Error("No planet");
					try {
						const response = await axios.delete(`http://localhost:3000/planets/${planet}`);
						expect(response.status).toBe(200);
					} catch (e) {
						throw e;
					}
				}
			],
			[
				`Deleting the Star made`,
				async () => {
					if (!~star) throw new Error("No star");
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
					if (!~galaxy) throw new Error("No galaxy");
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