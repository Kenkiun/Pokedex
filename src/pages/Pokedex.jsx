import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'
import { paginationLogic } from '../utils/Pagination'


const Pokedex = () => {

  const nameTrainer = useSelector((store) => store.nameTrainer)

  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState('')
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const input = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

  const {pokemonInPage, lastPage, pagesInbLock} = useMemo(() => paginationLogic(currentPage, pokemonsByName), [currentPage, pokemons, pokemonName, currentType])

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1){
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }

  useEffect(() => {
    if(!currentType){
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281'

      axios.get(URL)
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err))
    }
  },[currentType])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'

    axios.get(URL)
    .then((res) => {
      const newTypes = res.data.results.map(type => type.name)
      setTypes(newTypes)
    })
    .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    if(currentType){
    const URL = `https://pokeapi.co/api/v2/type/${currentType}`

    axios.get(URL)
    .then((res) => {
      const pokemonByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
      setPokemons(pokemonByType)
    })
    .catch((err) => console.log(err))
    }
  },[currentType])

  useEffect(() => {
    setCurrentPage(1)
  },[pokemonName, currentType])

  useEffect(() => {
    setPokemonName('')
    input.current.value = ''
  },[currentType])

  return (

    <section className='min-h-screen bg-amber-50'>

      <Header/>

      <section className='py-6 px-2 mt-9 grid gap-5 responsive2:place-content-center'>
        <h3 className='font-welcome text-[15px] responsive:text-lg'>Welcome {nameTrainer}, you can find your favourite pokemon</h3>
        <form className='felc flex-col m-auto' onSubmit={handleSubmit}>
          <div className='flex gap-3'>
            <input className='rounded-[1px] outline-1 outline-orange-300' ref={input} id='pokemonName' type="text" placeholder='Search your pokemon'/>
            <button  className='rounded-[1px] text-yellow-600 hover:text-yellow-400'>Search</button>
          </div>
          <select className='text-[15px] outline-[1px] rounded-sm outline-orange-300' onChange={(e) => setCurrentType(e.target.value)}>
            <option className='' value="">All</option>
            {
              types.map(type => <option className='capitalize' key={type} value={type}>{type}</option> )
            }
          </select>
        </form>
      </section>

      <ul className='flex gap-2 justify-center flex-wrap mt-10'>
      <li onClick={() => setCurrentPage(1)} className='p-3 bg-cyan-700 font-bold text-white rounded-md cursor-pointer'>{'<<'}</li>
      <li onClick={handleClickPreviousPage} className='p-3 bg-cyan-700 font-bold text-white rounded-md cursor-pointer'>{'<'}</li>
        {
          pagesInbLock.map(numberPage => <li className={`p-3 font-bold text-white rounded-md ${numberPage === currentPage? 'bg-cyan-500' : 'bg-cyan-700'}`} key={numberPage}>{numberPage}</li>)
        }
        <li onClick={handleClickNextPage} className='p-3 font-bold text-white bg-cyan-700 rounded-md cursor-pointer'>{'>'}</li>
        <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-cyan-700 font-bold text-white rounded-md cursor-pointer'>{'>>'}</li>
      </ul>

      <section className='px-2 mt-[28px] responsive:mt-[33px] grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_270px)] justify-center pb-[70px]'>
        {pokemonInPage.map(pokemon => <PokemonCard pokemonUrl={pokemon.url} key={pokemon.url}/>)}
      </section>

    </section>

  )
}
 
export default Pokedex