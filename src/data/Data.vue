<template>
	<div>
		<span>{{ $t("app.data") }}</span>
	</div>
	<div class="tablecontainer">
		<el-table class="table" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%; height: calc(100vh - 250px)" highlight-current-row stripe>
			<el-table-column type="index" :index="indexMethod" width="80"> </el-table-column>

			<template v-for="(item, index) in tableFieldNames">
				<el-table-column
					min-width="180"
					v-if="selectedColumns.length > 0 ? selectedColumns.includes(item) : index < defaultSelectedColumnsCount"
					:key="item"
					:prop="item"
					:label="item"
					sortable
					show-overflow-tooltip
				></el-table-column>
			</template>

			<el-table-column width="50" align="right">
				<template #header>
					<el-icon @click="showDrawer"><setting /></el-icon>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			background
			layout="prev, pager, next,jumper, ->, total"
			:total="tableData.length"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="pageSize"
			style="text-align: center"
		>
		</el-pagination>
	</div>

	<el-drawer title="Column setting" :model-value="drawer" direction="rtl" destroy-on-close show-close @closed="hideDrawer">
		<template #header>
			<h4>{{ $t("data.choosecolumns") }}</h4>
		</template>
		<template #default>
			<el-checkbox :indeterminate="checkAll === CHECK_STATUS.Indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0"></div>
			<el-checkbox-group v-model="selectedColumns" @change="handleCheckedColumnsChange">
				<el-checkbox
					v-for="(item, index) in tableFieldNames"
					:label="item"
					:key="item"
					:checked="selectedColumns.length > 0 ? selectedColumns.includes(item) : index < defaultSelectedColumnsCount"
					>{{ item }}</el-checkbox
				>
			</el-checkbox-group>
		</template>
	</el-drawer>
</template>

<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { CheckboxValueType } from "element-plus";
import { CHECK_STATUS } from "../composables/index";
import { appStore } from "../stores/index";
import { getFieldNames, readData } from "./dataHelper";

const store = appStore();
const { defaultSelectedColumnsCount, selectedColumns } = storeToRefs(store);

const tableData = readData();
const tableFieldNames = getFieldNames([]);

const drawer = ref(false);
const checkAll = ref(CHECK_STATUS.Unchecked);
const currentPage = ref(1);
const pageSize = 20;
const showDrawer = () => {
	drawer.value = true;
};
const hideDrawer = () => {
	drawer.value = false;
};
const handleCurrentChange = (page: number) => {
	currentPage.value = page;
};
const handleCheckAllChange = (value: CheckboxValueType) => {
	checkAll.value = value ? CHECK_STATUS.Checked : CHECK_STATUS.Unchecked;
};

const handleCheckedColumnsChange = (value: CheckboxValueType[]) => {
	const columns: string[] = [];
	value.forEach((item) => {
		if (item) {
			columns.push(item.toString());
		}
	});

	if (columns.length === tableFieldNames.length) {
		checkAll.value = CHECK_STATUS.Checked;
	} else if (columns.length === 0) {
		checkAll.value = CHECK_STATUS.Unchecked;
	} else {
		checkAll.value = CHECK_STATUS.Indeterminate;
	}

	store.setSelectedColumns(columns);
};

const indexMethod = (index: number) => {
	return index + 1 + (currentPage.value - 1) * pageSize;
};
</script>

<style>
.tablecontainer {
	margin-top: 20px;
	padding: 20px;
	height: calc(100vh - 250px);
}

.table {
	width: 100%;
	height: calc(100vh - 250px);
	display: block;
}
</style>
