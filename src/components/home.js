import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context";
import moment from "moment";

function Home() {
  const context = useContext(ThemeContext);

  return (
    <div>
      {Object.keys(context.theme).map((key, index) => {
        var value = context.theme[key];
        return (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">{key.toUpperCase()}</h5>
              <p className="card-text">
                {value.lastSeen
                  ? `Item last seen at ${moment(value.lastSeen).format(
                      "LLL"
                    )} on  in ${value.location}`
                  : "Item has never been seen"}
              </p>
            </div>
          </div>
        );
      })}
      <button className="btn-lg btn-primary"> Add item</button>
    </div>
  );
}

export default Home;
