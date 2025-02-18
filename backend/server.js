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
} from "./db.js";
import cors from "cors"; // Import CORS middleware

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all requests
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
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching transaction counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
