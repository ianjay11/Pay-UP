import { connectDatabase } from  "../pool.js";
const pool = connectDatabase()

const transactions = async (req, res) => {
    try {
        const user_id = req.user.id;
        const  {
            deal_id,
            amount,
            transaction_type,
            gateway_id,
            status
        } = req.body

        const transaction = await pool.query(`
        INSERT INTO transactions (
            user_id, 
            deal_id,
            amount,
            transaction_type,
            gateway_id,
            status)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `, [user_id,
            deal_id,
            amount,
            transaction_type,
            gateway_id,
            status])
    
        res.json(transaction.rows)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
};

    export { transactions }

    