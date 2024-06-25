import {main_box, header, form, input, submit_button, main_content} from './html_variables.js';

async function accessAPI(search_query) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=66ac4fdd286c46bd87405929242506&q=${search_query}`)
    const data = await response.json();
    return data;
}   

async function processAPIData(search_query) {
    const data = await accessAPI(search_query);
    const city_name = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const temperature_f = data.current.temp_f;

    const necessary_data = {city_name, region, country, temperature_f};
    return necessary_data;
}

async function printAPIData(search_query) {
    /* remember: data is an OBJECT */
    const data = await processAPIData(search_query);
    console.log(data.temperature_f);
}
    


//form.addEventListener("submit", printAPIData(input.value).temperature_f);
form.addEventListener("submit", function(event) {
    event.preventDefault();
    printAPIData(input.value);
    
});




