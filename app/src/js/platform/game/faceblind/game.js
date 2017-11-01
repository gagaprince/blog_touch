import photoUtil from './util/photoUtil';

const State = {
    GAME_PRE:1,
    GAME_START:2,
    GAME_OVER:3
}

export default {
    gameState:State.GAME_PRE,
    currentLevel:1,
    topPeople:null,
    nowTime:30,
    _timeInterval:null,
    init (){
        this.initListener();
    },
    gameBegin(){
        this.resetLevel();
        this.hidePreAndOver();
        this.gameState = State.GAME_START;
        this.refreshImg();
        this.refreshTime();
        this.beginTimeTask();
    },
    gameStop(){
        clearInterval(this._timeInterval);
        this._timeInterval = null;
        this.gameState = State.GAME_OVER;
        this.showOver();
    },
    beginTimeTask(){
        this._timeInterval = setInterval(() => {
            this.nowTime--;
            if(this.nowTime<=0){
                this.nowTime=0;
                this.gameStop();
            }
            this.renderTime();
        },1000)
    },
    resetLevel(){
        this.currentLevel=1;
        this.renderLevel();
    },
    refreshTime(){
        this.nowTime = 30;
        this.renderTime();
    },
    renderTime(){
        $('#gameStart').find('.time').html(`${this.nowTime<0?'0':this.nowTime}s`);
    },
    renderLevel(){
        $('#gameStart').find('.label').html(`第${this.currentLevel}关`);
        $('#gameOver').find('.header-title').html(`本测试你达到第${this.currentLevel}关`);
    },
    refreshImg(){
        let level = this.currentLevel;
        let wNum = parseInt(level/3)+2;
        if(wNum==10){
            wNum=9;
        }
        let imgNum = wNum*wNum;

        let topPeople = this.topPeople = photoUtil.giveMeTheTopHead();
        let results = photoUtil.giveMeTheResultList(topPeople,imgNum);

        //渲染top

        let topImg = `<img src="${topPeople.peopleHead}">`;
        $('#gameStart').find('.top-img').html(topImg);


        //渲染结果
        $('#gameStart').find('.result-imgs').html('');
        this.randomResult(results);
        results.forEach((item,index)=>{
            let itemImg = `<div class="img-frame" peopleId="${item.peopleId}" onclick="" style="width:${330/wNum}px;height:${330/wNum}px;">
                            <img class="cha" style="display: none;" src="http://p1.meituan.net/codeman/1682bc6167be5d8e3ddc69d984927cfd43141.png" alt="">
                            <img class="mv" src="${item.peopleHead}" alt="">
                          </div>`;
            $('#gameStart').find('.result-imgs').append(itemImg);
        });


    },
    randomResult(results){
        let ranDomPos = Math.floor(Math.random()*results.length);
        let tempImg = results[ranDomPos];
        results[ranDomPos] = results[results.length-1];
        results[results.length-1] = tempImg;
    },
    hidePreAndOver() {
        $('#gamePre').hide();
        $('#gameOver').hide();
    },
    showOver(){
        $('#gameOver').show();
    },
    levelPlus(){
        this.currentLevel++;
        this.refreshImg();
        this.refreshTime();
        this.renderLevel();
    },
    speedLowTime(){
        this.nowTime-=5;
        if(this.nowTime<=0){
            this.nowTime==0;
            this.gameStop();
        }
        this.renderTime();
    },
    initListener (){
        $('#gamePre,#gameOver').find('.btn').on('click',() => {
            this.gameBegin();
        });
        let _this = this;
        $('#gameStart').on('click','.img-frame',function(){
            let peopleId = $(this).attr('peopleId');
            if(peopleId==_this.topPeople.peopleId){
                $(this).find('.mv').addClass('right');
                _this.levelPlus();

            }else{
                _this.speedLowTime();
                $(this).find('.mv').addClass('error');
                $(this).find('.cha').show();
            }
            return false;
        });
    }
}