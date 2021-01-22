import React from 'react';
import './styles/index.css';
import {useQuery} from './function'
import { useHistory } from 'react-router';
import CreatePost from './CreatePost';

import BroadcastPicture from './BroadcastPicture';
import BroadcastPost from './BroadcastPost';
import BroadcastHeader from './BroadcastHeader';

const FourSnaps = () => {
    let query = useQuery();
    const history = useHistory();
    
    return (
            <div className="four-section ">
                
                <div className="display-broadcast">

                    <div className="left-broadcast ">
                         <button onClick={()=>history.push('/home/broadcast')} className="w3-button  w3-round-large w3-text-dark">
                             <i className="fas fa-broadcast-tower"></i> BROADCAST
                         </button>
                         <button onClick={()=>history.push('/home/broadcast?tab=create')} 
                            className={`w3-small w3-button ${query.get('tab')==='create'?'w3-darker':'w3-blue'} w3-hover-dark w3-round-large w3-margin-top`}>
                             Add Cast <i className="fa fa-edit"></i>
                         </button>
                         <button onClick={()=>history.push('/home/broadcast?tab=broadImage')} 
                            title="show broadcast images" 
                            className={`w3-button w3-small ${query.get('tab')==='broadImage'?'w3-darker':'w3-blue'} w3-hover-darker w3-round-large w3-margin-top`}>
                             Broadcast Image <i className="fas fa-angle-right"></i>
                         </button>
                         <button onClick={()=>history.push('/home/broadcast?tab=broadPost')} 
                            title="show broadcast post" 
                            className={`w3-button ${query.get('tab')==='broadPost'?'w3-darker':'w3-blue'} w3-hover-darker w3-small w3-round-large w3-margin-top`}>
                             Broadcast Posts <i className="fas fa-angle-right"></i>
                         </button>
                    </div>
                    <div className="middle-broadcast w3-light-grey">

                        {
                            query.get('tab')==='broadImage'&&<BroadcastPicture />
                        }
                        {
                            query.get('tab')==='broadPost'&&<BroadcastPost />
                        }
                        {
                            query.get('tab')==='create'&&<CreatePost />
                        }
                        {
                            !query.get('tab')&&<BroadcastHeader />
                        }

                    </div>
                </div>
                   {/*display broadcast end  */}
            </div>
        )
}






export default FourSnaps;