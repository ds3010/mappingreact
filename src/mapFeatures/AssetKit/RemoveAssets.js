const removeAssets = (assetKit, assetsToDelete) => {
  console.log(assetsToDelete);
  console.log(assetKit);
  assetsToDelete.forEach((idToDelete) => {
    console.log(idToDelete);
    const assetToDelete = assetKit.getAssetById(parseInt(idToDelete));
    assetKit.removeAsset(assetToDelete);
  });
};

export default removeAssets;
