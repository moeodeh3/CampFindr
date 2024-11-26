import { FontAwesomeIcon } from '../font-awesome-icon';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { colors } from '../../design/constant';
import { BaseButton } from '../button/base-button';

interface CampCardProps {
  mapId: number;
  image: string;
  title: string;
  rating: string;
  onPress: (mapId: number) => void;
}

export function CampCard(props: CampCardProps) {
  const { mapId, image, title, rating, onPress } = props;

  return (
    <BaseButton onClick={() => onPress(mapId)}>
      <div className="flex flex-col items-start space-y-2 w-[300px]">
        <div className="relative w-[300px] h-[168px] overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-0 flex flex-col w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="text-text-primary text-sm font-bold">{title}</p>
            <div className="flex flex-row space-x-1 items-center">
              <p className="text-rating text-sm font-bold">{rating}</p>
              <FontAwesomeIcon icon={faStar} size="xs" color={colors.rating} />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-text-primary text-sm font-normal">
              Ontario Provincial Park
            </p>
          </div>
        </div>
      </div>
    </BaseButton>
  );
}
