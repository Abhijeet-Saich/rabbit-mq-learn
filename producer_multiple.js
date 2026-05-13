const amqp = require("amqplib");

async function publish() {

    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    const queue = "tasks";

    await channel.assertQueue(queue, {
        durable: true
    });

    for (let i = 1; i <= 10; i++) {

        const msg = `Task ${i}`;

        channel.sendToQueue(
            queue,
            Buffer.from(msg),
            {
                persistent: true
            }
        );

        console.log("Sent:", msg);
    }

    setTimeout(() => connection.close(), 500);
}

publish();