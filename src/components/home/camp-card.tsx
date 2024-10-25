import { FontAwesomeIcon } from "../font-awesome-icon";
import { faGlobe, faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CampCardProps {
  image: string;
  title: string;
  park: string;
  cost: number;
  rating: number;
}

export function CampCard(props: CampCardProps) {
  const { image, title, park, cost, rating } = props;
  return (
    <div className="flex flex-col w-60 space-y-2">
      <Image
        src={image}
        width={240}
        height={240}
        alt={""}
        className="rounded-lg"
      />

      <div className="space-y-0">
        <div className="flex flex-row justify-between items-center">
          <p className="text-text-primary text-sm font-bold">{title}</p>
          <div className="flex flex-row space-x-1 items-center">
            <FontAwesomeIcon icon={faStar} size="xs" />
            <p className="text-text-primary text-sm font-bold">{rating}</p>
          </div>
        </div>
        <p className="text-text-primary text-sm font-normal">{park}</p>
        <p className="text-text-primary text-sm font-bold">{cost} $</p>
      </div>
    </div>
  );
}
