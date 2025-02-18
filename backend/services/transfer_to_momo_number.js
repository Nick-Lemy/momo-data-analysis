export function extractForTranferToNumber(message) {
  /*
   *165*S*10000 RWF transferred to Samuel Carter (250791666666) from 36521838 at 2024-05-11 20:34:47 . Fee was: 100 RWF.
    New balance: 28300 RWF. Kugura ama inite cg interineti kuri MoMo, Kanda *182*2*1# .*EN#
   */
  const msg = message.split(" ");
  const amount = msg[0].split("*")[3];
  const receiver = msg[4] + " " + msg[5];
  const number = msg[6].replace("(", "").replace(")", "");
  let date = msg[10] + " " + msg[11];
  return {
    amount,
    receiver,
    number,
    message,
    date,
  };
}
