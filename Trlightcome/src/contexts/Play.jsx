import { createContext, useContext, useState } from "react";

const Context = createContext();

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showLogoAtEnd, setShowLogoAtEnd] = useState(false);

  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        end,
        setEnd,
        hasScroll,
        setHasScroll,
        showTimeline,
        setShowTimeline,
        showLogoAtEnd,
        setShowLogoAtEnd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePlay = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};
