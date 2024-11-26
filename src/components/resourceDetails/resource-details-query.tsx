import {
  useOntarioParksAvailabilityQuery,
  useOntarioParksResourceDetailsQuery,
} from 'src/hooks/ontario-parks/query';
import ResourceDetails from './resource-details';
import { useAvailability } from 'src/providers/availabilityContext';
import { useOpenMeteoForecastQuery } from 'src/hooks/open-meteo/query';

interface ResourceDetailsWithQueryProps {
  mapId: number;
}

export default function ResourceDetailsWithQuery(
  props: ResourceDetailsWithQueryProps
) {
  const { mapId } = props;
  const { availabilityInput } = useAvailability();

  const resourceDetailsLoadable = useOntarioParksResourceDetailsQuery(
    { mapId },
    { enabled: true }
  );

  const weatherForecastLoadable = useOpenMeteoForecastQuery(
    { mapId },
    { enabled: true }
  );

  const availabilityInputWithMapId = availabilityInput
    ? { ...availabilityInput, mapId: mapId }
    : null;

  const availabilityLoadable = useOntarioParksAvailabilityQuery(
    availabilityInputWithMapId,
    { enabled: !!availabilityInputWithMapId }
  );

  return (
    <div className="flex flex-col min-h-full w-full">
      <ResourceDetails
        resourceDetailsLoadable={resourceDetailsLoadable}
        availabilityLoadable={availabilityLoadable}
        weatherForecastLoadable={weatherForecastLoadable}
        checkInDate={availabilityInput?.startDate}
        checkOutDate={availabilityInput?.endDate}
      />
    </div>
  );
}
