import "./App.css";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import { Song, Track, Instrument } from "reactronica";
import _ from "lodash";
import anime from "animejs";

function App() {
  const [notes, setNotes] = useState([]);
  const [bitCrusher, setBitcrusher] = useState(0);
  const [spline, setSpline] = useState();

  const onKeyDown = (e) => {
    setNotes((notes) => _.uniqBy([...notes, { name: e.target.name }], "name"));
  };

  const onKeyUp = (e) => {
    setNotes([]);
  };

  useEffect(() => {
    if (!spline) return;
    const knob = spline.findObjectByName("knob");
    knob.position.x = -130 + bitCrusher * 150;
  }, [bitCrusher, spline]);

  useEffect(() => {
    if (!spline) return;
    const bulb = spline.findObjectByName("lightbulb");
    anime({
      targets: bulb.scale,
      x: notes.length,
      y: notes.length,
      z: notes.length,
    });
  }, [notes, spline]);

  return (
    <>
      <div className="fixed top-0 right-0 p-5 bg-white bg-opacity-40 text xs">
        <label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={bitCrusher}
            onChange={(e) => setBitcrusher(e.target.value)}
          ></input>
        </label>
      </div>

      <Spline
        scene="https://draft.spline.design/cpYpRwJFOf16GiEm/scene.spline"
        onMouseDown={onKeyDown}
        onMouseUp={onKeyUp}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onLoad={(spline) => setSpline(spline)}
      />

      <Song>
        <Track>
          <Instrument type="synth" notes={notes} />
        </Track>
      </Song>
    </>
  );
}

export default App;
