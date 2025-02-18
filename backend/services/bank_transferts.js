export function extractBankTransferts(message) {
  /*
    "You have transferred 50000 RWF to Linda Green (250795963036) from your mobile money account 20077201001 imbank.bank at 2024-10-23 09:59:01. 
    Your new balance: . Message from sender: . Message to receiver: . Financial Transaction Id: 16400028923.",
     */

  const msg = message.split(" ");
  const amount = Number(msg[3]);
  const receiver = msg[6] + " " + msg[7];
  const number = Number(msg[8].replace("(", "").replace(")", ""));
  let date = msg[17] + " " + msg[18];
  date = date.replace(".", "");
  const transaction_id = Number(msg.reverse()[0].replace(".", ""));
  return {
    transaction_id,
    receiver,
    number,
    amount,
    message,
    date,
  };
}
