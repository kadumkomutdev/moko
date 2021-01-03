import React,{ useEffect,useState,lazy,Suspense} from 'react';
import './App.css';
import './w3.css';
import {BrowserRouter as Router,Switch, Route,useHistory} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Circle from './loader/Circle';

const Home = lazy(() => import('./Home/Home'));
const Signup = lazy(()=> import('./Signup/Signup'));
const Developer = lazy(()=> import('./Developer/Developer'))
const Test = lazy(()=>import('./Test'));

function App() {
	const loadStyle = {
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		width:"100vw",
		height:"100vh"
	}
  return (  
	<Router>
		<Suspense fallback={<div style={loadStyle}><Circle/></div>}>
  			<div>
			  <Switch>
				{/* Loads first time when it renders */}
				<Route path="/" exact component={WaterMark}/>
				{/* home */}
				<Route path="/home"  component={Home}/>
				{/* signup */}
                <Route path="/signup" exact   component={Signup}/>
				{/* Developer */}
				<Route path="/kadumkomut" component={Developer}/>
				<Route path="/mohitpal" component={Developer}/>
				<Route path="/akshaymishra" component={Developer}/>
				{/* test */}
				<Route path="/test" component={Test}/>
				{/* page 404 */}
				<Route path="/" component={Unknown} />
              </Switch>	
			  <NotificationContainer />
  			</div>
		</Suspense>
	</Router>
  	);
  }

  //page 404
  const Unknown = ({history}) =>{
	  	 const style = {
			display:"flex",
			alignItems:"center",
			height:"100vh",
			width:"100vw",
			justifyContent:"center",
			flexDirection:"column"
		}	   
		return(
			<div style={style} className="w3-text-white w3-jumbo">
				<div className="w3-center w3-padding-large w3-animate-fading w3-green w3-card-4 w3-round-xlarge">
				<h3>Hey Buddy</h3> 
				<p className="w3-xxlarge"> Are you lost?</p>
				<button className="w3-button w3-white w3-margin-top w3-round w3-hover-red" onClick={()=>history.push('/signup')}>Go Home</button>
				</div>
			</div>
		);
  }

  //front page
  const WaterMark = () => {
	  let history = useHistory();	  
	  useEffect(() => {
		 setTimeout(() => {
			history.push("/signup");
		}, 5000);
	}, [])	
	  return (
		  <div className="watermark">
			  <h1 className="animate__animated animate__bounce">MOKO CHAT APP <Counter /></h1>
			  <p>Developed by Mohit Pal, Kadum Komut, Akshay Mishra</p>
		  </div>
	  );
  }

const Counter = () =>{
	const [value,setValue] = useState(5);
	useEffect(()=>{
		const t = setInterval(()=>{
			setValue(prev=>prev-1);
		},1000);
		return ()=>{
			clearInterval(t);
		}
	},[value]);
	return(
		<span>{value}</span>
	);
}

export default App;
