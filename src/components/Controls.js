import React from "react";

const Controls = ({ commands, setCommands, handleRun }) => {
  return (
    <div className="controls">
      <textarea
        rows="10"
        placeholder="Enter commands here..."
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
      />
      <button onClick={handleRun}>Run Commands</button>
    </div>
  );
};

export default Controls;
