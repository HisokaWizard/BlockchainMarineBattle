import React, { useCallback } from "react";
import { connectMetaMask, getEthereum } from "./web3utils/walletConnector";

export const StartPage = () => {
  const connectWallet = useCallback(async () => {
    const accounts = await connectMetaMask();
    console.log(getEthereum());
    console.log(accounts);
  }, []);

  return (
    <div>
      StartPage
      <div>
        <button onClick={connectWallet}>Connect metamask</button>
      </div>
    </div>
  );
};
