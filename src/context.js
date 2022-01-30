import React from "react";
import moment from "moment";

export const items = {
  bottle: {
    lastSeen: moment(),
    location: "Kitchen",
  },
  wallet: {
    lastSeen: undefined,
    location: undefined,
  },
};

export const ItemContext = React.createContext(
  items // default value
);
