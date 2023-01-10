import "./App.css";
import React, { useState } from "react";

function Circles({ circles }) {
  const drawCircles = circles.map((circle, index) => (
    <div
      className="border-dotted w-5 h-5 rounded-full animate-pulse text-sm text-center justify-center "
      key={index}
      style={{
        position: "absolute",
        top: `${circle.axisY}px`,
        left: `${circle.axisX}px`,
        backgroundColor: `#${circle.color}`,
        color: "black",
      }}
    ></div>
  ));

  return drawCircles;
}
function App() {
  const [circlesState, setCirclesState] = useState([]);
  const [popedCircles, setPopedCircles] = useState([]);

  const addCircles = (event) => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setCirclesState([
      ...circlesState,
      { axisY: event.pageY, axisX: event.pageX, color: randomColor },
    ]);
  };

  const removeCircle = () => {
    const circles = [...circlesState];
    const popedCircle = circles.pop();
    setPopedCircles([...popedCircles, popedCircle]);
    setCirclesState(circles);
  };
  const redoCircle = () => {
    if (!popedCircles.length) return;

    const poped = [...popedCircles];
    const popedCircle = poped.pop();

    setCirclesState([...circlesState, popedCircle]);
    setPopedCircles(poped);
  };
  const clearCircles = () => {
    setCirclesState([]);
    setPopedCircles([]);
  };
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
        <button
          disabled={!circlesState.length}
          onClick={removeCircle}
          className="btn btn-primary"
        >
          Undo
        </button>
        <button
          disabled={!popedCircles.length}
          onClick={redoCircle}
          className="btn btn-secondary"
        >
          Redo
        </button>
        <button onClick={clearCircles} className="btn btn-warning">
          Clear
        </button>
      </div>
      <div
        className="App"
        onClick={(event) => {
          addCircles(event);
        }}
      >
        <Circles circles={circlesState} />
      </div>
    </>
  );
}

export default App;
