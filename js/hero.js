/*
英雄机：因为英雄机只有一辆所以不需要用构造函数
 */
var Hero = {
    //初始图片
    self:null,
    //初始left
    left:0,
    //初始top
    top:0,
    //生命值
    life:3,
    //是否未销毁
    isRemain:true,
    //加载进来的图和爆炸的图
    imgs:['images/hero.png','images/explosion16.png'],
    //获得到自己的红星
    allHero:document.querySelectorAll('.life>img'),
    //初始化
    init:function(){
        //创建一个元素
        var img = document.createElement('img');
        //将图片路径赋值给它
        img.src=this.imgs[0];
        //插入到game中
        Engine.game.appendChild(img);
        //赋值给英雄机的初始图片
        this.self = img;
        //当图片加载完成以后获取图片的高度和宽度
        var _this = this;//在函数里面this的指向会改变，所以我们提前报存下来
        img.onload = function(){
            //因为上面的属性有this.left所以我们应该和图片一样赋值给它
            _this.left = (Engine.game.offsetWidth-img.offsetWidth)/2;//英雄机的left中心点等于（game的宽度-英雄机的宽度）除以2
            _this.top = Engine.game.offsetHeight-img.offsetHeight;
            img.style.left = _this.left+'px';
            img.style.top = _this.top+'px';
            //初始化的时候调用move
            _this.move();
            _this.shoot();
        };
        
    },
    //鼠标移动的时候英雄机也要移动
    move:function(){
        var _this = this;
        document.onmousemove = function(e){
            var e = e||event;
            var l = e.clientX - Engine.game.offsetLeft - _this.self.offsetWidth/2;
            var t = e.clientY - Engine.game.offsetTop  - _this.self.offsetHeight/2;
            //边界处理
            var lmax = Engine.game.offsetWidth-_this.self.offsetWidth;//最大边界

            var bmax = Engine.game.offsetHeight-_this.self.offsetHeight;//最大边界
            l = l < 0 ? 0 : (l > lmax ? lmax : l);
            t = t < 0 ? 0 : (t > bmax ? bmax : t);

            //赋值
            _this.self.style.left = l+'px';
            _this.self.style.top = t+'px';

            //更新left  top
            _this.left = l;
            _this.top = t;
        }
        document.onkeydown = function(e){
        	var l = _this.left;
            var t = _this.top;
            
            //上38 下40 左37 右39
        	if(e.keyCode==38){
        		t-=16;
        	}
        	if(e.keyCode==40){
        		t+=16;
        	}
        	if(e.keyCode==37){
        		l-=8;
        	}
        	if(e.keyCode==39){
        		l+=8;
        	}
            
            //边界处理
            var lmax = Engine.game.offsetWidth-_this.self.offsetWidth;//最大边界
            var bmax = Engine.game.offsetHeight-_this.self.offsetHeight;//最大边界
            l = l < 0 ? 0 : (l > lmax ? lmax : l);
            t = t < 0 ? 0 : (t > bmax ? bmax : t);

            //赋值
            _this.self.style.left = l+'px';
            _this.self.style.top = t+'px';

            //更新left  top
            _this.left = l;
            _this.top = t;
        	
        }
        //手机屏幕滑动
        $("body").on("touchstart", function(e) {
	    // 判断默认行为是否可以被禁用
	    if (e.cancelable && e.target.tagName!='P') {
	        // 判断默认行为是否已经被禁用
	        if (!e.defaultPrevented) {
	            e.preventDefault();
	        }
	    }   
	    startX = e.originalEvent.changedTouches[0].pageX,
	    startY = e.originalEvent.changedTouches[0].pageY;
		});
		$("body").on("touchend", function(e) {  
			var l = _this.left;
            var t = _this.top;
		    // 判断默认行为是否可以被禁用
		    if (e.cancelable && e.target.tagName!='P') {
		        // 判断默认行为是否已经被禁用
		        if (!e.defaultPrevented) {
		            e.preventDefault();
		        }
		    }               
		    moveEndX = e.originalEvent.changedTouches[0].pageX,
		    moveEndY = e.originalEvent.changedTouches[0].pageY,
		    X = moveEndX - startX,
		    Y = moveEndY - startY;
		    //左滑
		    if ( X > 0 ) {
		        l+=8;                
		    }
		    //右滑
		    else if ( X < 0 ) {
		        l-=8;   
		    }
		    //下滑
		    else if ( Y > 0) {
		        t+=16;   
		    }
		    //上滑
		    else if ( Y < 0 ) {
		        t-=16;   
		    }
		    //单击
		    else{
		        //alert('单击');    
		    }
		    //边界处理
            var lmax = Engine.game.offsetWidth-_this.self.offsetWidth;//最大边界
            var bmax = Engine.game.offsetHeight-_this.self.offsetHeight;//最大边界
            l = l < 0 ? 0 : (l > lmax ? lmax : l);
            t = t < 0 ? 0 : (t > bmax ? bmax : t);

            //赋值
            _this.self.style.left = l+'px';
            _this.self.style.top = t+'px';

            //更新left  top
            _this.left = l;
            _this.top = t;
		});
		
		//点击触摸
		$("body").on("touchmove", function(e) { 
			if (e.cancelable && e.target.tagName!='P') {
		        // 判断默认行为是否已经被禁用
		        if (!e.defaultPrevented) {
		            e.preventDefault();
		        }
		   }
		    var l = e.originalEvent.changedTouches[0].clientX - _this.self.offsetWidth/2;
			var t = e.originalEvent.changedTouches[0].clientY - _this.self.offsetHeight/2;
			
			var lmax = Engine.game.offsetWidth-_this.self.offsetWidth;//最大边界
            var bmax = Engine.game.offsetHeight-_this.self.offsetHeight;//最大边界
            l = l < 0 ? 0 : (l > lmax ? lmax : l);
            t = t < 0 ? 0 : (t > bmax ? bmax : t);
            
            //赋值
            _this.self.style.left = l+'px';
            _this.self.style.top = t+'px';

            //更新left  top
            _this.left = l;
            _this.top = t;
			
		});
    },
    //发子弹
    shoot:function(){
        //每隔200毫秒发一次子弹
        var _this = this;
        this.shootTimer = setInterval(function(){
            var l = _this.left+_this.self.offsetWidth/2
            new Bullet(l,_this.top).init();
        },200)
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
    die:function(){   
        this.life--;
        this.allHero = document.querySelectorAll('.life img');
        if(document.querySelectorAll('.life img')!=undefined && this.life>=0){
        	this.allHero[0].remove();
        }            
        if(this.life<=0){
            this.destroy();
        }else{
        	
        }
    },
    destroy:function(){
    	clearInterval(this.shootTimer);
        this.self.remove();
        this.bang();
        this.isRemain=false;
        //游戏结束
        Engine.gameOver();
    }
}
//在游戏没开始的时候不能出现英雄机和子弹所以要放在引擎里面
//Hero.init();