import MapUIKit from "@jibestream-dev/jmap-mapui-kit";

const floorSelector = (control) => {
  try {
    const uiKit = new MapUIKit(control, {
      padding: [20, 20, 20, 20],
    });
    uiKit.renderFloorSelector();
  } catch (error) {
    console.log("Something bad happened");
    console.log(error);
  }
};
export default floorSelector;
