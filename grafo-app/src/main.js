import { createApp } from "vue";
import App from "./App.vue";
import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.full.js"

const app = createApp(App);

app.use(VNetworkGraph);
app.use(ElementPlus);
app.mount("#app");
