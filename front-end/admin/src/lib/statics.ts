const statics = '_STATICS_';

export const getStaticsDom = () => {
  const staticsDoms = window.sessionStorage.getItem(statics);
  return staticsDoms && JSON.parse(staticsDoms);
};

export const addStaticsDom = (item: string) => {
  let doms = getStaticsDom();
  doms = doms ? doms : [];
  doms.push(item);
  window.sessionStorage.setItem(statics, JSON.stringify(doms));
};

export const removeNodeAndCookie = () => {
  const list = getStaticsDom();
  if (list && list.length) {
    list.forEach((item: string) => {
      if (getCookie(item)) {
        delCookie(item);
        const id = document.getElementById(item);
        if (id) {
            document.body.removeChild(id);
        }
      }
    })
  }
};

export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) return match[2];
  return '';
}

export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const expString = +exp.toUTCString();
  const cval = getCookie(name);
  if (cval !== null) document.cookie = `${name}=cval;expires=${expString}`;
}