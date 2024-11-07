import { useQuery } from "@tanstack/react-query";
import {
  AvailabilityInput,
  AvailabilityResponse,
  MapLegendInput,
  MapLegendResponse,
} from "../api/ontario-parks/types";
import {
  getOntarioParksAvailability,
} from "../api/ontario-parks/utils";
import {
  Loadable,
  loadDataFromQuery,
  mapLoadable,
  QueryOptions,
} from "../api/query";

export function useOntarioParksAvailabilityQuery(
  props: AvailabilityInput,
  options: QueryOptions
): Loadable<AvailabilityResponse[] | null> {
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
    (data): AvailabilityResponse[] | null => data
  );
}
