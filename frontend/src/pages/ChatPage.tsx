import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessages, setSocket, useChatData } from "../store/chat.slice";
import { useParams } from "react-router-dom";

type UserConnectData = {
  method: "connection";
  id: string;
  name: string;
};

type UserRequestData = {
  method: "message";
  message: string;
  id: string;
};

type UserResponseData = {
  method: "connection" | "message";
  messages: string[];
  users: string[];
};

export const ChatPage = memo(() => {
  const { id } = useParams();
  const { messages, socket } = useChatData();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameIsReady, setNameIsReady] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!nameIsReady) return;
    const socket = new WebSocket("ws://localhost:7077/chat");
    dispatch(setSocket(socket));

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "connection",
          id,
          name,
        } as UserConnectData)
      );
    };
  }, [nameIsReady, name]);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (message) => {
      if (!message) return;
      const data: UserResponseData = JSON.parse(message.data);
      setUsers(data.users);
      dispatch(setMessages(data.messages));
    };
  }, [socket]);

  const sendMessage = useCallback(() => {
    if (!socket) return;
    socket.send(
      JSON.stringify({
        method: "message",
        message,
        id,
      } as UserRequestData)
    );
  }, [message, socket]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Chat room</Typography>
      </Grid>
      <Grid item xs={"auto"}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          label={"User name"}
          variant={"outlined"}
          disabled={nameIsReady}
          size={"small"}
        />
      </Grid>
      <Grid item xs={"auto"}>
        <Button variant="outlined" onClick={() => setNameIsReady(true)}>
          Set name
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "pink", borderRadius: 10 }}
        >
          {users.map((it, index) => (
            <Grid item key={index} xs={"auto"}>
              {it}
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ minHeight: 300, border: "1px solid lightblue" }}
        margin={3}
      >
        <Grid container spacing={3}>
          {messages.map((it, index) => {
            return (
              <Grid
                item
                key={index}
                xs={6}
                sx={{
                  border: "1px solid lightgrey",
                  borderRadius: 4,
                  backgroundColor: "crimson",
                }}
              >
                {it}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Grid item ml={3}>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            variant="outlined"
            disabled={!nameIsReady}
            size={"small"}
          />
        </Grid>
        <Grid item mr={3}>
          <Button
            variant="outlined"
            onClick={sendMessage}
            disabled={!nameIsReady}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
});

ChatPage.displayName = "ChatPage";
