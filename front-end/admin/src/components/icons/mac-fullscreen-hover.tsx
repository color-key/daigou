import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M512 512m-490.666667 0a490.666667 490.666667 0 1 0 981.333334 0 490.666667 490.666667 0 1 0-981.333334 0Z"
            fill="#29CD42"/>
      <path d="M341.333333 256h426.666667v426.666667L341.333333 256z m341.333334 512H256V341.333333l426.666667 426.666667z"
            fill="#000000" opacity=".7"/>
    </SvgIcon>
  )
}