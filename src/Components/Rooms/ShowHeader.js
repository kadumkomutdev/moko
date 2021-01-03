import React from 'react';

const ShowHeader = () =>{
    return (
        <div style={{overflowY:"auto",height:"88vh"}}>   
            <h1 className="w3-center w3-padding-24 w3-background" style={{color:"#3d2b1f"}}>Create Room and invite anyone!</h1>

            <div className="showHeader-grid w3-center">
                <div className="item ">
                    <h3 className="w3-padding-medium w3-dark">
                            <i className="fa fa-edit"></i> Create Room
                    </h3>
                    <div className="w3-padding-medium w3-background">
                        Create any room as long the room is not already been created by someone else
                    </div>
                </div>
                <div className="item ">
                    <h3 className="w3-padding-medium w3-dark">
                            <i className="fas fa-bullseye"></i> Join Room
                    </h3>
                    <div className="w3-padding-medium w3-background">
                        You can join any room as long as you have the room id and ofcourse a friendly manner
                    </div>
                </div>
                <div className="item">
                    <h3 className="w3-padding-medium w3-dark"><i className="far fa-comment-dots"></i> Message</h3>
                    <div className="w3-padding-medium w3-background">
                        Message with all the users in the best possible way
                    </div>
                </div>
                <div className="item ">
                    <h3 className="w3-padding-medium w3-dark" style={{textDecoration:'line-through',textDecorationColor:"red"}}><i className="fas fa-hammer"></i> Destructible Message</h3>
                    <div className="w3-padding-medium w3-background" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        Send a Destructible message with a timer and waow it is, Magic
                    </div>
                </div>
                <div className="item">
                    <h3 className="w3-padding-medium w3-dark" style={{textDecoration:'line-through',textDecorationColor:"red"}}><i className="fas fa-video"></i> Video and phone</h3>
                    <div className="w3-padding-medium w3-background" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        Video call and phone call all possible with rooms now
                    </div>
                </div>
                <div className="item">
                    <h3 className="w3-padding-medium w3-dark" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        <i className="fas fa-gamepad"></i> Game Challenge
                    </h3>
                    <div className="w3-padding-medium w3-background" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        Challenge games with friends in your room and just chill!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowHeader;