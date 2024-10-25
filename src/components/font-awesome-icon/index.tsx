import { FontAwesomeIcon as RNFontAwesomeIcon, Props } from '@fortawesome/react-fontawesome';

export const FontAwesomeIcon = (props: Props) => {
  return <RNFontAwesomeIcon className="outline-none" {...props} />;
};
