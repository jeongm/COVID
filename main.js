'use strict'

const navi = new Navigator("btn-prev","btn-today","btn-next");
const covApi = covidApi();

(function(){
    'use strict';

    window.addEventListener("DOMContentLoaded",(event)=>{
        let $ = (e) => document.querySelector(e);
        let dots = $(".dots");
        animate(dots, "dots--animate");

        displayDate(navi.getYear(),navi.getMonth(),navi.getDay());
        displayCovidBoard();
        displayCovidTable();
    });

    function displayDate(targetYear,targetMonth,targetDay) {
        const covidDate = document.getElementById("covidDate");
        const date = document.createElement("span");
        date.innerHTML = targetYear + "-" + navi.converToZeroMonthAndDay(targetMonth) + "-" + navi.converToZeroMonthAndDay(targetDay);
        covidDate.append(date);
    }

    async function displayCovidBoard() {
        //statusDt 뭐야 20200425형식
        const statusDt = navi.getYear() + navi.converToZeroMonthAndDay(navi.getMonth())+navi.converToZeroMonthAndDay(navi.getDay())
        const accCovid = await covApi.getAccumulateCovid(statusDt);
        const todayCovid = await covApi.getCovidKorInfo();

        const cd1= document.getElementById("cd1"); //누적 사망자
        cd1.innerText = convertNumberComma(accCovid.gPntCnt);

        const cd2= document.getElementById("cd2"); //누적 확진자
        cd2.innerText = convertNumberComma(accCovid.hPntCnt);

        const cd3= document.getElementById("cd3"); //누적 검사자
        cd3.innerText = convertNumberComma(accCovid.accExamCnt);

        const cd4= document.getElementById("cd4"); 
        cd4.innerText = todayCovid.rate_deaths;

        const cd5= document.getElementById("cd5"); //일일 확진
        cd5.innerText = convertNumberComma(todayCovid.cnt_confirmations);

        const cd6= document.getElementById("cd6");//일일 사망
        cd6.innerText = convertNumberComma(todayCovid.cnt_deaths);

        const cd7= document.getElementById("cd7");
        cd7.innerText = convertNumberComma(todayCovid.cnt_hospitalizations);//일일 신규 입원

        const cd8= document.getElementById("cd8");
        cd8.innerText = todayCovid.rate_severe_symptoms;// 일일 재원 위중증
    }

    async function displayCovidTable() {
        const createDt = navi.getYear() + "-" + navi.converToZeroMonthAndDay(navi.getMonth()) + "-" + navi.converToZeroMonthAndDay(navi.getDay());
        const covidGenderAge = await covApi.getCovidGenderAge(createDt);
        const covidTable = document.getElementById("covidTable");
        console.log(covidTable);
        const tbody = covidTable.getElementsByTagName("tbody")[0];

        console.log(covidGenderAge[0])
        
        for(let i = 0 ; i < covidGenderAge.length; i++) {
            const tr = document.createElement("tr");

            const td1 = document.createElement("td"); // 구분
            td1.innerText = covidGenderAge[i].gubun;

            const td2 = document.createElement("td"); //치명율
            td2.innerText = covidGenderAge[i].criticalRate;

            const td3 = document.createElement("td"); // 사망자 수
            td3.innerText = convertNumberComma(covidGenderAge[i].death);

            const td4 = document.createElement("td"); // 확진자 수
            td4.innerText = convertNumberComma(covidGenderAge[i].confCase);

            const td5 = document.createElement("td"); // 사망율
            td5.innerText = covidGenderAge[i].deathRate;

            const td6 = document.createElement("td"); // 확진율
            td6.innerText = covidGenderAge[i].confCaseRate;

            tr.append(td1,td2,td3,td4,td5,td6);
            tbody.append(tr);
        }
        
    }

    function convertNumberComma(number) {
        return parseInt(number).toLocaleString();
    }



    
})();

function animate(element, className) {
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
      setTimeout(() => {
        animate(element, className);
      }, 500);
    }, 2500);
  }