{{
    var novelList = it.novelList;
    var state = it.state;
    novelList.push({
       "tag":"jia"
    });
}}

{{~novelList:novelItem:index}}
    {{?index%3==0}}
<div class="bookshelf-item h-l">
    {{?}}
    {{?novelItem.tag!="jia"}}
    <div class="book-frame h-c bookItem" onclick="" novelId="{{=novelItem.id}}">
        <div class="remove-btn h-c" style="{{=state==1?'':'display:none;'}}" onclick="" novelId="{{=novelItem.id}}">+</div>
        <div class="book">
            <img src="{{=novelItem.cover?'http://www.37zw.com'+novelItem.cover:'http://www.37zw.com/d/image/3/3911/3911s.jpg'}}" alt=""/>
        </div>
    </div>
    {{??}}
    <div class="book-frame h-c bookAddBtn" onclick="">
        <div class="book h-c jia">
            <img src="http://pic.sucaibar.com/pic/201307/16/311d33c37b.png" alt=""/>
        </div>
    </div>
    {{?}}
    {{?index%3==2}}
</div>
    {{?}}
{{~}}

{{?(novelList.length-1)%3!=2}}
</div>
{{?}}