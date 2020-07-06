import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "common", webpackPrefetch: true */'./views')
})
