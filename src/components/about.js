import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import Loader from "react-loader-spinner";
import useInterval from "@use-it/interval";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./about.css";

let classifier;

const modelPath = {
  model: "./models/model.json",
  metadata: "./models/metadata.json",
  weights: "./models/model.weights.bin",
};

function About() {
  const videoRef = useRef();
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let options = {
      inputs: [64, 64, 4],
      task: "imageClassification",
      debug: true,
    };
    classifier = ml5.imageClassifier({
      model: "MobileNet",
      options: options,
      callback: callback,
    });
  }, []);

  const callback = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setLoaded(true);
      });
  };

  useInterval(() => {
    if (classifier && start && videoRef.current) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        // setResult(results);
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
            width="700"
            height="700"
          />
          {loaded && (
            <button onClick={() => toggle()}>{start ? "Stop" : "Start"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
