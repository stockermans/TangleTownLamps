
function Person(){
    
    var my = this, myName;
    var personNames = [
        "Dave",
        "Mark",
        "Jane",
        "Suz",
        "Theodore",
        "Michael",
        "Timothy",
        "Jaques",
        "Anna",
        "Peter",
        "Gwen",
        "David",
        "Lisa",
        "Cara",
        "Andrew",
        "Andy",
        "Curtis",
        "Mila",
        "Harm",
        "Max",
        "Matt",
    ];

    var speakings = [
        "Hmmm",
        "I wonder if I can climb that",
        "I'm enjoying the weather",
        "Where is the pizza",
        "My jump rope is tangled",
        "Bonjour monsier lamp ",
        "Do you want to have coffee?",
        "May I pet the dog",
        "That's a pretty butterfly"
    ];

    var myCoords = {x:0, y:0};
    var destinationCoords = { x:0, y:0 };
    var hasDestination = false, destinationIsLamp = false;
    var atDestination = false, myWattage = 0;
    var moveSpeed = 3;
    var myMovements = 0;
    var movingRandomly = false, firstLampGoto=false, movingToLamp = 0;

    this.myNameTrim = function(){ return myName.split("-")[0]; };

    this.myName = function(){ return myName; };

    this.myMovements = function(){ return myMovements; };

    this.init = function(nameId){
        isRandomly();

        myCoords.x = T.randomIntFromInterval(0,580);
        myCoords.y = T.randomIntFromInterval(0,580);

        var iDiv = document.createElement('div');
        myName = personNames[T.randomIntFromInterval(0,personNames.length-1)]+"-"+nameId;
        iDiv.id = myName;
        iDiv.classList = "person hover-bg-green bg-light-blue br4";
        iDiv.style.cssText = setMyCoords();
        iDiv.innerHTML = '<div class="leftEye br4"></div><div class="rightEye br4"></div><div class="smile">)</div>';
        T.q("#sim").appendChild(iDiv);
        speakEvents();
        iDiv.addEventListener('click',function(){
            speakEvents();
        });
        
        myStatus();
    };

    var speakEvents = function(){

        var saying = speakings[T.randomIntFromInterval(0,speakings.length-1)];
        simManager.speakMyStatus('<div class="pv1 db"><span class="b">'+my.myNameTrim()+' </span>'+saying+'</div>');

    };

    var lightMyselfUp = function(){
        
        T.addRm("#"+myName, ["bg-yellow"], ["bg-light-blue"]);
        setTimeout(function(){
            T.addRm("#"+myName, ["bg-light-blue"], ["bg-yellow"]);
        },1000);

    };

    var myStatus = function(){

        var msgDiv = document.createElement('div');
        msgDiv.id= myName+"Earned";
        msgDiv.classList = " br4 pointer bg-lightest-blue hover-bg-light-blue dib mv1 ma1 ";
        msgDiv.innerHTML = '<div class="br4 pa3 dib pv2 ba b--black-10">'+my.myNameTrim()+' <span>0</span> i</div>';
        T.q("#lampSpeakingStatus").appendChild(msgDiv);

        msgDiv.addEventListener('click',function(){
            speakRefreshedAtLamp("yes");
            lightMyselfUp();
        });

    };

    var setMyCoords = function(){
        return 'left:'+myCoords.x+'px;top:'+myCoords.y+'px;';
    };

    var isRandomly = function(){
        movingRandomly = T.randomIntFromInterval(0,1) == 0 ? false : true;
    };

    this.shouldMoveRandomOrLamp = function() {

        if (movingRandomly){
            hasDestination = false;
            destinationIsLamp = false;
            //console.log("I'm moving ranodmly");
            my.moveUntilDestination();
        } else {
            //console.log("I'm going to a lamp");
            hasDestination = true;
            destinationIsLamp = true;
            setDestAsLamp();
        }

    };

    var setDestAsLamp = function(){

        var randomLamp = T.randomIntFromInterval(0,simManager.lamps.length-1);

        if (firstLampGoto && randomLamp == movingToLamp) { setDestAsLamp(); }
        else {
            firstLampGoto = true;
            movingToLamp = randomLamp;
            destinationCoords.x = simManager.lamps[randomLamp].returnMyCoords().x;
            destinationCoords.y = simManager.lamps[randomLamp].returnMyCoords().y;
            my.moveUntilDestination();
        }

    };

    var speakRefreshedAtLamp = function(insert){

        var msgDiv = document.createElement('div');
        if (typeof insert == 'undefined'){
            simManager.speakMyStatus('<div class="pv1 db"><span class="b">'+my.myNameTrim()+' renewed participation</span></div>');

        } else {
            var myPercent = myMovements/simManager.totalMovements();
            msgDiv.innerHTML = '<div class="pv1 db"><span class="b">'+my.myNameTrim()+' </span><span> I gathered '+ (ENERGY_GATHERED*myPercent/100).toFixed(0) + ' mW</span> and I earned '+myEarned()+' i</div>';
        }

        T.q("#lampSpeakingMsgs").appendChild(msgDiv);
        setTimeout(function(){
        msgDiv.remove();
        simManager.lamps[movingToLamp].removeRefreshing();
        },2000);

    };

    var pauseForContinue = function(){
        setTimeout(function(){
            hasDestination = false;
            atDestination = false;
            isRandomly();
            my.shouldMoveRandomOrLamp();
        },2000);
    };

    this.moveUntilDestination = function(){

        if (!hasDestination){
            destinationCoords.x = T.randomIntFromInterval(0,550);
            destinationCoords.y = T.randomIntFromInterval(0,550);
            hasDestination = true;
            //console.log("I have new destination");
        }

        if (myCoords.x==destinationCoords.x && myCoords.y==destinationCoords.y){

            atDestination = true;
            if (destinationIsLamp){
                simManager.lamps[movingToLamp].refreshMePlease();
                speakRefreshedAtLamp();
            } else {
                speakEvents();
            }
            
            pauseForContinue();
            //console.log("I'm at destination");

        } else {

            setTimeout(function(){

                if (!atDestination){
                    keepMoving();
                    my.moveUntilDestination();
                }

            },moveSpeed);

        }

    };

    var keepMoving = function(){

        if (destinationCoords.x > myCoords.x){
            myCoords.x++;
        } else if (destinationCoords.x < myCoords.x ){
            myCoords.x--;
        }

        if (destinationCoords.y > myCoords.y){
            myCoords.y ++;
        } else if (destinationCoords.y < myCoords.y){
            myCoords.y--;
        }

        T.q("#"+myName).style.cssText = setMyCoords();

        updateEnergy();
        updateEarnings();

    };

    var updateEnergy = function(){

        ENERGY_GATHERED++;
        T.q("#totalEnergy").innerHTML = (ENERGY_GATHERED/10).toFixed(0);
        CITY_IOTAS = ENERGY_GATHERED*ENERGY_PRICE*CITY_PERCENT;
        T.q("#cityIotas").innerHTML = (CITY_IOTAS/100).toFixed(0);

    };

    var myEarned = function(){
        var myPercent = myMovements/simManager.totalMovements();
        return (CITY_IOTAS*myPercent/100).toFixed(0);
    };

    var updateEarnings = function(){

        myMovements++;
        T.q("#"+myName+"Earned").childNodes[0].childNodes[1].innerHTML = myEarned();

    };

}

