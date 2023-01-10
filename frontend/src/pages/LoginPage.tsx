import { Button, Grid, TextField } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSuccess, throwNewError } from "../utils";
import { useLoginMutation } from "../store/queriesApi/backendAuth/auth.api";

export const LoginPage = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendLogin] = useLoginMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goToRegistration = useCallback(() => {
    navigate("/registration");
  }, [navigate]);

  const sendQuery = useCallback(async () => {
    if (!password || !email) return;
    try {
      const result = await sendLogin({ email, password });
      if (isSuccess(result)) {
        localStorage.setItem("token", result.data.accessToken);
        navigate("/");
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
              data-testid="EmailInput"
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
              data-testid="PasswordInput"
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
              data-testid="RegistrationButton"
              fullWidth
              variant="outlined"
              onClick={goToRegistration}
            >
              Registration
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              data-testid="LoginButton"
              fullWidth
              variant="outlined"
              onClick={sendQuery}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
