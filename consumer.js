const amqp = require("amqplib");

async function consumeMessage() {

    // 1. Connect
    const connection = await amqp.connect("amqp://localhost:5672");

    // 2. Create channel
    const channel = await connection.createChannel();

    // 3. Queue name
    const queue = "hello";

    // 4. Ensure queue exists
    await channel.assertQueue(queue, {
        durable: true      // doesn't gets deleted on server restart
    });

    console.log("Waiting for messages...");

    // 5. Consume messages
    channel.consume(queue, (message) => {

        throw new Error("Crash");
        console.log("Received:", message.content.toString());
        channel.ack(message);

    }, {
        // noAck: true  // mq server assumes success immedietly, doesn't wait for acknowledgement from consumer
    });
}

consumeMessage();