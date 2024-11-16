import { ResourceEntry } from "@packages/types";
import { Loadable, onLoadable } from "src/hooks/api/query";
import { VerticalSpacer } from "../spacer/vertical-spacer";
import Image from "next/image";
import { HorizontalSpacer } from "../spacer/horizontal-spacer";
import { getWithoutHtmlTags } from "./utils";

interface ResourceDetailsProps {
  resourceDetailsLoadable: Loadable<ResourceEntry>;
}

export default function ResourceDetails(props: ResourceDetailsProps) {
  const { resourceDetailsLoadable } = props;

  console.log(resourceDetailsLoadable);
  const imageUrl =
    "https://reservations.ontarioparks.ca/images/5b196a6e-a325-400a-b229-9bd9562c4378.png";

  return onLoadable(resourceDetailsLoadable)(
    () => null,
    () => null,
    (resourceDetails) => {
      const formattedDescription = getWithoutHtmlTags(
        resourceDetails.description
      );

      return (
        <div className="flex h-full w-full">
          <div className="flex flex-row justify-between h-full w-full">
            <div className="flex flex-col h-full w-1/2 p-8 space-y-8">
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex flex-col w-full items-center justify-center space-y-2">
                  <Image
                    src={imageUrl}
                    alt="Failed to load"
                    width={335}
                    height={187.5}
                    className="rounded-xl"
                  />
                  <p className="text-text-primary text-xl font-semibold">
                    {resourceDetails.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-text-primary text-base font-normal">
                    {formattedDescription}
                  </p>
                </div>
              </div>
              <HorizontalSpacer />
              <div className="flex flex-col w-full">
                <p className="text-text-primary text-xl font-semibold">
                  Locations
                </p>
                <LocationCard />
              </div>
            </div>
            <VerticalSpacer />
            {/* This is where the map will go */}
            <div className="flex h-full bg-blue-500 w-1/3"></div>
          </div>
        </div>
      );
    }
  );
}


const LocationCard = () => {

  return (
    <div className="h-28 w-full px-4 bg-black">

    </div>
  )

}
