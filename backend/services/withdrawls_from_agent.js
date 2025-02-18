export function extractForWithdrwalsFromAgent(message) {
  /*
    "You Abebe Chala CHEBUDIE (*********036) have via agent: Agent Sophia (250790777777), withdrawn 20000 RWF from your mobile money account: 36521838 at 2024-05-26 02:10:27 and you can now collect your money in cash.
     Your new balance: 6400 RWF. Fee paid: 350 RWF. Message from agent: 1. Financial Transaction Id: 14098463509."
    */
  const msg = message.split(" ");
  const agent = msg[9];
  const number = Number(
    msg[10].replace("(", "").replace(")", "").replace(",", "")
  );
  const amount = Number(msg[12]);
  let date = msg[21] + " " + msg[22];
  const transaction_id = msg.reverse()[0].replace(".", "");
  return {
    transaction_id,
    agent,
    number,
    amount,
    date,
  };
}
