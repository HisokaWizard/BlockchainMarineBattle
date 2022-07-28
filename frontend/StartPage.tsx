import React, { useCallback } from "react";
import { connectMetaMask, getEthereum } from "./web3utils/walletConnector";
import { Provider } from "react-redux";
import { store } from "./store";

export const StartPage = () => {
  const connectWallet = useCallback(async () => {
    const accounts = await connectMetaMask();
    console.log(getEthereum());
    console.log(accounts);
  }, []);

  return (
    <Provider store={store}>
      StartPage
      <div>
        <button onClick={connectWallet}>Connect metamask</button>
      </div>
    </Provider>
  );
};
