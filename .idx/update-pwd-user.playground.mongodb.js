// The current database to use.
use('remixjs_lab');

// Replace "" with the ID of the user registered.
db.getCollection('users').updateOne({_id: ObjectId("")}, {
    $set: {
        // replace password with a hashed password
        password: ""
    }
});
