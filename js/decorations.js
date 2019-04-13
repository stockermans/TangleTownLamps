
function Decorations(){
    var my = this, myName;
    var myCoords = {x:0, y:0};

    var decorationTypes = [
        ["&#x1f332;", "light-green"],
        ["&#x1f334;","light-green"]
    ];

    this.init = function(nameId){
        
        myCoords.x = T.randomIntFromInterval(DEST_X_MIN, DEST_X_MAX);
        myCoords.y = T.randomIntFromInterval(DEST_Y_MIN, DEST_Y_MAX);
        
        var decDiv = document.createElement('div');
        myName = "Lamp-"+nameId;
        decDiv.id = myName;
        decDiv.classList = " pointer dim lamp br4";

        decDiv.style.cssText = setMyCoords();
        
        var decorationIs = decorationTypes[T.randomIntFromInterval(0,decorationTypes.length-1)];
        decDiv.innerHTML = '<div class="o-30 f2 '+decorationIs[1]+'">'+decorationIs[0]+'</div>';

        T.q("#sim").appendChild(decDiv);

    };


    var setMyCoords = function(){
        return 'left:'+myCoords.x+'px;top:'+myCoords.y+'px;';
    };

}
