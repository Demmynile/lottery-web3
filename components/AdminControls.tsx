import {
  ArrowPathIcon,
  ArrowUturnDownIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constant";
import toast from "react-hot-toast";

const AdminControls = () => {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );

  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");

  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    "DrawWinnerTicket"
  );

  const { mutateAsync: restartDraw } = useContractWrite(
    contract,
    "restartDraw"
  );

  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    "WithdrawCommission"
  );

  const drawWinner = async () => {
    const notification = toast.loading("Picking a Lucky Winner ...");

    try {
      const data = await DrawWinnerTicket([{}]);

      toast.success("A Winner has been selected!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  };

  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting draw...");

    try {
      const data = await restartDraw([{}]);

      toast.success("Draw restarted successfully", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  };

  const onRefundAll = async () => {
    const notification = toast.loading("Refunding  ...");

    try {
      const data = await RefundAll([{}]);

      toast.success("Draw refunded successfully", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  };

  const onWithdrawnCommission = async () => {
    const notification = toast.loading("Withdrawing Commission ...");

    try {
      const data = await WithdrawCommission([{}]);

      toast.success("Your Commission has been withdrawn successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  };
  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commission to be withdrawn: {""}
        {ticketCommission &&
          ethers.utils.formatEther(ticketCommission?.toString())}{" "}
        {currency}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button className="admin-button" onClick={drawWinner}>
          <StarIcon className="h-6 mx-auto mb-2" />
          Draw Winner
        </button>
        <button className="admin-button" onClick={onWithdrawnCommission}>
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commission
        </button>
        <button className="admin-button" onClick={onRestartDraw}>
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </button>
        <button className="admin-button" onClick={onRefundAll}>
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
