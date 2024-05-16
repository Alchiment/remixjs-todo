import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { generateHash, secret } from "../../../utils/auth/auth.utils.js";
import {fetchUserByEmailPwd} from "../../repositories/user.repository.js";

export async function loginController(req, res) {
    const { email, password } = req.body;
    // return res.json(await generateHash(password));
    const user = await fetchUserByEmailPwd({email});
    const comparePwd = user ? bcrypt.compareSync(password, user.password) : false;
    if (!user || !comparePwd) {
        res.status(401).json({
            message: 'Incorrect user or password'
        });
    } else {
        const claims = { sub: user._id.toString(), email: user.email };
        const token = jwt.sign(claims, secret);
        res.json({
            token,
            fullname: `${user.firstName} ${user.lastName}`,
            email: user.email,
            id: user._id.toString()
        });
    }
}
