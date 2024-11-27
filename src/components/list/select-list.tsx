interface SelectListOption {
  label: string;
  value: string;
}

interface SelectListProps {
  name: string;
  header: string;
  options: SelectListOption[];
  selectedOption: string | null;
  onChange: (selected: string | null) => void;
}

export const SelectList = (props: SelectListProps) => {
  const { name, header, options, selectedOption, onChange } = props;

  const handleOptionClick = (value: string) => {
    // we toggle selection if the same option is clicked
    if (selectedOption === value) {
      onChange(null);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-text-primary font-semibold text-2xl">{header}</p>
      <div className="flex flex-col space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleOptionClick(option.value)}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedOption === option.value}
              readOnly
              className="appearance-none h-5 w-5 border border-gray-400 rounded-full checked:bg-primary"
            />
            <span className="text-text-primary text-base font-normal">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
