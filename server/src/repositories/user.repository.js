import {ObjectId} from "mongodb";
import dbConn from "../../utils/db/database.js";
import {generateHash} from "../../utils/auth/auth.utils.js";
import {internalError} from "../graphql/common-methods.resolver.js";
import {UserDto} from "../dtos/user/user.dto.js";

export async function fetchUsers() {
    const conn = await dbConn.getConnection();
    return await conn.collection('users').find().toArray();
}

export async function verifyIfUserExist({email, identification}) {
    const conn = await dbConn.getConnection();
    return await conn.collection('users').find({
        $or: [
            {email},
            {identification}
        ]
    }).count();
}

export async function fetchUserByEmailPwd({email}) {
    const conn = await dbConn.getConnection();
    return await conn.collection('users').findOne({email});
}

export async function fetchUserById({id}) {
    const conn = await dbConn.getConnection();
    return await conn.collection('users').findOne({
        "_id": new ObjectId(id)
    });
}

export async function fetchUserByField(field, value) {
    const conn = await dbConn.getConnection();
    return await conn.collection('users').findOne({
        [field]: value
    });
}

export async function createUser(inputData) {
    const {identification, email, password} = inputData;
    const isUserExist = await verifyIfUserExist({email, identification});
    if (isUserExist) {
        throw new internalError('User already exists with this email or identification');
    }
    const dataRequest = new UserDto(inputData);
    if (password) {
        dataRequest.password = await generateHash(password);
    } else {
        dataRequest.password = null;
    }
    const conn = await dbConn.getConnection();
    delete dataRequest._id;
    const userInserted = await conn.collection('users').insertOne(dataRequest);
    return {
        _id: userInserted.insertedId.toString(),
        ...dataRequest,
    };
}

export async function updateUser(inputData) {
    const {_id, identification, email, password} = inputData;

    const currentUser = await fetchUserById({id: _id});
    if (!currentUser) { throw new internalError('User not found') }

    const conn = await dbConn.getConnection();
    const collection = await conn.collection('users');
    const dataRequest = new UserDto(inputData);

    if (currentUser.email !== email) {
        const isUserExist = await verifyIfUserExist({email, identification});
        if (isUserExist) {
            throw new internalError('User already exists with this email or identification');
        }
    }

    if (password) {
        dataRequest.password = await generateHash(password);
    }

    delete dataRequest._id;

    await collection.updateOne({_id: new ObjectId(_id)}, {$set: dataRequest});
    return {
        _id,
        ...dataRequest,
    };
}
