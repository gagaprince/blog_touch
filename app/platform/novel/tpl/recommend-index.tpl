{{
    var recommendData = it;
    var recommendList = recommendData.recommend;
    var boyList = recommendData.boy;
    var girlList = recommendData.girl;
}}
<div class="tj-frame">
    <div class="tj-frame-title h-l">推荐</div>
    <div class="tj-frame-content v-c">

        {{~recommendList:item:index}}
            {{?index%4==0}}
                <div class="tj-frame-l h-l-u">
            {{?}}
                <div class="tj-frame-item h-c" novelId="{{=item.id}}">
                    <div class="tj-item">
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name">{{=item.name}}</div>
                            <div class="author">{{=item.author}}</div>
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
            <div class="tj-frame-l h-l-u">
                {{?}}
                <div class="tj-frame-item h-c" novelId="{{=item.id}}">
                    <div class="tj-item">
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name">{{=item.name}}</div>
                            <div class="author">{{=item.author}}</div>
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
            <div class="tj-frame-l h-l-u">
                {{?}}
                <div class="tj-frame-item h-c" novelId="{{=item.id}}">
                    <div class="tj-item">
                        <div class="cover">
                            <img src="http://www.37zw.com{{=item.cover}}" alt=""/>
                        </div>
                        <div class="desc">
                            <div class="name">{{=item.name}}</div>
                            <div class="author">{{=item.author}}</div>
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
        <div class="tj-frame-l h-l">
            <div class="tj-frame-item h-c">
                <div class="tj-item">
                    <div class="cover">
                        <img src="http://www.37zw.com/d/image/0/330/330s.jpg" alt=""/>
                    </div>
                    <div class="desc">
                        <div class="name">大主宰</div>
                        <div class="author">天蚕土豆</div>
                    </div>
                </div>
            </div>
            <div class="tj-frame-item h-c">
                <div class="tj-item">
                    <div class="cover">
                        <img src="http://www.37zw.com/d/image/0/330/330s.jpg" alt=""/>
                    </div>
                    <div class="desc">
                        <div class="name">大主宰</div>
                        <div class="author">天蚕土豆</div>
                    </div>
                </div>
            </div>
            <div class="tj-frame-item h-c">
                <div class="tj-item">
                    <div class="cover">
                        <img src="http://www.37zw.com/d/image/0/330/330s.jpg" alt=""/>
                    </div>
                    <div class="desc">
                        <div class="name">大主宰</div>
                        <div class="author">天蚕土豆</div>
                    </div>
                </div>
            </div>
            <div class="tj-frame-item h-c">
                <div class="tj-item">
                    <div class="cover">
                        <img src="http://www.37zw.com/d/image/0/330/330s.jpg" alt=""/>
                    </div>
                    <div class="desc">
                        <div class="name">大主宰</div>
                        <div class="author">天蚕土豆</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>