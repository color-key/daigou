export const getMeta = (metaName: string) => {
  const meta = document.querySelector("meta[name='"+metaName+"']");
  if(meta){
    return meta.getAttribute('content');
  }
  return null;
};

export const setMeta = (metaName: string, content: string) => {
  const meta = document.createElement('meta');
  meta.name = metaName;
  meta.content = content;
  document.head.append(meta);
};