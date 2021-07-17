const throng = require('throng')
const { Consumer } = require('sqs-consumer');
const AWS = require("aws-sdk")
const https = require("https")
require("dotenv").config()

const messageRepository = require("./respository/MessageRepository");


throng((id, disconnect) => {
    console.log("Consumer => " + id)
    const app = Consumer.create({
        queueUrl: process.env.AWS_QUEUE_URL,
        sqs: new AWS.SQS({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_ID
            },
            region: process.env.AWS_REGION,
            httpOptions: {
                agent: new https.Agent({
                    keepAlive: true
                })
            }
        }),
        handleMessage: async (message) => {
            console.log(message);
            await messageRepository.insert(message.Body);
            console.log("message inserted!!!!")
        }
    });
    
    app.on('error', (err) => {
        console.error(err.message);
    });
    
    app.on('processing_error', (err) => {
        console.error(err.message);
    });

    process.on('SIGTERM', () => {
        console.log(`Worker ${id} exiting (cleanup here)`)
        database.end()
        disconnect()
    })

    app.start()
    
})
