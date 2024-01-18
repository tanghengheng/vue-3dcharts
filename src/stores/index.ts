import { defineStore } from "pinia";

interface AppState {
	selectedColumns: string[];
	defaultSelectedColumnsCount: number;
}

export const appStore = defineStore({
	id: "app",
	state: (): AppState => ({
		selectedColumns: [],
		defaultSelectedColumnsCount: 5,
	}),
	actions: {
		setSelectedColumns(columns: string[]) {
			this.selectedColumns.splice(0, this.selectedColumns.length);
			if (Array.isArray(columns) && columns.length > 0) {
				columns.forEach((col) => {
					if (!this.selectedColumns.includes(col)) {
						this.selectedColumns.push(col);
					}
				});
			}
		},
		setDefaultSelectedColumnsCount(count: number) {
			this.defaultSelectedColumnsCount = count;
		},
	},
});
