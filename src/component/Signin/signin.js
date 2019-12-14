import React from 'react';

class signin extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      signinemail:'',
      signpass:''
    }
  }
  onsubmit=()=>{
    fetch('http://localhost:3001/sign',
    {
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
      email:this.state.signinemail,
       password:this.state.signpass
  })
})
  
.then(response => response.json())
 .then(user=> {
   if (user.id) {
this.props.loadUser(user)
//console.log(this.state);   
this.props.onRouteChange('home');
    //this.props.onRouteChange('home');
   }
  })  
  }
  onemail=(event)=>{
    this.setState({signinemail:event.target.value})
  }
onpassword=(event)=>{
  this.setState({signpass:event.target.value})
}
  
  render() {  
    const {onRouteChange}=this.props
  return (
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
        <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email"
         name="email-address"  
         id="email-address"
         onChange={this.onemail}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" name="password"  id="password"
        onChange={this.onpassword}/>
      </div>
      
    </fieldset>
    <div className="">
      <input 
      onClick= {this.onsubmit}
       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
         value="Sign in"
         />
    </div>
    <div className="lh-copy mt3">
      <p onClick={()=> onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
      
    </div>
    </div>
</main>
</article>
);
}
}

export default signin;