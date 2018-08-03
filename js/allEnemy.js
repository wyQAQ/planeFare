/*
创建所有类型的飞机
 */
function SmallEnemy(){
    var s = parseInt(Math.random()*3+3);
    if(Engine.costtime>=10){
    	s*=2;
    }
    Enemy.call(this,1,s,['images/enemy3.png','images/explosion4.png'],10)
}
SmallEnemy.prototype = {
    constructor: SmallEnemy,
    __proto__: Enemy.prototype
};

function MiddleEnemy(){
    var s = parseInt(Math.random()*3+2);
    if(Engine.costtime>=20){
    	s*=2;
    }
    Enemy.call(this,5,s,['images/enemy2.png','images/explosion8.png'],20)
}
MiddleEnemy.prototype = {
    constructor:MiddleEnemy,
    __proto__:Enemy.prototype
}

function LargeEnemy(){
    var s = parseInt(Math.random()*2+1);
    if(Engine.costtime>=30){
    	s*=2;
    }
    Enemy.call(this,10,s,['images/enemy1.png','images/explosion19.png'],50)
}
LargeEnemy.prototype = {
    constructor:LargeEnemy,
    __proto__:Enemy.prototype
}