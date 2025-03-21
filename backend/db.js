import { Sequelize, Model, DataTypes } from "sequelize";
import { readFileSync } from "node:fs";
import { extractAttributes } from "./services/service.js";

// Sequelize instance
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Creating Tables for the database
export class Transaction extends Model {}
Transaction.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    agent: DataTypes.STRING,
    number: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
  },
  { sequelize, modelName: "transactions", tableName: "transactions" }
);

export class AirtimeBillPayments extends Model {}
AirtimeBillPayments.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    receiver: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "airtime_bill_payments",
    tableName: "airtime_bill_payments",
  }
);

export class CashPowerBillPayments extends Model {}
CashPowerBillPayments.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    receiver: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "cashpower_bill_payments",
    tableName: "cashpower_bill_payments",
  }
);

export class Bundle extends Model {}
Bundle.init(
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Set as primary key
      autoIncrement: true, // Enable auto-increment
    },
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "bundles_purchases",
    tableName: "bundles_purchases", // Ensure Sequelize uses this name
  }
);

export class IncomingMoney extends Model {}
IncomingMoney.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    sender: DataTypes.STRING,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    createdAt: false,
    updatedAt: false,
  },
  { sequelize, modelName: "incoming_money", tableName: "incoming_money" }
);

export class PaymentsToCodeHolders extends Model {}
PaymentsToCodeHolders.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    receiver: DataTypes.STRING,
    message: DataTypes.STRING,
    code: DataTypes.STRING,
    date: DataTypes.INTEGER,
    createdAt: false,
    updatedAt: false,
  },
  {
    sequelize,
    modelName: "payments_to_code_holders",
    tableName: "payments_to_code_holders",
  }
);

export class TransfersToMobileNumbers extends Model {}
TransfersToMobileNumbers.init(
  {
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    receiver: DataTypes.STRING,
    number: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    createdAt: false,
    updatedAt: false,
  },
  {
    sequelize,
    modelName: "transferts_to_mobile_numbers",
    tableName: "transferts_to_mobile_numbers",
  }
);

export class BankDeposits extends Model {}
BankDeposits.init(
  {
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  { sequelize, modelName: "bank_deposits", tableName: "bank_deposits" }
);

export class TransactionByThirdParties extends Model {}
TransactionByThirdParties.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    sender: DataTypes.STRING,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    createdAt: false,
    updatedAt: false,
  },
  {
    sequelize,
    modelName: "transaction_by_third_parties",
    tableName: "transaction_by_third_parties",
  }
);

export class WithdrawalsFromAgents extends Model {}
WithdrawalsFromAgents.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    agent: DataTypes.STRING,
    number: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    createdAt: false,
    updatedAt: false,
  },
  {
    sequelize,
    modelName: "withdrawals_from_agents",
    tableName: "withdrawals_from_agents",
  }
);

export class BankTransfers extends Model {}
BankTransfers.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    receiver: DataTypes.STRING,
    number: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    createdAt: false,
    updatedAt: false,
  },
  {
    sequelize,
    modelName: "bank_transferts",
    tableName: "bank_transferts",
  }
);

// Initialize the DB
await sequelize
  .sync({ force: true }) // WARNING: This will DROP & recreate tables
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Function to send the catogorized and cleaned data to the DB
async function sendDataToDB() {
  const xmlFile = readFileSync(`${process.cwd()}/modified_sms_v2.xml`, "utf8");
  await extractAttributes(xmlFile).then(async (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (key === "Incoming Money") {
        for (const transac of value) {
          await Transaction.create(transac);
          await IncomingMoney.create(transac);
        }
      } else if (key === "Airtime Bill Payments") {
        for (const transac of value) {
          await Transaction.create(transac);
          await AirtimeBillPayments.create(transac);
        }
      } else if (key === "Cash Power Bill Payments") {
        for (const transac of value) {
          await Transaction.create(transac);
          await CashPowerBillPayments.create(transac);
        }
      } else if (key === "Payments to Code Holders") {
        for (const transac of value) {
          await Transaction.create(transac);
          await PaymentsToCodeHolders.create(transac);
        }
      } else if (key === "Transfers to Mobile Numbers") {
        for (const transac of value) {
          await Transaction.create(transac);
          await TransfersToMobileNumbers.create(transac);
        }
      } else if (key === "Bank Deposits") {
        for (const transac of value) {
          await Transaction.create(transac);
          await BankDeposits.create(transac);
        }
      } else if (key === "Transactions Initiated by Third Parties") {
        for (const transac of value) {
          await Transaction.create(transac);
          await TransactionByThirdParties.create(transac);
        }
      } else if (key === "Withdrawals from Agents") {
        for (const transac of value) {
          await Transaction.create(transac);
          await WithdrawalsFromAgents.create(transac);
        }
      } else if (key === "Internet and Voice Bundle Purchases") {
        for (const transac of value) {
          await Transaction.create(transac);
          await Bundle.create(transac);
        }
      } else if (key === "Bank Transfers") {
        for (const transac of value) {
          await Transaction.create(transac);
          await BankTransfers.create(transac);
        }
      }
    }
  });
}

// Launch processus of data sending
sendDataToDB();
