import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "layout", webpackPrefetch: true */'./views')
})
