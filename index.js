const readline = require('readline-sync')
let isAlive = true;
const name = readline.question('What is your name? ')
class Hero{
    constructor(name, hp, ap){
        this.name = name
        this.hp = hp
        this.ap = ap
        this.inventory = ['potion']
    }
}
const player = new Hero(name, 100, 50)
class Enemy {
    constructor(name, hp, ap){
        this.name = name;
        this.hp = hp;
        this.ap = ap;
    }
}
const darthSideous = new Enemy("Darth Sideous", 50, 50)
const darthVader = new Enemy("Darth Vader", 75, 50)
const darthMaul = new Enemy("Darth Maul", 50, 25)
const enemies = [darthMaul, darthSideous, darthVader]
while(isAlive){
    const action = readline.keyIn('Would you like to [w] Walk, [p] Print Inventory, or [q] Quit?', {limit: 'wqp'})
    
    if(action === 'w'){
        walk()
    }else if (action === 'p'){
        printInventory()
    }else if(action === 'q'){
       isAlive = false
       console.log('You quit the game') 
    }
}
function walk(){
    const random = Math.floor(Math.random()*4)
    if(random === 0){
        enemyEncounter()
    }else{
        console.log('You walk safely')
    }
}
function printInventory(){
    console.log(player.inventory)
}
function enemyEncounter(){
    const random = Math.floor(Math.random() * enemies.length)
    const enemy = enemies[random]
}