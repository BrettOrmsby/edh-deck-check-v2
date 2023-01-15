import { createApp } from "vue";
import App from "./App.vue";
import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./assets/main.css";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

const app = createApp(App);

app.use(PrimeVue);
app.directive("tooltip", Tooltip);

app.mount("#app");
