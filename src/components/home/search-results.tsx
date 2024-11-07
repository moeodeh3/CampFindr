import { useEffect, useState } from "react";
import { AvailabilityResponse } from "../../hooks/api/ontario-parks/types";
import { Loadable, onLoadable } from "../../hooks/api/query";
import { CampCard } from "./camp-card";

interface SearchResultsProps {
  availabilityLoadable: Loadable<AvailabilityResponse[]>;
  isSearching: boolean;
}

export function SearchResults({
  availabilityLoadable,
  isSearching,
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
        <div className="flex flex-wrap justify-start gap-8 px-8">
          {availabilityData.map((availability) => (
            <CampCard
              key={availability.mapId}
              image={availability.legendDetails.imageUrl}
              title={availability.legendDetails.title}
              park={availability.legendDetails.description}
              cost={"-"}
              rating={"-"}
            />
          ))}
        </div>
      );
    }
  );
}
