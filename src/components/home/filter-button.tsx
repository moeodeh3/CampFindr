import { BaseButton } from '../button/base-button';
import { FontAwesomeIcon } from '../font-awesome-icon';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'src/design/constant';

interface FilterWithDropdownProps {
  placeholder?: string;
  onFilterPressed: () => void;
}

export const FilterWithDropdown = (props: FilterWithDropdownProps) => {
  const { onFilterPressed } = props;
  return (
    <BaseButton onClick={onFilterPressed}>
      <div className="flex items-center justify-center bg-primary rounded-full p-2">
        <FontAwesomeIcon
          icon={faFilter}
          color={colors.textSecondary}
          size="sm"
        />
      </div>
    </BaseButton>
  );
};
