const ShowAssets = (control, assetKit) => {
  // console.log("CONTROLLER RECEIVED AT SHOWASSETS");
  // console.log(control);

  function getRandomWaypoint(control) {
    const waypoints = control.activeVenue.maps.getAllWaypoints();
    return waypoints[Math.floor(Math.random() * waypoints.length)];
  }

  function goBacktoInitialAssetConfig(config) {
    config.forEach((item) => {
      const asset = assetKit.getAssetById(item.id);
      assetKit.removeAsset(asset);
    });
  }

  if (assetKit != null) {
    //Generating 3 types of configuration by color
    try {
      //Clean the contents of assetConfig and remove all Assets to start over
      if (localStorage.getItem("assetConfig")) {
        const assetConfig = JSON.parse(localStorage.getItem("assetConfig"));
        goBacktoInitialAssetConfig(assetConfig);
        localStorage.removeItem("assetConfig");
      }
      const colors = {
        red: "#db4848",
        yellow: "#efd158",
        green: "#5ed660",
      };
      const colorConfigs = Object.keys(colors).map((type) => ({
        type,
        iconColor: colors[type],
        pulseColor: colors[type],
        confidenceColor: colors[type],
      }));
      const configs = [];
      for (let i = 0; i < 20; i++) {
        const wp = getRandomWaypoint(control);
        const assetConfig = {
          position: wp.coordinates,
          waypoint: wp,
          // confidenceMax: 30,
          pulseVisible: false,
          // width: 12,
          mapId: wp.mapId,
          id: i,
          name: "Asset " + i,
          description: "Random Description for Asset " + i,
          url: 'https://thumbs.dreamstime.com/z/location-pin-icon-transparent-location-pin-sign-flat-style-red-location-pin-symbol-map-pointer-symbol-map-pin-sign-location-pin-117283757.jpg?w=768'
        };
        let colorConfig;
        if (i % 3 === 0) {
          colorConfig = colorConfigs.find((c) => c.type === "red");
        } else if (i % 3 === 1) {
          colorConfig = colorConfigs.find((c) => c.type === "yellow");
        } else {
          colorConfig = colorConfigs.find((c) => c.type === "green");
        }
        Object.assign(assetConfig, colorConfig);
        configs.push(assetConfig);
      }
      localStorage.setItem("assetConfig", JSON.stringify(configs));
      // const filteredConfigs = [];
      // configs.forEach((config) => {
      //   if (config.mapId === control.currentMap.id) {
      //     console.log("ASSET FOUND IN CURRENT FLOOR, DRAWING");
      //     filteredConfigs.push(config);
      //   } else {
      //     console.log("ASSET FOUND IN DIFFERENT FLOOR, NOT DRAWING");
      //   }
      // });
      // //console.log(filteredConfigs);
      // assetKit.createAsset(filteredConfigs);
      assetKit.createAsset(configs);
      setTimeout(() =>{
        console.log('Rendering Current Map View')
        control.renderCurrentMapView()
      },1000)
      //return configs;
    } catch (error) {
      console.log(
        "An attempt to create asset config has failed, more details below, please wait"
      );
      console.log(error);
    }
  }
};

export default ShowAssets;
