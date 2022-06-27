const {check} = require('express-validator');
const db = require('../db');
const {compare} = require('bcryptjs');

const kennwort = check('kennwort').isLength({min: 8, max: 20}).withMessage('Passwort muss zwischen 8 und 20 Zeichen besitzen')

const benutzerExists = check('benutzername').custom(async(value)=>{
  const {rows} = await db.query('Select * from benutzer where benutzername = $1' , [value])
  if (rows.length) {
    throw new Error ('Benutzername bereits vorhanden')
  }
})

const benutzertypValidation = check('benutzertyp').isIn(["Besitzer", "Handwerker", "Monteur", "Produktionsmitarbeiter"]).withMessage('Benutzertyp existiert nicht')

const loginFieldsCheck = check('benutzername').custom(async(value,{req})=>{
  const benutzer = await db.query('Select * from benutzer where benutzername = $1',[value])
  if (!benutzer.rows.length){
    throw new Error('Benutzername nicht vorhanden')
  }
  const validPassword = await compare(req.body.kennwort, benutzer.rows[0].kennwort)
  if (!validPassword){
    throw new Error('Falsches Passwort')
  }
  req.benutzer = benutzer.rows[0]
})

module.exports ={ registerValidation: [kennwort,benutzerExists, benutzertypValidation], loginValidation:[loginFieldsCheck]}