import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";

import React, { useState } from "react";

import { useCookies } from "react-cookie";

import UserList from "./UserList.js";

import { FaUsers, FaArrowAltCircleLeft } from "react-icons/fa";

function MessagingContainer({ users }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [userListVisible, setUserListVisible] = useState(false);

  const logout = () => {
    removeCookie("Name", cookies.Name);
    removeCookie("HashedPassword", cookies.HashedPassword);
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);

    window.location.reload();
  };
  return (
    <div className="messaging-container">
      {!userListVisible && (
        <Window>
          <FaUsers className="icon" onClick={() => setUserListVisible(true)} />
          <ChannelHeader />
          <MessageList />
          <MessageInput />
          <button className="standard-button" onClick={{ logout }}>
            Logout
          </button>
          <UserList users={users}></UserList>
        </Window>
      )}

      {userListVisible && (
        <Window>
          <div className="chat-container">
            <FaArrowAltCircleLeft
              className="icon"
              onClick={() => setUserListVisible(false)}
            />

            <ChannelHeader title="Users"></ChannelHeader>
            <UserList users={users}></UserList>
          </div>
        </Window>
      )}

      <Thread />
    </div>
  );
}

export default MessagingContainer;
