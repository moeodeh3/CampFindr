import { VerticalSpacer } from '../spacer/vertical-spacer';
import Image from 'next/image';
import { HorizontalSpacer } from '../spacer/horizontal-spacer';
import { getWithoutHtmlTags } from './utils';
import {
  composeLoadables,
  Loadable,
  onLoadable,
  tuple,
} from 'src/hooks/api/query';
import { AvailabilityResponse, ResourceEntry } from '@packages/types';
import { FontAwesomeIcon } from '../font-awesome-icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'src/design/constant';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

interface ResourceDetailsProps {
  resourceDetailsLoadable: Loadable<ResourceEntry>;
  availabilityLoadable: Loadable<AvailabilityResponse[]>;
}

export default function ResourceDetails(props: ResourceDetailsProps) {
  const { resourceDetailsLoadable, availabilityLoadable } = props;

  return onLoadable(
    composeLoadables(resourceDetailsLoadable, availabilityLoadable)(tuple)
  )(
    () => null,
    () => null,
    ([resourceDetails, availability]) => {
      const formattedDescription = getWithoutHtmlTags(
        resourceDetails?.description
      );

      const position = resourceDetails?.position
        ? {
            lat: resourceDetails.position.latitude,
            lng: resourceDetails.position.longitude,
          }
        : null;

      return (
        <div className="flex h-full w-full">
          <div className="flex flex-row justify-between h-full w-full">
            <div className="flex flex-col h-full w-1/2 p-8 space-y-8">
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex flex-col w-full items-center justify-center space-y-4">
                  <p className="text-text-primary text-2xl font-semibold py-2">
                    {resourceDetails.fullName}
                  </p>
                  <Image
                    src={
                      availability?.[0]?.legendDetails?.imageUrl ||
                      'https://cscan-infocan.ca/wp-content/uploads/2022/08/Zaid-Kobti-1-e1659717885644.jpg'
                    }
                    alt="Failed to load"
                    width={335}
                    height={187.5}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-text-primary text-base font-normal">
                    {formattedDescription}
                  </p>
                </div>
              </div>
              <HorizontalSpacer />
              <div className="flex flex-col w-full space-y-4">
                <p className="text-text-primary text-xl font-semibold pb-4">
                  Campgrounds
                </p>
                {availability.map((item) => (
                  <CampgroundCard
                    key={item.mapId}
                    title={item.legendDetails.title}
                    linksAvailable={item.linksAvailable || 0}
                  />
                ))}
              </div>
            </div>
            <VerticalSpacer />
            <div className="flex h-full px-4 w-1/2">
              {position ? (
                <LoadScript
                  googleMapsApiKey={
                    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
                  }
                >
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={position}
                    zoom={13}
                  >
                    <MarkerF position={position} />
                  </GoogleMap>
                </LoadScript>
              ) : (
                <p className="text-text-primary text-center m-auto">
                  Location unavailable.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }
  );
}

interface CampgroundCardProps {
  title: string;
  linksAvailable: number;
}

const CampgroundCard = (props: CampgroundCardProps) => {
  const { title, linksAvailable } = props;
  return (
    <div className="border border-primary py-4 px-4 rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <p className="text-text-primary text-lg">{title}</p>
        <div className="flex flex-row items-center space-x-2">
          <div className="bg-green-500 p-1 rounded-full flex items-center justify-center">
            <FontAwesomeIcon
              icon={faCheck}
              size="xs"
              color={colors.textSecondary}
            />
          </div>
          <p className="text-text-primary text-lg">
            {linksAvailable} available
          </p>
        </div>
      </div>
    </div>
  );
};
