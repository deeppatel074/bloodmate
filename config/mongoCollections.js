const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection.connectToDb();
            _col = await db.collection(collection);
        }

        return _col;
    };
};


module.exports = {
    students : getCollectionFn('students'),
    events : getCollectionFn('events')

};