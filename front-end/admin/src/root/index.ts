import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "root", webpackPrefetch: true */'./views'),
})
