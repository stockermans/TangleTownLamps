
var PEOPLE_NUM = 6, LAMPS_NUM = 3;

var ENERGY_GATHERED = 0, ENERGY_PRICE = 0.5,
    CITY_IOTAS = 0, CITY_PERCENT = 1,
    ALL_PEOPLE_MOVEMENTS=0, DEST_TIMING = 3000,
    RATIO_FOR_RANDOM_MOVEMENT = 2, EARNINGS_VIA_STORE = 0,
    DEST_Y_MIN = 0, DEST_Y_MAX = 480,
    DEST_X_MIN = 0, DEST_X_MAX = 580;

var simManager = new SimManager();
simManager.init();

function SimManager(){

    var my = this;
    var MAX_PEOPLE=30;
    var MAX_LAMPS=30;
    
    var MAX_DECORATIONS = 2;
    var decorations = [];

    this.persons=[]; this.lamps=[];
    
    var q = function(key){ return document.querySelector(key); };

    this.init = function(){

        for (var y=0;y<LAMPS_NUM;y++){

            my.lamps.push(new Lamp());
            my.lamps[y].init(y);

        }

        my.speakMyStatus();

        for (var x=0;x<PEOPLE_NUM;x++){
            my.persons.push(new Person());
            my.persons[x].init(x);
            my.persons[x].shouldMoveRandomOrLamp();
        }

        for (var z=0;z<MAX_DECORATIONS;z++){

            decorations.push(new Decorations());
            decorations[z].init(z);

        }

    };

    this.speakMyStatus = function(insert){
        var msgDiv = document.createElement('div');
        
        if (typeof insert == 'undefined'){
            msgDiv.innerHTML = '<div class="pv2 db"><span class="fw6">We choose walking in Tangle Town!</span></div>';
        } else {
            msgDiv.innerHTML = insert;
        }
        
        T.q("#lampSpeakingMsgs").appendChild(msgDiv);

        setTimeout(function(){
            msgDiv.remove();
        },5000);

    };

    this.addPerson = function(){

        if (my.persons.length-1 == MAX_PEOPLE){
            my.speakMyStatus('<div class="pv2 db black-50"><span class="fw4">Maximum People</span></div>');
        } else {
            my.persons.push(new Person());
            my.persons[my.persons.length-1].init(my.persons.length-1);
            my.persons[my.persons.length-1].shouldMoveRandomOrLamp();
            my.speakMyStatus('<div class="pv2 db black-50"><span class="fw4">+'+my.persons[my.persons.length-1].myNameTrim()+ ' entered the park</span> </div>');
        }

    };


    this.addLamp = function(){

        if (my.lamps.length-1 == MAX_LAMPS){
            my.speakMyStatus('<div class="pv2 db black-50"><span class="fw4">Maximum Destinations</span></div>');
        } else {
            my.lamps.push(new Lamp());
            my.lamps[my.lamps.length-1].init(my.lamps.length-1);
            my.speakMyStatus('<div class="pv2 db black-50"><span class="fw4">+ Destination Installed</span></div>');
        }

    };

    this.totalMovements = function(){

        var totaled = 0;
        for (var x=0;x<PEOPLE_NUM;x++){
            totaled += my.persons[x].myMovements();
        }

        return totaled;

    };


}
