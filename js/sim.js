
var PEOPLE_NUM = 5;
var LAMPS_NUM = 3;
var ENERGY_GATHERED = 0;
var ENERGY_PRICE = 0.5;
var CITY_IOTAS = 0;
var CITY_PERCENT = 1;
var ALL_PEOPLE_MOVEMENTS=0;

var simManager = new SimManager();
simManager.init();


function SimManager(){

    var my = this;
    var MAX_PEOPLE=30;
    var MAX_LAMPS=30;

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

    };

    this.speakMyStatus = function(insert){
        var msgDiv = document.createElement('div');
        
        if (typeof insert == 'undefined'){
            msgDiv.innerHTML = '<div class="pv1 db"><span class="b">We are gathering energy in Tangle Town</span></div>';
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
            my.speakMyStatus('<div class="pv1 db"><span class="b">Maximum People</span></div>');
        } else {
            my.persons.push(new Person());
            my.persons[my.persons.length-1].init(my.persons.length-1);
            my.persons[my.persons.length-1].shouldMoveRandomOrLamp();
            my.speakMyStatus('<div class="pv1 db"><span class="b">+'+my.persons[my.persons.length-1].myNameTrim()+ ' entered the park</span> </div>');
        }

    };


    this.addLamp = function(){

        if (my.lamps.length-1 == MAX_LAMPS){
            my.speakMyStatus('<div class="pv1 db"><span class="b">Maximum Lamps in the park</span></div>');
        } else {
            my.lamps.push(new Lamp());
            my.lamps[my.lamps.length-1].init(my.lamps.length-1);
            my.speakMyStatus('<div class="pv1 db"><span class="b">+ Lamp Installed</span></div>');
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
