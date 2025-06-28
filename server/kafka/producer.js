const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9092'],
})

const producer = kafka.producer()

const main = async() => {

    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    });
    // await producer.disconnect()
};

main();