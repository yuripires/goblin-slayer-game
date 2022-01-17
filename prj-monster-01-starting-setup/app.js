function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({

    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0,
            winner: null,
            battleLog: []
        };
    },

    methods: {
        newGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.round = 0;
            this.winner = null;
            this.battleLog = [];
        },
        attackMonster(){
            const attackValue = getRandomNumber(4,14);
           this.monsterHealth = this.monsterHealth - attackValue;
           this.addLogMessage('player','attack', attackValue);
           this.attackPlayer();
           
        },
        attackPlayer(){
            const attackValue = getRandomNumber(7,17);
            this.playerHealth -= attackValue;
            this.round++;
            this.addLogMessage('monster','attack', attackValue);
            },
        specialAttack(){
            
            const attackValue = getRandomNumber(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','attack', attackValue);
            this.attackPlayer();

        },
        healPlayer(){
            const healValue = getRandomNumber(15,35);
            if(this.playerHealth + healValue >100){
                this.playerHealth = 100;
                this.addLogMessage('player','heals', healValue);
            }else{
            this.playerHealth += healValue;
            this.addLogMessage('player','heals', healValue);
            }this.attackPlayer();
        },
        surrender(){
            this.playerHealth = 0;
        },
        addLogMessage(who, what, value){
            this.battleLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });


        }
    },

computed:{
    monsterBarStyles() {
      return  {width: this.monsterHealth + '%' };
    },
    playerBarStyles(){
        return {width: this.playerHealth + '%' };
    },
    specialClause(){
        return this.round % 3 !==0;
    },
    healClause(){
        return this.round % 5 !==0;
    }
},
watch: {
    playerHealth(value){
        if(value <=0 && this.monsterHealth <= 0){
            this.playerHealth = 0;
            this.monsterHealth = 0;
            this.winner = 'draw';
        }else if (value <=0 ){
            this.playerHealth = 0;
            this.winner = 'monster';
        }
        
    },
    monsterHealth(value){
        if(value <= 0 && this.playerHealth <= 0){
            this.playerHealth = 0;
            this.monsterHealth = 0;
            this.winner = 'draw';

        }else if(value <=0){
            this.monsterHealth = 0;
            this.winner = 'player';

        }
    }
}

});
app.mount('#game')