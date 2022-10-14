import Sidebar from '../component/Sidebar'
import Chat from '../component/Chat'

const Home = () => {

  return (
    <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
      <div className='flex overflow-hidden w-full h-full md:w-11/12 md:h-4/5 md:rounded-xl lg:w-8/12 lg:h-4/5 lg:rounded-xl' >
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home