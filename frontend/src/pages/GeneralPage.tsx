import * as React from "react";
import { useCallback } from "react";
import { connectMetaMask, getEthereum } from "../web3utils/walletConnector";
import { Provider } from "react-redux";
import { store } from "../store";

export const GeneralPage = () => {
  const connectWallet = useCallback(async () => {
    const accounts = await connectMetaMask();
    console.log(getEthereum());
    console.log(accounts);
  }, []);

  return (
    <div>
      <Provider store={store}>
        <div>
          StartPage
          <button onClick={connectWallet}>Connect metamask</button>
        </div>
      </Provider>
    </div>
  );
};
