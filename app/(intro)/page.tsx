
import Navbar from './_components/navbar'
import HomePage from './_components/home-page'
import TextsSection from '../(main)/text/page'

export default function Home() {
  return (
    <div className='h-full flex flex-col '>
    <Navbar/>
    {/* <HomePage/> */}
    <TextsSection/>
    </div>
    
  )
}
