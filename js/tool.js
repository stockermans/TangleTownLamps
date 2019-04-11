
var T = new Tool();
    
function Tool(){

    this.q = function(key){ return document.querySelector(key); };

    this.randomIntFromInterval = function(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    this.addRm = function(incoming,adding,removing){

        for (var x=0;x<adding.length;x++){
            T.q(incoming).classList.add(adding[x]);
        }

        for (var y=0;y<removing.length;y++){
            T.q(incoming).classList.remove(removing[y]);
        }

    };

}
