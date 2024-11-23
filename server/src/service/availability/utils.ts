import { OntarioAvailabilityResponse } from './types';

export const getQueryParamAsString = (
  param: string | string[] | undefined,
  defaultValue: string
): string => (Array.isArray(param) ? param[0] : param || defaultValue);

export const getMapIdsFromResourceAvailabilities = (
  data: OntarioAvailabilityResponse
): number[] => {
  if (!data.resourceAvailabilities) {
    return [];
  }

  return Object.entries(data.resourceAvailabilities)
    .filter(([, resources]) => {
      return (
        Array.isArray(resources) &&
        resources.every((resource) => resource.availability === 0)
      );
    })
    .map(([id]) => Number(id));
};

export const getMapIdsFromMapLinkAvailabilities = (
  data: OntarioAvailabilityResponse
): number[] => {
  return data.mapLinkAvailabilities
    ? Object.keys(data.mapLinkAvailabilities)
        .filter((id) =>
          data.mapLinkAvailabilities[id].every((val: number) => val === 0)
        )
        .map(Number)
    : [];
};
