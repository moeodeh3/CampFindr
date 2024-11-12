import ResourceDetails from "./resource-details";

interface ResourceDetailsWithQueryProps {
  mapId: number;
}

export default function ResourceDetailsWithQuery(
  props: ResourceDetailsWithQueryProps
) {
  const { mapId } = props;

  // make query here

  return <ResourceDetails />;
}
