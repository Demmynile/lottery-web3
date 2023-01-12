import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../components/Header'
import { useAddress , ConnectWallet , useContract } from '@thirdweb-dev/react'
import Login from '../components/Login'
import PropagateLoader from "react-spinners/PropagateLoader"
import Loading from '../components/Loading'



const Home: NextPage = () => {

  //  const  showWallet = false;


   const address = useAddress()
    console.log(address)

   const {contract , isLoading} = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
    )

    console.log(isLoading)
  
   if (isLoading) return <Loading />
   
   if (!address) return (<Login />)

  
   
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
       
      <Head>
        <title>Crypto Lottery App</title>
       </Head>
      <Header/>
   
    </div>
  )
}

export default Home
