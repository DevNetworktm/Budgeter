import "dotenv/config";

import { Request, Response } from "express";

// tools
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

// Models
import Account from "../models/Account";
import User from "../models/User";

export const AuthSignUpController = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const account = await new Account({
        cashIn: [],
        cashOut: []
    }).save();

    const passwordHash = await bcrypt.hashSync(password, await bcrypt.genSaltSync(10))

    const user = new User({
        username,
        password: passwordHash,
        account: account._id
    }).save();

    return res.status(201).send('User in correctly save !')
}

export const AuthSignInController = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await User.findOne({
        username
    })

    if (!await bcrypt.compareSync(password, user.password)) return res.sendStatus(403);


    const jwt = Jwt.sign({_id: user._id, username: user.username, account: user.account}, process.env.ENCRYPT_JWT, {
        expiresIn: "3d"
    })

    return res.status(200).json({jwt})
}