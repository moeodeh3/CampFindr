import { FontAwesomeIcon } from "../font-awesome-icon";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <div className="flex flex-row w-full p-4 justify-between border-b-2 border-primary">
      <div className="">
        <p className="text-text-primary text-lg font-bold">CampFindr</p>
      </div>
      <div className="flex flex-row space-x-4 items-center">
        <div className="flex flex-row items-center space-x-1">
          <FontAwesomeIcon icon={faGlobe} />
          <p className="text-text-primary text-base font-normal">English</p>
        </div>
        <p className="text-text-primary text-base font-normal">Github</p>
        <p className="text-text-primary text-base font-normal">About</p>
      </div>
    </div>
  );
}
