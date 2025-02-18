export function extractForIncmingMoney(message) {
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
    amount,
    sender,
    message,
    date,
  };
}
