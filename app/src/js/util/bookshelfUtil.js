"use strict";

var StorageUtil = require('./StorageUtil');
var commonUtil = require('./commonUtil');

var LOCAL_BOOK_LIST_KEY = "blog_touch_book_list";
var LOCAL_NOVEL_TAG_KEY='blog_touch_novel_history';

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
            var bookList = this.getBookList();
            if(!this.isExistBookById(book,bookList)){
                bookList.unshift(book);
                this.saveBookList(bookList);
            }
        }

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


    //阅读记忆
    saveBookTag:function(novelId,chapter,pno) {
        //检查有没有存这本书
        var isExist = this.isExistBookById(novelId);
        if(!isExist){
            //需要保存这本书
            this.addBook(novelId);
        }
    }
};
module.exports = bookshelfUtil;