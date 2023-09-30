import {FaInstagramSquare} from 'react-icons/fa'
import {BsWhatsapp} from 'react-icons/bs'
import {AiFillLinkedin} from 'react-icons/ai'


const footer = () => {
    return (
        <div className="w-full bg-slate-400 h-24 flex justify-around items-center" >
            <FaInstagramSquare className=' text-3xl text-pink-500' />
            <BsWhatsapp className=' text-3xl text-green-500 ' />
            <AiFillLinkedin className=' text-3xl text-blue-600' />
        </div>
    )
}

export default footer;