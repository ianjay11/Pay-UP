import { connectDatabase } from "../pool.js";
const pool = connectDatabase();

async function getBalance(user_id) {
  const result = await pool.query(
    `SELECT balance FROM transactions WHERE user_id=$1 ORDER BY transaction_id DESC LIMIT 1`,
    [user_id]
  );
  return Number(result.rows[0]?.balance ?? 0);
}

const cashIn = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { amount, gateway_option } = req.body;
    const balance = await getBalance(user_id);
    const transaction = await pool.query(
      `
        INSERT INTO transactions (
            user_id, 
            amount,
            transaction_type,
            gateway_option,
            balance
            )
        VALUES ($1, $2, 'Deposit', $3, $4) RETURNING *
        `,
      [user_id, Number(amount), gateway_option, balance + Number(amount)]
    );

    res.json(transaction.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const withdraw = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { amount, gateway_option } = req.body;
    const balance = await getBalance(user_id);
    const transaction = await pool.query(
      `
          INSERT INTO transactions (
              user_id, 
              amount,
              transaction_type,
              gateway_option,
              balance
              )
          VALUES ($1, $2, 'Withdrawal', $3, $4) RETURNING *
          `,
      [user_id, Number(amount), gateway_option, balance - Number(amount)]
    );

    res.json(transaction.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const balance = (req, res) => {
  getBalance(req.user.user_id)
    .then((balance) => res.status(200).json({ balance }))
    .catch((error) => res.status(500).send(error));
};

export { withdraw, cashIn, balance };
