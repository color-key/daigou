import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "components~add-member-dialog~remote", webpackPrefetch: true */'./views')
})
