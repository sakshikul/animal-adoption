import React from "react";
import pf from "petfinder-client";
import Carousel from "./Carousel"

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});


class Detail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    petfinder.pet.get().then((data) =>{
      console.log("details's page",data);
      this.setState({
        name: data.petfinder.pet.name,
        animal: data.petfinder.pet.animal,
        location: `${data.petfinder.pet.contact.city}, ${
          data.petfinder.pet.contact.state
        }`,
        description: data.petfinder.pet.description,
        media: data.petfinder.pet.media,
        loading: false,
        breed : data.petfinder.pet.breeds.breed
       

      })
    })
  }
  render(){
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const {name, animal, location, description, media,  breed} = this.state
      return(
          <div className = "details">
          <Carousel media = {media} />
           <h1>{name}</h1>
           <h2>{`${animal} — ${breed} — ${location}`}</h2>
           <p>{description}</p>
           
          </div>
      )
  }
}

export default Detail;