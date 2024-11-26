import { Loadable, onLoadable } from '../../hooks/api/query';
import { CampCard } from './camp-card';
import { AvailabilityResponse } from '@packages/types';
import { FilterWithDropdown } from './filter';
import LoadingAnimation from '../../../public/loading-animation.json';
import { Lottie } from '../lottie';

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
        <div className="flex flex-col justify-center items-center py-10">
          <p className="text-3xl font-bold bg-gradient-to-r from-primary via-pink-400 to-red-300 bg-clip-text text-transparent">
            Finding your next adventure...
          </p>
          <Lottie src={LoadingAnimation} width={300} height={300} />
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

          <div className="flex flex-wrap justify-start gap-8 px-32">
            {availabilityData.map((availability) => (
              <CampCard
                key={availability.mapId}
                mapId={availability.mapId}
                image={availability.legendDetails.imageUrl}
                title={availability.legendDetails.title}
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
