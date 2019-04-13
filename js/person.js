
function Person(){
    
    var my = this, myName;
    var personNames = [
        "Dave",
        "Mark",
        "Jane",
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
        "Nicolas",
        "Max",
        "Matt",
    ];

    var speakings = [
        "Hmmm",
        "Do you have the time sir?",
        "What a nice day to walk",
        "I'm going to the event!",
        "My jump rope is tangled",
        "Where is the bakery?",
        "Coffee?",
        "May I pet the dog",
        "Yep!",
        "That's a pretty butterfly"
    ];

    var randDests = [
        "school",
        "work",
        "bakery",
        "shoe store",
        "grocery store",
        "memorial park",
        "botanical gardens"
    ];

    var randQuests = [
        ["City Hall",2],
        ["Coca cola",3],
        ["Nike",4],
        ["Farm and Foods Inc",6],
        ["Boeing",3],
        ["NASA",5],
        ["Tesla",5],
        ["Local Baker",3],
        ["Shoe Store",2]
    ];

    var myCoords = {x:0, y:0};
    var destinationCoords = { x:0, y:0 };
    var hasDestination = false, destinationIsLamp = false;
    var atDestination = false, myWattage = 0;
    var moveSpeed = 3;
    var myMovements = 0;
    var movingRandomly = false, firstLampGoto=false, movingToLamp = 0;
    var bonusEarned = 0;

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
        //speakEvents();
        iDiv.addEventListener('click',function(){
            speakEvents();
        });
        
        myStatus();
    };

    var speakEvents = function(){

        var saying = speakings[T.randomIntFromInterval(0,speakings.length-1)];
        simManager.speakMyStatus('<div class="pv2 db"><span class="b">'+my.myNameTrim()+' </span>'+saying+'</div>');

    };

    var lightMyselfUp = function(){
        
        T.addRm("#"+myName, ["bg-red"], ["bg-light-blue"]);
        setTimeout(function(){
            T.addRm("#"+myName, ["bg-light-blue"], ["bg-red"]);
        },1000);

    };

    var myStatus = function(){

        var msgDiv = document.createElement('div');
        msgDiv.id= myName+"Earned";
        msgDiv.classList = " br3 pointer bg-lightest-blue dim dib mv1 ma1 b--black-10";
        msgDiv.innerHTML = '<div class=" pa3 dib pv2">'+my.myNameTrim()+' <span>0</span> i</div>';
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
        movingRandomly = T.randomIntFromInterval(0,RATIO_FOR_RANDOM_MOVEMENT) == 0 ? true : false;
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
    var randDest = function(){
        if (T.randomIntFromInterval(0,1)==0){
            return ' <span class="i">walked to </span><span class="fw6"> ' + randDests[T.randomIntFromInterval(0,randDests.length-1)] + '</span>';
        } else {
            var thisQuest = randQuests[T.randomIntFromInterval(0,randQuests.length-1)];
            bonusEarned += thisQuest[1];
            EARNINGS_VIA_STORE += bonusEarned;
            updateEnergy();
            updateEarnings();
            return ' <span class="i">did quest from </span><span class="fw6"> ' + thisQuest[0] + '</span>';
        }
    };

    var speakRefreshedAtLamp = function(insert){

        var msgDiv = document.createElement('div');
        if (insert == "arrived"){
            simManager.speakMyStatus('<div class="pv1 db"><span class="b">'+my.myNameTrim()+'</span> '+randDest()+'</div>');

        } else {
            var myPercent = myMovements/simManager.totalMovements();
            msgDiv.innerHTML = '<div class="pv1 db"><span class="b">'+my.myNameTrim()+' </span><span> I gathered '+ (ENERGY_GATHERED*myPercent/100).toFixed(0) + ' mW</span> and I earned '+myEarned()+' i</div>';
        }

        T.q("#lampSpeakingMsgs").appendChild(msgDiv);
        setTimeout(function(){
        msgDiv.remove();
        simManager.lamps[movingToLamp].removeRefreshing();
        },DEST_TIMING);

    };

    var pauseForContinue = function(){
        setTimeout(function(){
            hasDestination = false;
            atDestination = false;
            isRandomly();
            my.shouldMoveRandomOrLamp();
        },DEST_TIMING);
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
                speakRefreshedAtLamp("arrived");
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
        T.q("#storeEarned").innerHTML = EARNINGS_VIA_STORE;

    };

    var myEarned = function(){
        var myPercent = myMovements/simManager.totalMovements();
        return +bonusEarned + (+(CITY_IOTAS*myPercent/100).toFixed(0));
    };

    var updateEarnings = function(){

        myMovements++;
        T.q("#"+myName+"Earned").childNodes[0].childNodes[1].innerHTML = myEarned();

    };

}

