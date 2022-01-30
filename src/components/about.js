import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import Loader from "react-loader-spinner";
import useInterval from "@use-it/interval";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./about.css";

let classifier;

function About() {
  const videoRef = useRef();
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./models/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setLoaded(true);
        });
    });
  }, []);

  useInterval(() => {
    if (classifier && start) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        setResult(results);
        console.log(results);
      });
    }
  }, 500);

  const toggle = () => {
    setStart(!start);
    setResult([]);
  };

  return (
    <div className="container">
      <Loader
        type="Watch"
        color="#00BFFF"
        height={200}
        width={200}
        visible={!loaded}
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      />
      <div className="upper">
        <div className="capture">
          <video
            ref={videoRef}
            style={{ transform: "scale(-1, 1)" }}
            width="300"
            height="150"
          />
          {loaded && (
            <button onClick={() => toggle()}>{start ? "Stop" : "Start"}</button>
          )}
        </div>
        {result.length > 0 && <div>result[0]</div>}
      </div>
      {result.length > 0 && <div className="results">{result}</div>}
    </div>
  );
}

export default About;
