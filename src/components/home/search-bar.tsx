import { useEffect, useRef } from 'react';
import { colors } from '../../design/constant';
import { BaseButton } from '../button/base-button';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../font-awesome-icon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  KmDistanceOption,
  DropdownOption,
  PartySizeOption,
  getOptions,
  KM_DISTANCE_MAP,
  PARTY_SIZE_MAP,
} from './utils';
import { VerticalSpacer } from '../spacer/vertical-spacer';

export interface SearchBarProps {
  activeDropdown: DropdownOption | null;
  startDate: Date | null;
  endDate: Date | null;
  kmDistance: KmDistanceOption | '';
  partySize: PartySizeOption | '';
  handleDropdown: (option: DropdownOption) => void;
  handleStartDate: (date: Date) => void;
  handleEndDate: (date: Date) => void;
  handleKmDistance: (distance: KmDistanceOption) => void;
  handlePartySize: (size: PartySizeOption) => void;
  onSearch: () => void;
}

export function SearchBar(props: SearchBarProps) {
  const {
    activeDropdown,
    startDate,
    endDate,
    kmDistance,
    partySize,
    handleDropdown,
    handleStartDate,
    handleEndDate,
    handleKmDistance,
    handlePartySize,
    onSearch,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleDropdown]);

  const toggleDropdown = (item: DropdownOption) => {
    handleDropdown(activeDropdown === item ? null : item);
  };

  const handleSelect = <T,>(
    dropdownType: DropdownOption,
    value: T,
    updateFunction: (val: T) => void
  ) => {
    updateFunction(value);
    handleDropdown(null);
  };

  return (
    <div className="flex w-full h-16 items-center justify-center">
      <div
        ref={dropdownRef}
        className="flex w-[75%] md:w-[60%] h-full rounded-full border-2 border-primary p-4 items-center justify-between"
      >
        <SearchItemWithDropdown
          title="Where"
          description={kmDistance ? kmDistance : 'Driving distance'}
          className="text-left md:w-[20%]"
          isActive={activeDropdown === 'Where'}
          toggleDropdown={() => toggleDropdown('Where')}
          renderDropdown={() => (
            <DropdownList
              items={getOptions(KM_DISTANCE_MAP)}
              onSelect={(item: KmDistanceOption) =>
                handleSelect('Where', item, handleKmDistance)
              }
            />
          )}
        />

        <div className="hidden md:flex flex-1 justify-between items-center space-x-[5%] h-full">
          <SearchItemWithDropdown
            title="Check in"
            description={
              startDate ? startDate.toLocaleDateString() : 'Add dates'
            }
            isActive={activeDropdown === 'Check in'}
            hasDivider={true}
            className="w-[20%]"
            toggleDropdown={() => toggleDropdown('Check in')}
            renderDropdown={() => (
              <DatePicker
                selected={startDate}
                onChange={(date: Date) =>
                  handleSelect('Check in', date, handleStartDate)
                }
                inline
              />
            )}
          />
          <SearchItemWithDropdown
            title="Check out"
            description={endDate ? endDate.toLocaleDateString() : 'Add dates'}
            isActive={activeDropdown === 'Check out'}
            hasDivider={true}
            className="w-[20%]"
            toggleDropdown={() => toggleDropdown('Check out')}
            renderDropdown={() => (
              <DatePicker
                selected={endDate}
                onChange={(date: Date) =>
                  handleSelect('Check out', date, handleEndDate)
                }
                inline
              />
            )}
          />
          <SearchItemWithDropdown
            title="Who"
            description={partySize ? partySize : 'Add guests'}
            isActive={activeDropdown === 'Who'}
            hasDivider={true}
            className="w-[20%]"
            toggleDropdown={() => toggleDropdown('Who')}
            renderDropdown={() => (
              <DropdownList
                items={getOptions(PARTY_SIZE_MAP)}
                onSelect={(item: PartySizeOption) =>
                  handleSelect('Who', item, handlePartySize)
                }
              />
            )}
          />
        </div>

        <div className="pl-4">
          <BaseButton onClick={onSearch}>
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
  className = '',
  isActive,
  hasDivider,
  toggleDropdown,
  renderDropdown,
}: SearchItemWithDropdownProps) => {
  return (
    <div
      className={`relative flex items-center justify-center h-full space-x-[10%] ${className}`}
    >
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

const DropdownList = ({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (item: string) => void;
}) => {
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
