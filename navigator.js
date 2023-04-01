function Navigator(uiBtnPrevId, uiBtnCurrentId, uiBtnNextId) {
    'use strict';
    
    let year = null;
    let month = null;
    let day = null;

    this.uiBtnPrevId = uiBtnPrevId;
    this.uiBtnCurrentId = uiBtnCurrentId;
    this.uiBtnNextId = uiBtnNextId;

    (function() {
        //TODO#1 날짜 url 에서 파싱해야 함
        const searchParam = new URLSearchParams(document.location.search);

        year = searchParam.get("year");
        month = searchParam.get("month");
        day = searchParam.get("day");
        let today = new Date();

        if (year == null) {
            year = today.getFullYear();
        }
        if(month == null) {
            month = today.getMonth() +1;
        }
        if(day == null) {
            day = today.getDate();
        }

    })();
    

    
    window.addEventListener("DOMContentLoaded", function(){
        let btnPrev = document.getElementById(uiBtnPrevId);
        let btnCurrent = document.getElementById(uiBtnCurrentId);
        let btnNext = document.getElementById(uiBtnNextId);

        if(btnPrev == null) {
            throw new Error('이전 버튼이 없습니다.')
        }
        if(btnCurrent == null) {
            throw new Error('오늘 버튼이 없습니다.')
        }
        if(btnNext == null) {
            throw new Error('다음 버튼이 없습니다.')
        }


        btnPrev.addEventListener("click",function() {
            let targetYear = null;
            let targetMonth = null;
            let targetDay = null;

            if(month == 1 && day == 1) {
                targetYear = year-1;
                targetMonth = 12;
                targetDay = getDaysInMonth(targetYear,targetMonth);
            }
            else if (day == 1) {  
                targetYear = year;
                targetMonth = month-1;
                targetDay = getDaysInMonth(year,month-1);
            } else {
                targetYear = year;
                targetMonth = month;
                targetDay = day-1;
            }
            _navigate(targetYear,targetMonth,targetDay);


        });
        btnCurrent.addEventListener("click",function() {
            let targetYear = null;
            let targetMonth = null;
            let targetDay = null;

            let today = new Date();

            targetYear = today.getFullYear();
            targetMonth = today.getMonth()+1;
            targetDay = today.getDate();
            
            _navigate(targetYear,targetMonth,targetDay);

        });
        btnNext.addEventListener("click",function() {
            let targetYear = null;
            let targetMonth = null;
            let targetDay = null;

            

            if(month == 12 && day == getDaysInMonth(year,month)) {
                targetYear = parseInt(year)+1;
                targetMonth = 1;
                targetDay = 1;
            }
            else if (day == getDaysInMonth(year,month)) {  
                targetYear = year;
                targetMonth = parseInt(month)+1;
                targetDay = 1;
            } else {
                targetYear = year;
                targetMonth = month;
                targetDay = parseInt(day)+1;
            }

            const nextDate = new Date(targetYear+ "-" + targetMonth + "-" + targetDay);
            const today = new Date();
            if (nextDate > today) {
                alert ('데이터가 존재하지 않습니다.');
                targetYear = today.getFullYear();
                targetMonth = today.getMonth()+1;
                targetDay = today.getDate();
            }
            
            _navigate(targetYear,targetMonth,targetDay);
            
        });

    });

    function _navigate(targetYear,targetMonth,targetDay) {
        location.href = "./index.html?year=" + targetYear + "&month=" + targetMonth + "&day=" + targetDay;
    }

    function _converToZeroMonthAndDay(d) {
        if (d < 10) {
            d = "0" + d;
        }
        return d;
    }

    function getDaysInMonth(targetYear, targetMonth){
        return new Date(targetYear, parseInt(targetMonth), 0).getDate();
    }


    return {
        getYear : function() {
            return year;
        },
        getMonth : function() {
            return month;
        },
        getDay : function() {
            return day;
        },
        converToZeroMonthAndDay : function(d) {
            return _converToZeroMonthAndDay(d);
        }
    }

}