import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M682.666667 341.333333v341.333334H341.333333V341.333333h341.333334z m28.458666-85.333333H312.874667C281.6 256 256 281.6 256 312.874667v398.250666C256 742.4 281.6 768 312.874667 768h398.250666C742.4 768 768 742.4 768 711.125333V312.874667C768 281.6 742.4 256 711.125333 256z"/>
    </SvgIcon>
  )
}