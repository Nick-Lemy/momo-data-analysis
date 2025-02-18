export function extractBankDeposit(message) {
  /*
    "*113*R*A bank deposit of 40000 RWF has been added to your mobile money account at 2024-05-11 18:43:49.
     Your NEW BALANCE :40400 RWF. Cash Deposit::CASH::::0::250795963036.Thank you for using MTN MobileMoney.*EN#",
  */

  const msg = message.split(" ");
  const amout = Number(msg[4]);
  let date = msg[15] + " " + msg[16];
  date = date.replace(".", "");
  return {
    transaction_type: "Bank Deposits",
    amout,
    message,
    date,
  };
}
