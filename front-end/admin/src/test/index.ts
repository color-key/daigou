import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "coming-soon", webpackPrefetch: true */'./views'),
})
