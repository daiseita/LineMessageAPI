var linebot = require('linebot');
var linebot_reaction = require('./Linebot_Reaction.js');
var MemberData = require('./MemberData.js');
var MemberList = new MemberData();
var LineBot = function(){	    
	  this.Bot = linebot({
        channelId: '1571560225',
        channelSecret:'687d981d73f957f038e22b42bc7c71dc',
        channelAccessToken: 'Gm0FZLUGgRDGtdoqYBXc/6Rfjh/yOJcc4T5lc4NMmXmXbvqxx/4XJB/OHcEwSYMV679sCMAdl8o/mUaNKrWKpSJY2rW4d65Gktzxk6jd3fsu7bKAdi6btYTNt7wI7nNRlyIEb4/9jUDIphMhIvgNIAdB04t89/1O/w1cDnyilFU='
    });	  	  
	  this.binding();
	  	  	 
	  return this.Bot;
};
LineBot.prototype.binding = function(){
	  var bot =this.Bot;	  	  
     bot.on('message', function (event) {          	
     	 console.log('============' + event.message.type);
       switch (event.message.type) {
         case 'text':
           linebot_reaction.analysis(bot,event,event.message.text);
                      
           break;
         case 'image':
           event.message.content().then(function (data) {
             const s = data.toString('hex').substring(0, 32);
             return event.reply('Nice picture! ' + s);
           }).catch(function (err) {
             return event.reply(err.toString());
           });
           break;
         case 'video':
           event.reply('Nice video!');
           break;
         case 'audio':
           event.reply('Nice audio!');
           break;
         case 'location':
           event.reply(['That\'s a good location!', 'Lat:' + event.message.latitude, 'Long:' + event.message.longitude]);
           break;
         case 'sticker':
           event.reply({
             type: 'sticker',
             packageId: 1,
             stickerId: 21
           });
           break;
         default:
           //event.reply('Unknow message: ' + JSON.stringify(event));
           break;
       }
     });
     
    //加入訂閱 
	  bot.on('follow', function (event) {    
	  	  event.source.profile().then(function (profile) {              
             MemberList.addMember( profile.userId,profile.displayName,profile.pictureUrl)
             console.log("add user : " + profile.displayName);
          });	  	 	  	 
	  });
	  //取消訂閱
	  bot.on('unfollow', function (event) {    
	  	       MemberList.deleteMember(  event.source.userId)
             console.log("delete user : " +  event.source.userId);  
	  });
	
}

LineBot.prototype.broadcast = function(messageObject){
	    var bot =this.Bot;	  	  
	    bot.broadcast(messageObject);
}

module.exports = LineBot;