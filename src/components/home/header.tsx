import Image from 'next/image';
import { FontAwesomeIcon } from '../font-awesome-icon';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import LOGO from '../../../public/campfndr_logo.jpg';
import { colors } from 'src/design/constant';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { BaseButton } from '../button/base-button';

const GITHUB_URL = 'https://github.com/moeodeh3/CampFindr';

export function Header() {
  const handleGithubRedirect = () => {
    window.open(GITHUB_URL, '_blank');
  };

  return (
    <div className="flex flex-row w-full p-4 justify-between border-b-2 border-primary">
      <div className="flex items-center space-x-1">
        <div className="relative w-12 h-12">
          <Image
            src={LOGO}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
          />
        </div>
        <p className="text-primary text-2xl font-bold">CampFindr</p>
      </div>
      <div className="flex flex-row space-x-4 items-center">
        <BaseButton onClick={handleGithubRedirect}>
          <div className="flex flex-row items-center space-x-1">
            <FontAwesomeIcon icon={faGithub} color={colors.primary} />
            <p className="text-text-primary text-base font-normal">Github</p>
          </div>
        </BaseButton>
        <div className="flex flex-row items-center space-x-1">
          <FontAwesomeIcon icon={faGlobe} color={colors.primary} />
          <p className="text-text-primary text-base font-normal">English</p>
        </div>
      </div>
    </div>
  );
}
