import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		dimension: [],
		newssite: [],
		vote: [],
		person: [],
	},
	mutations: {
		refreshData(state) {
			for (let table of ["dimension", "newssite", "vote", "person"]) {
				axios.get(`http://localhost:3000/${table}`).then(r => { state[table] = r.data; });
			}
		},
		createUser(state, email) {
			axios.post(`http://localhost:3000/person`, { email_address: email }).then((r) => {
				for (let table of ["dimension", "newssite", "vote", "person"]) {
					axios.get(`http://localhost:3000/${table}`).then(r => { state[table] = r.data; });
				}
				console.log(r);
			});
		}

	},
});
