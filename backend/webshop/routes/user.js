const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {sequelize} = require("../config/database");

router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {}
})

router.get("/getUserById/:userid", async (req, res) => {
    try {
        const user_id = req.params.userid;
        // const user = await sequelize.query(`SELECT * FROM Users WHERE user_id = :id`, {
        //     replacements: {id:user_id},
        // });
        const user = await User.findOne({where:{user_id:user_id}})
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.json(user)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

module.exports = router;