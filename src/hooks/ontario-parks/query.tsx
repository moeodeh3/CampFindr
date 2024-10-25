import { useQuery } from "@tanstack/react-query";
import {
  AvailabilityInput,
  AvailabilityResponse,
  MapLegendInput,
  MapLegendResponse,
} from "../api/ontario-parks/types";
import {
  getOntarioParksAvailability,
  getOntarioParksMapLegend,
} from "../api/ontario-parks/utils";
import {
  Loadable,
  loadDataFromQuery,
  mapLoadable,
  QueryOptions,
} from "../api/query";

export function useOntarioParksLegendQuery(
  props: MapLegendInput,
  options: QueryOptions
): Loadable<MapLegendResponse | null> {
  const ontarioParksLegendQuery = useQuery({
    queryKey: ["ontarioParksMapLegendQuery", props],
    queryFn: async () => getOntarioParksMapLegend(props),
    ...options,
    enabled: options.enabled,
    staleTime: 1000 * 60 * 120,
    refetchOnWindowFocus: false,
  });

  const ontarioParksLegendRoute = loadDataFromQuery(ontarioParksLegendQuery);

  return mapLoadable(ontarioParksLegendRoute)(
    (data): MapLegendResponse | null => data
  );
}

export function useOntarioParksAvailabilityQuery(
  props: AvailabilityInput,
  options: QueryOptions
): Loadable<AvailabilityResponse | null> {
  const availabilityQuery = useQuery({
    queryKey: ["ontarioParksAvailabilityQuery", props],
    queryFn: async () => getOntarioParksAvailability(props),
    ...options,
    enabled: options.enabled,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const availabilityRoute = loadDataFromQuery(availabilityQuery);

  return mapLoadable(availabilityRoute)(
    (data): AvailabilityResponse | null => data
  );
}
