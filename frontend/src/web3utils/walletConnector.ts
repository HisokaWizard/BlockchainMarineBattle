const ethereum = (window as any).ethereum;

export const isExistMetamaskWallet = () => {
  return typeof ethereum !== "undefined";
};

export const getEthereum = () => {
  if (!isExistMetamaskWallet() || !ethereum.isMetaMask) return null;
  return ethereum;
};

export const connectMetaMask = async () => {
  const eth = getEthereum();
  if (!eth) return;
  if (eth.chainId !== "0x1") {
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (error) {
      if (error) {
        console.error(error);
        return;
      }
    }
  }
  return await eth?.request({ method: "eth_requestAccounts" });
};
