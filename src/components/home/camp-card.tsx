import { FontAwesomeIcon } from "../font-awesome-icon";
import { faGlobe, faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { colors } from "../../design/constant";
import { BaseButton } from "../button/base-button";

interface CampCardProps {
  mapId: number;
  image: string;
  title: string;
  park: string;
  cost: string;
  rating: string;
  onPress: (mapId: number) => void;
}

export function CampCard(props: CampCardProps) {
  const { mapId, image, title, park, cost, rating, onPress } = props;

  return (
    <BaseButton onClick={() => onPress(mapId)}>
      <div className="flex flex-col w-60 space-y-2">
        <div className="relative w-60 h-60">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-0">
          <div className="flex flex-row justify-between items-center">
            <p className="text-text-primary text-sm font-bold">{title}</p>
            <div className="flex flex-row space-x-1 items-center">
              <FontAwesomeIcon icon={faStar} size="xs" color={colors.rating} />
              <p className="text-rating text-sm font-bold">{rating}</p>
            </div>
          </div>
          <p className="text-text-primary text-sm font-normal">{park}</p>
          <p className="text-text-primary text-sm font-bold">{cost} $</p>
        </div>
      </div>
    </BaseButton>
  );
}
