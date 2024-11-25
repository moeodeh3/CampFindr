import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { AvailabilityInput } from '../service/availability/types.js';
import { getQueryParamAsString } from '../service/availability/utils.js';
import {
  FetchAllParksAvailability,
  FetchCampgroundAvailability,
} from '../service/availability/availability.js';
import { ALLPARKS_MAP_ID } from '../service/mapLegend/constant.js';
import { Position } from '../service/resource/types.js';
import { filterAvailabilityByDistance } from '../service/google-maps/filter.js';

export const availabilityRouter = express.Router();

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
    maxDistance,
    userLatitude,
    userLongitude,
  } = req.query as { [key: string]: string | string[] | undefined };

  let userPosition: Position | undefined = undefined;
  let maxDistanceNumber: number | undefined = undefined;
  if (userLatitude && userLongitude && maxDistance) {
    const latitude = parseFloat(userLatitude as string);
    const longitude = parseFloat(userLongitude as string);
    const distance = parseInt(maxDistance as string);

    if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(distance)) {
      userPosition = { latitude, longitude };
      maxDistanceNumber = distance;
    }
  }

  const queryParams: AvailabilityInput = {
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

      // no user position or max distance we return all availabile parks
      if (!userPosition || !maxDistanceNumber) {
        return res.status(200).json(data);
      }

      // we filter parks by their distance to the user
      const filteredData = await filterAvailabilityByDistance(
        userPosition,
        data,
        maxDistanceNumber
      );
      return res.status(200).json(filteredData);
    } else {
      // we search for a specific map ID and return the campsite availability for it
      const data = await FetchCampgroundAvailability(queryParams);
      return res.status(200).json(data);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to fetch availability data, ' + err });
  }
});
