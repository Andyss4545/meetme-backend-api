const express = require('express');
const router = express.Router();


router.put('/login', (req, res) => {
     res.status(201).json({message: "This is login"})
})



module.exports = router