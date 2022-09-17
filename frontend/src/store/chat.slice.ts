import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from ".";

const { reducer, actions } = createSlice({
  name: "blogData",
  initialState: {
    messages: [],
    socket: null,
  },
  reducers: {
    setMessages: (state, action: PayloadAction<string[]>) => {
      state.messages = action.payload;
    },
    setSocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload;
    },
  },
});

export const { setMessages, setSocket } = {
  setMessages: actions.setMessages,
  setSocket: actions.setSocket,
};

export const chatReducer = reducer;

export const useChatData = () => {
  return useSelector((state: RootState) => state.chatReducer);
};
