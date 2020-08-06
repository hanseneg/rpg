console.log('welcome to the game!')
const readline = require('readline-sync')
let isAlive = true;
//method(not a function) because of . = function thats part of object
const name = readline.question('what is your name?')

//creates the hero constructor(only one hero)
class Hero {
    constructor(name, hp, ap){
        this.name = name
        this.hp = hp
        this.ap = ap
        this.inventory = ['knife', 'food']
    }
}
const player1 = new Hero(name, 100, 50)

//create the enemies constructor
class Enemy {
    constructor(name, hp, ap, bonushp){
        this.name = name
        this.hp = hp
        this.ap = ap
        this.bonushp = bonushp
        this.item = ''
    }
}
const joker = new Enemy("Joker", 50, 40, 10)
const penguin = new Enemy("Penguin", 45, 30, 15)
const bane = new Enemy("Bane", 50, 55, 25)
const poisonIvy = new Enemy("Poison Ivy", 60, 60, 50)

joker.item = 'gun'
penguin.item = 'umbrella'
bane.item = 'mask'
poisonIvy.item = 'poison'

//store in enemies array
let enemies = [joker, penguin, bane, poisonIvy]

//while loop to keep asking the keyIn question
while(isAlive){
    if(enemies.length === 0){
        console.log('congrats. you won the game!')
        isAlive = false
        break;
    }
    const action = readline.keyIn('Do you want to [w] walk, [p] print inventory, or [q] quit?', {limit: 'wqp'})
    if(action === 'w'){
        walk()
    }else if(action === 'p'){
        printInventory()
    }else if(action === 'q'){
        isAlive = false
        console.log('you quit the game')
    }
}
//walk function with random enemy generator
function walk(){
    const random = Math.floor(Math.random()*4)
    if(random === 0){
        enemyEncounter()
    }else{
        console.log('you walk safely')
    }
}
//inventory printer
function printInventory(){
    console.log('name: ' + player1.name + ' inventory: ' + player1.inventory + ' hp: ' + player1.hp)

}
//enemy encounter and decision to fight or run
function enemyEncounter(){
    const random = Math.floor(Math.random() * enemies.length)
    const enemy = enemies[random]
    console.log("it looks like" + " " + enemy.name + " " + "is here! try to kill them!")
    let action = readline.keyIn('would you like to [f] fight or [r] run?', {limit: 'fr'})
    if(action === 'r'){
        let random = Math.floor(Math.random()*2)
        if(random === 1){
        console.log('you sly dog, you got away')
        }else{
            console.log('you are too slow. you must now fight!')
            fight(enemy)
        }
    }else{
        fight(enemy)
    }
}

//fight function
function fight (enemy){
    while(player1.hp > 0 && enemy.hp > 0){
        let player1Attack = Math.floor(Math.random()*player1.ap)
        let enemyAttack = Math.floor(Math.random()*enemy.ap)
        enemy.hp -= player1Attack
        player1.hp -= enemyAttack
        console.log('good fighting! ' + 'enemies hp: ' + enemy.hp + ' player1s hp: ' + player1.hp)
        if(player1.hp <= 0){
            isAlive = false;
            console.log('you died. you lose. you suck. game over.')
        }
        if(enemy.hp <= 0){
            console.log('good job you killed the enemy and took their ' + enemy.item + '.' + ' keep going')
            player1.inventory.push(enemy.item)
            player1.hp = (player1.hp + enemy.bonushp)
            enemies = enemies.filter(function (e){
                return e.hp > 0
            })
        }    
    }
}
//enemies = enemies.filter((e) => e.hp > 0)