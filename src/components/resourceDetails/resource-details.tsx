import { VerticalSpacer } from '../spacer/vertical-spacer';
import Image from 'next/image';
import { HorizontalSpacer } from '../spacer/horizontal-spacer';
import { calculateNights, formatHtmlToSections, getReserveUrl } from './utils';
import {
  composeLoadables,
  Loadable,
  onLoadable,
  tuple,
} from 'src/hooks/api/query';
import { AvailabilityResponse, ResourceEntry } from '@packages/types';
import { FontAwesomeIcon } from '../font-awesome-icon';
import {
  faCheck,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from 'src/design/constant';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DailyWeatherForecast } from 'src/hooks/api/open-meteo/types';
import { WeatherForecastCard } from '../weather-forecast-card';
import { Lottie } from '../lottie';
import LoadingAnimation from '../../../public/loading-animation.json';
import { BaseButton } from '../button/base-button';
import { useAvailability } from 'src/providers/availabilityContext';

interface ResourceDetailsProps {
  checkInDate: string;
  checkOutDate: string;
  resourceDetailsLoadable: Loadable<ResourceEntry>;
  availabilityLoadable: Loadable<AvailabilityResponse[]>;
  weatherForecastLoadable: Loadable<DailyWeatherForecast[]>;
}

export default function ResourceDetails(props: ResourceDetailsProps) {
  const {
    checkInDate,
    checkOutDate,
    resourceDetailsLoadable,
    availabilityLoadable,
    weatherForecastLoadable,
  } = props;

  const { availabilityInput } = useAvailability();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const handleReserveCampground = (
    mapId: number,
    resourceLocationId: number
  ) => {
    // we construct the URL specific to the current campground they are looking at
    const url = getReserveUrl(mapId, resourceLocationId, availabilityInput);

    // open the URL in a new tab
    window.open(url.toString(), '_blank');
  };

  return onLoadable(
    composeLoadables(
      resourceDetailsLoadable,
      availabilityLoadable,
      weatherForecastLoadable
    )(tuple)
  )(
    () => (
      <div className="flex flex-col justify-center items-center py-10">
        <p className="text-3xl font-bold bg-gradient-to-r from-primary via-pink-400 to-red-300 bg-clip-text text-transparent">
          Getting your parks details...
        </p>
        <Lottie src={LoadingAnimation} width={300} height={300} />
      </div>
    ),
    () => null,
    ([resourceDetails, availability, weatherForecast]) => {
      const sections = formatHtmlToSections(resourceDetails?.description || '');
      const position = resourceDetails?.position
        ? {
            lat: resourceDetails.position.latitude,
            lng: resourceDetails.position.longitude,
          }
        : null;

      return (
        <div className="flex h-full w-full">
          <div className="flex flex-row justify-between h-full w-full">
            <div className="flex flex-col h-full w-2/3 px-8 space-y-6">
              <div className="flex flex-col space-y-8 w-full">
                <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                  <p className="text-primary text-3xl font-bold">
                    {resourceDetails?.fullName}
                  </p>
                  <div className="flex flex-row w-full h-full">
                    <div className="flex flex-col w-1/3 h-full justify-between py-2">
                      <div className="flex flex-col space-y-2">
                        <HeaderWithIcon title="Address" icon={faLocationDot} />
                        <div className="flex flex-col">
                          <p className="text-text-primary text-sm font-normal">
                            {resourceDetails?.streetAddress}
                          </p>
                          {resourceDetails?.city ||
                          resourceDetails?.region ||
                          resourceDetails?.regionCode ? (
                            <p className="text-text-primary text-sm font-normal">
                              {resourceDetails.city
                                ? `${resourceDetails.city}, `
                                : ''}
                              {resourceDetails.region
                                ? `${resourceDetails.region}, `
                                : ''}
                              {resourceDetails.regionCode || ''}
                            </p>
                          ) : null}
                          <p className="text-text-primary text-sm font-normal">
                            {resourceDetails?.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <HeaderWithIcon title="Phone" icon={faPhone} />

                        <p className="text-text-primary text-sm font-normal">
                          {resourceDetails?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-1/3 py-2 items-center justify-center">
                      <Image
                        src={
                          availability?.[0]?.legendDetails?.imageUrl ||
                          'https://cscan-infocan.ca/wp-content/uploads/2022/08/Zaid-Kobti-1-e1659717885644.jpg'
                        }
                        alt="Failed to load"
                        width={800}
                        height={500}
                        className="rounded-xl flex-shrink-0"
                      />
                    </div>
                    <div className="flex flex-col w-1/3 h-full items-end">
                      <WeatherForecastCard
                        weatherForecast={weatherForecast}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                      />
                    </div>
                  </div>
                </div>
                <HorizontalSpacer />
                <div className="flex flex-col space-y-4">
                  {sections.map((section, index) => (
                    <div key={index} className="space-y-2">
                      {section.heading && (
                        <p className="text-text-primary text-lg font-semibold">
                          {section.heading}
                        </p>
                      )}
                      <p className="text-text-primary text-base font-normal">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <HorizontalSpacer />
              <div className="flex flex-col w-full space-y-4">
                <p className="text-primary text-2xl font-bold pb-4">
                  Campgrounds
                </p>
                {availability.map((item) => (
                  <CampgroundCard
                    key={item.mapId}
                    mapId={item.mapId}
                    resourceLocationId={item.legendDetails.resourceLocationId}
                    title={item.legendDetails.title}
                    linksAvailable={item.linksAvailable || 0}
                    onReserve={handleReserveCampground}
                  />
                ))}
              </div>
            </div>
            <VerticalSpacer />
            <div className="flex h-full px-4 w-1/2">
              {isLoaded ? (
                position ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '88%' }}
                    center={position}
                    zoom={13}
                  >
                    <MarkerF position={position} />
                  </GoogleMap>
                ) : (
                  <p className="text-text-primary text-center m-auto">
                    Location unavailable.
                  </p>
                )
              ) : loadError ? (
                <p className="text-text-primary text-center m-auto">
                  Failed to load map.
                </p>
              ) : (
                <p className="text-text-primary text-center m-auto">
                  Loading map...
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
  mapId: number;
  resourceLocationId: number;
  title: string;
  linksAvailable: number;
  onReserve: (mapId: number, resourceLocationId: number) => void;
}

const CampgroundCard = (props: CampgroundCardProps) => {
  const { mapId, resourceLocationId, title, linksAvailable, onReserve } = props;
  return (
    <div className="border border-primary py-4 px-4 rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <p className="text-text-primary text-lg">{title}</p>
        <div className="flex flex-row items-center space-x-6">
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
          <BaseButton onClick={() => onReserve(mapId, resourceLocationId)}>
            <div className="bg-primary flex flex-col justify-center items-center py-1 px-2 rounded-xl">
              <p className="text-text-secondary text-base font-normal">
                Reserve
              </p>
            </div>
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

const HeaderWithIcon = (props: { title: string; icon: IconProp }) => {
  const { title, icon } = props;
  return (
    <div>
      <div className="flex flex-row items-center space-x-2">
        <p className="text-text-primary text-base font-semibold">{title}</p>
        <FontAwesomeIcon icon={icon} size="lg" color={colors.primary} />
      </div>
    </div>
  );
};
