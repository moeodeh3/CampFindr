interface ChecklistOption {
  label: string;
  value: string;
}

interface ChecklistProps {
  header: string;
  options: ChecklistOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

export const Checklist = (props: ChecklistProps) => {
  const { header, options, selectedOptions, onChange } = props;

  const handleToggle = (value: string) => {
    const isSelected = selectedOptions.includes(value);
    const updatedOptions = isSelected
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    onChange(updatedOptions);
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-text-primary font-semibold text-2xl">{header}</p>
      <div className="flex flex-col space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="appearance-none h-5 w-5 border border-gray-400 rounded-md bg-transparent checked:bg-primary "
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
