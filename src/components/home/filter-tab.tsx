import { useState } from 'react';
import { Checklist } from '../list/checklist';
import { SelectList } from '../list/select-list';
import { FontAwesomeIcon } from '../font-awesome-icon';
import { BaseButton } from '../button/base-button';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'src/design/constant';
import { useAvailability } from 'src/providers/availabilityContext';

interface FilterTabProps {
  placeholder?: string;
  onClose: () => void;
}

export const FilterTab = (props: FilterTabProps) => {
  const { onClose } = props;

  const { availabilityInput, setAvailabilityInput } = useAvailability();

  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(
    null
  );
  const [selectedDoubleSite, setSelectedDoubleSite] = useState<string | null>(
    null
  );
  const [selectedPullThrough, setSelectedPullThrough] = useState<string | null>(
    null
  );
  const [selectedSiteShade, setSelectedSiteShade] = useState<string | null>(
    null
  );
  const [selectedBarrierFree, setSelectedBarrierFree] = useState<string | null>(
    null
  );

  const restrictions = [
    { label: 'Generator Free', value: 'generator-free' },
    { label: 'No Motorboats', value: 'no-motorboats' },
    { label: 'No Pets', value: 'no-pets' },
    { label: 'No Tents', value: 'no-tents' },
    { label: 'No Vehicles', value: 'no-vehicles' },
    { label: 'Radio Free', value: 'radio-free' },
    { label: 'Ski In', value: 'ski-in' },
    { label: 'Tents Only', value: 'tents-only' },
    { label: 'Walk In', value: 'walk-in' },
  ];

  const serviceTypes = [
    { label: 'No Preference', value: null },
    { label: 'Non-Electric', value: 'non-electric' },
    { label: 'Electric', value: 'electric' },
  ];

  const doubleSiteOptions = [
    { label: 'No Preference', value: null },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const pullThroughOptions = [
    { label: 'No Preference', value: null },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const siteShadeOptions = [
    { label: 'No Preference', value: null },
    { label: 'No Shade/Full Sun', value: 'no-shade' },
    { label: 'Partial Shade', value: 'partial-shade' },
    { label: 'Partial Shade - AM Sun', value: 'partial-shade-am' },
    { label: 'Partial Shade - PM Sun', value: 'partial-shade-pm' },
    { label: 'Full Shade', value: 'full-shade' },
  ];

  const barrierFreeOptions = [
    { label: 'No Preference', value: null },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const onSave = () => {
    setAvailabilityInput({
      ...availabilityInput,
      filters: {
        restrictions: selectedRestrictions,
        serviceType: selectedServiceType,
        doubleSite: selectedDoubleSite,
        pullThrough: selectedPullThrough,
        siteShade: selectedSiteShade,
        barrierFree: selectedBarrierFree,
      },
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-10 w-full h-full"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-1/3 max-h-[90%] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary h-12 w-full px-4 justify-between items-center flex flex-row rounded-t-xl">
          <p className="text-text-secondary text-xl font-bold">Filters</p>
          <BaseButton onClick={onClose}>
            <div className="flex flex-col justify-center items-center bg-text-secondary px-1.5 py-1 rounded-full">
              <FontAwesomeIcon icon={faX} color={colors.primary} />
            </div>
          </BaseButton>
        </div>
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <Checklist
              header="Restrictions"
              options={restrictions}
              selectedOptions={selectedRestrictions}
              onChange={(selected) => setSelectedRestrictions(selected)}
            />
            <SelectList
              name="service-type"
              header="Service Type"
              options={serviceTypes}
              selectedOption={selectedServiceType}
              onChange={(selected) => setSelectedServiceType(selected)}
            />
            <SelectList
              name="double-site"
              header="Double Site"
              options={doubleSiteOptions}
              selectedOption={selectedDoubleSite}
              onChange={(selected) => setSelectedDoubleSite(selected)}
            />
            <SelectList
              name="pull-through"
              header="Pull-through"
              options={pullThroughOptions}
              selectedOption={selectedPullThrough}
              onChange={(selected) => setSelectedPullThrough(selected)}
            />
            <SelectList
              name="site-shade"
              header="Site Shade"
              options={siteShadeOptions}
              selectedOption={selectedSiteShade}
              onChange={(selected) => setSelectedSiteShade(selected)}
            />
            <SelectList
              name="barrier-free"
              header="Barrier Free"
              options={barrierFreeOptions}
              selectedOption={selectedBarrierFree}
              onChange={(selected) => setSelectedBarrierFree(selected)}
            />
          </div>
        </div>
        <div className="relative bottom-2 w-full h-12 px-[10%] bg-transparent">
          <div className="flex flex-col justify-center items-center w-full h-full bg-primary rounded-3xl">
            <BaseButton onClick={onSave}>
              <p className="text-text-secondary text-xl font-bold">
                Apply Filters
              </p>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};
