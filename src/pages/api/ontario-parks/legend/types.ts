// Map Legend
export type MapLegendResponse = MapLegendEntry[];

export interface MapLegendEntry {
  isOrganizationRoot: boolean;
  mapId: number;
  versionId: number;
  versionDate: string;
  mapType: number;
  isDisabled: boolean;
  xDimension: number;
  yDimension: number;
  localizedValues: LocalizedValue[];
  resourceLocationId: number;
  mapResources: MapResource[];
  mapAccessPointResources: any[];
  mapLegendItems: any[];
  mapLinks: any[];
  mapLabels: any[];
  parentMaps: number[];
  mapGlobalStyleLegends: any[];
  parentTransactionLocationId: number;
  defaultResultsView: number;
  transactionLocationTypes: any[];
}

export interface LocalizedValue {
  cultureName: string;
  title: string;
  description: string;
  mapImageUid: string;
  mapImageFormat: number;
}

export interface MapResource {
  resourceId: number;
  iconType: number;
  localizationPoint: LocalizationPoint;
  xCoordinate: number;
  yCoordinate: number;
  registrationActions: number[];
  transactionLocationTypes: number[];
}

export interface LocalizationPoint {
  justification: number;
  xCoordinate: number;
  yCoordinate: number;
  rValue: number;
  gValue: number;
  bValue: number;
}