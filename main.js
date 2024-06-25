// import html variables
import {form, input, location_name, current_temp, current_heat_index, current_humidity, 
    condition_image, current_condition} from './html_variables.js';

async function accessAPI(search_query) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=66ac4fdd286c46bd87405929242506&q=${search_query}`)
    const data = await response.json();
    return data;
}   

async function processAPIData(search_query) {
    // this function retrieves only the needed data from the API
    const data = await accessAPI(search_query);
    const city_name = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const temperature_f = data.current.temp_f;
    const heat_index_f = data.current.heatindex_f;
    const humidity = data.current.humidity;
    const condition = data.current.condition.text;
    const condition_img = data.current.condition.icon;
    const necessary_data = {city_name, region, country, temperature_f, heat_index_f, humidity, condition, condition_img};
    return necessary_data;
}

async function printAPIData(search_query) {
    // take needed data from API, display on HTML
    const retrieved_data = await processAPIData(search_query);
    current_temp.textContent = retrieved_data.temperature_f;
    condition_image.src = retrieved_data.condition_img;
    current_condition.textContent = retrieved_data.condition;
    current_humidity.textContent = 'Humidity: ' + retrieved_data.humidity;
    current_heat_index.textContent = 'Heat index: ' + retrieved_data.heat_index_f;
    location_name.textContent = `${retrieved_data.city_name}, ${retrieved_data.region}, ${retrieved_data.country}`

}
    
form.addEventListener("submit", function(event) {
    event.preventDefault();
    printAPIData(input.value);
    
});




