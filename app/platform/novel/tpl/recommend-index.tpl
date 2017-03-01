{{
    var recommendData = it;
    var recommendList = recommendData.recommend;
    var boyList = recommendData.boy;
    var girlList = recommendData.girl;
    var updateList = recommendData.update;
}}
<div class="tj-frame">
    <div class="tj-frame-title h-l">推荐</div>
    <div class="tj-frame-content v-c">

        {{~recommendList:item:index}}
            {{?index%4==0}}
                <div class="tj-frame-l h-u">
            {{?}}
                <div class="tj-frame-item h-c linkbook" novelId="{{=item.id}}" onclick="">
                    <div class="tj-item v-c linkbook" onclick="">
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name h-c">{{=item.name}}</div>
                            <div class="author h-c">{{=item.author}}</div>
                        </div>
                    </div>
                </div>
            {{?index%4==3}}
                </div>
            {{?}}
        {{~}}
        {{?index%4!=3}}
            </div>
        {{?}}
    </div>
</div>

<div class="tj-frame">
    <div class="tj-frame-title h-l">男生</div>
        <div class="tj-frame-content v-c">

            {{~boyList:item:index}}
            {{?index%4==0}}
            <div class="tj-frame-l h-u">
                {{?}}
                <div class="tj-frame-item h-c linkbook" novelId="{{=item.id}}" onclick="">
                    <div class="tj-item v-c linkbook" onclick="">
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name h-c">{{=item.name}}</div>
                            <div class="author h-c">{{=item.author}}</div>
                        </div>
                    </div>
                </div>
                {{?index%4==3}}
            </div>
            {{?}}
            {{~}}
            {{?index%4!=3}}
        </div>
        {{?}}
    </div>
</div>


<div class="tj-frame">
    <div class="tj-frame-title h-l">女生</div>
        <div class="tj-frame-content v-c">

            {{~girlList:item:index}}
            {{?index%4==0}}
            <div class="tj-frame-l h-u">
                {{?}}
                <div class="tj-frame-item h-c linkbook" novelId="{{=item.id}}" onclick="">
                    <div class="tj-item v-c linkbook" onclick="">
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name h-c">{{=item.name}}</div>
                            <div class="author h-c">{{=item.author}}</div>
                        </div>
                    </div>
                </div>
                {{?index%4==3}}
            </div>
            {{?}}
            {{~}}
            {{?index%4!=3}}
        </div>
        {{?}}
    </div>
</div>

<div class="tj-frame">
    <div class="tj-frame-title h-l">最近更新</div>
        <div class="tj-frame-content v-c">

            {{~updateList:item:index}}
            {{?index%4==0}}
            <div class="tj-frame-l h-u">
                {{?}}
                <div class="tj-frame-item h-c linkbook" novelId="{{=item.id}}" onclick="">
                    <div class="tj-item v-c" >
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name h-c">{{=item.name}}</div>
                            <div class="author h-c">{{=item.author}}</div>
                        </div>
                    </div>
                </div>
                {{?index%4==3}}
            </div>
            {{?}}
            {{~}}
            {{?index%4!=3}}
        </div>
        {{?}}
    </div>
</div>