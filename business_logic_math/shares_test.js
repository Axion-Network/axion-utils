const cs = require('./axion_helper_funcs.js');

let amount;
let stakingDays;
let shareRate = 1.0;

function llog(amount, stakingDays, shareRate) {
    console.log('amount: ' + amount + ' stakingDays: ' + stakingDays + ' shares=' + cs.calc_shares(amount, stakingDays, shareRate));
}
//  ------ normal cases --------
amount = 1000;
stakingDays = 1;
llog(amount, stakingDays, shareRate);


// ----- normal staking cases - shareRate = 1
llog(10, 100, 1.0);
llog( 1e6, 365, 1.0);
//console.log(calc_shares_from_stake_event(10000000000000000000, 1604761003, 1613401003, 1));

llog(1000, 1820, 1.0);

// above max lpd bonus
llog(1000, 1840, 1.0); // same value as for stakingDays = 1820

// -- max amount possible --
llog(500e9, 1820, 1.0);

// -- max stakingDays possible --

// -- corner cases --
// amount = 0; stakingDays > 0
llog(0, 10, 1.0);

//  -- exception ---
// stakingDays = 0 should raise some kind of exception

