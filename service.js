import { Parser } from "xml2js";
import fs from "fs";
import { extractForIncmingMoney } from "./services/incoming_money.js";
import { extractCodeHolders } from "./services/cocde_holders.js";

export function extractAttributes(xmlString) {
  const parser = new Parser({
    explicitArray: false,
    attrkey: "attributes",
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xmlString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        let smsElements = result.smses.sms;
        if (!Array.isArray(smsElements)) {
          smsElements = [smsElements];
        }

        const uncategorizedtransactions = [];
        const categorizedData = {
          "Incoming Money": [],
          "Payments to Code Holders": [],
          "Transfers to Mobile Numbers": [],
          "Bank Deposits": [],
          "Airtime Bill Payments": [],
          "Cash Power Bill Payments": [],
          "Transactions Initiated by Third Parties": [],
          "Withdrawals from Agents": [],
          "Bank Transfers": [],
          "Internet and Voice Bundle Purchases": [],
        };

        smsElements.forEach((sms) => {
          const body = sms.attributes.body;

          if (/received .* RWF from/i.test(body)) {
            categorizedData["Incoming Money"].push(
              extractForIncmingMoney(body)
            );
          } else if (
            /Your payment of .* RWF to .* has been completed/i.test(body)
          ) {
            categorizedData["Payments to Code Holders"].push(
              extractCodeHolders(body)
            );
          } else if (/transferred to .* from/i.test(body)) {
            categorizedData["Transfers to Mobile Numbers"].push(body);
          } else if (
            /A bank deposit of .* has been added to your mobile money account/i.test(
              body
            )
          ) {
            categorizedData["Bank Deposits"].push(body);
          } else if (body.includes("Airtime")) {
            categorizedData["Airtime Bill Payments"].push(body);
          } else if (/Your payment of .* RWF to MTN Cash Power/i.test(body)) {
            categorizedData["Cash Power Bill Payments"].push(body);
          } else if (
            /A transaction of .* by .* on your MOMO account/i.test(body)
          ) {
            categorizedData["Transactions Initiated by Third Parties"].push(
              body
            );
          } else if (
            /withdrawn .* RWF from your mobile money account/i.test(body)
          ) {
            categorizedData["Withdrawals from Agents"].push(body);
          } else if (/You have transferred .* imbank.bank .*/i.test(body)) {
            categorizedData["Bank Transfers"].push(body);
          } else if (/Yello!Umaze kugura .*/i.test(body)) {
            categorizedData["Internet and Voice Bundle Purchases"].push(body);
          } else {
            uncategorizedtransactions.push(body);
          }
        });

        for (const key of Object.keys(categorizedData)) {
          if (categorizedData[key].length < 1) {
            delete categorizedData[key];
          }
        }
        fs.writeFile(
          "uncategorized.txt",
          uncategorizedtransactions.join("\n"),
          (err) => {
            if (err) throw err;
            console.log("Array has been written to the file.");
          }
        );

        resolve(categorizedData);
      }
    });
  });
}

export const extractTransactionDetails = (message, cat) => {
  let transaction = {
    transaction_type: cat,
    amount: null,
    body: message,
    transaction_id: null,
    timestamp: null,
  };

  // Extract amount
  const amountMatch = message.split(" ");
  console.log(amountMatch);
  transaction.amount = message[amountMatch.indexOf("RWF") - 1];

  // Extract date & time
  const dateMatch = message.match(/at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
  if (dateMatch) transaction.timestamp = dateMatch[1];

  // Extract Transaction ID
  const txIdMatch = message.match(/TxId:|id:\s*(\d+)/);
  if (txIdMatch) transaction.transaction_id = txIdMatch[1];

  // Extract sender/receiver/agent details
  const senderMatch = message.match(/from ([A-Za-z\s]+) \(\*+\d+\)/);
  if (senderMatch) transaction.sender = senderMatch[1];

  const receiverMatch = message.match(/to ([A-Za-z\s]+) \((\d{9,})\)/);
  if (receiverMatch) {
    transaction.receiver = receiverMatch[1];
    transaction.receiver_phone = receiverMatch[2];
  }

  const agentMatch = message.match(/agent: ([A-Za-z\s]+) \((\d{9,})\)/);
  if (agentMatch) {
    transaction.agent = agentMatch[1];
    transaction.agent_phone = agentMatch[2];
  }

  return transaction;
};
