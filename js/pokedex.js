"use strict";

window.addEventListener("DOMContentLoaded", init);

function init(){

	// initialising state
	//----------------------
	const pokemon = {
		"001" : Object.freeze({
			id: "001",
			name: "Bulbasaur",
			types: [
				"Grass",
				"Poison"
			],
			height: 70,
			weight: 6.9,
			description: "Bulbasaur is a small, quadruped Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On its back is a green plant bulb, which is grown from a seed planted there at birth.",
			entry: "Bulbasaur. It bears the seed of a plant on its back from birth. The seed slowly develops. Researchers are unsure whether to classify Bulbasaur as a plant or animal. Bulbasaur are extremely calm and very difficult to capture in the wild."
		}),
		"004" : Object.freeze({
			id: "004",
			name: "Charmander",
			types: [
				"Fire",
			],
			height: 60,
			weight: 8.5,
			description: "Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes. Its underside from the chest down and the soles of its feet are cream-colored. It has two small fangs visible in its upper jaw and two smaller fangs in its lower jaw. A fire burns at the tip of this Pokémon's slender tail and has blazed there since Charmander's birth.",
			entry: "Charmander. A flame burns on the tip of its tail from birth. It is said that a Charmander dies if its flame ever goes out."
		}),
		"007" : Object.freeze({
			id: "007",
			name: "Squirtle",
			types: [
				"Water",
			],
			height: 50,
			weight: 9,
			description: "Squirtle is a small Pokémon that resembles a light blue turtle. While it typically walks on its two short legs, it has been known to run on all fours. It has large, purplish or reddish eyes and a slightly hooked upper lip. Each of its hands and feet have three pointed digits. The end of its long tail curls inward. Its body is encased by a tough shell that forms and hardens after birth. This shell is brown on the top, pale yellow on the bottom, and has a thick white ridge between the two halves.",
			entry: "Squirtle. This Tiny Turtle Pokémon draws its long neck into its shell to launch incredible water attacks with amazing range and accuracy. The blasts can be quite powerful."
		}),
		"025" : Object.freeze({
			id: "025",
			name: "Pikachu",
			types: [
				"Electric",
			],
			height: 40,
			weight: 6,
			description: "Pikachu is a short, chubby rodent Pokémon. It is covered in yellow fur with two horizontal brown stripes on its back. It has a small mouth, long, pointed ears with black tips, and brown eyes. A each cheek is a red circle that contains a pouch for electricity storage. It has short forearms with five fingers on each paw, and its feet each have three toes. At the base of its lightning bolt-shaped tail is a patch of brown fur.",
			entry: "Pikachu, the Mouse Pokémon. It can generate electric attacks from the electric pouches located in both of its cheeks."
		})
	};
	const elements = {
		name: document.getElementById("name"),
		id: document.getElementById("poke-id"),
		types: document.getElementById("types"),
		height: document.getElementById("height"),
		weight: document.getElementById("weight"),
		image: document.getElementById("image"),
		entry: document.getElementById("entry")
	};
	const state = {
		activePokemon: "",
		data: Object.freeze(pokemon), 
		elements: Object.freeze(elements)
	};

	// DOM RETRIEVAL
	//----------------------
	const glossary = document.getElementById("glossary");
	const inputs   = glossary.getElementsByClassName("pokemon-input");


	//BINDING SCOPE
	//----------------------
	setActivePokemon = setActivePokemon.bind(true, state);
	updateDetails    = updateDetails.bind(true, state);


	//Adding event listeners
	//----------------------
	for(let input of inputs){
		input.addEventListener("change", setActivePokemon);
	}


	//EVENT HANDLERS
	//-----------------------
	function setActivePokemon(currState, event){

		const {
			target: {
				dataset,
				checked
			}
		} = event;

		if(checked){
			const { pokeid }        = dataset;
			currState.activePokemon = pokeid;

			updateDetails();
		}
	}//setActivePokemon


	//UTILS
	//-----------------------
	function updateDetails(currState){

		//extract elements from state
		const { 
			activePokemon,
			data,
			elements: {
				name: nameEl,
				id: idEl,
				types: typesEl,
				height: heightEl,
				weight: weightEl,
				image: imageEl,
				entry: entryEl
			}
		} = currState;

		//extract data from state
		const {
			name,
			id,
			types,
			height,
			weight,
			entry,
			description,
		} = data[activePokemon];

		//create type items
		const typesFragment = document.createDocumentFragment();
		for(let elementalType of types){
			const item     = document.createElement("li");
			item.innerText = elementalType;

			typesFragment.appendChild(item);
		}

		//output to DOM
		nameEl.innerText   = name;
		idEl.innerText     = id;
		typesEl.innerHTML  = "";
		heightEl.innerText = height;
		weightEl.innerText = weight;
		imageEl.src        = `assets/2d/${id}/main.png`;
		imageEl.alt        = description;
		entryEl.innerText  = entry;

		typesEl.appendChild(typesFragment);

	}//updateDetails
}//init