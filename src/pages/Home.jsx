import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/name.Trainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' 

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate('/pokedex')
  }

  return (

    <section className='grid grid-rows-[1fr_auto] min-h-screen bg-[url("/images/Pokeball.webp")] bg-no-repeat bg-center'>

      <section >
        <article className='grid gap-5 place-content-center text-center mt-15'>
          <div className=''>
            <img src="/images/pokedex.png" alt="" />
          </div>
          <h2 className='text-4xl font-medium mt-[140px]'>Hello trainer!</h2>
          <p className='font-extrabold'>Give me your name to start</p>
          <form className='flex justify-evenly gap-3' onSubmit={handleSubmit}>
            <input className='text-center rounded-sm' id='nameTrainer' type="text" placeholder='Your name...'/>
            <button className='rounded-sm font-bold text-xl hover:bg-lime-400 transition-colors italic px-1'>Start</button>
          </form>
        </article>
      </section>

    <Footer/>
    </section>

  )
}

export default Home