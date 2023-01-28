import { useState } from 'react';


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(Mode, replace = false) {
    if (replace) {
      setHistory(previous => [...previous.slice(1), Mode]);
      return;
    }
    setHistory(previous => [...previous, Mode]);
  };

  function back() {
    if (history && history.length > 1) {
      setHistory(previous => [...previous.slice(1)]);
    }
  };

  return { 
    mode: history[0], transition, back 
  };
}