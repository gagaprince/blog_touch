"use strict";

var StorageUtil = require('./StorageUtil');
var commonUtil = require('./commonUtil');

var LOCAL_BOOK_LIST_KEY = "blog_touch_book_list";
var LOCAL_NOVEL_TAG_KEY='blog_touch_novel_history';
var LOCAL_INITBOOK_GET_KEY="blog_touch_novel_getinitbook";

var bookshelfUtil = {
    getBookList:function(){
        var bookList = StorageUtil.getItem(LOCAL_BOOK_LIST_KEY);
        if(!bookList){
            bookList=[];
        }
        return bookList;
    },
    saveBookList:function(novelList){
        if(novelList){
            StorageUtil.setItem(LOCAL_BOOK_LIST_KEY,novelList);
        }
    },
    addBook:function(book){
        if(!book)return;
        if(typeof book=="string"){
            //说明是id 需要请求后端拿到书的内容
            var _this = this;
            commonUtil.giveMeNovelById(book,function(data){
                _this.addBook(data);
            });
        }else{
            if(book.chapters){
                //去除章节信息
                var bookCp = commonUtil.clone(book);
                bookCp.chapters = [];
                book = bookCp;
            }
            var bookList = this.getBookList();
            if(!this.isExistBookById(book,bookList)){
                bookList.unshift(book);
                this.saveBookList(bookList);
            }else{
                this.adjustTheFistBook(book.id);
            }
        }
    },
    updateBook:function(book){
        if(!book)return;
        var bookList = this.getBookList();
        for(var i=0;i<bookList.length;i++){
            var bookIn = bookList[i];
            if(bookIn.id == book.id){
                bookList[i]=book;
                break;
            }
        }
        this.saveBookList(bookList);
    },
    isExistBookById:function(book,bookList){
        var isExist = false;
        var novelId = book;
        if(typeof book == "object"){
            novelId = book.id;
        }
        if(!bookList){
            bookList = this.getBookList();
        }
        for(var i=0;i<bookList.length;i++){
            var book = bookList[i];
            if(book.id == novelId){
                isExist = true;
                break;
            }
        }
        return isExist;
    },
    removeBookById:function(novelId){
        var bookList = this.getBookList();
        for(var i=0;i<bookList.length;i++){
            var book = bookList[i];
            if(book.id == novelId){
                bookList.splice(i,1);
                break;
            }
        }
        this.saveBookList(bookList);
        this.removeBookTag(novelId);
    },
    adjustTheFistBook:function(novelId){
        var bookList = this.getBookList();
        for(var i=0;i<bookList.length;i++){
            var book = bookList[i];
            if(book.id == novelId){
                var book = bookList.splice(i,1)[0];
                bookList.unshift(book);
                break;
            }
        }
        this.saveBookList(bookList);
    },

    setHasGetInitBook:function(){
        StorageUtil.setItem(LOCAL_INITBOOK_GET_KEY,1);
    },
    isHasGetInitBook:function(){
        return StorageUtil.getItem(LOCAL_INITBOOK_GET_KEY);
    },

    //阅读记忆
    saveBookTag:function(novelId,chapter,pno) {
        //检查有没有存这本书
        var isExist = this.isExistBookById(novelId);
        if(!isExist){
            //需要保存这本书
            this.addBook(novelId);
        }
        var tag = [chapter, pno];
        StorageUtil.setItem(LOCAL_NOVEL_TAG_KEY+"_"+novelId,tag);
    },
    getBookTag:function(novelId){
        var tag = StorageUtil.getItem(LOCAL_NOVEL_TAG_KEY+"_"+novelId);
        return tag;
    },
    removeBookTag:function(novelId){
        StorageUtil.removeItem(LOCAL_NOVEL_TAG_KEY+"_"+novelId);
    }
};
module.exports = bookshelfUtil;