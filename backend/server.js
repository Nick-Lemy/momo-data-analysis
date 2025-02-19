import express from "express";
import {
  IncomingMoney,
  PaymentsToCodeHolders,
  TransfersToMobileNumbers,
  BankDeposits,
  TransactionByThirdParties,
  WithdrawalsFromAgents,
  Bundle,
  BankTransfers,
  AirtimeBillPayments,
  Transaction,
  CashPowerBillPayments,
} from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint for Transaction counts
app.get("/api/transaction-counts", async (req, res) => {
  try {
    const data = {
      incoming_money: await IncomingMoney.count(),
      payments_to_code_holders: await PaymentsToCodeHolders.count(),
      transfers_to_mobile_numbers: await TransfersToMobileNumbers.count(),
      bank_deposits: await BankDeposits.count(),
      transactions_by_third_parties: await TransactionByThirdParties.count(),
      withdrawals_from_agents: await WithdrawalsFromAgents.count(),
      internet_voice_bundles: await Bundle.count(),
      bank_transfers: await BankTransfers.count(),
      airtime_bill_payments: await AirtimeBillPayments.count(),
      cashpower_bill_payments: await CashPowerBillPayments.count(),
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching transaction counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for all transactions
app.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch {}
});

// Enpoint for the sum of amounts of the Airtime bill Payments transactions
app.get("/airtime_bill_payments", async (req, res) => {
  try {
    const airtime_bill_payments = await AirtimeBillPayments.findAll();
    let amount = 0;
    airtime_bill_payments.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

// Enpoint for the sum of amounts of the Cash Power Bill Payments transactions
app.get("/cashpower_bill_payments", async (req, res) => {
  try {
    const cashpower_bill_payments = await CashPowerBillPayments.findAll();
    let amount = 0;
    cashpower_bill_payments.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

// Enpoint for the sum of amounts of the Bundles transactions
app.get("/bundles_purchases", async (req, res) => {
  try {
    const bundles_purchases = await Bundle.findAll();
    let amount = 0;
    bundles_purchases.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

// Enpoint for the sum of amounts of the Incoming Money transactions
app.get("/incoming_money", async (req, res) => {
  try {
    const incoming_money = await IncomingMoney.findAll();
    let amount = 0;
    incoming_money.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

// Enpoint for the sum of amounts of the Incoming Money transactions
app.get("/payments_to_code_holders", async (req, res) => {
  try {
    const payments_to_code_holders = await PaymentsToCodeHolders.findAll();
    let amount = 0;
    payments_to_code_holders.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

app.get("/transferts_to_mobile_numbers", async (req, res) => {
  try {
    const transferts_to_mobile_numbers =
      await TransfersToMobileNumbers.findAll();
    let amount = 0;
    transferts_to_mobile_numbers.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

app.get("/bank_deposits", async (req, res) => {
  try {
    const bank_deposits = await BankDeposits.findAll();
    let amount = 0;
    bank_deposits.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

app.get("/transaction_by_third_parties", async (req, res) => {
  try {
    const transaction_by_third_parties =
      await TransactionByThirdParties.findAll();
    let amount = 0;
    transaction_by_third_parties.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

app.get("/withdrawals_from_agents", async (req, res) => {
  try {
    const withdrawals_from_agents = await WithdrawalsFromAgents.findAll();
    let amount = 0;
    withdrawals_from_agents.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

app.get("/bank_transferts", async (req, res) => {
  try {
    const bank_transferts = await BankTransfers.findAll();
    let amount = 0;
    bank_transferts.forEach((e) => {
      amount += e["amount"];
    });
    res.status(200).json(amount);
  } catch {}
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
