import photoUtil from './util/photoUtil';

let faceBlind = {
    init () {
        photoUtil.init().then(()=>{
            let topPeople = photoUtil.giveMeTheTopHead();
            console.log('选出的标杆是:');
            console.log(topPeople);
            let results = photoUtil.giveMeTheResultList(topPeople,9);
            console.log('选出的答案选项:');
            console.log(results);
        });
    }
};

$(document).ready(function(){
    faceBlind.init();
});

