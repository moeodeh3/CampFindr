import { DateTime } from 'luxon';
import { AvailabilityInput } from 'src/hooks/api/ontario-parks/types';

export const getReserveUrl = (
  mapId: number,
  resourceLocationId: number,
  availabilityInput: AvailabilityInput
) => {
  const url = new URL(
    'https://reservations.ontarioparks.ca/create-booking/results'
  );

  url.searchParams.append('mapId', mapId.toString());
  url.searchParams.append('searchTabGroupId', '0');
  url.searchParams.append(
    'bookingCategoryId',
    availabilityInput.bookingCategoryId.toString()
  );
  url.searchParams.append('startDate', availabilityInput.startDate);
  url.searchParams.append('endDate', availabilityInput.endDate);

  // Calculate nights using helper function
  const nights = calculateNights(
    availabilityInput.startDate,
    availabilityInput.endDate
  );
  url.searchParams.append('nights', nights.toString());

  url.searchParams.append('isReserving', 'true');
  url.searchParams.append(
    'equipmentId',
    availabilityInput.equipmentCategoryId.toString()
  );
  url.searchParams.append(
    'subEquipmentId',
    availabilityInput.subEquipmentCategoryId.toString()
  );
  url.searchParams.append('partySize', availabilityInput.partySize.toString());
  url.searchParams.append('searchTime', new Date().toISOString());

  // Add hardcoded or predefined values
  url.searchParams.append(
    'flexibleSearch',
    JSON.stringify([false, false, null, 1])
  );
  url.searchParams.append(
    'filterData',
    JSON.stringify({
      '-32736': '[[1],0,0,0]',
      '-32726': '[[1],0,0,0]',
    })
  );
  url.searchParams.append('resourceLocationId', resourceLocationId.toString());
  return url.toString();
};

export const calculateNights = (startDate: string, endDate: string): number => {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const nights = end.diff(start, 'days').days;

  return Math.max(Math.floor(nights), 0);
};

export const formatHtmlToSections = (
  html: string
): { heading: string; content: string }[] => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs = doc.body.querySelectorAll('p');
  const sections: { heading: string; content: string }[] = [];

  paragraphs.forEach((paragraph) => {
    const boldElement = paragraph.querySelector('b');
    if (boldElement) {
      const heading = boldElement.textContent?.trim() || '';
      const content = paragraph.textContent?.replace(heading, '').trim() || '';
      sections.push({ heading, content });
    } else {
      const content = paragraph.textContent?.trim() || '';
      sections.push({ heading: '', content });
    }
  });

  if (sections.length === 0 && doc.body.textContent) {
    sections.push({ heading: '', content: doc.body.textContent.trim() });
  }

  return sections;
};
