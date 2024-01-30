/*
Using a js document instead of a json so I can have comments
Solar system sizes are based on planets diameter 
information found at https://www.smartconversion.com/factsheet/solar-system-diameters-of-planets
Galaxy information from https://nasa.gov
*/
module.exports = {
	Galaxies: [
		{
			name: "Milky Way",
			description: "The Milky Way is our home Galaxy, It is a barred spriral galaxy.",
			size: 1e5
		}
	],
	Stars: [
		{
			name: "Sun",
			description: "Our Home sun. This classification of star is often referred to as a Yellow Dwarf however it puts off white light",
			size: 865383,
			GalaxyId: 0,
		},
		{
			name: "Sirius A",
			description: "The larger of the two stars in this binary system",
			size: 1.5e6,
			GalaxyId: 0
		},
		{
			name: "Sirius B",
			description: "The smaller of two stars in this binary system",
			size: 7262,
			GalaxyId: 0
		}
	],
	Planets: [
		{
			name: "Mercury",
			description: "The planet closest to the sun in our solar system",
			size: 3032,
			Stars: [0]
		},
		{
			name: "Venus",
			description: "The second planet in our solar system",
			size: 7521,
			Stars: [0]
		},
		{
			name: "Earth",
			description: "Our home planet. The third planet in the solar system Considering all its done for us we should be nicer to it.",
			size: 7926,
			Stars: [0]
		},
		{
			name: "Mars",
			description: "The fourth planet in the solar system",
			size: 4221,
			Stars: [0]
		},
		{
			name: "Jupiter",
			description: "The fifth planet in the solar system",
			size: 88846,
			Stars: [0]
		},
		{
			name: "Saturn",
			description: "The sixth planet in the solar system",
			size: 74897,
			Stars: [0]
		},
		{
			name: "Uranus",
			description: "The seventh planet in the solar system",
			size: 31763,
			Stars: [0]
		},
		{
			name: "Neptune",
			description: "The eighth and final planet in the solar system",
			size: 30775,
			Stars: [0]
		},
		{
			name: "Sirius Black",
			description: "A fictional planet in the sirius system",
			size: 7e3,
			Stars: [1, 2]
		},
		{
			name: "Sirius White",
			description: "Another fictional planet in the sirius system",
			size: 7.5e3,
			Stars: [1,2]
		}
	]
}