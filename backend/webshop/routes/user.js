const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {sequelize} = require("../config/database");

router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.get("/getUserById/:userid", async (req, res) => {
    try {
        const user_id = req.params.userid;
        const user = await User.findOne({where:{user_id:user_id}})

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.json(user)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.post("/addUser", async (req, res) => {
    try {
        const { name, surname, email } = req.body;

        if (!name || !surname || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await User.create({
            name: name,
            surname: surname,
            email: email,
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.put("/updateUser/:userid", async (req, res) => {
    try {
        const user_id = req.params.userid;
        const { name, surname, email } = req.body;

        if (!name && !surname && !email) {
            return res.status(400).json({ error: "At least one field (name, surname, or email) must be provided to update" });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.update({
            name: name || user.name,
            surname: surname || user.surname,
            email: email || user.email,
        });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

router.delete("/delUserById/:userid", async (req, res) => {
    try {
        const user_id = req.params.userid;
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();

        res.status(200).json({ message: `User with ID ${user_id} deleted successfully` });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

module.exports = router;