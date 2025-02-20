// stores/counter.js
import { defineStore } from 'pinia';

export default defineStore('address', {
	state: () => {
		return { address: null };
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		clearAddress(){
			this.address = null;
		}
	},
});
