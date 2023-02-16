import bcrypt from "bcryptjs";
import { generateJWT } from "../jwt/jwtGenerator.js";
import { connectDatabase } from "../pool.js";

const pool = connectDatabase();

const registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      barangay,
      city,
      region,
      email,
      phone_number,
    } = req.body;

    //Check if the user is already existing
    const user = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    if (user.rows.length > 0) {
      res.status(401).send("User already exists");
    }

    //Setup Bcrypt for password hashing

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //Add the new user into the database
    //generate the uuid using the uuidv4() function
    const newUser = await pool.query(
      `
        INSERT INTO users (
          username, 
          password,
            first_name,
            last_name,
            barangay,
            city,
            region,
            email,
            phone_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `,
      [
        username,
        bcryptPassword,
        first_name,
        last_name,
        barangay,
        city,
        region,
        email,
        phone_number,
      ]
    );

    //generate and return the JWT token
    const token = generateJWT(newUser.rows[0]);

    res.json({
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    //take the username and password from the req.body
    const { username, password } = req.body;

    //Check if the user is not existing
    const user = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).send("User does not exists");
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //generate and return the JWT
    const token = generateJWT({ user_id: user.rows[0].user_id });
    res.json({
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
};

// provide the auth middleware
const verify = async (req, res) => {
  const id = req.user.user_id;
  try {
    await pool.query(
      "SELECT * FROM users WHERE user_id=$1 ",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json({ user: results.rows[0] });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
};

const getUsers = async (request, response) => {
  await pool.query(
    "SELECT * FROM users ORDER BY user_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  await pool.query(
    "DELETE FROM users WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  );
};

const updateUser = async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    barangay,
    city,
    email,
    phone_number,
  } = req.body;
  await pool.query(
    "UPDATE users SET username = $1, first_name = $2, last_name = $3, barangay = $4, city = $5, email = $6, phone_number = $7 WHERE user_id = $8",
    [
      username,
      first_name,
      last_name,
      barangay,
      city,
      email,
      phone_number,
      req.user.user_id,
    ],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    }
  );
};

const getUserById = async (req, res) => {
  await pool.query(
    `SELECT 
        user_id,
        username, 
        first_name, 
        last_name,
        barangay,
        city,
        region,
        email,
        phone_number  
        FROM users WHERE user_id = $1`,
    [req.user.user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

export {
  registerUser,
  loginUser,
  verify,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
