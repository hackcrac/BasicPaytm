const express = require("express");
const {authMiddleware} = require("../middleware");
const {Account, User} = require("../db");
const mongoose = require("mongoose");
const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware , async (req, res)=>{
    const account = await Account.findOne({userId: req.userId});
    res.json({
        balance: account.balance
    });
})

accountRouter.post('/transfer', authMiddleware, async(req, res)=>{
    const senderId = req.userId;
    const receiverId = req.body.to;
    const receiver = Account.findOne({userId: receiverId});
    const sender = Account.findOne({userId: senderId});
    const [receiverData, senderData] = await Promise.all([receiver, sender]);
    if(!receiverData){
        return res.status(400).json({
            message: "Invalid account"
        })
    }
    const senderBalance = senderData.balance;
    const amountToTransfer = req.body.amount;
    if(senderBalance < amountToTransfer){
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        await Account.updateOne({userId: senderId}, {$inc: {balance: -amountToTransfer}}).session(session);
        await Account.updateOne({userId: receiverId}, {$inc: {balance: amountToTransfer}}).session(session);
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        })
    }
    catch(err){
        await session.abortTransaction();
        res.status(500).json({
            message: "Internal server error"
        })
    }

})

module.exports = {
    accountRouter
}