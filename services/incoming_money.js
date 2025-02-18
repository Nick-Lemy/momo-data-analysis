export function extractForIncmingMoney(message) {
  // Split the message into words
  const words = message.split(" ");

  // Extract the transaction ID (1st part after 'TxId:')
  const transactionId = Number(
    words[words.indexOf("Id:") + 1].replace(".", "")
  );

  // Extract the amount (2nd part before 'RWF')
  const amount = Number(words[3].replace(/,/g, ""));

  // Extract the sender (2nd and 3rd words after 'from')
  const sender = words[5] + " " + words[6];

  // Extract the date (last part before the balance statement)
  const date = words[10] + " " + words[11];

  // Return the extracted data as an object
  return {
    transactionId,
    amount,
    sender,
    message,
    date,
  };
}
