import Loadable from '@fay-react/lib/loadable';

export const RangePicker = Loadable({
  view: () => import(/* webpackChunkName: "ComponentsDatePicker", webpackPrefetch: true */'./date-range-picker'),
});


