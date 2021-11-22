import { render, screen, within, waitFor } from "@testing-library/react";
import App from "./App";
import selectEvent from "react-select-event";

const SLO_INDICATORS = [
	{
		value: "error_budget",
		label: "Errors",
		alias: "Error Rate",
		short_alias: "error",
	},
	{
		value: "availability",
		label: "Availability",
		alias: "Uptime",
		short_alias: "avail",
	},
	{
		value: "capacity",
		label: "Capacity",
		alias: "Throughput",
		short_alias: "rpm",
	},
	{
		value: "latency",
		label: "Latency",
		alias: "Response Time",
		short_alias: "rt",
	},
];

const selectOptionAndAssertValue = async (indicator, field, element, option, inputForm) => {
	await selectEvent.select(element, option.label, {
		container: document.body,
	});

	await waitFor(
		async () => {
			expect(inputForm).toHaveFormValues({
				[`${indicator.short_alias}-${field}`]: option.value,
			});
		},
		{
			onTimeout: (error) => console.log(error),
		}
	);
};

describe("tests the selectors in a form", () => {
	test("select all selectors and assert in form", async () => {
		render(<App />);

		for (const indicator of SLO_INDICATORS) {
			let inputFormForIndicator = await screen.findByTestId(`form-for-${indicator.short_alias}`);

			// select occurrence
			await selectOptionAndAssertValue(
				indicator,
				"threshold-occurrence",
				await within(inputFormForIndicator).findByLabelText(/Threshold occurrence/i),
				{ label: "At least once in", value: "AT_LEAST_ONCE" },
				inputFormForIndicator
			);

			// select operator
			await selectOptionAndAssertValue(
				indicator,
				"threshold-operator",
				await within(inputFormForIndicator).findByLabelText(/Threshold operator/i),
				{ label: "Above", value: "ABOVE" },
				inputFormForIndicator
			);
		}
	});
});
