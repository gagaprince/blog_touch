{{
    var novelList = it;
}}
{{~novelList:novel:index}}
<div class="item h-l-u novel-item" novelId="{{=novel.id}}" link="{{=novel.sourceUrl}}" onclick="">
    <div class="cover">
        <img src="http://www.37zw.com{{=novel.cover}}" alt=""/>
    </div>
    <div class="desc-frame">
        <div class="info h-l">
            <div class="name h-c">{{=novel.name}}</div>
            <div class="author h-c">{{=novel.author}}</div>
        </div>
        {{
            var desc = novel.descripe.replace(/\w/g,"");
            if(desc){
                if(desc.length>55){
                    novel.descripe = desc.substr(0,55)+"...";
                }
            }
        }}
        <div class="desc">{{=novel.descripe||""}}</div>
    </div>
    <div class="arrow-frame">
        <div class="arrow">
            <div class="bg-frame"></div>
            <div class="front-frame"></div>
        </div>
    </div>
</div>
{{~}}