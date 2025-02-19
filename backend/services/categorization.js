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
  const amount = Number(words[3].replace(/,/, ""));
  const sender = words[6] + " " + words[7];
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

export function formatCurrentDateTime() {
  const now = new Date(); // Get current date and time

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function extractForCashPowerBillPayments(message) {
  /*
   *162*TxId:14103506143*S*Your payment of 4000 RWF to MTN Cash Power with token 72962-79980-44699-06073 has been completed at 2024-05-26 13:31:00. Fee was 0 RWF. 
   Your new balance: 800 RWF . Message: - -. *EN#
   */

  const msg = message.split(" ");
  const transaction_id = Number(msg[0].split(":")[1].split("*")[0]);
  const amount = Number(msg[3]);
  const receiver = "MTN Cash Power";
  let date = msg[16] + " " + msg[17];
  date = date.replace(".", "");
  return {
    transaction_id,
    transaction_type: "Cash Power Bill Payments",
    amount,
    message,
    receiver,
    date,
  };
}

export function extractForAirtimeBillPayments(message) {
  /*
   *162*TxId:13913173274*S*Your payment of 2000 RWF to Airtime with token
     has been completed at 2024-05-12 11:41:28. Fee was 0 RWF. Your new balance: 25280 RWF . Message: - -. *EN#
   */
  const words = message.split(" ");

  const transaction_id = Number(words[0].split(":")[1].split("*")[0]);
  const amount = Number(words[3]);
  const receiver = words[6];
  let date = words[14] + " " + words[15];
  date = date.replace(".", "");

  return {
    transaction_id,
    transaction_type: "Airtime Bill Payments",
    amount,
    message,
    receiver,
    date,
  };
}

export function extractBundles(message) {
  /*
  
  "Yello!Umaze kugura 2000Rwf(1GB)/30days igura 2,000 RWF",
       */

  const msg = message.split(" ");
  const amount = Number(msg.reverse()[1].replace(",", ""));
  const date = formatCurrentDateTime(Date.now());
  return {
    transaction_type: "Internet and Voice Bundle Purchases",
    amount,
    message,
    date,
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
  const amount = Number(msg[4]);
  let date = msg[15] + " " + msg[16];
  date = date.replace(".", "");
  return {
    transaction_type: "Bank Deposits",
    amount,
    message,
    date,
  };
}
