import Select from "react-select";
import React from "react";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// this is filled out dynamically, setting here for simplification
			conditions: [
				{
					name: "onetesttest",
					indicator: {
						value: "error_budget",
						label: "Errors",
						short_alias: "error",
					},
					operator: { label: "Select operator...", value: "" },
					thresholdOccurrence: { label: "Select occurrence...", value: "" },
				},
				{
					name: "two",
					indicator: {
						value: "availability",
						label: "Availability",
						short_alias: "avail",
					},
					operator: { label: "Select operator...", value: "" },
					thresholdOccurrence: { label: "Select occurrence...", value: "" },
				},
				{
					name: "three",
					indicator: {
						value: "capacity",
						label: "Capacity",
						short_alias: "rpm",
					},
					operator: { label: "Select operator...", value: "" },
					thresholdOccurrence: { label: "Select occurrence...", value: "" },
				},
				{
					name: "four",
					indicator: {
						value: "latency",
						label: "Latency",
						short_alias: "rt",
					},
					operator: { label: "Select operator...", value: "" },
					thresholdOccurrence: { label: "Select occurrence...", value: "" },
				},
			],
		};
	}

	handleChangesOfSelect = (field, value, changedCondition) => {
		console.log("setting", field, "to", value);

		let conditions = JSON.parse(JSON.stringify(this.state.conditions));

		conditions[conditions.findIndex((condition) => condition.name === changedCondition.name)][field] =
			value;
		this.setState({ conditions });
	};

	render() {
		const OPERATORS = [
			{ value: "ABOVE", label: "Above" },
			{ value: "BELOW", label: "Below" },
			{ value: "EQUALS", label: "Equal to" },
		];

		const THRESHOLD_OCCURRENCES = [
			{ value: "ALL", label: "For at least" },
			{ value: "AT_LEAST_ONCE", label: "At least once in" },
		];

		return (
			<div className="App">
				{this.state.conditions.map((condition) => (
					<form
						key={condition.name}
						style={{ marginBottom: "2em" }}
						data-testid={`form-for-${condition.indicator.short_alias}`}>
						<div style={{ fontWeight: "bold", marginBottom: "1em" }}>
							Form for {condition.indicator.label}
						</div>
						<div style={{ minWidth: "120px", marginRight: "1em" }}>
							<label htmlFor={`${condition.indicator.short_alias}-threshold-operator`}>
								Threshold operator*:
							</label>
							<Select
								name={`${condition.indicator.short_alias}-threshold-operator`}
								inputId={`${condition.indicator.short_alias}-threshold-operator`}
								value={condition.operator}
								onChange={(value) => this.handleChangesOfSelect("operator", value, condition)}
								isSearchable="true"
								options={OPERATORS}
							/>
						</div>

						<div style={{ minWidth: "120px", marginRight: "1em" }}>
							<label htmlFor={`${condition.indicator.short_alias}-threshold-occurrence`}>
								Threshold occurrence*:
							</label>
							<Select
								name={`${condition.indicator.short_alias}-threshold-occurrence`}
								inputId={`${condition.indicator.short_alias}-threshold-occurrence`}
								value={condition.thresholdOccurrence}
								onChange={(value) =>
									this.handleChangesOfSelect("thresholdOccurrence", value, condition)
								}
								isSearchable="true"
								options={THRESHOLD_OCCURRENCES}
							/>
						</div>
					</form>
				))}
			</div>
		);
	}
}
