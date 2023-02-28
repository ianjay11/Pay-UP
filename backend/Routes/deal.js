import { connectDatabase } from "../pool.js";
const pool = connectDatabase();

//creating a deal
const deal = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const {
      item_description,
      courier_name,
      quantity,
      amount,
      courier_tracking,
      buyer_id,
    } = req.body;

    if (
      !item_description ||
      !courier_name ||
      !quantity ||
      !amount ||
      !courier_tracking ||
      !buyer_id
    ) {
      return res.status(400).send({
        error: "Required fields missing.",
      });
    }

    const newDeal = await pool.query(
      `
          INSERT INTO deal (
            item_description,
            courier_name,
            quantity,
            seller_id,
            amount,
            courier_tracking, 
            buyer_id,
            status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING')
          RETURNING *
        `,
      [
        item_description,
        courier_name,
        quantity,
        user_id,
        amount,
        courier_tracking,
        buyer_id,
      ]
    );

    res.status(201).send(newDeal.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Something went wrong while creating the deal.",
    });
  }
};

//method for editing a deal
const editDeal = async (req, res) => {
  const id = req.params.id;
  try {
    const {
      item_description,
      courier_name,
      quantity,
      amount,
      courier_tracking,
    } = req.body;

    const editDeal = await pool.query(
      `
        UPDATE deal SET
            item_description=$1,
            courier_name =$2,
            quantity= $3,
            amount=$4,
            courier_tracking=$5,
            status='PENDING',
            updated_at=CURRENT_TIMESTAMP
            WHERE deal_id=$6 RETURNING * 
        `,
      [item_description, courier_name, quantity, amount, courier_tracking, id]
    );

    res.json(editDeal.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

///for admin showing all deals from the database
const showAlldDeals = async (req, res) => {
  try {
    const showDeals = await pool.query(`
        SELECT * FROM deal
        `);
    res.json(showDeals.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//all deals from the logged user
const getDealsByUser = async (req, res) => {
  const status = req.params.status;
  try {
    let results;
    if (status !== "ALL") {
      results = await pool.query(
        `SELECT 
          deal_id,
          item_description,
          courier_name,
          quantity,
          seller_id,
          amount,
          courier_tracking,
          status 
          FROM deal WHERE seller_id = $1 AND status=$2 ORDER BY deal_id`,
        [req.user.user_id, status]
      );
    } else {
      results = await pool.query(
        `SELECT 
            deal_id,
            item_description,
            courier_name,
            quantity,
            seller_id,
            amount,
            courier_tracking,
            status 
            FROM deal WHERE seller_id = $1 ORDER BY deal_id`,
        [req.user.user_id]
      );
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

//deal for the buyer side to access the created deal
//by the seller
const getBuyerDeal = async (req, res) => {
  const status = req.params.status;
  try {
    let results;
    if (status !== "ALL") {
      results = await pool.query(
        `SELECT 
          deal_id,
          item_description,
          courier_name,
          quantity,
          seller_id,
          amount,
          courier_tracking,
          status 
          FROM deal WHERE buyer_id=$1 AND status=$2 ORDER BY deal_id`,
        [req.user.user_id, status]
      );
    } else {
      results = await pool.query(
        `SELECT 
            deal_id,
            item_description,
            courier_name,
            quantity,
            seller_id,
            amount,
            courier_tracking,
            status 
            FROM deal WHERE buyer_id = $1 ORDER BY deal_id`,
        [req.user.user_id]
      );
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete deal
const deleteDeal = async (req, res) => {
  const deal_id = req.params.id;
  await pool.query(
    "DELETE FROM deal WHERE deal_id = $1",
    [deal_id],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "Deal deleted successfully",
      });
    }
  );
};

const updateDealStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const updatedDeal = await pool.query(
    "UPDATE deal SET status=$1 WHERE deal_id = $2",
    [status, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "Status updated successfully",
      });
    }
  );
};

export {
  deal,
  editDeal,
  showAlldDeals,
  getDealsByUser,
  getBuyerDeal,
  deleteDeal,
  updateDealStatus,
};
