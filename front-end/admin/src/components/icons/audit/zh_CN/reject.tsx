import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path
        d="M896.810667 509.44c0 213.9392-173.431467 387.3792-387.370667 387.3792-213.930667 0-387.362133-173.44-387.362133-387.3792 0-213.930667 173.431467-387.370667 387.362133-387.370667 213.930667 0 387.370667 173.44 387.370667 387.370667z m-9.6 0c0-208.631467-169.1392-377.770667-377.770667-377.770667-208.622933 0-377.770667 169.147733-377.770667 377.770667 0 208.64 169.1392 377.770667 377.770667 377.770667 208.64 0 377.770667-169.130667 377.770667-377.770667z"
        fill="#D70D26"/>
      <path
        d="M932.667733 509.44c0 233.745067-189.482667 423.227733-423.227733 423.227733-233.736533 0-423.2192-189.482667-423.2192-423.227733 0-233.728 189.482667-423.2192 423.2192-423.2192s423.227733 189.482667 423.227733 423.2192z m-4.804266 0c0-231.082667-187.3408-418.414933-418.423467-418.414933S91.025067 278.357333 91.025067 509.44c0 231.0912 187.332267 418.423467 418.414933 418.423467 231.082667 0 418.423467-187.332267 418.423467-418.423467z"
        fill="#D70D26"/>
      <path
        d="M223.829333 474.496l-0.418133 8.328533-24.2432 16.580267-0.170667 3.524267 23.3472 1.169066-0.324266 6.434134-49.7152-2.4832 0.324266-6.4512 20.701867 1.032533 0.170667-3.498667-19.831467-18.449066 0.4096-8.021334 22.1184 21.504z"
        fill="#D70D26"/>
      <path
        d="M207.300267 444.0576c-6.1184-1.365333-11.707733-1.3056-13.294934 8.891733-1.732267 10.837333 2.850133 14.370133 10.9056 16.426667l2.389334-25.3184z m5.6576-5.981867l-3.328 32.3328c8.704 1.834667 13.2608-0.853333 15.061333-12.305066 0.802133-5.154133 0.657067-11.409067-0.256-15.3344l5.819733 1.3056c0.759467 2.952533 0.930133 9.668267-0.136533 16.392533-2.184533 13.892267-8.226133 20.7872-24.081067 17.297067-15.854933-3.498667-19.387733-12.5184-17.28-25.9584 2.525867-16.068267 11.895467-16.896 19.626667-15.189334 1.109333 0.238933 2.781867 0.7936 4.573867 1.450667zM240.913067 436.48c2.090667-6.4 0.221867-9.8816-5.102934-13.6704l-41.5232 2.6624 2.082134-6.314667 34.184533-1.237333 0.136533-0.4096-27.016533-20.6336 1.928533-5.930667 31.223467 24.874667c8.055467 6.493867 12.680533 11.485867 9.130667 22.314667l-5.034667-1.664zM243.3536 399.274667l-4.821333-2.261334c1.885867-2.133333 4.6336-6.314667 6.1184-9.506133 2.500267-5.316267 2.5088-8.721067-1.578667-10.632533-4.1472-1.954133-5.563733-1.186133-10.24 4.778666-5.393067 6.920533-8.823467 7.8336-14.737067 5.077334-5.649067-2.670933-7.4752-8.738133-3.566933-17.0496 1.578667-3.387733 3.857067-6.912 5.290667-8.2944l4.565333 2.602666a27.136 27.136 0 0 0-5.290667 7.748267c-2.304 4.923733-2.372267 7.918933 1.604267 9.7792 3.584 1.681067 4.923733 0.802133 8.721067-4.0704 5.589333-7.202133 9.1648-9.105067 15.9232-5.930667 6.954667 3.2512 7.9104 9.4976 3.8912 18.065067-1.578667 3.3792-4.386133 8.004267-5.888 9.685333M263.6288 351.291733l4.5056 2.679467a27.665067 27.665067 0 0 1-1.92 3.933867c-4.352 7.338667-7.7056 8.942933-16.469333 3.754666l-18.688-11.0848-2.926934 4.932267-4.437333-2.6112 2.9184-4.9408-7.893333-4.6848 3.1488-5.307733 7.893333 4.693333 4.8896-8.2688 4.445867 2.619733-4.906667 8.277334 18.397867 10.888533c5.179733 3.072 6.852267 3.054933 9.258666-1.024 0.887467-1.476267 1.339733-2.5344 1.792-3.857067M273.237333 315.665067c-9.284267-7.227733-14.0032-7.1168-19.2768 0.008533-5.393067 7.313067-4.096 11.835733 5.205334 19.072 9.275733 7.236267 13.9776 6.9888 19.2-0.068267 5.444267-7.3728 4.164267-11.776-5.12-19.012266m-18.2016 24.618666c-12.6464-9.838933-12.398933-18.312533-5.316267-27.895466 7.1424-9.6512 14.933333-12.032 27.562667-2.210134 12.654933 9.847467 12.509867 18.167467 5.376 27.835734-7.099733 9.6-14.984533 12.100267-27.6224 2.269866M283.588267 273.425067l3.8656 4.053333-0.597334 0.605867c-3.447467 3.5584-5.6576 8.226133-2.193066 14.549333l18.176 17.604267-4.292267 4.4288-27.810133-26.922667 4.292266-4.437333 5.034667 4.8896c-2.926933-6.2464-0.221867-10.9056 3.029333-14.250667l0.494934-0.520533zM320.512 264.362667c-3.882667-4.864-8.081067-8.448-14.702933-2.816-6.997333 6.007467-5.461333 11.281067-0.503467 17.860266l15.197867-15.044266z m7.406933-0.238934l-19.626666 19.029334c5.563733 6.843733 10.410667 8.0384 17.8176 1.706666 3.336533-2.8416 6.528-7.057067 7.918933-10.2144l3.6864 4.608c-1.006933 2.440533-4.437333 6.9632-8.789333 10.666667-8.994133 7.7056-17.1776 8.277333-27.204267-4.3008-10.0352-12.586667-7.918933-20.770133 0.785067-28.2112 10.410667-8.8832 17.8688-3.336533 22.741333 2.798933 0.725333 0.861867 1.681067 2.321067 2.670933 3.925334zM343.748267 270.011733c-2.167467-3.217067-1.4592-4.386133 1.339733-6.254933 2.747733-1.834667 4.155733-2.065067 6.306133 1.143467 2.218667 3.3536 1.450667 4.548267-1.28 6.3744-2.798933 1.877333-4.1472 2.082133-6.365866-1.262934M349.934933 247.569067c-7.424-13.5168-3.925333-20.736 6.058667-26.222934a33.5872 33.5872 0 0 1 9.557333-3.6096l2.730667 4.983467c-3.037867 0.426667-6.178133 1.408-9.642667 3.3024-7.4752 4.104533-8.379733 8.448-2.884266 18.432 5.4016 9.8816 9.514667 11.392 17.058133 7.253333 3.191467-1.7664 6.1696-3.950933 8.064-6.314666l2.722133 4.9664c-1.5104 1.7408-5.085867 4.437333-8.302933 6.212266-9.984 5.461333-17.954133 4.5056-25.361067-9.002666M412.322133 220.305067c-4.736-10.862933-9.198933-13.184-17.911466-9.898667-8.942933 3.3792-10.1632 7.825067-5.444267 18.696533 4.727467 10.845867 9.233067 13.073067 17.877333 9.813334 9.002667-3.387733 10.205867-7.765333 5.4784-18.6112m-30.1568 11.349333c-6.4256-14.754133-1.664-21.76 10.0864-26.197333 11.8272-4.4544 20.352-2.474667 26.794667 12.305066 6.434133 14.762667 1.800533 21.717333-10.001067 26.171734-11.758933 4.420267-20.4288 2.500267-26.88-12.279467M478.429867 196.104533l4.9152 26.308267-6.058667 1.1264-4.497067-24.1152c-1.092267-5.845333-3.3536-8.917333-9.0624-7.867733-4.437333 0.853333-7.995733 2.816-8.618666 8.5504l0.0512 0.264533 4.932266 26.368-6.0672 1.143467-4.497066-24.1152c-1.092267-5.845333-3.131733-8.96-8.704-7.918934-4.718933 0.878933-7.978667 2.577067-8.797867 8.7808l4.949333 26.427734-6.058666 1.134933-7.108267-38.058667 6.058667-1.134933 0.938666 5.000533c1.476267-4.949333 5.3504-6.912 9.915734-7.748266 5.998933-1.134933 9.898667 0.622933 12.228266 4.138666 1.3312-5.367467 6.033067-7.552 10.683734-8.430933 8.874667-1.655467 13.431467 2.816 14.7968 10.154667"
        fill="#D70D26"/>
      <path
        d="M387.6096 771.0464a38.212267 38.212267 0 0 1-53.896533 0L247.842133 685.175467a38.229333 38.229333 0 0 1 0-53.905067l383.428267-383.428267a38.229333 38.229333 0 0 1 53.896533 0l85.870934 85.870934a38.212267 38.212267 0 0 1 0 53.896533L387.6096 771.0464z m378.922667-432.827733L680.661333 252.347733a31.854933 31.854933 0 0 0-44.885333 0L252.356267 635.776a31.8464 31.8464 0 0 0 0 44.885333L338.2272 766.549333a31.829333 31.829333 0 0 0 44.885333 0l383.419734-383.4368a31.829333 31.829333 0 0 0 0-44.885333z"
        fill="#D70D26"/>
      <path
        d="M401.237333 401.237333c-27.400533 27.392-42.0864 62.600533-44.356266 98.4576l8.465066-8.4736a144.631467 144.631467 0 0 1 41.301334-84.573866 144.6144 144.6144 0 0 1 84.565333-41.2928l8.482133-8.4736c-35.848533 2.269867-71.057067 16.9472-98.4576 44.347733M612.241067 612.241067a144.631467 144.631467 0 0 1-84.573867 41.301333l-8.4736 8.456533c35.848533-2.2784 71.057067-16.9472 98.4576-44.347733 27.392-27.400533 42.069333-62.609067 44.347733-98.466133l-8.465066 8.482133a144.597333 144.597333 0 0 1-41.301334 84.565333"
        fill="#D70D26"/>
      <path
        d="M300.398933 556.1856c-15.402667-69.154133 3.754667-144.4352 57.540267-198.237867 53.8112-53.8112 129.092267-72.942933 198.2464-57.557333l12.6464-12.637867c-76.561067-20.437333-161.629867-0.682667-221.696 59.383467-60.066133 60.074667-79.8208 145.117867-59.392 221.687467l12.654933-12.629334zM718.498133 462.702933c15.377067 69.1456-3.754667 144.426667-57.565866 198.229334-53.794133 53.8112-129.083733 72.942933-198.229334 57.565866l-12.6464 12.6464c76.5696 20.4288 161.629867 0.6656 221.696-59.392 60.074667-60.066133 79.8208-145.1264 59.392-221.696l-12.6464 12.6464zM422.485333 621.5168l-8.465066-8.465067-15.872 15.872 8.465066 8.448 15.872-15.854933z m-38.7328-6.997333l7.645867 7.645866 15.863467-15.872-7.645867-7.637333-15.863467 15.863467z m15.0528 30.660266l-8.456533-8.448-16.034133 16.0256 8.465066 8.456534 16.0256-16.042667z m-38.8864-6.826666l7.645867 7.645866 16.0256-16.0256-7.637333-7.645866-16.042667 16.0256z m16.759467-30.916267l23.509333-23.509333 37.0176 37.0176-23.5008 23.509333 13.1584 13.175467-7.799466 7.808-13.175467-13.175467-23.8336 23.8336-37.0176-37.009067 23.8336-23.8336-6.3488-6.3488 8.1408-7.483733 6.016 6.016z m13.2608-45.312l14.728533 14.728533-8.5504 8.541867-7.313066-7.330133-49.621334 49.629866 7.313067 7.3216-8.618667 8.6272-14.72-14.728533 29.525334-29.533867c-2.926933-1.621333-5.853867-3.072-8.1408-4.224l7.005866-9.4464 9.838934 4.974934 28.552533-28.561067zM501.589333 515.566933c2.3552 10.001067 3.652267 19.114667 3.652267 28.885334 8.533333-1.058133 21.879467-2.696533 27.332267-3.106134l2.602666 11.7248c-7.150933 0.170667-21.802667 1.6384-30.429866 2.9184-1.0496 10.8288-3.7376 22.2976-7.970134 35.643734l-12.032-2.116267c9.838933-27.255467 12.526933-46.378667 7.082667-72.1664l9.7536-1.783467z m-26.939733-32.443733l7.6544 7.6288-23.671467 23.671467c1.783467 7.483733 3.413333 15.9488 3.413334 20.343466l11.0592-12.373333a156.672 156.672 0 0 0-3.242667-16.1024l10.478933-2.679467c6.843733 24.874667 6.442667 48.571733-0.725333 74.103467l-10.9056-2.449067c4.232533-14.7968 5.853867-26.3424 5.614933-38.306133-4.881067 5.691733-10.811733 12.288-13.422933 15.701333l-9.2672-5.205333c1.0496-2.193067 1.4592-3.584 1.211733-5.7856-0.2304-2.833067-1.4592-10.743467-3.242666-18.210133l-11.4688 11.4688-7.645867-7.645867 17.570133-17.570133a222.9248 222.9248 0 0 0-11.2384-6.033067l6.997334-9.2672c3.1744 1.3824 8.302933 4.232533 12.868266 6.673067l17.962667-17.962667z m-11.716267 82.4832a83.421867 83.421867 0 0 0-12.928-1.877333l35.712 35.712-7.722666 7.7312-34.577067-34.56c3.413333 8.448 6.101333 16.981333 7.722667 24.302933l-11.793067-1.536c-2.440533-10.581333-7.150933-26.197333-12.842667-38.4l-8.5504 8.533333-7.901866-7.8848 9.198933-9.198933-14.481067-14.481067 8.055467-7.3984 14.1568 14.139734 7.560533-7.552 7.893334 7.893333-7.569067 7.560533 9.198933 9.1904v-4.394666c5.12 0.256 13.013333 0.8192 19.2 1.6384l-0.3328 10.581333zM539.1872 457.770667l14.08 14.088533 21.888-21.896533-14.08-14.071467-21.888 21.879467z m67.933867-0.725334l7.722666 7.739734-42.376533 42.376533-67.114667-67.1232 41.489067-41.472 7.808 7.799467-33.450667 33.442133 10.3424 10.325333 29.7728-29.764266 29.3632 29.354666-29.7728 29.7728 11.886934 11.886934 34.3296-34.338134z m-101.6832 3.584l8.2176-8.2176 7.722666 7.722667-8.226133 8.2176 11.886933 11.8784c1.954133-3.729067 3.498667-6.912 4.795734-10.0096l9.198933 7.5776c-1.3056 3.0976-3.182933 6.912-5.376 11.0592l21.8112 21.802667c6.997333 6.9888 5.845333 9.608533-0.4096 17.646933l-3.584 4.5568-10.0096-5.128533 3.754667-4.7104c2.670933-3.345067 3.157333-4.317867 0.145066-7.3216l-16.827733-16.827734a344.849067 344.849067 0 0 1-6.997333 12.842667l-10.0096-6.442667c2.2784-3.7376 5.205333-9.105067 8.379733-15.044266l-14.318933-14.301867-9.028267 9.019733-7.722667-7.722666 9.019734-9.028267-13.994667-13.994667 7.893333-7.253333 13.678934 13.678933zM642.542933 354.602667l-8.704 8.695466 13.090134 13.090134 8.704-8.695467-13.090134-13.090133zM640.170667 383.146667l-13.090134-13.090134-8.362666 8.379734 13.090133 13.090133 8.362667-8.379733z m-32.853334-25.540267c1.4592 4.881067 2.525867 9.6768 3.498667 14.728533l13.184-13.175466-2.286933-15.957334-14.395734 14.404267z m75.1616 13.175467c1.143467 1.3056 2.193067 2.688 3.259734 4.394666 5.845333 9.275733 6.434133 13.5936-2.030934 22.869334a261.333333 261.333333 0 0 1-18.884266 18.858666c-8.277333 7.492267-13.824 7.808-22.4512-0.802133l-32.213334-32.221867-7.9616 0.981334c-1.058133-14.737067-5.137067-29.2096-10.496-41.898667l9.019734-5.137067c1.2288 3.191467 2.372267 6.442667 3.5072 9.7024l19.362133-19.370666 6.417067 6.434133 2.449066 16.093867 9.847467-9.8304 27.0848 27.093333-30.592 30.583467 9.275733 9.2672c4.317867 4.317867 7.005867 3.7376 11.554134-0.341334 5.777067-5.12 11.221333-10.564267 16.341333-16.341333 4.804267-5.282133 4.1472-6.084267 0.4864-11.0592a61.329067 61.329067 0 0 0-3.899733-4.864l9.924266-4.411733z m-96.64 42.8032l-9.685333-5.7856c1.143467-2.594133 0.8192-3.0976 0.648533-5.051734-0.648533-5.034667-6.826667-23.424-10.7264-32.708266l9.6-3.8912c4.224 11.554133 8.695467 25.147733 9.608534 31.402666l7.1424-8.1408c-1.621333-5.367467-3.328-10.325333-4.6336-14.711466l9.105066-2.449067c4.3008 12.928 10.0864 32.546133 11.648 41.4208l9.838934-13.585067 7.637333 7.466667c-5.1968 6.997333-11.374933 15.291733-13.986133 19.694933-1.2288 1.860267-2.2784 3.413333-3.259734 5.521067l-10.248533-6.007467c1.467733-2.6112 2.193067-4.317867 1.621333-7.492266-0.725333-5.128533-2.517333-11.3152-4.309333-18.158934-2.679467 3.191467-5.768533 6.6048-7.082667 8.388267a27.690667 27.690667 0 0 0-2.9184 4.096z m53.051734 4.693333l3.822933 3.515733c-3.182933 4.471467-17.834667 26.9312-20.829867 31.547734l-8.874666-6.417067c3.242667-4.548267 18.7136-28.296533 21.469866-32.853333l4.411734 4.215466z"
        fill="#D70D26"/>
    </SvgIcon>
  )
}