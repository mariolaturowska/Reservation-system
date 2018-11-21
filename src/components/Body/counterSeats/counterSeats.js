import ReactDOM from "react-dom";
import React from "react";


    class CounterSeats extends React.Component {
        constructor() {
            super();

            this.state={
                name:"",
            }

        }

        changeName=(e)=>{
            this.setState({
                name:e.currentTarget.value,
            })
        }

        handleSubmit=(e)=>{
            console.log(e);
        }


        render(){


            return (
                <form onSubmit={this.handleSubmit}>
                    <input type='name' value={this.state.name} onChange={this.changeName}/>
                    <input type='number' ref={count=>this.count=count}/>
                    <input type='number' ref={sum=>this.sum=sum}/>
                    <input type='submit'/>
                </form>
            )
        }
    }


export default CounterSeats;
