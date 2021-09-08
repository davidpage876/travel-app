import { getData, postData } from "../../src/client/js/request";

describe("Testing GET and POST requests", () => {
    test('getData() exists', () => {
        expect(getData).toBeDefined();
    });
    test('postData() exists', () => {
        expect(postData).toBeDefined();
    });
});