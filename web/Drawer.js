var Drawer = (function(){
	/**
	 * 初始化
	 */
	function Drawer(){
		this.board = [];
		this.canvas1 = document.getElementById('canvaschess1');
        this.canvas2 = document.getElementById('canvaschess2');
        this.canvas3 = document.getElementById('canvaschess3');
        this.cObj1=document.getElementById("canvaschess1").getContext("2d");
        this.cObj2=document.getElementById("canvaschess2").getContext("2d");
        this.cObj3=document.getElementById("canvaschess3").getContext("2d");
	    initBoard(this);
	    drawBoard(this);
	    this.finalLoc = [];
	    this.state = 'black';
	    this.isMove = false;
	    this.imgs = {
	        'black': new Image(),
	        'white': new Image()
	    };
	    this.CHESSES = {
	        'none': 0,
	        'black': 1,
	        'white': 2
	    };
	    this.click = false;
	    this.imgs.black.src = 'img/black.png';
	    this.imgs.white.src = 'img/white.png';
	}

	function initBoard(s){
        for (var i = 10; i--;) {
            s.board[i] = [];
            for (var j = 10; j--;) {
                s.board[i][j] = 0;  //设置棋盘为无棋状态
            }
        }
    }

    function drawBoard(s){
        var ctx = s.cObj1;
        ctx.clearRect(0, 0, s.canvas1.width, s.canvas1.height);
        ctx.lineWidth = 2;
        for (var i = 0; i <= 640; i += 40) { //绘制棋盘的线
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(640, i);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 640);
            ctx.closePath();
            ctx.stroke();
        }
    }

    /**
     * 画移动中的棋子
     * @param  {[type]} x     [坐标]
     * @param  {[type]} y     [坐标]
     * @param  {[type]} color [颜色]
     * @return {[type]}       [description]
     */
    Drawer.prototype.draw = function(x, y, color){
        this.cObj3.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
        this.cObj3.drawImage(this.imgs[color], x ,y);
    }

   	/**
	 * 画棋子
	 * @param  {[type]} x       [棋盘的横轴坐标]
	 * @param  {[type]} y       [棋盘的纵轴坐标]
	 * @param  {[type]} color   [棋子的颜色]
	 * @param  {[type]} context [在哪个画布画棋子，默认为画布2]
	 * @return {[type]}         [description]
	 */
	Drawer.prototype.drawChess = function(x, y , color , context = this.cObj2) {
        this.board[x][y] = color === 'black' ? 1 : 2;
        context.drawImage(this.imgs[color], x * 40 - 20, y * 40 - 20);
    }

	/**
	 * 删除棋子
	 * @param  {[type]} x       [棋盘的横轴坐标]
	 * @param  {[type]} y       [棋盘的纵轴坐标]
	 * @param  {[type]} context [在哪个画布删除棋子，默认为画布2]
	 * @return {[type]}         [description]
	 */
    Drawer.prototype.delChess = function(x, y , context = this.cObj2) {
    	this.board[x][y] = 0;
    	context.clearRect( x * 40 - 20, y * 40 - 20, 40, 40);
    }

    /**
     * 棋盘中该点是否有棋子
     * @param  {[type]}  x [棋盘中经度]
     * @param  {[type]}  y [棋盘中纬度]
     * @return {Boolean}   [description]
     */
    Drawer.prototype.hasChess = function(x, y) {
        return this.board[x][y] !== 0;
    }

	/**
     * 将屏幕中的坐标换成画布坐标
     * @param  {[type]} x [画布中经度]
     * @param  {[type]} y [画布中纬度]
     * @return {[type]}   [description]
     */
    Drawer.prototype.windowToCanvas = function(x, y) {
        var bbox = this.canvas2.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (this.canvas2.width / bbox.width),
            y: (y - bbox.top) * (this.canvas2.height / bbox.height)
        }
    }

    /**
     * 将画布中的点换成棋盘坐标
     * @param  {[type]} x [棋盘中经度]
     * @param  {[type]} y [棋盘中纬度]
     * @return {[type]}   [description]
     */
    Drawer.prototype.coordinateOnCanvas = function(x, y) {
        return {
            x: parseInt((x + 20) / 40),
            y: parseInt((y + 20) / 40)
        }
    }

    return Drawer;
})();