import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "components~device-confirm-dialog", webpackPrefetch: true */'./views')
})
