
function Lamp(){
	var my = this, myName;
	var myCoords = {x:0, y:0};
    
    var speakings = [
        "beep beep",
        "woop woop",
    ];   
    
    var LAMP_X_ADJ = 6, LAMP_Y_ADJ = 50,

        ERR_PLACEMENT_RANGE = 50;

    var buildingTypes = [
        "&#x1f3db;",
        "&#x1f3e1;",
        "&#x1f3d7;",
        "&#x1f307;",
        "&#x1f3e2;",
        "&#x1f3e7;",
        "&#x1f697;",
        ""
    ];
    
    var buildingColours = [
        "gray",
        "dark-gray",
        "blue"
    ];

    var add = function(incoming){ T.q("#"+myName).classList.add(incoming); };
    var rm = function(incoming){ T.q("#"+myName).classList.remove(incoming); };
    
    this.myNameTrim = function(){ return myName.split("-")[0]; };
    this.myName = function(){ return myName; };

    this.init = function(nameId){
    
        myCoords.x = T.randomIntFromInterval(DEST_X_MIN, DEST_X_MAX);
        myCoords.y = T.randomIntFromInterval(DEST_Y_MIN, DEST_Y_MAX);
        
        var lampDiv = document.createElement('div');
        myName = "Lamp-"+nameId;
        lampDiv.id = myName;
        lampDiv.classList = " pointer dim lamp br4";

        lampDiv.style.cssText = setMyCoords();

        lampDiv.innerHTML = '<div class="lightBulb br4"></div><div class="f2 house '+buildingColours[T.randomIntFromInterval(0,buildingColours.length-1)]+'">'+buildingTypes[T.randomIntFromInterval(0,buildingTypes.length-1)]+'</div><div class="lampStem"></div>';

        T.q("#sim").appendChild(lampDiv);

        lampDiv.addEventListener('click',function(){
            speakEvents();
        });

    };

    var speakEvents = function(){
        var saying = speakings[T.randomIntFromInterval(0,speakings.length-1)];
        simManager.speakMyStatus('<div class="pv1 db"><span class="b">'+my.myNameTrim()+' </span>'+saying+'</div>');
    };

    var setMyCoords = function(){
        return 'left:'+myCoords.x+'px;top:'+myCoords.y+'px;';
    };

    this.refreshMePlease = function(){
        add("fadePulse");
        add("lampBorders");
    };

    this.removeRefreshing = function(){
        rm("fadePulse");
        rm("lampBorders");
    };

    this.returnMyCoords = function(){
        return { x: myCoords.x+LAMP_X_ADJ, y: myCoords.y+LAMP_Y_ADJ };

    };

}

