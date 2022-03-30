import classes from "./App.module.css";
import MapRenderer from "./components/MapRenderer";
//import jmap from "jmap.js";
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import WelcomePage from "./components/WelcomePage";
import ErrorPage from "./components/ErrorPage";

function App() {
  // const initConfig = {
  //   host: "https://api.jibestream.com",
  //   auth: new jmap.core.Auth(
  //     "a71a908a-87d1-426d-9d8f-c0402fab4d68",
  //     "V+tb52uxfrnilIWbUGob2wulu8jSc5OAymeXxp7a4JU="
  //   ),
  //   customerId: 412,
  //   venueId: 1868,
  // };
  let output = "";
  //let jibestreamObj;
  const [config, setConfig] = useState("");
  const [error, isThereAnError] = useState(false);
  //const [jibestreamObj, setJibestreamObj] = useState();

  const reloadMap = (config) => {
    //e.preventDefault();
    //console.log(config);
    //console.log("Attempting to Reload Map");
    isThereAnError(false);
    setConfig(config);
  };

  const changingOutput = () => {
    isThereAnError(true);
  };

  if (config === "") {
    output = <WelcomePage />;
  } else {
    if (error) {
      output = <ErrorPage />;
    } else {
      output = <MapRenderer onErrorHandler={changingOutput} config={config} />;
    }
  }

  return (
    <div className={classes.mainDiv}>
      <AuthForm onSubmitted={reloadMap} />
      <div className={classes.mainScreenDiv}>{output}</div>
    </div>
  );
}

export default App;

// {
//   error ? (
//     <div>
//       <h2>Could not load map, please verify credentials</h2>
//     </div>
//   ) : (
//     <MapRenderer onErrorHandler={changingOutput} config={config} />
//   );
// }
