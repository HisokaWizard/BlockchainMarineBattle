import * as React from "react";
import { useCallback } from "react";
import { connectMetaMask, getEthereum } from "../web3utils/walletConnector";
import { useCreateUserMutation } from "../store/userApi/user.api";
import { RoutePath } from "src/routes";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

export const GeneralPage = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const navidateTo = useCallback((path: RoutePath) => {
    navigate(path);
  }, []);

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">StartPage</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={connectWallet}>Connect metamask</Button>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => navidateTo("/chat")}>Chat</Button>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => navidateTo("/graphics")}>Graphics</Button>
      </Grid>
    </Grid>
  );
};
