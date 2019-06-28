const STORAGE_KEY = 'users-storage'
var editingId
var editing 
var showTable

new Vue ({
	el: '#table-app',
	data() {
		return {
			formUser: {
				id:null,
				name: '',
				surname: '',
				phone: '',
				email: ''
			},
			users: [],
			showTable: true,
			editing: false
		}
	},
	created () {
		this.users = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
	},
	methods: {
		addUser() {
			if (this.editing) {
				this.users[editingId] = {id:editingId, name:this.formUser.name, surname:this.formUser.surname, phone:this.formUser.phone, email:this.formUser.email};
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
				this.formUser = {
						id:null,
						name: '',
						surname: '',
						phone: '',
						email: ''
						};
				this.editing = false
			}
			else {
				this.users.push({id:this.users.length, name:this.formUser.name, surname:this.formUser.surname, phone:this.formUser.phone, email:this.formUser.email});
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
				this.formUser = {
						id:null,
						name: '',
						surname: '',
						phone: '',
						email: ''
				};
			}
		},
		deleteUser(user) {
			this.users.splice(this.users.indexOf(user),1);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
		},
		editUser(user) {
			this.editing = true
			this.formUser.name = user.name;
			this.formUser.surname = user.surname;
			this.formUser.phone = user.phone;
			this.formUser.email = user.email;
			editingId = user.id
		},
		toggleTable() {
			if (this.showTable == true) {
				this.showTable = false
			}
			else {
				this.showTable = true
			}
		},
		cancelAdd() {
			this.toggleTable();
			this.editing = false;
			this.formUser = {
						id:null,
						name: '',
						surname: '',
						phone: '',
						email: ''
				};
		},
		getJSON() {
			var files = document.getElementById('fileUpload').files;
  			 if (files.length <= 0) {
   			 	return false;
  			}
 
  			var fr = new FileReader();
  			fr.onload = function (e) { 
    		var upload = JSON.parse(e.target.result);
    		console.log(upload.users);
    		upload.users.forEach(addToList);
 			}
  			fr.readAsText(files.item(0));

  			var self = this
  			function addToList(result) {
  				self.users.push({id:self.users.length, name: result.name, surname:result.surname, phone: result.phone, email:result.email})
  			}
  			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
  			this.toggleTable();
		},
	}
})