{{
    var novel = it;
    var chapters = novel.chapters;
}}
<div class="header h-c">
    <div class="backFrame">
        <div class="back">
            <div class="bg-frame"></div>
            <div class="front-frame"></div>
        </div>
    </div>
    <div class="title">{{=novel.name}}</div>
</div>
<div class="container">
    <div class="info h-u">
        <div class="left v-u">
            <div class="imgframe">
                <img src="http://www.37zw.com{{=novel.cover}}" alt=""/>
            </div>
        </div>
        <div class="right">
            <div class="name">{{=novel.name}}</div>
            <div class="info-item h-l-u">
                <div class="lb">作者：</div>
                <div class="lbv">{{=novel.author}}</div>
            </div>
            <div class="info-item h-l-u">
                <div class="lb">分类：</div>
                <div class="lbv">{{=novel.cate}}</div>
            </div>
            <div class="info-item h-l-u">
                <div class="lb">更新：</div>
                <div class="lbv">{{=novel.updateTime.split(' ')[0]}}</div>
            </div>
            <div class="info-item h-l-u">
                <div class="lb">最新：</div>
                <div class="lbv">{{=chapters[0].name}}</div>
            </div>
        </div>
    </div>
    <div class="read-btn-frame h-c">
        <div class="read-btn h-c" id="readBtn" onclick="">开始阅读</div>
    </div>
    <div class="desc-frame">
        <div class="desc-t h-c">
            <div class="desc-title h-l">小说简介</div>
        </div>
        <div class="desc-info h-c">
            <div class="desc">
                {{=novel.descripe}}
            </div>
        </div>
    </div>
    <div class="novel-index-frame">
        <div class="novel-index-t h-c">
            <div class="novel-index-title h-l">
                目录
            </div>
        </div>
        <div class="novel-index-list">
            {{~chapters:chapter:index}}
            <div class="novel-index-item h-c" onclick="" chapter="{{=chapter.chapter}}">
                <div class="novel-index-item-info h-l">{{=chapter.name}}</div>
            </div>
            {{~}}
        </div>
    </div>
</div>