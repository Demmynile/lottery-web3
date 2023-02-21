import type { NextPage } from "next";
import Head from "next/head";

import Header from "../components/Header";
import { useAddress, ConnectWallet, useContract } from "@thirdweb-dev/react";
import Login from "../components/Login";
import PropagateLoader from "react-spinners/PropagateLoader";
import Loading from "../components/Loading";
import { useState } from "react";

const Home: NextPage = () => {
  //  const  showWallet = false;

  const [quantity, setQuantity] = useState<number>(1);
  const address = useAddress();
  console.log(address);

  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  console.log(isLoading);

  if (isLoading) return <Loading />;

  if (!address) return <Login />;

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Crypto Lottery App</title>
      </Head>
      <Header />
      {/* The Next draw box */}
      <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
        <div className="stats-container">
          <h1 className="text-5xl text-white font-semibold text-center">
            The Next Draw
          </h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p className="text-xl">0.1 MATIC </p>
            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets Remaining</h2>
              <p className="text-xl">100</p>
            </div>
          </div>

          {/* Countdown timer */}
          {/* ... */}
        </div>

        <div className="stats-container space-y-2">
          <div className="stats-container">
            <div className="flex justify-between items-center text-white pb-2">
              <h2>Price per ticket</h2>
              <p>0.01 MATIC</p>
            </div>
            <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4">
              <p>TICKETS</p>
              <input
                type="number"
                min={1}
                max={10}
                className="flex w-full bg-transparent text-right outline-none"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      {/* The price per ticket box */}
      <div></div>
    </div>
  );
};

export default Home;
