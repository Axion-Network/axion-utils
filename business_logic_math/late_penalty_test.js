const cs = require('./axion_helper_funcs.js');

// logs expected amount for hex2t claims
function h2t(amount, daysSinceMainnetStart) {
    let eligibleClaim = cs.calcLateClaimPenalty(daysSinceMainnetStart, amount);
    let penalty = amount - eligibleClaim;
    console.log('h2t amount: ' + amount + ' daysSinceMainnetStart: ' + daysSinceMainnetStart +
        ' eligibleClaim=' + eligibleClaim + ' penalty = '  + penalty);
}
// logs amount for hex freeclaims
function hex(hexWalletAmount, daysSinceMainnetStart) {
    const {bigPenaltyAmount, eligibleClaimAmount, claimPenaltyToAuction} = cs.calcHEXFreeClaimPenalty(daysSinceMainnetStart, hexWalletAmount);
    console.log('hex wallet: ' + hexWalletAmount + ' daysSinceMainnetStart: ' + daysSinceMainnetStart
        + ' eligibleClaim=' + eligibleClaimAmount + ' big penalty amount=' + bigPenaltyAmount + ' claimPenaltyAuction= ' + claimPenaltyToAuction);
}

// hex2t late claim conversion
h2t(1000, 0);
h2t(1000, 100);
h2t(1000, 350);
h2t(1000, 351);

// hex freeclaim late claim conversion below limit
const smallHexWallet = 1000;
hex(smallHexWallet, 0);
hex(smallHexWallet, 100);
hex(smallHexWallet, 350);
hex(smallHexWallet, 351);

// hex freeclaim late claim conversion below limit
const bigHexWallet = 100e6;
hex(bigHexWallet, 0);
hex(bigHexWallet, 100);
hex(bigHexWallet, 350);
hex(bigHexWallet, 351);