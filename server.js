import { readFileSync } from "node:fs";
import { Parser } from "xml2js";

const xmlFile = readFileSync(`${process.cwd()}/modified_sms_v2.xml`, "utf8");

export default function extractAttributes(xmlString) {
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
            categorizedData["Incoming Money"].push(sms.attributes);
          } else if (
            /Your payment of .* RWF to .* has been completed/i.test(body)
          ) {
            categorizedData["Payments to Code Holders"].push(sms.attributes);
          } else if (/transferred to .* from/i.test(body)) {
            categorizedData["Transfers to Mobile Numbers"].push(sms.attributes);
          } else if (
            /A bank deposit of .* has been added to your mobile money account/i.test(
              body
            )
          ) {
            categorizedData["Bank Deposits"].push(sms.attributes);
          } else if (/Your payment of .* RWF to Airtime/i.test(body)) {
            categorizedData["Airtime Bill Payments"].push(sms.attributes);
          } else if (/Your payment of .* RWF to MTN Cash Power/i.test(body)) {
            categorizedData["Cash Power Bill Payments"].push(sms.attributes);
          } else if (
            /A transaction of .* by .* on your MOMO account/i.test(body)
          ) {
            categorizedData["Transactions Initiated by Third Parties"].push(
              sms.attributes
            );
          } else if (
            /withdrawn .* RWF from your mobile money account/i.test(body)
          ) {
            categorizedData["Withdrawals from Agents"].push(sms.attributes);
          } else if (/bank transfer/i.test(body)) {
            categorizedData["Bank Transfers"].push(sms.attributes);
          } else if (/Kugura ama inite cg interineti/i.test(body)) {
            categorizedData["Internet and Voice Bundle Purchases"].push(
              sms.attributes
            );
          }
        });

        resolve(categorizedData);
      }
    });
  });
}

async function main() {
  let d = await extractAttributes(xmlFile).then((data) => {
    data = JSON.stringify(data);
    data = JSON.parse(data);
  });
}

main();
console.log("test");

// extractAttributes(xmlFile)
//   .then((res) => {
//     // data = JSON.stringify(res);
//     return res;
//   })
//   .catch(console.error);

// class Transaction {
//   constructor(type, source, value, envolved) {
//     this.type = type;
//     this.source = source;
//     this.value = value;
//     this.envolved = envolved;
//   }
// }
