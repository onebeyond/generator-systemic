module.exports = () => {
  const start = async ({ logger, bus, store }) => {
    bus.subscribe('demo_subscription', {}, (err, subscription) => {
      if (err) throw err; // subscription didn't exist
      subscription.on('message', async (message, content, ackOrNack) => {
        // message handler logic
        logger.info(`New message received from bus: ${JSON.stringify(content)}`);
        const receptionTimestamp = new Date();
        await store.saveMessage(content, receptionTimestamp.toISOString());
        ackOrNack();
      }).on('error', error => {
        logger.error('Subscriber error', error);
      }).on('invalid_content', (error, message, ackOrNack) => {
        logger.error('Invalid content', error);
        ackOrNack(err);
      });
    });

    return {};
  };

  return { start };
};
