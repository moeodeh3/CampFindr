import { useEffect, useState } from 'react';
import { Header } from '../components/home/header';
import {
  KmDistanceOption,
  DropdownOption,
  formatAvailabilityInput,
  PartySizeOption,
} from '../components/home/utils';
import { useOntarioParksAvailabilityQuery } from '../hooks/ontario-parks/query';
import { onLoadable } from '../hooks/api/query';
import { SearchResults } from '../components/home/search-results';
import router from 'next/router';
import { useAvailability } from 'src/providers/availabilityContext';
import { useUserLocation } from 'src/hooks/user-location';
import { SearchBar } from 'src/components/home/search-bar';
import Carousel from 'src/components/home/carousel';

// TODO: we should move this to the backend and query it instead of harcoding it
const IMAGE_ARRAY = [
  'https://storage.googleapis.com/campfindr/image1.jpg',
  'https://storage.googleapis.com/campfindr/image2.jpg',
  'https://storage.googleapis.com/campfindr/image3.jpg',
  'https://storage.googleapis.com/campfindr/image4.jpg',
  'https://storage.googleapis.com/campfindr/image5.jpg',
];

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownOption | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [kmDistance, setKmDistance] = useState<KmDistanceOption | null>(null);
  const [partySize, setPartySize] = useState<PartySizeOption | null>(null);

  const { availabilityInput, setAvailabilityInput } = useAvailability();
  const { location, getLocation } = useUserLocation();

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(
    availabilityInput ? true : false
  );

  const availabilityLoadable = useOntarioParksAvailabilityQuery(
    availabilityInput
      ? {
          ...availabilityInput,
          userPosition: location,
        }
      : null,
    { enabled: !!availabilityInput && isSearching }
  );

  const handleCardPressed = (mapId: number) => {
    router.push(`/resourceDetails?mapId=${mapId}`);
  };

  const onSearch = () => {
    const formattedInput = formatAvailabilityInput(
      startDate,
      endDate,
      partySize,
      kmDistance
    );
    if (formattedInput) {
      setAvailabilityInput(formattedInput);
      setIsSearching(true);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    onLoadable(availabilityLoadable)(
      () => null,
      () => {
        setIsSearching(false);
      },
      () => {
        setIsSearching(false);
      }
    );
  }, [availabilityLoadable]);

  return (
    <div className="min-h-screen h-full bg-background overflow-x-hidden">
      <main className="h-full space-y-6">
        <Header />
        {!hasSearched && (
          <div className="flex flex-col space-y-12">
            <Carousel images={IMAGE_ARRAY} />
            <div className="flex flex-col justify-center items-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-400 to-red-300 bg-clip-text text-transparent">
                Discover the Great Outdoors
              </p>
            </div>
          </div>
        )}
        <SearchBar
          activeDropdown={activeDropdown}
          startDate={startDate}
          endDate={endDate}
          kmDistance={kmDistance}
          partySize={partySize}
          handleDropdown={(option: DropdownOption) => setActiveDropdown(option)}
          handleStartDate={(date: Date) => setStartDate(date)}
          handleEndDate={(date: Date) => setEndDate(date)}
          handleKmDistance={(distance: KmDistanceOption) =>
            setKmDistance(distance)
          }
          handlePartySize={(size: PartySizeOption) => setPartySize(size)}
          onSearch={onSearch}
        />
        {hasSearched && (
          <SearchResults
            availabilityLoadable={availabilityLoadable}
            isSearching={isSearching}
            onCardPressed={handleCardPressed}
          />
        )}
      </main>
    </div>
  );
}
