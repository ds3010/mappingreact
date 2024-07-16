//import MapInfoDisplay from "./MapInfoDisplay";
//import MapInit from "./MapInit";
import { useState, useEffect } from "react";
import jmap from "jmap.js";
import MapInfoDisplay from "./MapInfoDisplay";
import classes from "./MapRenderer.module.css";
import floorSelector from "../mapFeatures/UiKit/floorSelector";
import showAssets from "../mapFeatures/AssetKit/ShowAssets";
import jmapAssetKit from "@jibestream-dev/jmap-asset-kit";
import ZoneKit from "jmap.js/src/ZoneKit/ZoneKit";
//import MapUIKit from "@jibestream-dev/jmap-mapui-kit";
import removeAssets from "../mapFeatures/AssetKit/RemoveAssets";

const MapRenderer = (props) => {
  const [controllerObj, setControllerObj] = useState(null);
  const [assetKitObj, setAssetKit] = useState(null);
  const [assetConfig, setAssetConfig] = useState(null);

  // //INITIALIZING USING JMAP.INIT
  useEffect(() => {
    console.log("INITIALIZING MAP");
    const jibestream = jmap.init(props.config);

    jmap.dispatcher.subscribe("ready", () => {
      // Scale map out
      jibestream.control.setMapTransform(new jmap.Transform({ scale: 0.3 }));
      const control = jibestream.control;
      const assetKit = new jmapAssetKit(control);
      const zoneKit = new ZoneKit(jibestream.core,jibestream.control)
      console.log(zoneKit)
      console.log("CONTROLLER CHANGED, RELOADING!");
      console.log(control);
      setControllerObj(control);

      console.log("ASSETKIT CHANGED, RELOADING!");
      setAssetKit(assetKit);
      floorSelector(control);
    });
  }, [props.config]);

  //INITIALIZING USING JCORE
  // useEffect(() => {
  //   console.log("INITIALIZING MAP");
  //   const { customerId, host, venueId, auth } = props.config;
  //   const core = new jmap.core.JCore({ customerId, host, auth });
  //   //console.log(core);
  //   core.populateVenueByVenueId(venueId, (error, activeVenue) => {
  //     if (error) alert(error);
  //     // Populate the default Building
  //     const buildingId = activeVenue.buildings.getDefault().id;
  //     return core.populateBuildingInVenue(activeVenue, buildingId, (error2) => {
  //       if (error2) alert(error2);

  //       // Make a view controller
  //       const control = new jmap.JController({ activeVenue });
  //       const assetKit = new jmapAssetKit(control);
  //       const zoneKit = new ZoneKit(core,control)
  //       console.log(zoneKit)

  //       console.log("CONTROLLER CHANGED, RELOADING!");
  //       setControllerObj(control);

  //       console.log("ASSETKIT CHANGED, RELOADING!");
  //       setAssetKit(assetKit);

  //       //floorSelector(control);

  //       // This targets '<div class="map"></div>' in the DOM
  //       //const control = new jmap.JController({ activeVenue, width, height });
  //       //Show map
  //       control.showDefaultMap();
  //     });
  //   });
  // }, [props.config]);

  const resetAssetHandler = () => {
    showAssets(controllerObj, assetKitObj);
    setAssetConfig(JSON.parse(localStorage.getItem("assetConfig")));
    localStorage.setItem("selectedItems", JSON.stringify([]));
  };

  const filteringOutAnAsset = (e) => {
    e.target.className = classes.selected;
    let oldSelectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    if (oldSelectedItems === null) oldSelectedItems = [];
    //console.log(oldSelectedItems);
    oldSelectedItems.push(e.target.id);
    localStorage.setItem("selectedItems", JSON.stringify(oldSelectedItems));
  };

  const filterAssets = () => {
    let assetsToFilter = JSON.parse(localStorage.getItem("selectedItems"));
    let config = JSON.parse(localStorage.getItem("assetConfig"));

    assetsToFilter.forEach((assetOut) => {
      config = config.filter((asset) => asset.id.toString() !== assetOut);
    });
    localStorage.setItem("selectedItems", JSON.stringify([]));
    localStorage.setItem("assetConfig", JSON.stringify(config));
    setAssetConfig(config);
    removeAssets(assetKitObj, assetsToFilter);
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
      <button onClick={resetAssetHandler}>Show Assets</button>
      {assetConfig && (
        <h4>Click on an asset below if you want to filter it out</h4>
      )}
      {assetConfig && (
        <div>
          {assetConfig.map((asset) => (
            <button
              onClick={filteringOutAnAsset}
              className={classes.inline}
              key={asset.id}
              id={asset.id}
            >
              {asset.name}
            </button>
          ))}
          <button onClick={filterAssets} className={classes.filterButton}>
            Filter Assets
          </button>
        </div>
      )}
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
