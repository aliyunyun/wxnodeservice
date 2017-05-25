
export default class Confirm extends React.Component{
	opts = {title: '标题', content:'内容'}

	constructor(props){
		super(props);
		_.assign(this.opts, this.props);
	}

	render(){
		var {title, content, onConfirm, onCancel} = this.props.opts;
		return (<div className='confirm_wrap'>
					<div className='confirm_box'>
						
						<div className='confirm_content'>
							<h4>{title}</h4>
							<p>{content}</p>
						</div>
						<div className='confirm_ope'>
							<input type='button' value='取消' onTouchEnd={onCancel} />
							<input type='button' value='确定' onTouchEnd={onConfirm} />
						</div>
						<div className='confirm_shade'></div>	
					</div>
				</div>)
	}
}
