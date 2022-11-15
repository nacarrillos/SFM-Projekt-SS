const express = require("express");
//Import aus den Authentifizierung Controllers
const { register, login, logout, protected } = require("../controllers/auth");
const router = express.Router();
const db = require("../db");
const { validationMiddleware } = require("../middleware/validation-middleware");
const { registerValidation, loginValidation } = require("../validators");
const { userAuth } = require("../middleware/auth-middleware");

//API für den Abruf von Information aus einem Bauteil durch ID
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

//API für den Abruf der Historie aus einem Bauteil durch ID
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

//API für den Abruf vom Benutzertyp aus einem Benutzer mit dem Benutzername -> zur Darstellung der Seiten anders für jede Benutzertyp
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

//API für das Einloggen
router.post("/user/login", loginValidation, validationMiddleware, login);

//API für das Ausloggen
router.get("/user/logout", logout);

//API für die Überprüfung von Credentials, bevor es in einem Protected Route gegangen werden kann
router.get("/user/protected", userAuth, protected);

//API für die Registrierung
router.post("/user/register", registerValidation, register);

module.exports = router;
