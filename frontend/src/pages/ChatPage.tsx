import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
  id: string;
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

    socket.onmessage = (message) => {
      if (!message) return;
      const data: UserResponseData = JSON.parse(message.data);
      setUsers(data.users);
      dispatch(setMessages(data.messages));
    };
  }, [nameIsReady, name]);

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

  const header = useMemo(() => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Chat room</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            onChange={(e) => setName(e.target.value)}
            label={"User name"}
            variant={"outlined"}
            disabled={nameIsReady}
            size={"small"}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setNameIsReady(true)}
          >
            Set name
          </Button>
        </Grid>
      </Grid>
    );
  }, [nameIsReady]);

  const messageInput = useMemo(() => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            variant="outlined"
            disabled={!nameIsReady}
            size={"small"}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            onClick={sendMessage}
            disabled={!nameIsReady}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    );
  }, [nameIsReady, sendMessage]);

  return (
    <Grid container spacing={3} display="flex" justifyContent={"center"}>
      <Grid item xs={10}>
        {header}
      </Grid>
      <Grid item xs={10}>
        <div style={{ backgroundColor: "lightblue", padding: 10 }}>
          <span style={{ marginRight: 10 }}>User list:</span>
          {users.map((it, index) => (
            <span style={{ marginRight: 10 }} key={index}>
              [{it}]
            </span>
          ))}
        </div>
      </Grid>

      <Grid item xs={10}>
        <Grid
          container
          sx={{
            minHeight: 300,
            border: "1px solid lightblue",
            overflowY: "auto",
            maxHeight: 300,
          }}
        >
          {messages.map((it, index) => {
            return (
              <Grid
                item
                key={index}
                xs={8}
                sx={{
                  border: "1px solid lightgrey",
                  borderRadius: 2,
                  backgroundColor: "lightcoral",
                  height: 52,
                  marginLeft: 1,
                  marginTop: 1,
                  padding: 2,
                }}
              >
                {it}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={10}>
        {messageInput}
      </Grid>
    </Grid>
  );
});

ChatPage.displayName = "ChatPage";
