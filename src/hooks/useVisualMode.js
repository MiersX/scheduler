import { useState } from "react"; 

// sets and stores the current mode, and a history of the modes transitioned to.

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transitions to a new mode, updates history and mode.

  function transition (newMode, replace = false) {

    if (replace) {
      const newHist = [...history]
      newHist.splice(history.length - 1, newMode)
      setHistory([...newHist])
      setMode(newMode);
    } else {
      setHistory(prev => [...prev, newMode]);
      setMode(newMode);
    }
  
  }

  // transitions back to a previous mode, updates history with change.

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  }
  return { mode, transition, back };

}

