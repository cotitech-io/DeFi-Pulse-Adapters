/*==================================================
  Modules
  ==================================================*/

const sdk = require("../../sdk");

/*==================================================
  Settings
  ==================================================*/

const USDTPlatform = "0xe0437BeB5bb7Cf980e90983f6029033d710bd1da"; // CVI USDT Platform Contract
const ETHPlatform = "0x145e6df857b241efdcb9b78a1b97a032606d47a7"; // CVI ETH Platform Contract

const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const ETH = "0x0000000000000000000000000000000000000000";

/*==================================================
  TVL
  ==================================================*/

async function tvl(timestamp, block) {
  const USDTRequest = sdk.api.erc20.balanceOf({
    target: USDT,
    owner: USDTPlatform,
    block: block,
  });

  const ETHRequest = sdk.api.eth.getBalance({
    block,
    target: ETHPlatform,
  });

  const [USDTResponse, ETHResponse] = await Promise.all([
    USDTRequest,
    ETHRequest,
  ]);

  return {
    [USDT]: USDTResponse.output,
    [ETH]: ETHResponse.output,
  };
}

/*==================================================
  Exports
  ==================================================*/

module.exports = {
  name: "CVI",
  website: "https://cvi.finance/",
  token: "GOVI",
  category: "trading",
  start: 1611073144, // Jan-19-2021 04:19:04 PM +UTC
  tvl,
};
