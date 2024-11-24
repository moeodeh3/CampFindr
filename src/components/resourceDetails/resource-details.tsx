import { VerticalSpacer } from '../spacer/vertical-spacer';
import Image from 'next/image';
import { HorizontalSpacer } from '../spacer/horizontal-spacer';
import { formatHtmlToSections } from './utils';
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

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  return onLoadable(
    composeLoadables(
      resourceDetailsLoadable,
      availabilityLoadable,
      weatherForecastLoadable
    )(tuple)
  )(
    () => null,
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
                  <p className="text-text-primary text-2xl font-semibold">
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
                        width={335}
                        height={187.5}
                        className="rounded-xl"
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
