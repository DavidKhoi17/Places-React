import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Places from './Places';
import Modal from 'react-bootstrap/Modal';

var clientId = '1UOH0H5GOSC1N5WDGEPVKZWWZYLZ0YCKMEJYUIZSB1PGORWA'
var clientSecret = 'ZHJEI4N4X2241WVFZUAX3GCHRTL1H5BDHO2IRDAAF5H13DQ1'
var key = '?client_id='+clientId+'&client_secret='+clientSecret+'&v=20200810'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      places: [],

      isModalOpen: false,
      modalPlace: {
        address: "369 Queen Street",
        category: "Record Shop",
        id: "4b4d4133f964a52070cf26e3",
        name: "Real Groovy",
        photo: "https://fastly.4sqi.net/img/general/300x300/2228306_-192mD5gFeLbj9A-wvjcriojIgGqZnKZlILSWPSNQrg.jpg"
      },
    }
  }

  loadPlaces = ()=>{
    var latlong = '-36.848998,174.775202'
    var url = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll='+latlong

    //make an AJAX request to endpoint
    fetch(url)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      return data.response.groups[0].items
    })
    .then((data)=>{
      return data.map((item)=>{
        var place = {
          id:item.venue.id,
          name:item.venue.name,
          address:item.venue.location.address,
          category:item.venue.categories[0].shortName
        }
        return place
      })
    })
    .then((data)=>{
      this.setState({
        places:data
      })
    })
  }

  loadPlace = (id)=>{
    var url = 'https://api.foursquare.com/v2/venues/'+id+key

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      var item = data.response.place
      // console.log(item)
      var place = {
        id:item.id,
        name:item.name,
        category:item.categories[0].shortName,
        address:item.location,
        description:item.description,
        photo:item.bestPhoto.prefix+ '300x300' + item.bestPhoto.suffix
      }
      return place
    })
    .then(data=>{
      this.setState({
        modalPlace:data
      })
    })
  }

  openModal = ()=>{
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = ()=>{
    this.setState({
      isModalOpen: false
    })
  }

  componentDidMount(){
    this.loadPlaces()
  }

  render(){
    return(
      <div className="app">
        <div className="container">
          <div className="venues">
            {
              this.state.places.map((item)=>{
                var placeProps = {
                  key: item.id,
                  ...item,
                  openModal: this.openModal,
                  closeModal: this.closeModal
                }
                return(
                  <Places {...placeProps}/>
                )
              })
            }
          </div> 

          <div className="venue-filters">
            
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div role="group" className="btn-group btn-group-toggle">
                <label className="venue-filter btn active btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="all" checked=""/>All
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="food"/>Food
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="drinks"/>Drinks
                </label>
                <label className="venue-filter btn btn-primary">
                  <input name="venue-filter" type="radio" autoComplete="off" value="others"/>Others
                </label>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
          <Modal.Body>
            <div className="venue-popup-body row">
              <div className="col-6">
                <h1 className="venue-name">{this.state.modalPlace.name}</h1>
                <p>5B Gore St</p>
                <p>Auckland</p>
                <p><span className="badge venue-type">Café</span></p>
              </div>
              <div className="col-6">
                <img src={this.state.modalPlace.photo} className="img-fluid" alt="Responsive image"/>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default App;
