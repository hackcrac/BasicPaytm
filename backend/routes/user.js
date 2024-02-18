const express = require("express");
const zod = require("zod");
const {User, Account} = require("../db");
const jwtToken = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middleware");
const userRouter = express.Router();

const signUpSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})


userRouter.post('/signup', async (req, res) => {
    const {success} = signUpSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }
    const userAlreadyExist = await User.findOne({username: req.body.username})
    if (userAlreadyExist) {
        res.status(411).json({
            message: "Email already taken"
        })
        return;
    }
    try {
        const user = await User.create(req.body);
        const userId = user._id;

        await Account.create({
            userId,
            balance: Math.floor(Math.random()*10000) + 1
        })

        const token = jwtToken.sign({userId}, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (err) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }
});

const signSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signin", async (req, res) => {
    const {success} = signSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }
    const user = await User.findOne(req.body);
    if (!user) {
        res.status(411).json({
            message: "Error while logging in"
        })
        return;
    }
    const userId = user._id;
    const token = jwtToken.sign({userId}, JWT_SECRET);
    res.json({
        token
    });
});

const userUpdateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

userRouter.put('/', authMiddleware, async (req, res) => {
    const {success} = userUpdateSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
        return;
    }
    try {
        const userId = req.userId;
        await User.updateOne({_id: userId}, req.body);
        res.json({
            message: "Updated successfully"
        })
    } catch (err) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter;
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });
    res.json({
        user: users.map(user =>(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        ))
    });
});

module.exports = userRouter;

