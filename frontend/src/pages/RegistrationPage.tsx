import { Button, Grid, TextField } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { isSuccess, throwNewError } from "../utils";
import { useRegistrationMutation } from "../store/queriesApi/backendAuth/auth.api";

export const RegistrationPage = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendRegistration] = useRegistrationMutation();
  const [error, setError] = useState("");

  const sendQuery = useCallback(async () => {
    if (!password || !email) return;
    try {
      const result = await sendRegistration({ email, password });
      if (isSuccess(result)) {
        window.location.replace("https://mail.google.com");
      } else {
        throwNewError(result);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [password, email]);

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
            <Button fullWidth variant="outlined" onClick={sendQuery}>
              Registration
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
