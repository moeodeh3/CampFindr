import { FontAwesomeIcon } from "../font-awesome-icon";
import { faGlobe, faStar } from "@fortawesome/free-solid-svg-icons";

interface CampCardProps {
    image: string;
    title: string;
    park: string;
    cost: number;
    rating: number;
}

export function CampCard(props: CampCardProps) {
  return (
    <div className="flex flex-col w-60">
      <div className="flex flex-row justify-between items-center">
        <p className="text-text-primary text-sm font-bold">Title</p>
        <div className="flex flex-row space-x-1 items-center">
          <FontAwesomeIcon icon={faStar} size="xs" />
          <p className="text-text-primary text-sm font-bold">5.0</p>
        </div>
      </div>
        <p className="text-text-primary text-sm font-normal">Park</p>
        <p className="text-text-primary text-sm font-bold">Cost</p>
    </div>
  );
}
