
const headPic = 'https://as.alipayobjects.com/g/bisbiz-fe/mark-game/0.0.4/images/head/';
const photoMap = [
            //1-5
            [1, 2, 3, 4],
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3, 4],
            //6-10
            [1, 2, 3, 4],
            [1, 2, 3],
            [1, 2, 3, 4],
            [1, 2, 3],
            [1, 2, 3],
            //11-15
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3],
            [1, 2, 3],
            [2, 3, 4],
            //16-20
            [1, 2, 3],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3],
            [1, 2, 3, 4],
            //21-25
            [1, 2],
            [1, 2, 3],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2],
            [1, 2, 3]
        ];


export default {
    headPicList:[],
    preParedPics () {
        this.headPicList = [];
        let promises = [];
        photoMap.forEach((itemList,index1)=>{
            if(itemList){
                itemList.forEach((item,index2)=>{
                    this.headPicList.push(this.findHeadByxy(index1,index2));
                });
            }
        });
        return this.preloadPics(this.headPicList);
    },
    preloadPics (imgList) {
        let promises = [];
        imgList.forEach((item, index) => {
            promises.push(this._preloadImage(item).catch((e)=>{
                console.log(item+' load error');
            }));
        });
        return Promise.all(promises);
    },
    _preloadImage(src){
        return new Promise((onload,onerror)=>{
            let img = new Image();
            img.src = src;
            img.onload = onload
            img.onerror = onerror;
        });
    },
    init () {
        // 初始化下载所有头像
        return this.preParedPics().then(()=>{
            console.log('头像下载完毕');
        });
    },
    findHeadByxy(x,y){
        return `${headPic}${(x+1)<10?'0'+(x+1):(x+1)}-${photoMap[x][y]}.jpg`;
    },
    giveMeTheTopHead(){
        let allPNum = photoMap.length;
        let selectP = Math.floor(Math.random()*allPNum);
        let selectHeads = photoMap[selectP];
        let selectHeadsLength = selectHeads.length;
        let selectPP = Math.floor(Math.random()*selectHeadsLength);
        return {
            peopleId: selectP,
            x:selectP,
            y:selectPP,
            peopleHead: this.findHeadByxy(selectP,selectPP)
        }
    },
    giveMeTheResultList (people,num){
        // 给出num个 包含peopleId一个和随机其他人的一组结果
        let hasSelectMap = this.fillRightPeopleMap(people);
        let rightPeople = this.findSamePeople(people);

        let allPeoples = this.findDiffPeoples(num-1,hasSelectMap);
        allPeoples.push(rightPeople);
        return allPeoples;

    },
    findDiffPeoples(num,hasSelectMap){
        let selectList = [];
        while(num>0){
            let allPNum = photoMap.length;
            let selectP = Math.floor(Math.random()*allPNum);
            let selectHeads = photoMap[selectP];
            let selectHeadsLength = selectHeads.length;
            let selectPP = Math.floor(Math.random()*selectHeadsLength);

            let key = `${selectP}_${selectPP}`;
            if(!hasSelectMap[key]){
                num--;
                hasSelectMap[key]=1;
                selectList.push({
                    peopleId: selectP,
                    x:selectP,
                    y:selectPP,
                    peopleHead:this.findHeadByxy(selectP,selectPP)
                });
            }

        }
        return selectList;
    },
    fillRightPeopleMap (people){
        //将正确头像所在组填充满selectMap
        let selectP = people.peopleId;
        let selectHeads = photoMap[selectP];
        let maxLength = selectHeads.length;
        let selectMap = {};
        for(let i=0;i<maxLength;i++){
            selectMap[`${selectP}_${i}`]=1;
        }
        return selectMap;
    },
    findSamePeople (people) {
        let selectP = people.peopleId;
        let selectHeads = photoMap[selectP];
        let maxLength = selectHeads.length;
        let selectPP = Math.floor(Math.random()*maxLength);
        if(selectPP===people.y){
            selectPP++;
            if(selectPP>=maxLength){
                selectPP = 0;
            }
        }
        return {
            peopleId: selectP,
            x:selectP,
            y:selectPP,
            peopleHead:this.findHeadByxy(selectP,selectPP)
        }
    }
}