
export default class Tips extends React.Component{
	opts = {second: 3}
	state = {animate: false}

	constructor(props){
		super(props);
		_.assign(this.opts, this.props);
	}

	showMsg(msg){
		this.setState({animate:false, show:true, tip:msg});
		this.removeInterval = setTimeout(()=>{
			this.setState({animate: true})
			this.removeInterval = setTimeout(()=>{
				this.setState({show:false})
			},1000)
		}, this.opts.second*1000)
	}

	componentWillUnmount(){
		clearTimeout(this.removeInterval);
	}

	render(){
		var {show, tip, animate} = this.state;

		return (<div className={'tips_content '+ (show?'show ':'hide ') + (animate?'fadeout':'fadein')}>
					<div className='tips_shade'></div>
					<span className='tips'>{tip}</span>
				</div>)
	}
}
