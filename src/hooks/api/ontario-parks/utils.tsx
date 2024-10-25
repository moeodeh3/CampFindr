import { handleJSONResponse } from "../utils";
import {
  AvailabilityInput,
  AvailabilityResponse,
  MapLegendInput,
  MapLegendResponse,
} from "./types";

export async function getOntarioParksMapLegend(
  props: MapLegendInput
): Promise<MapLegendResponse | null> {
  const { mapId } = props;
  try {
    const url = `/api/ontario-parks/getMapLegend?mapId=${mapId}`;
    const resp = await fetch(url);

    return handleJSONResponse(resp);
  } catch (error) {
    console.error("Error fetching map legend data", error);
    return null;
  }
}

export async function getOntarioParksAvailability(
  props: AvailabilityInput
): Promise<AvailabilityResponse | null> {
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
  } = props;

  try {
    const url = `/api/ontario-parks/getAvailability?mapId=${mapId}&bookingCategoryId=${bookingCategoryId}&equipmentCategoryId=${equipmentCategoryId}&subEquipmentCategoryId=${subEquipmentCategoryId}&cartUid=${cartUid}&cartTransactionUid=${cartTransactionUid}&bookingUid=${bookingUid}&startDate=${startDate}&endDate=${endDate}&partySize=${partySize}`;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleJSONResponse(resp);
  } catch (error) {
    console.error("Error fetching availability data", error);
    return null;
  }
}
