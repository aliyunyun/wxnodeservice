import {Path} from './libs/common';


export const remoteStore = Reflux.createStore({
	init(){

	},

	listenables:[Actions],


	onGetCustomAlbums(data){
		ajax({
			url:Path.wPath + '/albums/getCustomAlbumsList',
			data:data,
			success(res){

			}
		})
	}
})


