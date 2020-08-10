import React, { Component } from 'react';

class Places extends Component{
    constructor(props){
        super(props)
    }

    handleName = (e)=>{
        this.props.openModal()
        var id = this.props.id
        this.props.loadPlace(id)
    }

    render(){
        return(
            <div className="card venue">
              <div className="card-body">
                <h1 className="venue-name" onClick={this.handleName}>{this.props.name}</h1>
                <p>5B Gore St</p>
                <p>Auckland</p>
                <p><span className="badge venue-type">Café</span></p>
              </div>
            </div> 
        )
    }
}
export default Places;
