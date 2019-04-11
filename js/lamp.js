
function Lamp(){
	var my = this, myName;
	var myCoords = {x:0, y:0};
    
    var speakings = [
        "beep beep",
        "woop woop",
    ];   

    var add = function(incoming){ T.q("#"+myName).classList.add(incoming); };
    var rm = function(incoming){ T.q("#"+myName).classList.remove(incoming); };
    
    this.myNameTrim = function(){ return myName.split("-")[0]; };
    this.myName = function(){ return myName; };

    this.init = function(nameId){
        myCoords.x = T.randomIntFromInterval(0,520);
        myCoords.y = T.randomIntFromInterval(100,520);

        var lampDiv = document.createElement('div');
        myName = "Lamp-"+nameId;
        lampDiv.id = myName;
        lampDiv.classList = " pointer dim lamp br4";
        lampDiv.style.cssText = setMyCoords();
        lampDiv.innerHTML = '<div class="lightBulb br4"></div><div class="lampStem"></div>';
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
        return { x: myCoords.x+6, y: myCoords.y+50 };

    };

}
