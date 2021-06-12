module.exports = () => {
  const start = async ({ mongodb, config, logger }) => {
    const db = await mongodb.db(config.databaseName);
    const collection = await db.collection(config.collectionName);

    const saveMessage = async (message, receptionTimestamp) => {
      await collection.updateOne(
        { id: message.id },
        {
          $set: {
            text: message.text,
            receptionTimestamp,
          },
        },
        { upsert: true },
      );
      logger.info(`Message with id: ${message.id} stored into DB`);
    };

    const getMessage = async id => {
      const message = await collection.findOne({ id }, { _id: false });
      logger.info(`Message with id: ${id} retrieved from DB`);
      return message;
    };

    return {
      saveMessage,
      getMessage,
    };
  };

  return { start };
};
