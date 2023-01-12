import { useMetamask } from '@thirdweb-dev/react'
import React from 'react'


type Props = {}

export default function Login({}: Props) {

	const connectWithMetamask = useMetamask()

  return (
  <div className='bg-[#091B18] min-h-screen flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center mb-10'>
		<img 
		 className='rounded-full h-56 w-56 mb-10'
		 src="https://i.imgur.com/4h7mAu7.png"
		 alt="" />
	  </div>
	  <h1 className='text-6xl text-white font-bold'>The Demmy Crypto Draw</h1>
	  <h2 className='text-white mt-10'>Get Started By Logging with your MetaMask</h2>
	  <button 
	    onClick = {connectWithMetamask}
	    className='bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold'>
		Login with Metamask
	  </button> 
  </div>
  )
  
}