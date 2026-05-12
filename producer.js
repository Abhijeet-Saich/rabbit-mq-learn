const amqp = require("amqplib");

async function sendMessage() {
    // 1. Create TCP connection
    const connection = await amqp.connect("amqp://localhost:5672");

    // 2. Create channel (virtual communication stream) (many channels can share one connection)
    const channel = await connection.createChannel();

    // 3. Queue name
    const queue = "hello";

    // 4. Ensure queue exists (if not create it)
    await channel.assertQueue(queue, {
        durable: true
    });

    // 5. Message
    const message = "Hello RabbitMQ";

    // 6. Send message (only binary format allowed)
    channel.sendToQueue(queue, Buffer.from(message),{
        persistent : true       // message stays even if we restart broker
    });

    console.log("Message sent:", message);

    // 7. Close connection
    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage();