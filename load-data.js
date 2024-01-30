/*
This file will act as a loader. This makes it easier to ensure implementation is working correctly
*/

const axios = require("axios");
const qs = require("qs");
const {Galaxies, Stars, Planets} = require("./initial-data");

GALAXY = "http://localhost:3000/galaxies";
STAR = "http://localhost:3000/stars";
PLANET = "http://localhost:3000/planets";
const load = async () => {

	//This map will be used to convert the relative index used in initial data to the appropriate index in the database.
	let map = {
		Galaxies: [],
		Stars: [],
	}

	for (let i = 0, ln = Galaxies.length; i<ln; i++){
		const response = await axios.post(GALAXY, qs.stringify(Galaxies[i]))
		map.Galaxies.push(response.data.id);
	}

	for (let i = 0, ln = Stars.length; i<ln; i++){
		const {GalaxyId, ...star} = Stars[i];
		const response = await axios.post(STAR, qs.stringify({...star, GalaxyId: map.Galaxies[GalaxyId]}));
		map.Stars.push(response.data.id);
	}

	for (let i = 0, ln = Planets.length; i<ln; i++){
		const {Stars, ...planet} = Planets[i];
		await axios.post(PLANET, qs.stringify({...planet, Stars: Stars.map(s=>map.Stars[s])}));
	}
}

load();