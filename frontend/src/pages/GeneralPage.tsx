import * as React from "react";
import { useCallback, useEffect } from "react";
import { connectMetaMask, getEthereum } from "../web3utils/walletConnector";
import { useCreateUserMutation } from "../store/userApi/user.api";
import { RoutePath } from "src/routes";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import { useLogoutMutation } from "../store/queriesApi/backendAuth/auth.api";
import { isAuth, isSuccess, throwNewError } from "../utils";
import { useLazyUsersQuery } from "../store/queriesApi/backendAuth/user.api";

export const GeneralPage = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [getAllUsers, { data }] = useLazyUsersQuery();

  const logoutAction = useCallback(async () => {
    try {
      const result = await logout();
      if (isSuccess(result)) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        throwNewError(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [logout]);

  const getUsers = useCallback(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, []);

  const [createUser] = useCreateUserMutation();

  const navidateTo = useCallback((path: RoutePath) => {
    if (path === "/chat") {
      const uniquePath = uuid();
      navigate(path + `/${uniquePath}`);
    } else {
      navigate(path);
    }
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
      <Grid item xs={2}>
        <Button onClick={getUsers}>Get user list</Button>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={logoutAction}>Logout</Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {data &&
            data.map((it, index) => {
              return (
                <Grid item xs={12} key={it.email + index}>
                  Email: {it.email}
                  Activated: {it.isActivated}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};
