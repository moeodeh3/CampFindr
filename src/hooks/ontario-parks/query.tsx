import { useQuery } from "@tanstack/react-query";
import {
  getOntarioParksAvailability,
  getOntarioParksResourceDetails,
} from "../api/ontario-parks/utils";
import {
  Loadable,
  loadDataFromQuery,
  mapLoadable,
  QueryOptions,
} from "../api/query";
import { AvailabilityInput } from "../api/ontario-parks/types";
import { AvailabilityResponse, ResourceEntry, ResourceInput } from "@packages/types";

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

export function useOntarioParksResourceDetailsQuery(
  props: ResourceInput,
  options: QueryOptions
): Loadable<ResourceEntry | null> {
  const availabilityQuery = useQuery({
    queryKey: ["ontarioParksResourceDetailsQuery", props],
    queryFn: async () => getOntarioParksResourceDetails(props),
    ...options,
    enabled: options.enabled,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const availabilityRoute = loadDataFromQuery(availabilityQuery);

  return mapLoadable(availabilityRoute)(
    (data): ResourceEntry| null => data
  );
}
