import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Data from "~/data/Data.vue";
import Home from "~/home/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/data",
		name: "data",
		component: Data,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
