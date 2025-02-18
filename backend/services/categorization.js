export function extractCodeHolders(message) {
  //  TxId: 73214484437. Your payment of 1,000 RWF to Jane Smith 12845 has been completed at 2024-05-10 16:31:39. Your new balance: 1,000 RWF. Fee was 0 RWF.Kanda*182*16# wiyandikishe muri poromosiyo ya BivaMoMotima, ugire amahirwe yo gutsindira ibihembo bishimishije.",
  // "date": "12845 has

  const words = message.split(" ");
  const transaction_id = Number(words[1]);
  const amount = Number(words[5].replace(/,/g, ""));
  const receiver = words[8] + " " + words[9];
  let date = words[15] + " " + words[16];
  date = date.replace(".", "");
  const code = Number(words[10]);
  return {
    transaction_id,
    transaction_type: "Payments to Code Holders",
    amount,
    receiver,
    message,
    code,
    date,
  };
}

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
    transaction_type: "Bank Transfers",
    receiver,
    number,
    amount,
    message,
    date,
  };
}

export function extractForIncomingMoney(message) {
  const words = message.split(" ");

  const transaction_id = Number(
    words[words.indexOf("Id:") + 1].replace(".", "")
  );
  const amount = Number(words[3].replace(/,/g, ""));
  const sender = words[5] + " " + words[6];
  let date = words[15] + " " + words[16];
  date = date.replace(".", "");
  return {
    transaction_id,
    transaction_type: "Incoming Money",
    amount,
    sender,
    message,
    date,
  };
}

export function extractBundles(message) {
  /*
  
  "Yello!Umaze kugura 2000Rwf(1GB)/30days igura 2,000 RWF",
       */

  const msg = message.split(" ");
  const amount = Number(msg.reverse()[1].replace(",", ""));
  return {
    transaction_type: "Internet and Voice Bundle Purchases",
    amount,
    message,
  };
}

export function extractThirdParties(message) {
  message = message
    .replace(/^.*?Y'ello,/, "")
    .replace("*EN#", "")
    .trim();
  const words = message.split(" ");
  const amountIndex = words.indexOf("transaction") + 2;
  const amount = Number(words[amountIndex].replace(/,/g, ""));

  const senderStart = words.indexOf("by") + 1;
  const senderEnd = words.indexOf("on");
  const sender = words.slice(senderStart, senderEnd).join(" ");

  const dateIndex = words.indexOf("completed") + 3;
  let date = words[dateIndex - 1] + " " + words[dateIndex];
  date = date.replace(".", "");

  const financialTxIndex = words.indexOf("Id:") + 1;
  const transaction_id = Number(words[financialTxIndex].replace(/\./g, ""));

  return {
    transaction_id,
    transaction_type: "Transactions Initiated by Third Parties",
    amount,
    sender,
    message,
    date,
  };
}

export function extractForTranferToNumber(message) {
  /*
     *165*S*10000 RWF transferred to Samuel Carter (250791666666) from 36521838 at 2024-05-11 20:34:47 . Fee was: 100 RWF.
      New balance: 28300 RWF. Kugura ama inite cg interineti kuri MoMo, Kanda *182*2*1# .*EN#
     */
  const msg = message.split(" ");
  const amount = Number(msg[0].split("*")[3]);
  const receiver = msg[4] + " " + msg[5];
  const number = Number(msg[6].replace("(", "").replace(")", ""));
  let date = msg[10] + " " + msg[11];
  return {
    transaction_type: "Transfers to Mobile Numbers",
    amount,
    receiver,
    number,
    message,
    date,
  };
}

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
  const transaction_id = Number(msg.reverse()[0].replace(".", ""));
  return {
    transaction_id,
    transaction_type: "Withdrawals from Agents",
    agent,
    number,
    message,
    amount,
    date,
  };
}

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
