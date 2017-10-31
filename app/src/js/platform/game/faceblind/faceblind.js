import photoUtil from './util/photoUtil';
import game from './game';

let faceBlind = {
    init () {
        this.showLoading();
        photoUtil.init().then(()=>{
            game.init();
            this.hideLoading();
        });
    },
    showLoading(){
        $('#loading').show();
        $('#gameStart').hide();
    },
    hideLoading(){
        $('#loading').hide();
        $('#gameStart').show();
    }
};

$(document).ready(function(){
    faceBlind.init();
});

