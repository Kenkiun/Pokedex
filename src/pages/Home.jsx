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

    <section className='min-h-screen grid grid-rows-[1fr_auto]'>

      <section className='bg-[url("/images/home.webp")] bg-no-repeat responsive:bg-contain bg-center responsive:bg-[url("/images/home3.webp")] bg-slate-100 '>
        <article className='grid gap-5 place-content-center text-center '>
          <div className='mt-4 w-[210px] responsive:w-[300px] responsive:mt-60 responsive:mb-[1px] mx-auto responsive2:mt-40 responsive2:mb-28'>
            <img src="/images/pokedex.png" alt="" />
          </div>
          <h2 className='text-4xl font-medium mt-[140px]'>Hello trainer!</h2>
          <p className='font-extrabold'>Give me your name to start</p>
          <form className='flex justify-evenly gap-3' onSubmit={handleSubmit}>
            <input className='text-center rounded-sm' id='nameTrainer' type="text" placeholder='Your name...'/>
            <button className='rounded-sm font-bold text-xl hover:bg-lime-400 transition-colors italic'>Start</button>
          </form>
        </article>
      </section>

    {/* <Footer/> */}
    </section>

  )
}

export default Home