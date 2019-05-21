var jsonfile = require('jsonfile');
var path = require('path');
var fs = require('fs');
var JsonFilename="member.json";

var  Datastorage ={
	   data : Object(),
	   add : function(key , value){
	   	   this.data[key] = value;	   	  
	   },
	   delete : function(key){
	   	   delete this.data[key];
	   },
	   clear : function(){
	   	      this.data = new Object();
	   },
	   count : function(){
	       return	Object.keys(this.data).length;
	   },
	   exist : function(key){
	   	  return this.data.hasOwnProperty(key);
	   }	   	  
}

var MemberData = function(){	    
	  	  
	  Load();
	  	  
};

MemberData.prototype.addMember = function(userId ,name , picUrl){	
	  var obj = {
	  	  	 MEMBERID:userId,NAME:name,PICURL:picUrl
	  	  	}
	  	  	Datastorage.add(userId,obj);
	        //save to file
	        Save(JSON.stringify(Datastorage.data));
}

MemberData.prototype.deleteMember = function(userId ){	
	  
	  	  	Datastorage.delete(userId);
	        //save to file
	        Save(JSON.stringify(Datastorage.data));
}
MemberData.prototype.existMember = function(userId){	
		        
	      return Datastorage.exist(userId);
}
var Load = function(){
	 jsonfile.readFile(path.join(__dirname,'../') + JsonFilename)
	 .then(function(obj){
	 	  for(var key in obj){     
        //console.log(key);            
         Datastorage.add( key,obj[key]);
      }     	               
	 }).catch(function(err){
	 	    console.log(err);	 	
	 });
}
var Save = function(text){

	  fs.writeFile(JsonFilename, text, function(err) {
	     if(err){ console.log(err);}
	     console.log('save');
	  });
	  
}





module.exports = MemberData;