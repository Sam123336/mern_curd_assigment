const userModel = require("../models/user");

const getAllUsers = async (req, res) => {
    const allusers = await userModel.find({});
    if (!allusers || allusers.length === 0) {
        return res.status(404).json({
            message: "No users found"
        });
    }
    
     // If you want to limit the number of users returned, you can use:
     // const allusers = await userModel.find({}).limit(10);

     // If you want to sort the users, you can use:
     // const allusers = await userModel.find({}).sort({ name: 1 }); // Sort by name in ascending order

    res.status(200).json({
        message: "all users fetched",
        allusers
    })
}
const getUserById = async (req, res) => {
    try{
        const User = await userModel.findById(req.params.id);
        if (!User) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User fetched",
            User
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}
const createUser = async (req, res) => {
    try {
        const newUser = new userModel({...req.body});
        console.log(req);
        await newUser.save();
        res.status(201).json({
            message: "New user created",
            newUser
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated",
            updatedUser
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted",
            deletedUser
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser

}