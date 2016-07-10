var SlotMachine = function() {
    var getRandomPos = function(length) {
        return Math.floor(Math.random() * length);
    };
    
    this.wildCard = '$';
    this.options = ['Cherry', 'Lemon', 'Orange', 7, 'Bar', 'Bell', this.wildCard];
    this.slots = [this.options, this.options, this.options];
    
    this.roll = function() {
        var results = [];
        //select a random option from each slot
        for (var i = 0; i < this.slots.length; i++) {
            //get a random entry position
            var randomPosition = getRandomPos(this.slots[i].length);
            //get the item at that position and save it in results
            var randomEntry = this.slots[i][randomPosition];
            results.push(randomEntry);
        }
        //console.log("results are: ", results);
        return results;
    };
    
};

var Game = function() {
    var determinePayout = function(winningItem, numCredits) {
        if (winningItem === 'Cherry') {
            return 25 * numCredits;
        }
        if (winningItem === 'Lemon') {
            return 50 * numCredits;
        }
        if (winningItem === 'Orange') {
            return 75 * numCredits;
        }
        if (winningItem === 7) {
            return 250 * numCredits;
        }
        if (winningItem === 'Bar') {
            return 500 * numCredits;
        }
        if (winningItem === 'Bell') {
            return 100 * numCredits;
        }
        if (winningItem === '$') {
            return 1000 * numCredits;
        } else {
            return "did not win";
        }
    };
    
    this.winnings = 0;
    this.totalWinnings = 0;
    this.startingCredits = 100;
    this.credits = this.startingCredits;
    this.slotMachine = new SlotMachine();
    this.spin = function(numCredits) {
        this.credits -= numCredits;
        var spinResults = this.slotMachine.roll();
        //now we detect a win
        //if there are ever 3 of any kind, it's a win
        var didWin;
        for (var i = 0; i < spinResults.length; i++) {
            if (!didWin) {
                didWin = spinResults[i];
            } else if (didWin) {
                if (didWin === this.slotMachine.wildCard) {
                    didWin = spinResults[i];
                } else if (spinResults[i] !== didWin && spinResults[i] !== this.slotMachine.wildCard) {
                    return {
                        result: spinResults,
                        winnings: 0,
                        credits: this.credits
                    };
                }
            }
        }
        this.winnings = determinePayout(didWin, numCredits);
        this.totalWinnings += this.winnings;
        this.credits += this.winnings;
        return {
            result: spinResults,
            winnings: this.winnings,
            credits: this.credits
        };
    };
};

var newGame = new Game();
for (var i = 0; i < 20; i++) {
    console.log(newGame.spin(1));
}