

var Analysis = function(bot,event,MsgText){
	  var UserID = event.source.userId;
    var MsgText = event.message.text;
    var Time = event.timestamp;
    
    switch(MsgText)
    {
      case 'Join2Group' :
                    
          event.source.profile().then(function (profile) {
              console.log('Hello ' + profile.displayName + ' ' + profile.userId);
          });
        break;        
      case 'LeaveGroup' :
      
        break;
      default:
            
    }
    //console.log('=======================');
    //console.log(UserID);
    //console.log('=======================');
    //console.log(MsgText);
    //console.log('=======================');
    //console.log(Time);
	  
}
var addUserId = function(userId,userName){	
	
	//add user into db
	
}



exports.analysis = Analysis;