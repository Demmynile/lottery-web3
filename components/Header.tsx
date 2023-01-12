import React from 'react'
import NavButton from './NavButton'
import {Bars3BottomRightIcon} from "@heroicons/react/24/solid"
import { useAddress , ConnectWallet , useDisconnect } from '@thirdweb-dev/react'


type Props = {}

export default function Header({}: Props) {

	const showWallet = false;

	const address = useAddress()
	console.log(`Address: ${address}`);

	const disconnect = useDisconnect()

  return (
	
   <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
	{showWallet && <ConnectWallet />}
	<div className='flex items-center space-x-2'>

	
			<img src =  "https://i.imgur.com/4h7mAu7.png" alt = "" className = "w-20 h-20 rounded-full"/>
	

		<div>
			<h1 className='text-lg text-white font-bold'>Lottery Draw</h1>
		     <p className=' text-xs text-emerald-500 font-bold'>User: {address?.substring(0,5)}...{address?.substring(address.length , address.length -5)}</p>
		</div>

	</div>

	<div className='hidden md:flex md:col-span-3 items-center justify-center rounded-md' >
		<div className='bg-[#0A1F1C] p-4 space-x-2  '>
			<NavButton isActive title = "Buy Tickets"/>
			<NavButton title = "Logout" onClick={disconnect} /> 
			{/* Button */}
			{/* Button */} 
		</div>
	</div> 

	 
	<div className='flex flex-col ml-auto text-right'>
        <Bars3BottomRightIcon  className='h-8 w-8 mx-auto text-white cursor-pointer'/>
		<span className='md:hidden'>
			<NavButton onClick={disconnect} title = "Logout" />
		</span>
	</div>


</header>
  )
}
