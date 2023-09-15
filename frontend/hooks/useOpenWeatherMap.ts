import {axiosOWMClient} from "../services/owmClient";

/**
 * The function `getWeather` retrieves weather data based on latitude and longitude coordinates.
 * @param {number} lat - The `lat` parameter represents the latitude of the location for which you want
 * to retrieve the weather information. Latitude is a geographic coordinate that specifies the
 * north-south position of a point on the Earth's surface.
 * @param {number} lon - The `lon` parameter in the `getWeather` function represents the longitude
 * coordinate of the location for which you want to retrieve the weather information.
 * @returns the data from the weather API response.
 */
export async function getWeather(lat: number, lon: number) {
    const response = await axiosOWMClient.get(`/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_OWM_API_KEY}&units=metric`);
    return response.data;
}

/**
 * The function `getWeatherForecast` retrieves the weather forecast for a given latitude and longitude
 * using the OpenWeatherMap API.
 * @param {number} lat - The `lat` parameter represents the latitude of the location for which you want
 * to get the weather forecast. Latitude is a geographic coordinate that specifies the north-south
 * position of a point on the Earth's surface.
 * @param {number} lon - The `lon` parameter represents the longitude coordinate of the location for
 * which you want to retrieve the weather forecast. Longitude is a geographic coordinate that specifies
 * the east-west position of a point on the Earth's surface. It is measured in degrees, with values
 * ranging from -180 to 180.
 * @returns the data from the weather forecast API response.
 */
export async function getWeatherForecast(lat: number, lon: number) {
    const response = await axiosOWMClient.get(`/forecast?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_OWM_API_KEY}&units=metric`);
    return response.data;
}
