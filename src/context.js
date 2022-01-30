import React from "react";
import moment from "moment";

export const themes = {
  bottle: {
    lastSeen: moment(),
    location: "Kitchen",
  },
  wallet: {
    lastSeen: undefined,
    location: undefined,
  },
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
