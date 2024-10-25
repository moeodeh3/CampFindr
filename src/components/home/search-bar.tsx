import { useState } from "react";
import { colors } from "../../design/constant";
import { BaseButton } from "../button/base-button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "../font-awesome-icon";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { DrivingDistanceOption, DropdownOption, PartySizeOption } from "./utils";


interface SearchBarProps {
  activeDropdown: DropdownOption | null;
  startDate: Date | null;
  endDate: Date | null;
  drivingDistance: DrivingDistanceOption | "";
  partySize: PartySizeOption | "";
  handleDropdown: (option: DropdownOption) => void;
  handleStartDate: (date: Date) => void;
  handleEndDate: (date: Date) => void;
  handleDrivingDistance: (distance: DrivingDistanceOption) => void;
  handlePartySize: (size: PartySizeOption) => void;
}

export function SearchBar(props: SearchBarProps) {
  const { 
    activeDropdown, 
    startDate, 
    endDate, 
    drivingDistance, 
    partySize, 
    handleDropdown, 
    handleStartDate, 
    handleEndDate, 
    handleDrivingDistance, 
    handlePartySize 
  } = props;

  const toggleDropdown = (item: DropdownOption) => {
    handleDropdown(activeDropdown === item ? null : item);
  };

  return (
    <div className="flex w-full h-16 items-center justify-center">
      <div className="flex w-[75%] md:w-[60%] h-full rounded-full border-2 border-primary p-4 items-center justify-between">
        <SearchItemWithDropdown
          title="Where"
          description={drivingDistance ? drivingDistance : "Driving distance"}
          className="text-left md:w-[20%]" 
          isActive={activeDropdown === "Where"}
          toggleDropdown={() => toggleDropdown("Where")}
          renderDropdown={() => (
            <DropdownList
              items={["1 hour", "2 hours", "3 hours", "4+ hours"] as DrivingDistanceOption[]}
              onSelect={(item: DrivingDistanceOption) => handleDrivingDistance(item)} 
            />
          )}
        />

        <div className="hidden md:flex flex-1 justify-between items-center space-x-[5%] h-full">
          <SearchItemWithDropdown
            title="Check in"
            description={startDate ? startDate.toLocaleDateString() : "Add dates"}
            isActive={activeDropdown === "Check in"}
            hasDivider={true}
            className="w-[20%]" 
            toggleDropdown={() => toggleDropdown("Check in")}
            renderDropdown={() => (
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => handleStartDate(date)}
                inline
              />
            )}
          />
          <SearchItemWithDropdown
            title="Check out"
            description={endDate ? endDate.toLocaleDateString() : "Add dates"}
            isActive={activeDropdown === "Check out"}
            hasDivider={true}
            className="w-[20%]" 
            toggleDropdown={() => toggleDropdown("Check out")}
            renderDropdown={() => (
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => handleEndDate(date)}
                inline
              />
            )}
          />
          <SearchItemWithDropdown
            title="Who"
            description={partySize ? partySize : "Add guests"}
            isActive={activeDropdown === "Who"}
            hasDivider={true}
            className="w-[20%]" 
            toggleDropdown={() => toggleDropdown("Who")}
            renderDropdown={() => (
              <DropdownList
                items={["1 guest", "2 guests", "3 guests", "4 guests"] as PartySizeOption[]}
                onSelect={(item: PartySizeOption) => handlePartySize(item)} 
              />
            )}
          />
        </div>

        <div className="pl-4">
          <BaseButton onClick={() => console.log("Search triggered", { startDate, endDate, drivingDistance, partySize })}>
            <div className="flex items-center justify-center bg-primary rounded-full p-2.5">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color={colors.textSecondary}
                size="lg"
              />
            </div>
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

interface SearchItemWithDropdownProps {
  title: string;
  description: string;
  className?: string;
  isActive: boolean;
  hasDivider?: boolean;
  toggleDropdown: () => void;
  renderDropdown: () => React.ReactNode;
}

const SearchItemWithDropdown = ({
    title,
    description,
    className = "",
    isActive,
    hasDivider,
    toggleDropdown,
    renderDropdown,
  }: SearchItemWithDropdownProps) => {
    return (
      <div className={`relative flex items-center justify-center h-full space-x-[10%] ${className}`}>
        {hasDivider && <VerticalSpacer />}
        <BaseButton onClick={toggleDropdown}>
          <div className="flex flex-col space-y-1">
            <p className="font-semibold text-sm text-text-primary truncate whitespace-nowrap overflow-hidden">
              {title}
            </p>
            <p className="font-light text-xs text-text-primary truncate whitespace-nowrap overflow-hidden">
              {description}
            </p>
          </div>
        </BaseButton>
        {isActive && (
          <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {renderDropdown()}
          </div>
        )}
      </div>
    );
  };

const DropdownList = ({ items, onSelect }: { items: string[], onSelect: (item: string) => void }) => {
  return (
    <ul className="py-2">
      {items.map((item, index) => (
        <li 
          key={index} 
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(item)} 
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

const VerticalSpacer = () => {
  return (
    <div className="flex h-full">
      <div className="w-[1px] bg-primary h-full" />
    </div>
  );
};

const GuestSelector = () => <div className="p-4">[Guest Selector Component]</div>;