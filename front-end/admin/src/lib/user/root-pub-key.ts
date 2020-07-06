export const TestRootPublickeyArray = ['026BBF85915B9660F90B282451C4BB78B5B22AE6E0212E6C2277A12745FD77EFAB', '0363980D28C135AACB25742B7B8C6B685ECA58040652FC07D9235E9BF3C623B366', '03D9BB6EB41C71928F7BBBE12BEB61FBC9FC233A7902E95CE08866674D7A65DCAE'];
export const MainRootPublickeyArray = ['022BB8DD8B0E010148EE2D180A4C5FABDEDF69D43846334BF0BF6A7345C7606DE0', '025E5C76643DB1942ECAE631707B7642A6A388A264D631B725855147EA98A400DE', '021FF3E794858731FDFF96A5238CF04592967CBE558592720949F281012A012D76'];

export const saveRootPubKey = (rootPubKey: string) => {
  window.sessionStorage.setItem('rootPubKey', rootPubKey);
  TestRootPublickeyArray.includes(rootPubKey) && window.sessionStorage.setItem('malygos', window.baseUrl.malygosTest);
  MainRootPublickeyArray.includes(rootPubKey) && window.sessionStorage.setItem('malygos', window.baseUrl.malygosMain);
  return TestRootPublickeyArray.concat(MainRootPublickeyArray).includes(rootPubKey);
};