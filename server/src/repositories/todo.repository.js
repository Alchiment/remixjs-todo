import dbConn from "../../utils/db/database.js";
import {ObjectId} from "mongodb";
import {internalError} from "../graphql/common-methods.resolver.js";

export async function fetchTodos() {
    const conn = await dbConn.getConnection();
    return await conn.collection('todos').find({
        // $or: [
        //     {isDeleted: {$exists: false, $nin: [true]}},
        //     {isDeleted: false}
        // ]
    }).toArray();
}

export async function fetchTodoById({id}) {
    const conn = await dbConn.getConnection();
    return await conn.collection('todos').findOne({
        "_id": new ObjectId(id)
    });
}

export async function createTodo(inputData) {
    const conn = await dbConn.getConnection();
    const dataRequest = { ...inputData };
    delete dataRequest._id;
    const todoInserted = await conn.collection('todos').insertOne(dataRequest);
    return {
        _id: todoInserted.insertedId.toString(),
        ...inputData,
    };
}

export async function updateTodoById(inputData) {
    const conn = await dbConn.getConnection();
    const todoDB = await fetchTodoById({id: inputData._id});
    if (!todoDB) {
        throw new internalError('TODO does not exists');
    }
    const dataRequest = {
        ...todoDB,
        ...inputData
    };
    delete dataRequest._id;
    await conn.collection('todos').updateOne({
        "_id": new ObjectId(inputData._id)
    }, {
        $set: dataRequest
    });
    return {
        _id: inputData._id,
        ...dataRequest,
    };
}

export async function restoreTodoById(_id) {
    const connection = await dbConn.getConnection();
    await connection.collection('todos').updateOne({_id: new ObjectId(_id)}, {$set: {isDeleted: false}});
    return _id;
}

export async function destroyTodo(id) {
    const conn = await dbConn.getConnection();
    const collection = await conn.collection('todos');
    await collection.deleteOne({_id: new ObjectId(id)});
    return id;
}

export async function softDeleteTodo(_id) {
    const connection = await dbConn.getConnection();
    await connection.collection('todos').updateOne({_id: new ObjectId(_id)}, {$set: {isDeleted: true}});
    return _id;
}