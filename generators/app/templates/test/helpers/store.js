let collection;
const start = async ({ mongodb, config }) => {
  const db = await mongodb.db(config.databaseName);
  collection = await db.collection(config.collectionName);
};

const emptyCollection = async () => {
  await collection.deleteMany({});
};

module.exports = {
  start,
  emptyCollection,
};
