const amqp = require("amqplib");

async function worker(name) {

    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    const queue = "tasks";

    await channel.assertQueue(queue, {
        durable: true
    });

    console.log(name, "waiting...");
    await channel.prefetch(1);
    channel.consume(queue, async (msg) => {

        const content = msg.content.toString();

        console.log(name, "processing", content);

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        console.log(name, "done", content);

        channel.ack(msg);

    });
}

worker(process.argv[2]);