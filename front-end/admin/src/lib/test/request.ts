import {get} from '@fay-react/lib/fetch';
import {getAssetsPublicPath} from "@/lib/router";

export const getUser = () => get({path: getAssetsPublicPath() + '/data/user.json'});