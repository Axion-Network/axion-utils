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
// log unstake early penalty
function early(shares, stakingDays, daysSinceStakeStarted) {
    let unstakedNumberOfShares = cs.calcEarlyUnstakePenalty(shares, stakingDays, daysSinceStakeStarted);
    console.log('shares=' + shares + ' stakingDays=' + stakingDays + ' daysSinceStakeStarted=' + daysSinceStakeStarted +
     ' earlyUnstakedShares=' + unstakedNumberOfShares);
}

// log unstake late penalty
function late(shares, stakingDays, daysSinceStakeStarted) {
    let unstakedNumberOfShares = cs.calcLateUnstakePenalty(shares, stakingDays, daysSinceStakeStarted);
    console.log('shares=' + shares + ' stakingDays=' + stakingDays + ' daysSinceStakeStarted=' + daysSinceStakeStarted +
        ' lateUnstakedShares=' + unstakedNumberOfShares);
}

// hex2t late claim conversion
h2t(1000, 0);
h2t(1000, 100);
h2t(1000, 350);
h2t(1000, 351);

console.log("\n");

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

console.log("\n");

// early unstake penalties
early(1000, 100, 0);   // nothing
early(1000, 100, 100); // everything
early(150, 100, 20); // example from whitepaper
early(1000, 100, 200)  // too long, no early penalty

console.log("\n");

// late unstake penalties
late(1000, 100, 100);   // no penalty
late(1000, 100, 114); // no penalty, in graceperiod
late(1000, 100, 115); // 1 day with penalty
late(1000, 100, 1000)  // everything burned
