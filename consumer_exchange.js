const amqp = require("amqplib");

async function consume() {

    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    const exchange = "direct_logs";
    const exchange2 = "fanout_exchange";

    await channel.assertExchange(exchange, "direct", {
        durable: true
    });

    const q = await channel.assertQueue("email_queue", {    
        durable: true
    });
    const q2 = await channel.assertQueue("hello", {    
        durable: true
    });

    await channel.bindQueue(q.queue, exchange2, "");    //binding with fanout exchange requires no binding key
    await channel.bindQueue(q2.queue, exchange2, "");

    console.log("Waiting...");

    channel.consume(q.queue, (msg) => {

        console.log(msg.content.toString());

        channel.ack(msg);

    });
}

consume();