function extractTransactionDetails(message) {
  // Remove any leading "*164*S*" or trailing "*EN#"
  message = message
    .replace(/^.*?Y'ello,/, "")
    .replace("*EN#", "")
    .trim();

  // Split the message into parts
  const words = message.split(" ");

  // Extract Amount & Currency
  const amountIndex = words.indexOf("transaction") + 2;
  const amount = words[amountIndex].replace(/,/g, "");
  const currency = words[amountIndex + 1];

  // Extract Sender (from "by" to "on your MOMO account")
  const senderStart = words.indexOf("by") + 1;
  const senderEnd = words.indexOf("on");
  const sender = words.slice(senderStart, senderEnd).join(" ");

  // Extract Date & Time
  const dateIndex = words.indexOf("completed") + 3;
  const date = words[dateIndex] + " " + words[dateIndex + 1];

  // Extract New Balance
  const balanceIndex = words.indexOf("balance:") + 1;
  const newBalance = words[balanceIndex].replace(/,/g, "");

  // Extract Fee
  const feeIndex = words.indexOf("Fee") + 2;
  const fee = words[feeIndex].replace(/,/g, "");

  // Extract Financial Transaction ID
  const financialTxIndex = words.indexOf("Id:") + 1;
  const financialTransactionId = words[financialTxIndex].replace(/\./g, "");

  // Extract External Transaction ID (last ID in message)
  const externalTxIndex = words.lastIndexOf("Id:") + 1;
  const externalTransactionId = words[externalTxIndex];

  return {
    amount,
    sender,
    date,
    transactionId,
    externalTransactionId,
  };
}

// Test messages
const messages = [
  "*164*S*Y'ello,A transaction of 25000 RWF by DIRECT PAYMENT LTD on your MOMO account was successfully completed at 2024-05-14 21:01:00. Message from debit receiver: . Your new balance:4060 RWF. Fee was 0 RWF. Financial Transaction Id: 13947831685. External Transaction Id: 47842929.*EN#",
  "*164*S*Y'ello,A transaction of 600 RWF by INFORMATION TECHNOLOGY ENGINEERING CONSTRUCTION ITEC Ltd on your MOMO account was successfully completed at 2024-06-06 16:19:01. Message from debit receiver: ITEC Pay. Your new balance:230 RWF. Fee was 0 RWF. Financial Transaction Id: 14262449979. External Transaction Id: c5e8bfeb-33d8-4eb2-8d22-154e5ff5e310.*EN#",
  "*164*S*Y'ello,A transaction of 25000 RWF by DIRECT PAYMENT LTD on your MOMO account was successfully completed at 2024-06-14 07:52:10. Message from debit receiver: . Your new balance:4750 RWF. Fee was 0 RWF. Financial Transaction Id: 14366722236. External Transaction Id: 48214394.*EN#",
  "*164*S*Y'ello,A transaction of 8000 RWF by ESICIA LTD KPAY on your MOMO account was successfully completed at 2024-06-15 21:28:58. Message from debit receiver: 1599236171847972758074646. Your new balance:4110 RWF. Fee was 0 RWF. Financial Transaction Id: 14392932831. External Transaction Id: E39762254KPY1718479727.*EN#",
  "*164*S*Y'ello,A transaction of 5000 RWF by Future Dynamic Innovations ltd on your MOMO account was successfully completed at 2024-06-16 19:25:44. Message from debit receiver: 610. Your new balance:9350 RWF. Fee was 0 RWF. Financial Transaction Id: 14404189056. External Transaction Id: 475e95b8a1d049c2ba9ee675401d9332.*EN#",
  "*164*S*Y'ello,A transaction of 20000 RWF by INTOUCH COMMUNICATIONS LTD on your MOMO account was successfully completed at 2024-06-29 00:32:19. Message from debit receiver: 250795963036. Your new balance:21670 RWF. Fee was 0 RWF. Financial Transaction Id: 14574631016. External Transaction Id: 169587820240628223202678996.*EN#",
  "*164*S*Y'ello,A transaction of 2000 RWF by Data Bundle MTN on your MOMO account was successfully completed at 2024-07-14 15:19:17. Message from debit receiver: . Your new balance:27570 RWF. Fee was 0 RWF. Financial Transaction Id: 14807754878. External Transaction Id: 17209629782498301.*EN#",
  "*164*S*Y'ello,A transaction of 5000 RWF by Data Bundle MTN on your MOMO account was successfully completed at 2024-09-06 16:37:52. Message from debit receiver: . Your new balance:890 RWF. Fee was 0 RWF. Financial Transaction Id: 15606505500. External Transaction Id: 17256333763041376.*EN#",
  "*164*S*Y'ello,A transaction of 20000 RWF by INTOUCH COMMUNICATIONS LTD on your MOMO account was successfully completed at 2024-09-08 01:12:33. Message from debit receiver: 250795963036. Your new balance:103260 RWF. Fee was 0 RWF. Financial Transaction Id: 15628862865. External Transaction Id: 188160120240907231214390890.*EN#",
];

// Run test cases
messages.forEach((msg, index) => {
  console.log(`Transaction ${index + 1}:`, extractTransactionDetails(msg));
});
