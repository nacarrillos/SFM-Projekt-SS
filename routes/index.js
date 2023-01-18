const express = require("express");
//Import aus den Authentifizierung Controllers
const { register, login, logout, protected } = require("../controllers/auth");
const router = express.Router();
const db = require("../db");
const { validationMiddleware } = require("../middleware/validation-middleware");
const {
  registerValidation,
  loginValidation,
  searchValidation,
  passwordChangeValidation,
} = require("../validators");
const { userAuth } = require("../middleware/auth-middleware");
const { hash } = require("bcryptjs");

// Alte API für den Abruf von Information aus einem Bauteil durch ID
router.get("/api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await db.query("select * from bauteileserie where id=$1", [
      id,
    ]);
    const bauteileID = rows[0].bauteile_id;
    const results = await db.query("select * from bauteile where id=$1", [
      bauteileID,
    ]);
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

router.get("/api/:id/haus", async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await db.query(
      "select haus_id from bauteileserie where id=$1",
      [id]
    );
    const houseID = rows[0].haus_id;
    const results = await db.query("select * from haeuse where id=$1", [
      houseID,
    ]);
    const besitzerID = results.rows[0].besitzer_id;
    const results2 = await db.query("select * from benutzer where id=$1", [
      besitzerID,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        haus: results.rows,
        besitzer: results2.rows[0].benutzername + results2.rows[0].nachname,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//API für den Abruf von Information aus einem Bauteil durch Teilenummer
router.get("/api/aufbau/aussenwand/:teilenummer", async (req, res) => {
  try {
    const teilenummer = req.params.teilenummer;
    const results = await db.query(
      "select * from bauteile where teilenummer=$1",
      [teilenummer]
    );
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

//Alte API für den Abruf der Historie aus einem Bauteil durch ID
router.get("/api/:id/historie", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query(
      "select * from aufgaben where bauteilserie_id=$1",
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

//API unnötig weil Stückliste nicht mit realen aufgaben
//API für den Abruf der Historie aus einem Bauteil durch ID
// router.get("/api/aufbau/aussenwand/:teilenummer/historie", async (req, res) => {
//   try {
//     const teilenummer = req.params.teilenummer;
//     const results = await db.query(
//       "select * from aufgaben where teilenummer=$1",
//       [teilenummer]
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         historie: results.rows,
//       },
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

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
router.post(
  "/user/register",
  registerValidation,
  validationMiddleware,
  register
);

//API um das Status der Sperrung eines benutzer zu prüfen
router.get(
  "/user/userblocked/:benutzername",
  searchValidation,
  validationMiddleware,
  async (req, res) => {
    try {
      const benutzername = req.params.benutzername;
      const results = await db.query(
        "select gesperrt from benutzer where benutzername=$1",
        [benutzername]
      );
      res.status(200).json({
        status: "success",
        data: {
          blocked: results.rows[0].gesperrt,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  }
);

//API um ein User zu sperren bzw. entsperren
router.put("/user/blockuser/:benutzername", async (req, res) => {
  try {
    const benutzername = req.params.benutzername;
    const { rows } = await db.query(
      "select * from benutzer where benutzername=$1",
      [benutzername]
    );
    if (rows[0].gesperrt) {
      await db.query(
        "UPDATE benutzer SET gesperrt=false WHERE benutzername=$1",
        [benutzername]
      );
      return res.status(200).json({
        success: true,
        user: benutzername,
        blocked: !rows[0].gesperrt,
        message: "User entsperrt!",
      });
    } else {
      await db.query(
        "UPDATE benutzer SET gesperrt=true WHERE benutzername=$1",
        [benutzername]
      );
      return res.status(200).json({
        success: true,
        user: benutzername,
        blocked: !rows[0].gesperrt,
        message: "User gesperrt!",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

//API um ein User zu löschen, wenn der User schon Aufgabe erledigt hat wird ein Fehler erzeugt werden
router.delete("/user/deleteuser/:benutzername", async (req, res) => {
  try {
    const benutzername = req.params.benutzername;
    await db.query("DELETE FROM benutzer WHERE benutzername=$1", [
      benutzername,
    ]);
    return res.status(200).json({
      success: true,
      user: benutzername,
      message: "User gelöscht!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

//API um die komplette Information eines benutzer zu bekommen
router.get("/user/getdata/:benutzername", async (req, res) => {
  try {
    const benutzername = req.params.benutzername;
    const { rows } = await db.query(
      "SELECT * FROM benutzer WHERE benutzername=$1",
      [benutzername]
    );
    console.log(rows[0]);

    return res.status(200).json({
      success: true,
      benutzername: rows[0].benutzername,
      benutzertyp: rows[0].benutzertyp,
      name: rows[0].name,
      nachname: rows[0].nachname,
      kontakt: rows[0].kontakt,
      adresse: rows[0].adresse,
      message: "Information des Users erhalten!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

//API um die Daten eines Benutzer zu editieren
router.put("/user/edituser/:benutzername", async (req, res) => {
  try {
    const { benutzername, benutzertyp, name, nachname, kontakt, adresse } =
      req.body;
    await db.query(
      "UPDATE benutzer SET benutzername=$1, benutzertyp=$2, name=$3, nachname=$4, kontakt=$5, adresse=$6  WHERE benutzername=$1",
      [benutzername, benutzertyp, name, nachname, kontakt, adresse]
    );
    return res.status(200).json({
      success: true,
      message: "User erfolgreich bearbeitet",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.put(
  "/user/changepassword/:benutzername",
  passwordChangeValidation,
  validationMiddleware,
  async (req, res) => {
    try {
      const { benutzername, kennwort } = req.body;
      const hashedPassword = await hash(kennwort, 10);
      await db.query(
        "UPDATE benutzer SET benutzername=$1, kennwort=$2 WHERE benutzername=$1",
        [benutzername, hashedPassword]
      );
      return res.status(200).json({
        success: true,
        message: "Passwort erfolgreich geändert",
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
