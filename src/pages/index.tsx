import { useState } from "react";
import { CampCard } from "../components/home/camp-card";
import { Header } from "../components/home/header";
import { SearchBar } from "../components/home/search-bar";
import { DrivingDistanceOption, DropdownOption, PartySizeOption } from "../components/home/utils";

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownOption | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [drivingDistance, setDrivingDistance] = useState<DrivingDistanceOption | "">("");
  const [partySize, setPartySize] = useState<PartySizeOption | "">("");

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
          handleDrivingDistance={(distance: DrivingDistanceOption) => setDrivingDistance(distance)}
          handlePartySize={(size: PartySizeOption) => setPartySize(size)}
        />
        {/* <CampCard/> */}
      </main>
    </div>
  );
}