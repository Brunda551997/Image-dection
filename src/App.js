 import React, {Component} from 'react';
import Navigation from './component//Navigation/Navigation';
import './App.css';
import Logo from './component/Logo/Logo';
import Imagelink from './component/Imagelink/Imagelink';
import Rank from './component/Rank/Rank';
import Signin from './component/Signin/signin';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Register from './component/Register/Register';




const app = new Clarifai.App({
  apiKey: '61e5f03fe90c4d2ba796b58405e03829'
  
 });


const particlesoption= { 
            		particles: {
            			number:{
                    value:50,
                    desnity:{
                      enable:true,
                      vaule_area:800
                    }
                  }
            				}
            			
            		
              }
              
              
class App extends Component {
  constructor() {
    super();
    this.state={
      input:'',
      imageurl:'',
     box:{},
     route:'sign' ,
     issign:false,
     user:{
      id:'',
      name:'',
      email:'',  
      password:'',
      entries:0,
      joined:''
     }
    }
  }
  loadUser = (data) => {

    this.setState({user: {

      id: data.id,

      name: data.name,

      email: data.email,

      entries: data.entries,

      joined: data.joined

    }})
  }
  calculatefacelocation=(data) => {
    const clarifai=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
  return {
    leftCol:clarifai.left_col*width,
    topRow:clarifai.top_row*height,
    rightCol:width-(clarifai.right_col*width),
    bottomRow:height-(clarifai.bottom_row*height)
  }
  }
displayface=(box)=>{
  //console.log(box);
  this.setState({box:box});
}


onInputChange=(event)=>{
  this.setState({input:event.target.value});
}

onsubmit =  ()=> {
//   this.setState({imageurl:this.state.input});
//   app.models
//   .predict(
//     Clarifai.FACE_DETECT_MODEL,
//     this.state.input)
//      .then(response=> {
//      if(response)
//       {
//         fetch('http://localhost:3001/image', {
//           method:'post',
//           headers:{'Content-Type': 'application/json'},
//           body:JSON.stringify({
//           id:this.state.user.id
//         })
//       }) 
//     }
//        this.displayface(this.calculatefacelocation(response))
//     })
//        .catch(err=> console.log(err));
     
//       // there was an error

// }
this.setState({imageUrl: this.state.input});

app.models

  .predict(

    Clarifai.FACE_DETECT_MODEL,

    this.state.input)

  .then(response => {

    if (response) {

      fetch('http://localhost:3001/image', {

        method:'put',

        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({

          id: this.state.user.id

        })

      })

        .then(response => response.json())

        .then(count => {

          this.setState(Object.assign(this.state.user, { entries: count}))

        })



    }

    this.displayFaceBox(this.calculateFaceLocation(response))

  })

  .catch(err => console.log(err));

}

onRouteChange=(route)=> {
  if(route==='signout') {
    this.setState({issign:false})
  }
  else if(route==='home'){
    this.setState({issign:true})
  }

  this.setState({route:route});
}


 render() {
const {issign,imageurl,route,box}=this.state;

  return (
    <div className="App">
    <Particles className='particles'
     parms={particlesoption}
    />
    
   

      <Navigation issign={issign} onRouteChange={this.onRouteChange}/>
       {this.state.route ==='home'
      
      ?<div>
      <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      
       <Imagelink 
       onInputChange={this.onInputChange}
       onsubmit={this.onsubmit}/>
      
      <FaceRecognition box={box} imageurl={imageurl}/>  
      </div>
      :(
        route==='sign'
      
      ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      )
      }
      </div>
);
}
}
export default App;
