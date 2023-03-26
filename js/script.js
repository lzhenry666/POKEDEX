const pokemonGif = document.querySelector(".pokemon_gif");
const pokemonID = document.querySelector(".pokemon_id");
const pokemonName = document.querySelector(".pokemon_name");
const pokemonWeight = document.querySelector(".pokemon_weight h2");
const pokemonHeight = document.querySelector(".pokemon_height h2");
const pokemonType = document.querySelector(".pokemon_type");
const pokemonHp = document.querySelector(".pokemon_hp");
const pokemonAttack = document.querySelector(".pokemon_attack");
const pokemonDefense = document.querySelector(".pokemon_defense");
const pokemonEspecialAttack = document.querySelector(".special-attack");
const pokemonEspecialDefense = document.querySelector(".special-defense");
const pokemonSpeed = document.querySelector(".speed");
//const pokemonHability = document.querySelect(".pokemon_hability");
const pokemonMoves = document.querySelector(".pokemon_moves");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnTop = document.querySelector(".btn-top");
const btnDown = document.querySelector(".btn-down");

const btnPlay = document.querySelector(".btn-play");
const btnPause = document.querySelector(".btn-pause");

let searchPokemon = 1;

const audio = new Audio("next.mp3");

let background = new Audio("ViridianCity.mp3");

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  pokemonGif.src = "/css/favicon-16x16.png";
  pokemonID.innerHTML = "";
  pokemonName.innerHTML = "Loading...";
  pokemonWeight.innerHTML = `Loading...`;
  pokemonHeight.innerHTML = `Loading...`;
  pokemonType.innerHTML = `Loading...`;
  pokemonHp.innerHTML = `Loading...`;
  pokemonAttack.innerHTML = `Loading...`;
  pokemonDefense.innerHTML = `Loading...`;
  pokemonEspecialAttack.innerHTML = `Loading...`;
  pokemonEspecialDefense.innerHTML = `Loading...`;
  pokemonSpeed.innerHTML = `Loading...`;

  if (data) {
    pokemonGif.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonID.innerHTML = `#${data.id}`;
    pokemonName.innerHTML = data.name;
    searchPokemon = data.id;
    pokemonWeight.innerHTML = `${data.weight} Kg`;
    pokemonHeight.innerHTML = `${data.height}0 Cm`;
    pokemonType.innerHTML = "";
    for (type in data["types"]) {
      pokemonType.innerHTML += `TYPE:${data["types"][type]["type"]["name"]} `;
    }

    pokemonHp.innerHTML = `HP:${data["stats"]["0"]["base_stat"]}`;
    pokemonAttack.innerHTML = `ATK:${data["stats"]["1"]["base_stat"]}`;
    pokemonDefense.innerHTML = `DEF:${data["stats"]["2"]["base_stat"]}`;
    pokemonEspecialAttack.innerHTML = `ESP-ATK:${data["stats"]["3"]["base_stat"]}`;
    pokemonEspecialDefense.innerHTML = `ESP-DEF:${data["stats"]["4"]["base_stat"]}`;
    pokemonSpeed.innerHTML = `SPEED:${data["stats"]["5"]["base_stat"]}`;
    console.log(data);
  } else {
    pokemonGif.src = "images/404.gif";
    pokemonID.innerHTML = "???";
    pokemonName.innerHTML = "error";
    pokemonWeight.innerHTML = `???`;
    pokemonHeight.innerHTML = `???`;
    pokemonType.innerHTML = `???`;
    pokemonHp.innerHTML = `???`;
    pokemonAttack.innerHTML = `???`;
    pokemonDefense.innerHTML = `???`;
    pokemonEspecialAttack.innerHTML = `???`;
    pokemonEspecialDefense.innerHTML = `???`;
    pokemonSpeed.innerHTML = `???`;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

btnPlay.addEventListener("click", () => {
  background.play();
  background.volume = 0.3;
  background.loop = true;
});

btnPause.addEventListener("click", () => {
  background.pause();
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
  audio.play();
  audio.volume = 0.1;
});

btnNext.addEventListener("click", () => {
  searchPokemon++;
  renderPokemon(searchPokemon);

  audio.play();
  audio.volume = 0.1;
});

btnTop.addEventListener("click", () => {
  if (searchPokemon > 0) {
    searchPokemon = searchPokemon + 10;
    renderPokemon(searchPokemon);
  }
  audio.play();
  audio.volume = 0.1;
});

btnDown.addEventListener("click", async (num) => {
  if (searchPokemon > 10) {
    searchPokemon = searchPokemon - 10;
    renderPokemon(searchPokemon);
  } else if (searchPokemon == 1) {
    searchPokemon = 905;
    renderPokemon(searchPokemon);
  }
  audio.play();
  audio.volume = 0.1;
});
renderPokemon(searchPokemon);
