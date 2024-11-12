import { OntarioAvailabilityResponse } from "./types";

export const getQueryParamAsString = (
  param: string | string[] | undefined,
  defaultValue: string
): string => (Array.isArray(param) ? param[0] : param || defaultValue);

export const getChildMapIdsFromData = (
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
