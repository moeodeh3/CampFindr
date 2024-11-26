import { Loadable, onLoadable } from '../../hooks/api/query';
import { CampCard } from './camp-card';
import { AvailabilityResponse } from '@packages/types';
import { FilterWithDropdown } from './filter';

interface SearchResultsProps {
  availabilityLoadable: Loadable<AvailabilityResponse[]>;
  isSearching: boolean;
  onCardPressed: (mapId: number) => void;
}

export function SearchResults({
  availabilityLoadable,
  isSearching,
  onCardPressed,
}: SearchResultsProps) {
  return onLoadable(availabilityLoadable)(
    () =>
      isSearching ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-text-light-gray text-xl font-bold">Searching...</p>
        </div>
      ) : null,

    () => null,
    (availabilityData) => {
      return (
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-0">
            <div className="flex flex-row justify-end items-center px-12 space-x-6">
              <p className="text-primary text-lg font-semibold">
                {availabilityData ? availabilityData.length : 0} Results
              </p>
              <FilterWithDropdown />
            </div>
          </div>
          <div className="flex flex-wrap justify-start gap-8 px-8">
            {availabilityData.map((availability) => (
              <CampCard
                key={availability.mapId}
                mapId={availability.mapId}
                image={availability.legendDetails.imageUrl}
                title={availability.legendDetails.title}
                park={availability.legendDetails.description}
                cost={'-'}
                rating={'-'}
                onPress={onCardPressed}
              />
            ))}
          </div>
        </div>
      );
    }
  );
}
