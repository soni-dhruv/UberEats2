var connection =  new require('./kafka/Connection');
const mongoose = require("mongoose");

mongoose
  .connect(
    'mongodb+srv://dhruvsoni005:5297Momdad!@ubereatslab2.3ymzx.mongodb.net/dbubereats?retryWrites=true&w=majority',
    {
      poolSize: 500,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongo connected........");
  })
  .catch((err) => console.log(err));

console.log("here for kafka");

var login = require("../kafka-backend/kafka/services/login");

//----------------------------------------------------------------------------------------------------------------------------------------------------------
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    console.log("Inside topic request");
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
handleTopicRequest("test", login);
// module.exports = config;