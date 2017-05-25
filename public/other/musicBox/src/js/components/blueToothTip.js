
export default class BlueToothTip extends React.Component{
	opts = {title: '标题', content:'内容'}

	constructor(props){
		super(props);
		_.assign(this.opts, this.props);
	}

	confirm(){
		var {onConfirm} = this.props;

		onConfirm(this.refs.noTip.checked);
	}

	render(){
		var {onConfirm, onCancel} = this.props;
		return (<div className='confirm_wrap blueToothTip'>
					<div className='confirm_box'>
						
						<div className='confirm_content'>
							<h4>提示</h4>
							<p>星月智能灯播放音乐时，需要手机蓝牙和音箱蓝牙配对。</p>
							<div><input type='checkbox' ref='noTip' name='noTip' id='noTip' /><span>不再提示</span></div>
						</div>
						<div className='confirm_ope'>
							<input type='button' value='确定' onTouchEnd={this.confirm.bind(this)} />
						</div>
						<div className='confirm_shade'></div>	
					</div>
				</div>)
	}
}

