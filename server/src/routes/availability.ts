import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { FetchAvailabilityInput } from '../service/availability/types.js';
import { getQueryParamAsString } from '../service/availability/utils.js';
import {
  FetchAllParksAvailability,
  FetchAvailability,
} from '../service/availability/availability.js';
import { getMapLegendDetails } from '../service/mapLegend/mapLegend.js';
import { ALLPARKS_MAP_ID } from '../service/mapLegend/constant.js';

const availabilityRouter = express.Router();

availabilityRouter.get('/', async (req: Request, res: Response) => {
  const {
    mapId,
    bookingCategoryId,
    equipmentCategoryId,
    subEquipmentCategoryId,
    cartUid,
    cartTransactionUid,
    bookingUid,
    startDate,
    endDate,
    partySize,
  } = req.query as { [key: string]: string | string[] | undefined };

  const queryParams: FetchAvailabilityInput = {
    mapId: mapId ? Number(mapId) : -2147483464, // default to all parks map ID if not provided
    bookingCategoryId: getQueryParamAsString(bookingCategoryId, '0'),
    equipmentCategoryId: getQueryParamAsString(equipmentCategoryId, '-32768'), // single tent
    subEquipmentCategoryId: getQueryParamAsString(
      subEquipmentCategoryId,
      '-32768'
    ),
    cartUid: getQueryParamAsString(cartUid, crypto.randomUUID()),
    cartTransactionUid: getQueryParamAsString(
      cartTransactionUid,
      crypto.randomUUID()
    ),
    bookingUid: getQueryParamAsString(bookingUid, crypto.randomUUID()),
    startDate: getQueryParamAsString(
      startDate,
      new Date().toISOString().split('T')[0]
    ),
    endDate: getQueryParamAsString(
      endDate,
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split('T')[0]
    ),
    getDailyAvailability: 'false',
    isReserving: 'true',
    filterData: `[]`,
    boatLength: 'null',
    boatDraft: 'null',
    boatWidth: 'null',
    partySize: getQueryParamAsString(partySize, '2'),
    numEquipment: 'null',
    seed: new Date().toISOString(),
  };

  try {
    if (!mapId || mapId == ALLPARKS_MAP_ID) {
      // initial search for all parks
      const data = await FetchAllParksAvailability(queryParams);
      return res.status(200).json(data);
    } else {
      // we search for a specific map ID
      const data = await FetchAvailability(queryParams);
      const legendDetails = await getMapLegendDetails(Number(mapId));
      return res.status(200).json({ mapId, legendDetails });
    }
  } catch (error) {
    console.error('Error fetching availability data:', error);
    return res.status(500).json({ error: 'Failed to fetch availability data' });
  }
});

export default availabilityRouter;
