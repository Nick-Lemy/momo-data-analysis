import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "node:fs";

//xml file from https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms762271(v=vs.85)
const xmlFile = readFileSync(`${process.cwd()}/modified_sms_v2.xml`, "utf8");
const parser = new XMLParser();
const json = parser.parse(xmlFile);
const smses = json.sms_data.sms;

console.log();
class Transaction {
  constructor(type, source, value, envolved) {
    this.type = type;
    this.source = source;
    this.value = value;
    this.envolved = envolved;
  }
}
for (const sms of smses) {
  //   console.log(sms.body);
  const data = sms.body.split(" ");
  const value = data.filter((n) => Number(n)).map((n) => Number(n));
  console.log("Value", value, "RWF");
  //   console.log("Fees:", fee, " RWF");
  console.log(data);
}

/* */
