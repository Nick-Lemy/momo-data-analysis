export function extractCodeHolders(message) {
  //  TxId: 73214484437. Your payment of 1,000 RWF to Jane Smith 12845 has been completed at 2024-05-10 16:31:39. Your new balance: 1,000 RWF. Fee was 0 RWF.Kanda*182*16# wiyandikishe muri poromosiyo ya BivaMoMotima, ugire amahirwe yo gutsindira ibihembo bishimishije.",
  // "date": "12845 has

  //   // Split the message into words
  const words = message.split(" ");

  // Extract the transaction ID (1st part after 'TxId:')
  const transactionId = words[1];

  // Extract the amount (3rd part before 'RWF')
  const amount = words[5].replace(/,/g, "");

  // Extract the receiver (2nd and 3rd words after 'to')
  const receiver = words[8] + " " + words[9];

  // Extract the date (item after 'completed at')
  const date = words[15] + " " + words[16];

  // Extract the code (item between 'Kanda*' and '#')
  const code = words[10];

  // Return the extracted data as an object
  return {
    transactionId,
    amount,
    receiver,
    message,
    code,
    date,
  };
}
