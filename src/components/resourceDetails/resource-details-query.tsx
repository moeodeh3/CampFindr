import {
  useOntarioParksAvailabilityQuery,
  useOntarioParksResourceDetailsQuery,
} from 'src/hooks/ontario-parks/query';
import ResourceDetails from './resource-details';
import { useAvailability } from 'src/providers/availabilityContext';

interface ResourceDetailsWithQueryProps {
  mapId: number;
  resourceLocationId: number;
}

export default function ResourceDetailsWithQuery(
  props: ResourceDetailsWithQueryProps
) {
  const { mapId, resourceLocationId } = props;
  const { availabilityInput } = useAvailability();

  const resourceDetailsLoadable = useOntarioParksResourceDetailsQuery(
    { resourceLocationId },
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
    <div className="flex min-h-full w-full">
      <ResourceDetails
        resourceDetailsLoadable={resourceDetailsLoadable}
        availabilityLoadable={availabilityLoadable}
      />
    </div>
  );
}
