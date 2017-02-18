{{
    var chapterList = it;
}}
{{~chapterList:chapterItem:index}}
<div class="item h-l novel-item" chapter="{{=chapterItem.chapter}}" onclick="">
    <div class="novel-name">{{=chapterItem.name||''}}</div>
    <div class="arrow-frame">
        <div class="arrow">
            <div class="bg-frame"></div>
            <div class="front-frame"></div>
        </div>
    </div>
</div>
{{~}}