import { connectDatabase } from "../pool.js";
const pool = connectDatabase();

async function getBalance(user_id) {
  const result = await pool.query(
    `SELECT balance FROM transactions WHERE user_id=$1 ORDER BY transaction_id DESC LIMIT 1`,
    [user_id]
  );
  return Number(result.rows[0]?.balance ?? 0);
}

async function dealAmount(deal_id) {
  const amount = await pool.query(`SELECT amount FROM deal WHERE deal_id=$1`, [
    deal_id,
  ]);
  return amount.rows[0].amount;
}

async function seller(deal_id) {
  const seller = await pool.query(
    `SELECT seller_id FROM deal WHERE deal_id=$1`,
    [deal_id]
  );
  return seller.rows[0].seller_id;
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

// subtract money to buyer
const accept = async (req, res) => {
  try {
    const deal_id = Number(req.params.deal_id);
    const user_id = req.user.user_id;
    const [balance, amount] = await Promise.all([
      getBalance(user_id),
      dealAmount(deal_id),
    ]);
    const transaction = await pool.query(
      `
          INSERT INTO transactions (
              user_id,
              deal_id, 
              amount,
              transaction_type,
              gateway_option,
              balance
              )
          VALUES ($1, $2, $3, 'Buy', 'Deal', $4) RETURNING *
          `,
      [user_id, deal_id, Number(amount), balance - Number(amount)]
    );

    res.json(transaction.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//add money to the seller
const received = async (req, res) => {
  try {
    const deal_id = Number(req.params.deal_id);
    const user_id = await seller(deal_id)
    const [balance, amount] = await Promise.all([
      getBalance(user_id),
      dealAmount(deal_id),
    ]);

    const transaction = await pool.query(
      `
        INSERT INTO transactions (
            user_id,
            deal_id, 
            amount,
            transaction_type,
            gateway_option,
            balance
            )
        VALUES ($1, $2, $3, 'Sell', 'Deal', $4) RETURNING *
        `,
      [user_id, deal_id, Number(amount), balance + Number(amount)]
    );

    res.json(transaction.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { withdraw, cashIn, balance, accept, received };
