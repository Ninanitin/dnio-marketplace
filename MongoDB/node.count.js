const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB Count Node: Invoked!");
    try {
        logger.trace(`MongoDB Count Node: Input - ${JSON.stringify(inputData)}`);

        if (!inputData.collection) {
            logger.error('MongoDB Count Node: Collection name is missing');
            throw new Error('Collection name is missing');
        }

        const count = await connectorData.db.collection(inputData.collection).countDocuments(inputData.filter || {});
        logger.trace(`MongoDB Count Node: Count result - ${count}`);
        return count ;
    } catch (error) {
        logger.error(`MongoDB Count Node: Error counting documents from MongoDB: ${error}`);
        throw {
            "code": "MONGODB_COUNT_ERROR",
            "message": "Error counting documents from MongoDB",
            "stackTrace": error
        };
    }
};
