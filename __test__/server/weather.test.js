import { WeatherbitService } from "../../src/server/weather";

describe("Testing Weatherbit service object", () => {
    test('WeatherbitService() exists', () => {
        expect(WeatherbitService).toBeDefined();
    });
});