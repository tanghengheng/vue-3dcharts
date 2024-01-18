import { createApp } from "vue";
import i18n from "~/i18n/index";
import App from "./App.vue";

import router from "~/router/index";
import { createPinia } from "pinia";

import "uno.css";
import "~/styles/index.scss";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");
app.use(createPinia());

app.config.globalProperties.$t = i18n.global.t as any;
