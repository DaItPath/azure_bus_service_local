// Import the Azure Service Bus SDK
const { ServiceBusClient } = require("@azure/service-bus");

// Define your connection string and queue name
const connectionString = "Endpoint=sb://172.18.160.158:5672;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";
const queueName = "notification_module_email_queue";

async function main() {
  // Create a ServiceBusClient
  const sbClient = new ServiceBusClient(connectionString);

  // Create a sender to send messages to the queue
  const sender = sbClient.createSender(queueName);
  let receiver;

  try {
    // Send a message
    console.log("Sending a message to the queue...");
    await sender.sendMessages({ body: "Hello Azure Service Bus!" });

    console.log("Message sent successfully!");

    // Create a receiver to receive messages from the queue
    console.log("Receiving a message from the queue...");
    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length > 0) {
      console.log(`Received message: ${receivedMessages[0].body}`);
      // Complete the message to remove it from the queue
      await receiver.completeMessage(receivedMessages[0]);
    } else {
      console.log("No messages received");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the sender and receiver when done
    await sender?.close();
    await receiver?.close();
    await sbClient?.close();
  }    receiver = sbClient.createReceiver(queueName, {
      receiveMode: "peekLock",
    });

    // Receive a single message from the queue

}

const test = async () => {
  try {
    console.log("Sending a message to the queue...");
    const connectionStringT = "Endpoint=sb://172.18.160.158:5672;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";
    const queueName = "notification_module_email_queue";
    const sbClient = new ServiceBusClient(connectionStringT);
    const sender = sbClient.createSender(queueName);
    await sender.sendMessages({ body: "Hello Azure Service Bus!" });
    console.log("Message sent successfully!");

    // Create a receiver to receive messages from the queue
    console.log("Receiving a message from the queue...");
    const receiver = sbClient.createReceiver(queueName);
    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length > 0) {
      console.log(`Received message: ${receivedMessages[0].body}`);
      // Complete the message to remove it from the queue
      await receiver.completeMessage(receivedMessages[0]);
    } else {
      console.log("No messages received");
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

test();

// main().catch((err) => {
//   console.error("Error in main:", err);
// });
