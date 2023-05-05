import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const borderByType = {
  grass: 'border-[#BAD6AA]',
  fire: 'border-[#FD7D24]',
  water: 'border-[#4592C4]',
  bug: 'border-[#729F3F]',
  normal: 'border-[#A4ACAF]',
  poison: 'border-[#B97FC9]',
  electric: 'border-[#EED535]',
  ground: 'border-[#AB9842]',
  fairy: 'border-[#FDB9E9]',
  fighting: 'border-[#D56723]',
  psychic: 'border-[#F366B9]',
  rock: 'border-[#A38C21]',
  ghost: 'border-[#7B62A3]',
  ice: 'border-[#51C4E7]',
  dragon: 'border-[#F16E57]',
  dark: 'border-[#707070]',
  steel: 'border-[#9EB7B8]',
  flying: 'border-[#3DC7EF]',
}

const backgroundByType = {
  grass: 'from-[#82C1C9] to-[#BAD6AA]',
  fire: 'from-[#F96D6F] to-[#E8AE1B]',
  water: 'from-[#133258] to-[#1479FB]',
  bug: 'from-[#729F3F] to-[#A8B820]',
  normal: 'from-[#A4ACAF] to-[#C3C3C1]',
  poison: 'from-[#B97FC9] to-[#A040A0]',
  electric: 'from-[#EED535] to-[#F7D038]',
  ground: 'from-[#654008] to-[#D69638]',
  fairy: 'from-[#FDB9E9] to-[#EE99AC]',
  fighting: 'from-[#D56723] to-[#EB4971]',
  psychic: 'from-[#F366B9] to-[#FBA8C9]',
  rock: 'from-[#A38C21] to-[#B6A136]',
  ghost: 'from-[#323569] to-[#787DDA]',
  ice: 'from-[#6FBEDF] to-[#BDEBFE]',
  dragon: 'from-[#F16E57] to-[#FCB6A7]',
  dark: 'from-[#030706] to-[#5A5E5D]',
  steel: 'from-[#9EB7B8] to-[#D1D1E0]',
  flying: 'from-[#3DC7EF] to-[#BDB9B8]',
}

const PokemonCard = ({pokemonUrl}) => {

  const [pokemon, setPokemon] = useState()

  const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join('/')
  
  useEffect(() => {
    axios.get(pokemonUrl)
    .then((res) => setPokemon(res.data))
    .catch((err) => console.log(err))
  },[])

  return (
    
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-[7px] rounded-xl ${borderByType[pokemon?.types[0].type.name]}`}>
      
      <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
        <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2 '>
          <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </div>
      </section>

      <section className='mt-10'>
        <h3>{pokemon?.name}</h3>
        <h4>{types}</h4>
        <span>Type</span>
        
      <hr />

      <section className='grid grid-cols-3 gap-2 p-3'>
        {pokemon?.stats.map(stat => (
          <div key={stat.stat.name}>
            <h5>{stat.stat.name}</h5>
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </section>

      </section>

    </Link>

  )
}

export default PokemonCard