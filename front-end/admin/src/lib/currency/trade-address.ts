export const CoinTypeAddressMapping: any = {
  'BTC': 'https://tbtc.bitaps.com/',
  'ETH': 'https://ropsten.etherscan.io/tx/',
  'USDT(OMNI)': 'https://omniexplorer.info/search/',
  'LTC': 'https://blockexplorer.one/litecoin/testnet/tx/',
  'BCH': 'https://explorer.bitcoin.com/tbch/tx/',
  'USDT(ERC20)': 'http://ropsten.etherscan.io/tx/',
  'BNB': 'https://testnet-explorer.binance.org/tx/',
  // 'USD': '',
  // 'NOSUPPORT': '',
};

export const CoinTypeMainAddressMapping: any = {
  'BTC': 'https://live.blockcypher.com/btc/tx/',
  'ETH': 'https://etherscan.io/tx/',
  'USDT(OMNI)': 'https://omniexplorer.info/tx/',
  'LTC': 'https://live.blockcypher.com/ltc/tx/',
  'BCH': 'https://explorer.bitcoin.com/bch/tx/',
  'USDT(ERC20)': 'https://etherscan.io/tx/',
  'BNB': 'https://explorer.binance.org/tx/',
  // 'USD': '',
  // 'NOSUPPORT': '',
};

export const getTradeAddress = (currency: string) => {
  if(baseUrl.malygos().includes(baseUrl.malygosMain)){
    return CoinTypeMainAddressMapping[currency];
  }else if(baseUrl.malygos().includes(baseUrl.malygosTest)){
    return CoinTypeAddressMapping[currency];
  }
};