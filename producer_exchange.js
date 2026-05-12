const amqp = require("amqplib");

async function publish() {

    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    const exchange = "direct_logs";
    const fanout_ = "fanout_exchange";

    await channel.assertExchange(exchange, "direct", {    // created an exchange, routing key matches to name of queue by default
        durable: true
    });

    await channel.assertExchange(fanout_, "fanout", {    // created an fanout exchange
        durable: true
    });

    const routingKey = "email";

    const message = "Welcome Email";
    const message2 = "fan fan fan!!!";

    // channel.publish(exchange, routingKey, Buffer.from(message));
    channel.publish(fanout_,'' , Buffer.from(message)); // to publish to fanout exchange,2nd parameter is for quese (empty in this case)

    console.log("Sent:", message);

    setTimeout(() => connection.close(), 500);
}

publish();