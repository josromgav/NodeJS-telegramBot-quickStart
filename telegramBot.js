var https = require('https');
var token = ''; //Put your bot token here
var urlToAsk = 'https://api.telegram.org/bot'+token+"/getUpdates?offset=-1";
var parsemode = 'markdown';
var urltoSend = 'https://api.telegram.org/bot'+token+"/sendMessage?text=<message>&chat_id=<chat_id>&parse_mode="+parsemode;
var lastUpdateId = 0;
var pollingRate = 4000;

run();

function run(){
    console.log('Bot listening, talk to it in order to receive response messages.');
    setInterval(function intervalTrigger(){
        analyzeLastUpdate();
    },pollingRate);
}

function attendService(response){
    let chatId = response.chat_id;
    switch(response.text){
        case 'hi': sendMessage('Hello.', chatId);break;
        case 'who are you?': sendMessage('I am a bot.', chatId);break;
        case 'thanks': sendMessage('To you.', chatId);break;
        case '.sale': sendMessage('Our current sale offer is 210%E2%82%AC ', chatId);break;
    }
}

function sendMessage(message, chatId){
    let auxUrl = urltoSend; //copy
    auxUrl = auxUrl.replace('<message>', message);
    auxUrl = auxUrl.replace('<chat_id>', chatId);
    https.get(auxUrl,function(res,bet){
        var body = '';
        res.on('data',function(d){
            body += d;
        });
        res.on('end',function(){
        })
    });
}

function analyzeLastUpdate(){
    https.get(urlToAsk,function(res,bet){
        var body = '';
        res.on('data',function(d){
            body += d;
        });
        res.on('end',function(){
            let bodyParsed = JSON.parse(body);
            if(bodyParsed.result != null){ //response doesnt contain messages, ex: info
                if(bodyParsed.result.length > 0 ){ //no updates check
                    let length = bodyParsed.result.length;
                    let lastMessage = length>0?bodyParsed.result[length-1]:'Error while reading last message.';
                    digestUpdate(lastMessage);
                }
            } 
        })
    });
}

function digestUpdate(message){
    if(lastUpdateId != message.update_id){ //already processed update check
        let response = {
            chat_id : message.message.chat.id,
            text : message.message.text
        }    
        attendService(response);
    }
    lastUpdateId = message.update_id;
}
