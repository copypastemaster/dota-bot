import { summer } from "../src/foo.js";

describe("summer", () => {
	it("should sum properly", () => {
		const num1 = 1;
		const num2 = 2;

		const result = summer(num1, num2);

		expect(result).toBe(3);
	});
});
