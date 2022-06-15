const express = require("express");
const { register, login, logout, protected } = require("../controllers/auth");
const router = express.Router();
const db = require("../db");
const { validationMiddleware } = require("../middleware/validation-middleware");
const { registerValidation, loginValidation } = require("../validators");
const { userAuth } = require("../middleware/auth-middleware");

//get Bauteileinfo
router.get("/api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query("select * from bauteile where id=$1", [id]);

    res.status(200).json({
      status: "success",
      data: {
        bauteil: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//get Historie
router.get("/api/:id/historie", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query(
      "select * from aufgaben where bauteil_id=$1",
      [id]
    );

    res.status(200).json({
      status: "success",
      data: {
        historie: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//get Benutzetyp zur Darstellung der Seite
router.get("/user/benutzertyp/:benutzername", async (req, res) => {
  try {
    const benutzername = req.params.benutzername;
    const results = await db.query(
      "select benutzertyp from benutzer where benutzername=$1",
      [benutzername]
    );
    res.status(200).json({
      status: "success",
      data: {
        benutzertyp: results.rows[0].benutzertyp,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Login

router.post("/user/login", loginValidation, validationMiddleware, login);

//Logout

router.get("/user/logout", logout);

router.get("/user/protected", userAuth, protected);

module.exports = router;
