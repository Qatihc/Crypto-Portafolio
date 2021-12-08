import { TopCoins } from '../components/TopCoins';
import {URL} from '../constants';
import {COINS_PER_PAGE} from '../constants';

async function apiRequestJson(obj){
    const {target, action = '', ...params} = obj;

    let apiUrl = URL + '/' + target + '/' + action + 
        ((Object.entries(params).length) ? '?' : '');

    for (let key in params){
        apiUrl = apiUrl + key + '=' + params[key] + '&';
    }

    console.log(apiUrl);
    
    const response = await fetch(apiUrl);
    return response.json();

}

async function getCoin(id){
    const coin = await apiRequestJson({target: 'coins', action: id})
    return coin;
}

async function getSupportedCoins(){
    const supportedCoins = await apiRequestJson({target: 'coins', action: 'list'});
    return supportedCoins;
}

/* Limite de la API por pagina es 250. Yo voy a pedir 50 por pagina. */
async function getTopCoinsPage(n){
    if (n < 0) throw new TypeError('parametro invalidos.');

    const topCoins = await apiRequestJson({target: 'coins', action: 'markets', vs_currency: 'usd', per_page: COINS_PER_PAGE, page: n})
    return topCoins;
}

export {getSupportedCoins, getCoin, getTopCoinsPage};