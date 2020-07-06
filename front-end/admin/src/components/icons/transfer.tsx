import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M128 810.666667h768v85.333333H128zM301.994667 405.461333L242.005333 330.538667l240-192c17.536-14.08 42.453333-14.08 59.989334 0l240 192-59.989334 74.922666L512 237.482667 301.994667 405.461333z"  />
      <path d="M512 213.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v469.333333h-85.333334V256a42.666667 42.666667 0 0 1 42.666667-42.666667z"  />
    </SvgIcon>
  )
}