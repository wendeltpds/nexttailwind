import {Main}  from '@/main/main'
import Footer  from  '@/footer/footer'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  return (
      <>
      <Main />
      <Footer />

      <ToastContainer
        position="top-center"
       />
      </>
  )};
