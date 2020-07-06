import {useLocation} from "react-router-dom";

export const getPathnameArray = () => {
  const location = useLocation();
  let pathname = location.pathname;
  if(window.scope){
    const scope = getScope();
    if(!pathname.startsWith('/')) pathname = '/' + pathname;
    if(pathname.startsWith(scope)) pathname = pathname.substring(scope.length);
  }
  if(pathname.startsWith('/')){
    pathname = pathname.substring(1);
  }
  return pathname.split('/');
}

export const getScope = () => {
  let scope = '';
  if(window.scope){
    scope = window.scope;
    if(!scope.startsWith('/')) scope = '/' + scope;
    if(scope.endsWith('/')) scope = scope.substr(0, scope.length - 1);
  }
  return scope;
}

export const getAssetsPublicPath = () => {
  return getScope() + '/assets';
}

/**
* 获取传递的参数
* @param {string}name -参数名
* @returns {*} -返回参数值或者null
*/
export const getQueryString = (name: string) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) {return decodeURI(r[2]);} return null;
}