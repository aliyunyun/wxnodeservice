
export default class FileList extends React.Component{

	constructor(props){
		super(props);
		_.assign(this.opts, this.props);
	}

	render(){
		var list = this.props.list.map((item,i)=>{
			return <Item key={i} info={item} touchCallback={this.props.touchCallback}/>
		})

		return <ul className='file_list'>{list}</ul>
	}
}

class Item extends React.Component{
	render(){
		var {info, touchCallback} = this.props,
			{id, img, name, num} = info;

		return (<li onTouchTap={touchCallback.bind(null,info)}>
			<div className='img'><img src='../static/imgs/test.png'></img></div>
			<div className='base_info'>
				<div>{name}</div>
				<div className='num'>{num}首</div>
			</div>
			<div className='oper_icon'><i></i></div>
		</li>)
	}
}

