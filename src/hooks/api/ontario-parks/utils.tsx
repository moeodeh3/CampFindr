import {
  AvailabilityResponse,
  ResourceEntry,
  ResourceInput,
} from "@packages/types";
import { handleJSONResponse } from "../utils";
import { AvailabilityInput } from "./types";

export async function getOntarioParksAvailability(
  props: AvailabilityInput
): Promise<AvailabilityResponse[] | null> {
  const {
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
    const url = `/api/ontario-parks/availability/getAvailability?bookingCategoryId=${bookingCategoryId}&equipmentCategoryId=${equipmentCategoryId}&subEquipmentCategoryId=${subEquipmentCategoryId}&cartUid=${cartUid}&cartTransactionUid=${cartTransactionUid}&bookingUid=${bookingUid}&startDate=${startDate}&endDate=${endDate}&partySize=${partySize}`;

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

export async function getOntarioParksResourceDetails(
  props: ResourceInput
): Promise<ResourceEntry | null> {
  const { resourceLocationId } = props;

  try {
    const url = `/api/ontario-parks/resource-details/getResourceDetails?resourceLocationId=${resourceLocationId}`;
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
