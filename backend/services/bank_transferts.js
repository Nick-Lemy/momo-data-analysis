export function extractBankTransferts(message) {
  /*
    "You have transferred 50000 RWF to Linda Green (250795963036) from your mobile money account 20077201001 imbank.bank at 2024-10-23 09:59:01. 
    Your new balance: . Message from sender: . Message to receiver: . Financial Transaction Id: 16400028923.",
     */

  const msg = message.split(" ");
  const amount = msg[3];
  const receiver = msg[6] + " " + msg[7];
  const number = msg[8].replace("(", "").replace(")", "");
  const date = msg[17] + " " + msg[18];
  const transactionId = msg.reverse()[0].replace(".", "");
  return {
    transactionId,
    receiver,
    number,
    amount,
    message,
    date,
  };
}
