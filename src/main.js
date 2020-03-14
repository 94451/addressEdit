import Vue from 'vue'
import App from './App.vue'
import { Button, Cell, CellGroup, Popup, Field, Icon, AddressEdit, Area, Toast, List } from 'vant';

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Icon);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(Toast);
Vue.use(List);

new Vue({
    render: h => h(App),
}).$mount('#app')