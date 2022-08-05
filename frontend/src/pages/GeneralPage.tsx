import * as React from "react";
import { useCallback } from "react";
import { connectMetaMask, getEthereum } from "../web3utils/walletConnector";
import { useCreateUserMutation } from "../store/userApi/user.api";

export const GeneralPage = () => {
  const [createUser] = useCreateUserMutation();

  const connectWallet = useCallback(async () => {
    const accounts = await connectMetaMask();
    console.log(getEthereum());
    console.log(accounts);
    const userData = {
      address: accounts[0],
      amount: 0,
      blockchainAmount: 0,
      gradeCollection: [],
      power: 0,
    };
    const result = await createUser(userData);
    console.log(result);
  }, []);

  return (
    <div>
      StartPage
      <button onClick={connectWallet}>Connect metamask</button>
    </div>
  );
};
