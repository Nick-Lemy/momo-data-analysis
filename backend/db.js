import { Sequelize, Model, DataTypes } from "sequelize";
// Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
// Modeling a schemas

class Transaction extends Model {}
Transaction.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    body: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  { sequelize, modelName: "transactions" }
);

class IncomingMoney extends Model {}
IncomingMoney.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    sender: DataTypes.STRING,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  { sequelize, modelName: "incoming_money" }
);

class PaymentsToCodeHolders extends Model {}
PaymentsToCodeHolders.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    receiver: DataTypes.STRING,
    message: DataTypes.STRING,
    code: DataTypes.STRING,
    date: DataTypes.INTEGER,
  },
  { sequelize, modelName: "payments_to_code_holders" }
);

class TransfersToMobileNumbers extends Model {}
TransfersToMobileNumbers.init(
  {
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    receiver: DataTypes.STRING,
    number: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  { sequelize, modelName: "transferts_to_mobile_numbers" }
);

class BankDeposits extends Model {}
BankDeposits.init(
  {
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  { sequelize, modelName: "bank_deposits" }
);

class TransactionByThirdParties extends Model {}
TransactionByThirdParties.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    sender: DataTypes.STRING,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "transaction_by_third_parties",
  }
);

class WithdrawalsFromAgents extends Model {}
WithdrawalsFromAgents.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    agent: DataTypes.STRING,
    number: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "withdrawals_from_agents",
  }
);

class BankTransfers extends Model {}
BankTransfers.init(
  {
    transaction_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    receiver: DataTypes.STRING,
    number: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "bank_transferts",
  }
);

// Creating
function 