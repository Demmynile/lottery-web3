import React from 'react'
import { PropagateLoader } from 'react-spinners'

type Props = {}

export default function 
({}: Props) {
  return (
	<div className='bg-[#091B18] h-screen flex flex-col items-center justify-center'>
		<div className='flex items-center space-x-2 mb-10'>
			<img 
			 src="https://i.imgur.com/4h7mAu7.png"
			 alt="" 
			 className='rounded-full h-20 w-20'
			 />
			 <h1 className='text-lg text-white font-bold'>
				Loading the Demmy Draw
			 </h1>

		</div>
		<PropagateLoader color="white" size={30} />

	</div>
  )
}