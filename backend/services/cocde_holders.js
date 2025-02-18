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
