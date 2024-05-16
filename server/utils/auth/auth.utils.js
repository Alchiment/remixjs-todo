import bcrypt from 'bcryptjs';
export const secret = process.env.JWT_HASH || '';
export const saltRounds = 12;

export async function generateHash(password) {
    const salt = await bcrypt.genSaltSync(saltRounds);
    return await bcrypt.hashSync(password, salt);
}