import { useEffect, useState } from 'react';
import { Header } from '../components/home/header';
import { SearchBar } from '../components/home/search-bar';
import {
  DrivingDistanceOption,
  DropdownOption,
  formatAvailabilityInput,
  PartySizeOption,
} from '../components/home/utils';
import { useOntarioParksAvailabilityQuery } from '../hooks/ontario-parks/query';
import { onLoadable } from '../hooks/api/query';
import { SearchResults } from '../components/home/search-results';
import router from 'next/router';
import { useAvailability } from 'src/providers/availabilityContext';

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownOption | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [drivingDistance, setDrivingDistance] = useState<
    DrivingDistanceOption | ''
  >('');
  const [partySize, setPartySize] = useState<PartySizeOption | ''>('');

  const { availabilityInput, setAvailabilityInput } = useAvailability();

  const [isSearching, setIsSearching] = useState(false);

  const availabilityLoadable = useOntarioParksAvailabilityQuery(
    availabilityInput
      ? {
          ...availabilityInput,
          cartUid: 'uid123',
          cartTransactionUid: 'trans123',
          bookingUid: 'booking123',
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
      partySize
    );
    if (formattedInput) {
      setAvailabilityInput(formattedInput);
      setIsSearching(true);
    }
  };

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
          drivingDistance={drivingDistance}
          partySize={partySize}
          handleDropdown={(option: DropdownOption) => setActiveDropdown(option)}
          handleStartDate={(date: Date) => setStartDate(date)}
          handleEndDate={(date: Date) => setEndDate(date)}
          handleDrivingDistance={(distance: DrivingDistanceOption) =>
            setDrivingDistance(distance)
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
