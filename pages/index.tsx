import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import {
  useAddress,
  useContract,
  ConnectWallet,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import Login from "../components/Login";
import PropagateLoader from "react-spinners/PropagateLoader";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { currency } from "../constant";
import CountdownTimer from "../components/CountdownTimer";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import AdminControls from "../components/AdminControls";

const Home: NextPage = () => {
  //  const  showWallet = false;

  const [quantity, setQuantity] = useState<number>(1);

  const [userTickets, setUserTickets] = useState(0);

  const address = useAddress();
  console.log("This is my address", address);

  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );

  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");

  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );

  const { data: expiration } = useContractRead(contract, "expiration");

  console.log(isLoading);

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");

  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );

  const { data: tickets } = useContractRead(contract, "getTickets");

  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );
  const { data: lastWinner } = useContractRead(contract, "lastWinner");

  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );

  const { data: isLotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );

  console.log("i am lotteryOperator", isLotteryOperator);

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );

    setUserTickets(noOfUserTickets);
  }, [tickets, address]);

  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying your tickets....");

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);

      toast.success("Ticket purchased successfully ", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoopd something went wrong!", {
        id: notification,
      });
    }
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings... ");

    try {
      const data = await WithdrawWinnings([{}]);

      toast.success("Winnings withdrawn successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
    }
  };

  if (isLoading) return <Loading />;

  if (!address) return <Login />;

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Crypto Lottery App</title>
      </Head>
      <div className="flex-1 ">
        <Header />
        <Marquee className="" gradient={false} speed={100}>
          <div className="flex space-x-2 mx-10 ">
            <h4 className="text-white font-bold ">
              Last Winner: {lastWinner?.toString()}
            </h4>
            <h4 className="text-white font-bold ">
              Previous winnings:{" "}
              {lastWinnerAmount &&
                ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}
              {currency}
            </h4>
          </div>
        </Marquee>

        {isLotteryOperator === address && (
          <div className="flex justify-center">
            <AdminControls />
          </div>
        )}
        {/* The Next draw box */}

        {winnings > 0 && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={onWithdrawWinnings}
              className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full"
            >
              <p className="font-bold">Winner Winner Chicken Dinner!</p>
              <p>
                {" "}
                Total Winnings : {ethers.utils.formatEther(
                  winnings.toString()
                )}{" "}
                {""} {currency}
              </p>
              <br />
              <p className="font-semibold">Click here to Withdraw</p>
            </button>
          </div>
        )}

        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5   ">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">
                  {currentWinningReward &&
                    ethers.utils.formatEther(
                      currentWinningReward.toString()
                    )}{" "}
                  {currency}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price per ticket</h2>
                <p>
                  {ticketPrice &&
                    ethers.utils.formatEther(ticketPrice.toString())}{" "}
                  {currency}
                </p>
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
              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                  <p>Total cost of tickets</p>
                  <p>
                    {ticketPrice &&
                      Number(
                        ethers.utils.formatEther(ticketPrice?.toString())
                      ) * quantity}{" "}
                    {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service Fees</p>
                  <p>
                    {ticketCommission &&
                      ethers.utils.formatEther(
                        ticketCommission?.toString()
                      )}{" "}
                    {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
                <button
                  disabled={
                    expiration?.toString() < Date.now().toString() ||
                    remainingTickets?.toNumber() === 0
                  }
                  onClick={handleClick}
                  className="mt-5 w-full bg-gradient-to-br 
                from-orange-500 to-emerald-600 px-10 py-5 rounded-md font-semibold
                text-white shadow-xl disabled:from-gray-600
                 disabled:text-gray-100 disabled:to-gray-600  disabled:cursor-not-allowed"
                >
                  Buy {quantity} tickets for{" "}
                  {ticketPrice &&
                    Number(ethers.utils.formatEther(ticketPrice.toString())) *
                      quantity}{" "}
                  {currency}
                </button>
              </div>
            </div>
            {userTickets > 0 && (
              <div className="stats">
                <p>You have {userTickets} Tickets in this draw</p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {Array(userTickets)
                    .fill("")
                    .map((_, index) => (
                      <p
                        className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
                        key={index}
                      >
                        {index + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
