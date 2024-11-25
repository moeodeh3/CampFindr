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
      <main className="h-full space-y-8">
        <Header />
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
        <SearchResults
          availabilityLoadable={availabilityLoadable}
          isSearching={isSearching}
          onCardPressed={handleCardPressed}
        />
      </main>
    </div>
  );
}
