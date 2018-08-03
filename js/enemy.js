/*
创建敌机：
 */
function Enemy(blood,speed,imgs,scroe){
    //敌机left
    this.left = 0;
    //敌机top
    this.top = 0;
    //敌机血量
    this.blood = blood;
    //敌机速度
    this.speed = speed;
    //敌机图片集合
    this.imgs = imgs;//爆炸前和爆炸后
    //分数
    this.scroe = scroe;
}
Enemy.prototype = {
    constructor:Enemy,
    init:function(){
        //创建一个元素
        var img = document.createElement('img');
        //将图片路径赋值给它
        img.src=this.imgs[0];
        //插入到game中
        Engine.game.appendChild(img);
        //赋值给敌机的初始图片
        this.self = img;



        //当图片加载完成以后获取图片的高度和宽度
        var _this = this;//在函数里面this的指向会改变，所以我们提前报存下来
        img.onload = function(){
            
            _this.left = parseInt(Math.random()*(320-img.offsetWidth));
            _this.top = -img.offsetHeight;
            img.style.left = _this.left+'px';
            img.style.top = _this.top+'px';
        };

        //生成敌机编号并放入引擎的bullet中
        this.id = Math.random();
        Engine.enemy[this.id]=this;
    },
    //子弹移动，定时器都交给引擎去做
    move:function(){
        this.top+=this.speed;
        this.self.style.top = this.top+'px';
        //越界判断
        if(this.top>667+this.self.offsetWidth){
        	//this.bang();
            this.destroy();
        }
        //判断与英雄机相撞
        if(Engine.isCompact(this.self,Hero.self)){
        	this.bang();
	        //在英雄机还在时统计得分
	        if(Hero.isRemain){
	        	Engine.updateScroe(this.scroe);
	        }
	     
            //自己销毁
            this.destroy();
            //英雄机
            Hero.die();
        }
    },
    bang:function(){
        var img = document.createElement('img');
        img.src = this.imgs[1];
        img.style.left = this.left+'px';
        img.style.top = this.top+'px';
        Engine.game.appendChild(img)
        setTimeout(function(){
            img.remove();
        },1000)
    },
    destroy:function(){
        //销毁
        //从页面消失
        this.self.remove();
        //从内存消失
        delete Engine.enemy[this.id];
    }

}