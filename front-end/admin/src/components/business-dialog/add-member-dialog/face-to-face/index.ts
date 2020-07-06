import Loadable from '@fay-react/lib/loadable';

export default Loadable({
	view: () => import(/* webpackChunkName: "components~add-member-dialog~face-to-face", webpackPrefetch: true */'./views')
})
