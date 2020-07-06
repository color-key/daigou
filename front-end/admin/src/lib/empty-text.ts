export const getEmptyText = (text: string) => {
  return text ? (text.length > 0 ? text : '--') : '--';
};