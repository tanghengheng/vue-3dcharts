import { createI18n } from "vue-i18n";
import en from "./en";
import zh from "./zh";

export const languages = {
	en: en,
	zh: zh,
};

const i18n = createI18n({
	locale: localStorage.getItem("lang") || "en",
	fallbackLocale: localStorage.getItem("lang") || "en",
	messages: languages,
	allowComposition: true,
	globalInjection: true,
	legacy: false,
});

export default i18n;
