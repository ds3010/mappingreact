//import MapInfoDisplay from "./MapInfoDisplay";
//import MapInit from "./MapInit";
import { useState, useEffect } from "react";
import jmap from "jmap.js";
import MapInfoDisplay from "./MapInfoDisplay";
import classes from "./MapRenderer.module.css";
import floorSelector from "../mapFeatures/UiKit/floorSelector";
import showAssets from "../mapFeatures/AssetKit/ShowAssets";
import jmapAssetKit from "@jibestream-dev/jmap-asset-kit";
//import MapUIKit from "@jibestream-dev/jmap-mapui-kit";

const MapRenderer = (props) => {
  const [controllerObj, setControllerObj] = useState(null);
  const [assetKitObj, setAssetKit] = useState(null);
  // //INITIALIZING USING JMAP.INIT
  // useEffect(() => {
  //   console.log("reloading map");
  //   const jibestream = jmap.init(props.config);

  //   jmap.dispatcher.subscribe("ready", () => {
  //     // Scale map out
  //     console.log("INITIALIZING MAP");
  //     jibestream.control.setMapTransform(new jmap.Transform({ scale: 0.3 }));
  //     const control = jibestream.control;
  //     const assetKit = new jmapAssetKit(control);
  //     console.log("CONTROLLER CHANGED, RELOADING!");
  //     setControllerObj(control);

  //     console.log("ASSETKIT CHANGED, RELOADING!");
  //     setAssetKit(assetKit);
  //     floorSelector(control);
  //   });
  // }, [props.config]);

  //INITIALIZING USING JCORE
  useEffect(() => {
    console.log("INITIALIZING MAP");
    const { customerId, host, venueId, auth } = props.config;
    const core = new jmap.core.JCore({ customerId, host, auth });
    //console.log(core);
    core.populateVenueByVenueId(venueId, (error, activeVenue) => {
      if (error) alert(error);
      // Populate the default Building
      const buildingId = activeVenue.buildings.getDefault().id;
      return core.populateBuildingInVenue(activeVenue, buildingId, (error2) => {
        if (error2) alert(error2);

        // Make a view controller
        const control = new jmap.JController({ activeVenue });
        console.log(activeVenue);
        const assetKit = new jmapAssetKit(control);

        console.log("CONTROLLER CHANGED, RELOADING!");
        setControllerObj(control);

        console.log("ASSETKIT CHANGED, RELOADING!");
        setAssetKit(assetKit);

        //FloorSelector NOT WORKING WITH JCORE FOR SOME REASON
        //floorSelector(control);

        // This targets '<div class="map"></div>' in the DOM
        //const control = new jmap.JController({ activeVenue, width, height });
        //Show map
        control.showDefaultMap();
      });
    });
  }, [props.config]);

  useEffect(() => {
    showAssets(controllerObj, assetKitObj);
  }, [controllerObj, assetKitObj]);

  const resetAssetHandler = () => {
    showAssets(controllerObj, assetKitObj);
  };

  window.onerror = function (message) {
    console.log(message);
    if (message.includes("TypeError")) {
      console.log("Caught Error");
      props.onErrorHandler();
    } else {
      console.log("no error");
    }
  };

  // return (
  //   <div className={classes.mainScreenDiv}>
  //     <div className={classes.rendererDiv}>
  //       <div className="map" id={classes.mapDiv}></div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <button onClick={resetAssetHandler}>Reset Assets</button>
      <div className={classes.mainScreenDiv}>
        {controllerObj && <MapInfoDisplay control={controllerObj} />}
        <div className={classes.rendererDiv}>
          <div className="map" id={classes.mapDiv}></div>
        </div>
      </div>
    </>
  );
};

export default MapRenderer;
