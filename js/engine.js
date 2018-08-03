/*
游戏引擎
 */
var Engine = {
    //刚开始的游戏状态
    gameStatus:false,
    //所以敌机
    enemy:{},
    //子弹
    bullet:{},
    //得分
    scroe:0,
    //游戏时间
    costtime:0,
    //背景图片
    game:document.querySelector('.game'),
    //页面得分
    textScroe:document.querySelector('.score'),
	//页面计时
	textGameTime:document.querySelector("#costtime span"),
    //初始化
    init:function(){
        this.gameStart();
    },
    //游戏开始
    gameStart:function(){
        var _this = this;
        //点击图片的时候判断游戏状态
        this.game.onclick = function(){
            if(!_this.gameStatus){
                _this.gameStatus = true;
                //移动移动
                _this.bgMove();
                _this.handleMove();
                _this.createPlane();
            }
            //开始计时
            _this.gameTime();
        }
    },
    //背景移动
    bgMove:function(){
        var y=0;
        var _this = this;
        this.bgTimer = setInterval(function(){
            y+=2;
            _this.game.style['background-position-y']=y+'px';
        },50)
    },
    createPlane:function(){
        //创建敌机和英雄机
        Hero.init();
		var _this = this;
        //创建敌机
        this.createTimer = setInterval(function(){
            var num = parseInt(Math.random()*15)+1;
            switch (num) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                    new SmallEnemy().init();
                    break;
                case 2:
                case 4:
                case 6:
                case 8:
                    new MiddleEnemy().init();
                case 10:
                    new LargeEnemy().init();                           
            }
        },1000)
    },
    //所有敌机和子弹都要动
    handleMove:function(){
        var _this=this;
         this.moveTimer = setInterval(function(){
            //创建所有子弹
            for(var i in _this.bullet){
                _this.bullet[i].move()
            }
            //c创建所有敌机动
            for(var i in _this.enemy){
                _this.enemy[i].move()
            }

        },30)
    },
    //碰撞检测
    isCompact:function(obj1,obj2){
        var l1 = obj1.offsetLeft>obj2.offsetLeft+obj2.offsetWidth;
        var l2 = obj2.offsetLeft>obj1.offsetLeft+obj1.offsetWidth;
        var t1 = obj1.offsetTop>obj2.offsetTop+obj2.offsetHeight;
        var t2 = obj2.offsetTop>obj1.offsetTop+obj1.offsetHeight;
        if(l1||l2||t1||t2){
            return false;
        }else{
            return true;
        }
    },
    //更新得分
    updateScroe:function(scroe){

        this.scroe+=scroe;

        this.textScroe.innerHTML="分数"+this.scroe;
    },
    //游戏计时
    gameTime:function(){
    	var _this = this;
    	_this.gamecostTimer = setInterval(function(){
    		_this.costtime++;
    		_this.textGameTime.innerHTML = _this.costtime;
    	},1000)
    },
    gameOver:function(){
        //停止创建敌机
        clearInterval(this.createTimer);

        //子弹停止
        //clearInterval(this.moveTimer);
        
        //背景停止
        clearInterval(this.bgTimer);
        
        //显示游戏结束
        $("#messbox").css("display","block") ;
        
        //停止计时
        clearInterval(this.gamecostTimer);
    }
};
Engine.init();