import { Button, Grid, TextField } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "../store/queriesApi/backendAuth/user.api";

export const LoginPage = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendRegistration] = useRegistrationMutation();
  const [sendLogin] = useLoginMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendQuery = useCallback(
    async (route: "email" | "registration") => {
      if (!password || !email) return;
      try {
        if (route === "email") {
          const result = await sendLogin({ email, password });
          if ("data" in result) {
            const { accessToken, refreshToken } = result.data;
            document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}`;
            navigate("/");
          } else {
            const error = (result.error as FetchBaseQueryError)?.data as any;
            throw new Error(error?.message);
          }
        } else {
          const result = await sendRegistration({ email, password });
          if ("data" in result) {
            window.location.replace("https://mail.google.com");
          } else {
            const error = (result.error as FetchBaseQueryError)?.data as any;
            throw new Error(error?.message);
          }
        }
      } catch (error) {
        setError(error.message);
      }
    },
    [password, email]
  );

  return (
    <Grid
      container
      spacing={3}
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Grid item xs={8} sm={8} md={6}>
        {error && (
          <Grid item xs={12} color="red">
            {error}
          </Grid>
        )}
        <Grid container spacing={4} mt={25}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              placeholder="Email"
              fullWidth
              value={email}
              title={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              type={"password"}
              value={password}
              title={"Password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => sendQuery("registration")}
            >
              Registration
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => sendQuery("email")}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
