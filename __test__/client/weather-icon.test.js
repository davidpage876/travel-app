import { getWeatherIconClassFromCode } from "../../src/client/js/weather-icon";

describe("Testing weather icon management", () => {
    test('getWeatherIconClassFromCode() exists', () => {
        expect(getWeatherIconClassFromCode).toBeDefined();
    });
});