const cardsArea = document.querySelector(".cardsArea")

const colorBG = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    dark: '#807c84',
    ghost: '#ff40ff',
    ice: '#00ffff',
    steel: '#aeaeae'
}

const colorType = {

    fire: '#ff4325',
    grass: '#77cd52',
    electric: '#ffce36',
    water: '#2c9eff',
    ground: '#d3bd4e',
    rock: '#b6a55f',
    fairy: '#f097f1',
    poison: '#aa549d',
    bug: '#aabb21',
    dragon: '#7568eb',
    psychic: '#fb5897',
    flying: '#8593f6',
    fighting: '#ba583f',
    normal: '#a7aa95',
    dark: '#000',
    ghost: '#6768bb',
    ice: '#64ccff',
    steel: '#5f5f5f'
    
}

const genPokemons = async(x) => {

   if (cardsArea.querySelector('.card')) {
        clearPokemons()
   }
 
    let start
    let end

    if (x) {

        switch (x) {
        
            case 1:
                start = 1
                end = 151
                break
    
            case 2:
                start = 152
                end = 251
                break
    
            case 3:
                start = 252
                end = 386
                break
    
            case 4:
                start = 387
                end = 494
                break
    
            case 5:
                start = 495
                end = 649
                break
    
            case 6:
                start = 650
                end = 721
                break
    
            case 7:
                start = 722
                end = 809
                break
    
            case 8:
                start = 810
                end = 905
                break
    
            case 9:
                start = 906
                end = 1009
                break
        }

    } else {
        start = 1
        end = 151
    }

    await selectPokemon(start, end)

}

const selectPokemon = async(start, end) => {
    for (let i = start; i <= end; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async(id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const resp = await fetch(url)
    const data = await resp.json() 
    await caracPokemon(data)

    console.log(data)
}

const caracPokemon = async(poke) => {
    
    const card = document.createElement('div')
    card.classList.add('card')

    const cardTypes = document.createElement('div')
    cardTypes.classList.add('card-types')

    const cardMainType = document.createElement('div')
    cardMainType.classList.add('mainType')

    const cardSecondType = document.createElement('div')
    cardSecondType.classList.add('secondType')


    let idPokemon = poke.id

    let namePokemon = poke.name 

    let typePokemon = []

        for(let i = 0; i < poke.types.length; i++){
            typePokemon.push(poke.types[i].type.name)
        }    
        
    card.innerHTML = 
    
        `<div class="card-id">${idPokemon}#</div>

        <div class="card-image">
            <div class="card-image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png" alt="">
            </div>
        </div>

        <div class="card-name">${namePokemon.toUpperCase()}</div>`

    if (poke.types.length == 1) {

        cardMainType.innerHTML = `<div class="mainType">${typePokemon[0].toUpperCase()}</div>`

        cardMainType.style.backgroundColor = colorType[poke.types[0].type.name]

        cardTypes.appendChild(cardMainType)
        card.appendChild(cardTypes)
       

    } else {

        cardMainType.innerHTML = `<div class="mainType">${typePokemon[0].toUpperCase()}</div>`
        cardSecondType.innerHTML = `<div class="secondType">${typePokemon[1].toUpperCase()}</div>`

        cardMainType.style.backgroundColor = colorType[poke.types[0].type.name]
        cardSecondType.style.backgroundColor = colorType[poke.types[1].type.name]

        cardTypes.appendChild(cardMainType)
        cardTypes.appendChild(cardSecondType)
        card.appendChild(cardTypes)       

    }

    card.style.backgroundColor = colorBG[poke.types[0].type.name]

    cardsArea.appendChild(card)
}

const clearPokemons = () => {

    let cards = document.querySelectorAll('.card')

    cards.forEach((item) => {
        item.remove()
    })
}

genPokemons()