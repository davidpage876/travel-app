import { hello } from "../src/client/js/hello";

describe("Testing test environment", () => {
    test("hello() exists", () => {
        expect(hello).toBeDefined();
    })
});