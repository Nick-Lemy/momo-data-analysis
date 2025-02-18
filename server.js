import express from "express";
import { extractAttributes, extractTransactionDetails } from "./service.js";
import bodyParser from "body-parser";
import { Sequelize, Model, DataTypes } from "sequelize";
import { readFileSync } from "node:fs";

// Server variables
const app = express();
const PORT = 3030;

// xml file parsed and transformed into string
const xmlFile = readFileSync(`${process.cwd()}/modified_sms_v2.xml`, "utf8");

// Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
// Modeling a schema for Transactions
class Transaction extends Model {}
Transaction.init(
  {
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    body: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER,
    timestamp: DataTypes.STRING,
  },
  { sequelize, modelName: "transactions" }
);

sequelize.sync();

async function main() {
  await extractAttributes(xmlFile).then(async (data) => {
    const obj = [];
    for (const [cat, value] of Object.entries(data)) {
      for (const message of value) {
        let a = await Transaction.create(
          extractTransactionDetails(message, cat)
        );
        console.log(a);
      }
    }
  });
}
// // Schema for Incoming Money
// class IncomingMoney extends Model {}
// IncomingMoney.init(
//   {
//     transaction_id: forei,
//   },
//   { sequelize, modelName: "incoming_money" }
// );

// build-ins middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add a Transaction in the Database
app.post("/trans", async (req, res) => {
  const trans = await Transaction.create(req.body);
  console.log(trans);
  res.json(trans);
});

// See all transactions
app.get("/trans", async (req, res) => {
  try {
    const n = await main();
    const transacs = await Transaction.findAll();
    res.json(transacs);
  } catch (e) {
    console.error(e);
  }
});

// routes
app.post("/data", async (req, res) => {
  await extractAttributes(xmlFile).then((data) => {
    const obj = [];
    for (const [cat, value] of Object.entries(data)) {
      for (const message of value) {
        obj.push(extractTransactionDetails(message, cat));
      }
    }
    res.send(obj.sort((a, b) => Number(b["amount"]) - Number(a["amount"])));
  });
});

app.get("/", async (req, res) => {
  await extractAttributes(xmlFile).then((data) => {
    res.send(data);
  });
});

// listener
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
