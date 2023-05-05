import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {

  const [pokemon, setPokemon] = useState()
  console.log(pokemon)

  const {id} = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`

    axios.get(URL)
    .then((res) => setPokemon(res.data))
    .catch((err) => console.log(err))
  },[])

  const getPercentStatBar = (stat_base) => {
    const percentBarProgress = Math.floor((stat_base * 100)/255)
    return `${percentBarProgress}%`
  }
  
  return (
    <section className='grid gap-14 sm:gap-[74px] bg-slate-200'>

      <Header/>

      <section className='sm:mb-10 mt-[90px] sm:mt-10'>

        <article className='px-4 pb-[50px] max-w-[800px] mx-auto shadow-xl sm:px-[60px] sm:py-[40px]'>

          <section className='bg-gradient-to-b from-green-500 to-black relative h-[80px] sm:h-[105px]'>
            <div className='w-[184px] sm:w-[230px] mx-auto absolute left-1/2 -translate-x-1/2 -top-[85px] sm:-top-[96px]'>
            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </div>
          </section>

            <div>
              <h3>#{pokemon?.id}</h3>
            </div>
            <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
              <hr />
              <h2 className='capitalize font-bold'>{pokemon?.name}</h2>
              <hr />
            </div>
            <div className='flex justify-center gap-6 text-center my-[18px]'>
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>
              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>

          <section className='grid sm:grid-cols-2 gap-4'>
            <section className='text-center'>
              <h3 className='mb-5'>Types</h3>
              <section className='flex justify-evenly gap-4'>
                {
                  pokemon?.types.map(type => <article key={type.type.name} className='py-1 px-4 border-[1px] border-dashed italic border-gray-400 capitalize w-max mx-auto'>{type.type.name}</article>)
                }
              </section>
            </section>
            <section className='text-center'>
              <h3 className='mt-3'>Abilities</h3>
              <section className='grid grid-cols-2 gap-4 mt-2'>
                {
                  pokemon?.abilities.map(ability => <article key={ability.ability.name} className='rounded-xl border-[3px] border-gray-300 mx-auto capitalize text-center w-max py-[6px] px-[8px]'>{ability.ability.name}</article>)
                }
              </section>
            </section>
          </section>

          <section>
            <h3>Stats</h3>
            <section>
              {
                pokemon?.stats.map(stat => (
                  <article key={stat.stat.name}>
                    <section className='flex justify-between'>
                      <h5 className='capitalize'>{stat.stat.name}</h5>
                      <span>{stat.base_stat}/255</span>
                    </section>
                    <div className='bg-gray-300 h-6'>
                      <div style={{'width': getPercentStatBar(stat.base_stat)}} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                    </div>
                  </article>
                ))
              }
            </section>
          </section>

        </article>

      </section>

    </section>
  )
}

export default PokemonId