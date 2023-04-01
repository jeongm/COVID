const covidApi = function() {
    'use strict';
    const SERVICE_KEY="kNzEKhxzsCwQ8Z6hKPS63qZIS0bsuyi3Ijv5Ov4iUaO8w4Um33DIt%2BDoicbR%2Fr5RSyJw50G3d2ciYrXeOAiL8g%3D%3D";

    const api = new Object();

    api.getCovidKorInfo = async function() {
        let url = 'http://apis.data.go.kr/1790387/covid19CurrentStatusKorea/covid19CurrentStatusKoreaJason'; /*URL*/
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='+SERVICE_KEY; /*Service Key*/
        url += queryParams;

        const options = {
            method: "GET"
        }

        const response = await fetch(url,options);
        const responseJson = await response.json();

        if(!response.ok) {
            throw new Error('');
        }
        const data = responseJson.response.result[0]

        return data;

    }
    
    api.getAccumulateCovid = async function(statusDt) {
        let url = 'http://apis.data.go.kr/1352000/ODMS_COVID_02/callCovid02Api'; /*URL*/
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + SERVICE_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /**/
        queryParams += '&' + encodeURIComponent('apiType') + '=' + encodeURIComponent('JSON'); /**/
        queryParams += '&' + encodeURIComponent('status_dt') + '=' + encodeURIComponent(statusDt); /**/
        url+= queryParams;


        const options = {
            method: "GET"
        }

        const response = await fetch(url,options);
        const responseJson = await response.json();

        // console.log(responseJson.items);

        if(!response.ok) {
            throw new Error('AccumulateCovid api Error');
        }

        return responseJson.items[0];

    }

    api.getCovidGenderAge = async function(createDt){
        let url = 'http://apis.data.go.kr/1352000/ODMS_COVID_05/callCovid05Api'; /*URL*/
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ SERVICE_KEY; /*Service Key*/
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); /**/
            queryParams += '&' + encodeURIComponent('apiType') + '=' + encodeURIComponent('JSON'); /**/
            queryParams += '&' + encodeURIComponent('create_dt') + '=' + encodeURIComponent(createDt); /*2022-01-08*/
        url+=queryParams;

        const options = {
            method: "GET"
        }

        const response = await fetch(url,options);
        const responseJson = await response.json();

        console.log(responseJson);

        if(!response.ok) {
            throw new Error('CovidGenderAge api Error');
        }

        return responseJson.items;

    }


    return api;
}