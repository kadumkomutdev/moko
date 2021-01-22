import React from 'react';

const BroadcastHeader = () =>{
    return (
        <div style={{overflowY:"auto",height:"88vh"}}>   
            <h1 className="w3-center w3-padding-24 w3-background" style={{color:"#3d2b1f"}}>Broadcast Your thoughts and Moments</h1>

            <div className="showHeader-grid w3-center">
                <div className="item ">
                    <h3 className="w3-padding-medium w3-dark">
                            <i className="far fa-image"></i> Broadcast Images
                    </h3>
                    <div className="w3-padding-medium w3-background">
                        Upload images that you think should be broadcasted to everyone.
                    </div>
                </div>
                <div className="item ">
                    <h3 className="w3-padding-medium w3-dark">
                            <i className="fas fa-eye"></i> View Broadcast
                    </h3>
                    <div className="w3-padding-medium w3-background">
                        You can view anyone's broadcast, either friend or not, Thats the beauty of it.
                    </div>
                </div>
                <div className="item">
                    <h3 className="w3-padding-medium w3-dark"><i className="far fa-comment-dots"></i> Broadcast Text</h3>
                    <div className="w3-padding-medium w3-background">
                        Dont want to broadcast rather your text, We have got you covered
                    </div>
                </div>
                <div className="item ">
                    <h3 className="w3-padding-medium w3-dark">
                        <i className="fas fa-hammer"></i> Update and delete Broadcast
                    </h3>
                    <div className="w3-padding-medium w3-background" >
                        Now you can update or delete, but it is only available for text.
                    </div>
                </div>
                <div className="item">
                    <h3 className="w3-padding-medium w3-dark" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        <i className="fas fa-video"></i> Go live
                    </h3>
                    <div className="w3-padding-medium w3-background" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        Show everyone what you are upto via video live or audio live.
                    </div>
                </div>
                <div className="item">
                    <h3 className="w3-padding-medium w3-dark" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        <i className="fas fa-hashtag"></i> Tag Tag Tag
                    </h3>
                    <div className="w3-padding-medium w3-background" style={{textDecoration:'line-through',textDecorationColor:"red"}}>
                        Tag with something so that people can find your broadcast easily.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BroadcastHeader;