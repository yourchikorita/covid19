import axios from 'axios';

const config = {
    baseUrl : 'https://coronavirus-smartable.p.rapidapi.com/stats/v1'
};

function fetchGlobalData(){
    return axios.get(`${config.baseUrl}global`,
    {headers: { 'Subscription-Key': '8b31c440ebmshe14d40cdfd2a7aep11cfe1jsnf4524782f7d3' }})
    
}

async function fetchKoreaData(){
    console.log('1.....api 페이지 부분.')
    return await axios.get(`${config.baseUrl}KR`,
    {headers: { 'Subscription-Key': '8b31c440ebmshe14d40cdfd2a7aep11cfe1jsnf4524782f7d3' }})
    
}

async function fetchItalyData(){
    return await axios.get(`${config.baseUrl}IT`,
    {headers: { 'Subscription-Key': '8b31c440ebmshe14d40cdfd2a7aep11cfe1jsnf4524782f7d3' }})
    
}
async function fetchChinaData(){
    return await axios.get(`${config.baseUrl}CN`,
    {headers: { 'Subscription-Key': '8b31c440ebmshe14d40cdfd2a7aep11cfe1jsnf4524782f7d3' }})
    
}
async function fetchAmericaData(){
    return await axios.get(`${config.baseUrl}US`,
    {headers: { 'Subscription-Key': '8b31c440ebmshe14d40cdfd2a7aep11cfe1jsnf4524782f7d3' }})
    
}
export{
    fetchKoreaData,fetchGlobalData,fetchItalyData,fetchChinaData,fetchAmericaData
  
}