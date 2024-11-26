import { useState } from 'react';
import { BaseButton } from '../button/base-button';
import { FontAwesomeIcon } from '../font-awesome-icon';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'src/design/constant';

interface FilterWithDropdownProps {
  placeholder?: string;
}

export const FilterWithDropdown = (props: FilterWithDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="">
      <BaseButton onClick={() => setShowDropdown(showDropdown!)}>
        <div className="flex items-center justify-center bg-primary rounded-full p-2">
          <FontAwesomeIcon
            icon={faFilter}
            color={colors.textSecondary}
            size="sm"
          />
        </div>
      </BaseButton>
      {showDropdown && (
        <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {<p>HELLOS</p>}
        </div>
      )}
    </div>
  );
};
