import weatherData from "~/mockdata/weather.json";

enum MEASUREMENT_TYPE {
	Date = "Date",
	Long = "Long",
	String = "String",
}

const getFieldNames = (fieldTypes: MEASUREMENT_TYPE[]): string[] => {
	const { schema } = weatherData;
	const fields: string[] = [];

	schema.forEach((item) => {
		if ((Array.isArray(fieldTypes) && fieldTypes.includes(item.measurement)) || !Array.isArray(fieldTypes) || fieldTypes.length === 0) {
			fields.push(item.name);
		}
	});

	return fields;
};

const performanceCatch = (payroll: void | undefined, message: string) => {
	const startDate = new Date();

	if (payroll) {
		payroll();
	}

	const endDate = new Date();

	console.log(`${message} spent ${(endDate.getTime() - startDate.getTime()) / 1000} seconds`);
};
const readData = () => {
	const { schema, data } = weatherData;

	const result: any = [];

	performanceCatch(() => {
		if (Array.isArray(schema) && Array.isArray(data)) {
			data.forEach((row) => {
				const rowItem = {};
				row.forEach((value: any, index: number) => {
					if (index < schema.length) {
						const key: string = schema[index].name;
						const keyValuePair = { [key]: value };
						Object.assign(rowItem, keyValuePair);
					}
				});
				result.push(rowItem);
			});
		}
	}, "read data");

	return result;
};

const getCategoryValues = (fieldName: string) => {
	const { schema, data } = weatherData;

	const schemaIndex = schema.findIndex((item) => item.name === fieldName);

	const result: string[] = [];
	if (schemaIndex > -1) {
		if (Array.isArray(data)) {
			data.forEach((row: Array<any>) => {
				const value = row[schemaIndex];
				if (!result.includes(value)) {
					result.push(value);
				}
			});
		}
	}

	return result;
};

export { getCategoryValues, getFieldNames, readData, MEASUREMENT_TYPE };
