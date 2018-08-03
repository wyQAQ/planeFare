/*
创建子弹:因为子弹不是只创建一个所以要用构造函数

注意一点：子弹发射的位置应该是英雄机的正中央的位置，所以需要传点东西进来
 */
function Bullet(l,t){
    this.l = l;//保留一下传进来的l
    this.t = t;//保留一下创进来的t
    //初始图片
    this.self = null;
    //子弹初始left
    this.left = 0;
    //子弹初始top
    this.top = 0;
    //子弹的速度
    this.speed = 2;
    //子弹编号 因为在引擎里面有一个专门存放子弹的对象，所以我们要给每一个子弹生成编号
    this.id = '';
}
Bullet.prototype = {
    constructor:Bullet,
    init:function(){
        //创建一个元素
        var img = document.createElement('img');
        //将图片路径赋值给它
        img.src='images/bullet.png';
        //插入到game中
        Engine.game.appendChild(img);
        //赋值给子弹的初始图片
        this.self = img;



        //当图片加载完成以后获取图片的高度和宽度
        var _this = this;//在函数里面this的指向会改变，所以我们提前报存下来
        img.onload = function(){
            //因为上面的属性有this.left所以我们应该和图片一样赋值给它
            _this.left = _this.l-_this.self.offsetWidth/2;
            _this.top = _this.t-_this.self.offsetHeight;
            img.style.left = _this.left+'px';
            img.style.top = _this.top+'px';
        };

        //生成子弹编号并放入引擎的bullet中
        this.id = Math.random();
        Engine.bullet[this.id]=this;
    },
    //子弹移动，定时器都交给引擎去做
    move:function(){
        this.top-=2;
        this.self.style.top = this.top+'px';
        //越界判断
        if(this.top<=-this.self.offsetHeight){
            this.destroy();
        }
        //是否与敌机碰撞
        for(i in Engine.enemy){
            if(Engine.isCompact(this.self,Engine.enemy[i].self)){
                //子弹销毁
                this.destroy();
                //敌机销毁
                Engine.enemy[i].blood--;
                if(Engine.enemy[i].blood==0){
                	Engine.enemy[i].bang();
			        //统计得分
			        Engine.updateScroe(Engine.enemy[i].scroe);		    
                    Engine.enemy[i].destroy();
                }
                
            }
        }
    },
    destroy:function(){
        //销毁
        //从页面消失
        this.self.remove();
        //从内存消失
        delete Engine.bullet[this.id];
    }

}