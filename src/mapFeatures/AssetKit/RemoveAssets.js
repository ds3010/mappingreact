const removeAssets = (assetKit, assetsToDelete) => {
  assetsToDelete.forEach((idToDelete) => {
    const assetToDelete = assetKit.getAssetById(parseInt(idToDelete));
    assetKit.removeAsset(assetToDelete);
  });
};

export default removeAssets;
