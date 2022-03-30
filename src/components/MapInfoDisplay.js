import { useEffect, useState } from "react";
import classes from "./MapInfoDisplay.module.css";

const MapInfoDisplay = (props) => {
  const [mapDetails, setMapDetails] = useState("Inpixon Venue");

  // console.log("OBJECT RECEIVED AT MAPINFODISPLAY");
  // console.log(props.control);

  useEffect(() => {
    try {
      const name = props.control.activeVenue._.name;
      if (name !== mapDetails) {
        setMapDetails(name);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.control]);

  return (
    <div className={classes.infoDisplayDiv}>
      <h3>{mapDetails}</h3>
    </div>
  );
};

export default MapInfoDisplay;
