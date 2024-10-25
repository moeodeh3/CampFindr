import { MapLegendEntry } from "../../../hooks/api/ontario-parks/types";

export function formatMapResponse(mapData: MapLegendEntry) {
  return {
    map: {
      mapId: mapData.mapId,
      versionId: mapData.versionId,
      versionDate: mapData.versionDate,
      mapType: mapData.mapType,
      isDisabled: mapData.isDisabled,
      xDimension: mapData.xDimension,
      yDimension: mapData.yDimension,
      localizedValues: mapData.localizedValues,
      resourceLocationId: mapData.resourceLocationId,
      mapResources: mapData.mapResources,
      mapAccessPointResources: mapData.mapAccessPointResources,
      mapLegendItems: mapData.mapLegendItems,
      mapLinks: mapData.mapLinks,
      mapLabels: mapData.mapLabels,
      parentMaps: mapData.parentMaps,
      mapGlobalStyleLegends: mapData.mapGlobalStyleLegends,
      parentTransactionLocationId: mapData.parentTransactionLocationId,
      defaultResultsView: mapData.defaultResultsView,
      transactionLocationTypes: mapData.transactionLocationTypes,
    },
    mapImageUrls: {
      "en-CA": `https://reservations.ontarioparks.ca/images/${mapData.localizedValues[0].mapImageUid}.png`,
      "fr-CA": `https://reservations.ontarioparks.ca/images/${mapData.localizedValues[1].mapImageUid}.png`,
    },
    hierarchyToMap: null,
  };
}
