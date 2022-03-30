const ShowAssets = (control, assetKit) => {
  // console.log("CONTROLLER RECEIVED AT SHOWASSETS");
  // console.log(control);

  function getRandomWaypoint(control) {
    const waypoints = control.currentMap.waypoints.getAll();
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
          confidenceMax: 30,
          pulseVisible: true,
          width: 12,
          id: i,
          name: "Asset " + i,
          description: "Random Description for Asset " + i,
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
      console.log(configs);
      assetKit.createAsset(configs);
    } catch (error) {
      console.log(
        "An attempt to create asset config has failed, more details below, please wait"
      );
      console.log(error);
    }
  }
};

export default ShowAssets;
