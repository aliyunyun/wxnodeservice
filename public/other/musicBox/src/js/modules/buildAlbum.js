import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';

export default class BuildAlbum extends React.Component{

	componentDidMount(){
		this.type = 'add';
		var {id,name} = this.props.params;
		if(+this.props.params.id){
			document.title='编辑歌单';
		}else{
			document.title='新建歌单';
		}
	}
	save(){
		var id = +this.props.params.id;
		var val = this.refs.albumName.value;
		if(val=='') return this.refs.tips.showMsg('请输入歌单名称');
		if(val.length>20) return this.refs.tips.showMsg('名称长度不能超过20');

		if(id){
			Ajax.renewCustomAlbum({albumsCustomId:id, title:val}, (res)=>{
				if(res.code==0){
					history.go(-2);
				}else{
					this.refs.tips.showMsg('修改失败');
				}
			})
		}else{
			Ajax.buildCustomAlbum({title:val}, (res)=>{
				if(res.code==0){
					window.history.back();
				}else{
					this.refs.tips.showMsg('添加失败');
				}
			})
		}
	}

	render(){
		var {id,name} = this.props.params;

		name = +id ? name : '';

		if(this.type=='update') val = this.props.params;
		return (<div className='page page_newfile'>
					<input type='text' ref='albumName' defaultValue={name} className='txt_file' placeholder='请输入歌单名称'/>
					<input type='button' className='btn_save' value='保存'  onTouchTap={this.save.bind(this)}/>
					<Tips ref='tips'/>
			</div>)
	}
}

