import React from 'react';
import HeaderLeftIcon from '@assets/images/svg/header-left-icon.svg'
import CameraIcon from '@assets/images/svg/camera.svg'
import PlusCircleIcon from '@assets/images/svg/plus-circle.svg'
import CloseCircleIcon from '@assets/images/svg/close-circle.svg'

const getIconFont = (name: string) => {
  switch (name) {
    case 'header-left':
      return HeaderLeftIcon;
    case 'camera':
      return CameraIcon;
    case 'plus-circle':
      return PlusCircleIcon;
    case 'close-circle':
      return CloseCircleIcon;

    default:
      return HeaderLeftIcon;
  }
};

const Icon = ({name, ...props}) => {
  const FontICon = getIconFont(name);

  return <FontICon {...props} />;
};

export default Icon;