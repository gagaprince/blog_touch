{{
    var novelList = it;
}}
{{~novelList:novel:index}}
<div class="item h-l novel-item" novelId="{{=novel.id}}" link="{{=novel.sourceUrl}}" onclick="">
    <div class="novel-name">{{=novel.name||''}}</div>
    <div class="arrow-frame">
        <div class="arrow">
            <div class="bg-frame"></div>
            <div class="front-frame"></div>
        </div>
    </div>
</div>
{{~}}