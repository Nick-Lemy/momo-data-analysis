export function extractBundles(message) {
  /*

"Yello!Umaze kugura 2000Rwf(1GB)/30days igura 2,000 RWF",
     */

  const msg = message.split(" ");
  const amount = Number(msg.reverse()[1].replace(",", ""));
  return {
    amount,
    message,
  };
}
