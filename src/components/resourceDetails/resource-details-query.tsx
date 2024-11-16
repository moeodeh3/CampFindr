import { useOntarioParksResourceDetailsQuery } from "src/hooks/ontario-parks/query";
import ResourceDetails from "./resource-details";

interface ResourceDetailsWithQueryProps {
  resourceLocationId: number;
}

export default function ResourceDetailsWithQuery(
  props: ResourceDetailsWithQueryProps
) {
  const { resourceLocationId } = props;

  const resourceDetailsLoadable = useOntarioParksResourceDetailsQuery(
    { resourceLocationId },
    { enabled: true }
  );

  return (
    <div className="flex min-h-full w-full">
      <ResourceDetails resourceDetailsLoadable={resourceDetailsLoadable} />
    </div>
  );
}
