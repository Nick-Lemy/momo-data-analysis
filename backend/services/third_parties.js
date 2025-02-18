export function extractThirdParties(message) {
  message = message
    .replace(/^.*?Y'ello,/, "")
    .replace("*EN#", "")
    .trim();
  const words = message.split(" ");
  const amountIndex = words.indexOf("transaction") + 2;
  const amount = words[amountIndex].replace(/,/g, "");

  const senderStart = words.indexOf("by") + 1;
  const senderEnd = words.indexOf("on");
  const sender = words.slice(senderStart, senderEnd).join(" ");

  const dateIndex = words.indexOf("completed") + 3;
  let date = words[dateIndex] + " " + words[dateIndex + 1];
  date = date.replace(".", "");

  const financialTxIndex = words.indexOf("Id:") + 1;
  const transaction_id = words[financialTxIndex].replace(/\./g, "");

  return {
    amount,
    sender,
    date,
    transaction_id,
  };
}
