import React,{useState,useEffect} from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import app_url from './apiurl'

// import {FaMapMarkerAlt} from "react-icons/fa"

// const fetchMyIp = async () =>{
//   const res = await fetch(`https://api.ipify.org/?format=json`)
//   const data = await res.json()
//   return data.ip
// }

function App(){

  const[text,setText] = useState('');
  const [ipData,setIpData] = useState(null)
  // const [ip,setIp] = useState(null)
  const [position,setPosition] = useState(null)

  

  const fetchData = async (url)=>{
    const response = await fetch(url)
    const responseData = await response.json()
    setIpData(responseData)
  }

  useEffect(() => {
    const fetchMyIp = async () =>{
      const res = await fetch('https://api.ipify.org/?format=json')
      const resData = await res.json()
      fetchData(`${app_url}${resData.ip}`)
    }
    fetchMyIp()
  }, [])

  useEffect(() => {
    if(ipData){
      if (ipData.hasOwnProperty("code")){
        setIpData({ip:text,isp:"n/a",location:{city:"n/a",country:"",timezone:"+n/a",lat:0,lng:0 }})
      }else{
        setPosition([ipData?.location?.lat,ipData?.location?.lng])
      }
    }
    // eslint-disable-next-line
  }, [ipData])

  const handleSubmit =(e) =>{
    e.preventDefault()
    fetchData(`${app_url}${text}`)
    setText("")

  }

  
  // const skater =new Icon({
  //   iconUrl:"/images/map.png",
  //   iconSize:[30,30]
  // })
  console.log(ipData)

  if(!ipData){
    return (
      <div className="loading" style={{height:'100vh',width:'100vw',display:'grid',placeItems:'center'}}>
        <img src="/images/loading.gif" height="70px" width="70px" alt="Loading..."/>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="upSec">
            <form onSubmit={handleSubmit}>
        <div className="upSec_content">
          <h1>IP Address Tracker</h1>
          <div className="upSec_content_value">
          <input onChange={(e)=>{
            setText(e.target.value)
          }} value={text} type="text" placeholder="Search for any IP address or domain"/>
          <button type="submit"><img src="/images/icon-arrow.svg" alt="arrow"/></button>
          </div>
          
        </div>
          </form>
      </div>
      <div className="output">
        <div className="output_content">
          <div className="content">
            <h4>ip address</h4>
        <h2>{ipData?.ip}</h2>
            
          </div><span></span>
          <div className="content">
            <h4>location</h4>
        <h2>{ipData?.location?.city},{ipData?.location?.country}</h2>
            
          </div><span></span>
          <div className="content">
            <h4>timezone </h4>
        <h2>UTC{ipData?.location?.timezone}</h2>
            
          </div><span></span>
          <div className="content">
            <h4>isp</h4>
            <h2>{ipData?.as?.name}</h2>
          </div>
        </div>
      </div>
      <div className="mapSec">

      <Map center={position} zoom={16}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} color={"red"}>
                <Popup>
                  Your location
                  <br />
                  Baneshwor,Kathmandu
                </Popup>
              </Marker>
            </Map>
      </div>
      
    </div>
  );
}

export default App;
