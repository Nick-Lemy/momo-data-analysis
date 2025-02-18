import { Parser } from "xml2js";
import fs from "fs";
import {
  extractForIncomingMoney,
  extractCodeHolders,
  extractForTranferToNumber,
  extractBankDeposit,
  extractForWithdrwalsFromAgent,
  extractBankTransferts,
  extractBundles,
  extractThirdParties,
} from "./categorization.js";

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
              extractForIncomingMoney(body)
            );
          } else if (
            /Your payment of .* RWF to .* has been completed/i.test(body)
          ) {
            categorizedData["Payments to Code Holders"].push(
              extractCodeHolders(body)
            );
          } else if (/transferred to .* from/i.test(body)) {
            categorizedData["Transfers to Mobile Numbers"].push(
              extractForTranferToNumber(body)
            );
          } else if (
            /A bank deposit of .* has been added to your mobile money account/i.test(
              body
            )
          ) {
            categorizedData["Bank Deposits"].push(extractBankDeposit(body));
          } else if (body.includes("Airtime")) {
            categorizedData["Airtime Bill Payments"].push(body);
          } else if (/Your payment of .* RWF to MTN Cash Power/i.test(body)) {
            categorizedData["Cash Power Bill Payments"].push(body);
          } else if (
            /A transaction of .* by .* on your MOMO account/i.test(body)
          ) {
            categorizedData["Transactions Initiated by Third Parties"].push(
              extractThirdParties(body)
            );
          } else if (
            /withdrawn .* RWF from your mobile money account/i.test(body)
          ) {
            categorizedData["Withdrawals from Agents"].push(
              extractForWithdrwalsFromAgent(body)
            );
          } else if (/You have transferred .* imbank.bank .*/i.test(body)) {
            categorizedData["Bank Transfers"].push(extractBankTransferts(body));
          } else if (/Yello!Umaze kugura .*/i.test(body)) {
            categorizedData["Internet and Voice Bundle Purchases"].push(
              extractBundles(body)
            );
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
