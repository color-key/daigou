import React from 'react';
import {getAssetsPublicPath} from "@/lib/router";

interface Props {
  size?: number,
  className?: string,
  type:string
}

export default ({size=24, className, type, ...props}: Props) => {
  return (
    <img width={size} height={size} src={`${getAssetsPublicPath()}/images/currency/${type.toUpperCase()}.svg`} className={className} {...props}/>
  )
}