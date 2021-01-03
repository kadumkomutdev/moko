import React, { Component } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Swal from 'sweetalert2';

export default class Modal extends Component {
    constructor(props){
        super(props);
        this.firestore = this.props.firebase.firestore;
        this.auth = this.props.firebase.auth;
        this.storage = this.props.firebase.storage;

        this.state = {
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 1 / 1
            },
            progress:0,
            croppedImageUrl: null,
            updateButton: "Update",
            updateButtonDisable:false
        }
    }
      onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', () =>
            this.setState({ src: reader.result })
          );
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    
      // If you setState the crop in here you should return false.
      onImageLoaded = image => {
        this.imageRef = image;
      };
    
      onCropComplete = crop => {
        this.makeClientCrop(crop);
      };
    
      onCropChange = (crop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
      };
    
      async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          this.setState({ croppedImageUrl });
        }
      }
    
      getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const reader = new FileReader()
        canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            this.dataURLtoFile(reader.result, this.auth.currentUser.displayName+Date.now()+'.jpg')
        }
    })
} 

      dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage }) 
    }
    
    render(){
        const { crop, src } = this.state;
    return (
            <div className="w3-modal">
                <div className="w3-modal-content">
                    <div className="w3-container w3-padding-large">
                        {/* close button */}
                        <span onClick={()=>this.props.setIsOpenModal(false)} className="w3-red w3-button w3-right">&times;</span>
                        {/* input */}
                        <div className="w3-large w3-padding-large w3-center">
                            <input type="file" accept="image/*" className="w3-input w3-border w3-dark w3-hover-darker" onChange={this.onSelectFile} />
                        </div>
                    
                    {/* start of crop */}
                    {src&&
                        <div className="w3-center" style={{padding:"10px 5px"}}>
                            {/* progress */}
                            <div className="w3-white">
                                <div className=" w3-green " style={{width:this.state.progress+"%"}}>{this.state.progress}%</div>
                            </div>
                             
                             {/* crop */}
                            <div style={{maxWidth:"70%",margin:"auto",marginTop:"8px",marginBottom:"8px"}}>
                                <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                                />
                            </div>
                                
                            {/* update button */}
                            <button 
                                disabled={this.state.updateButtonDisable} 
                                className="w3-button w3-large w3-dark w3-card-2 w3-hover-darker" 
                                onClick={async()=>{
                                    const uploadTask = this.storage.ref(`${this.auth.currentUser.uid}/${this.state.croppedImage.name}`).put(this.state.croppedImage);
                                    this.setState({updateButton:"Updating please wait",updateButtonDisable:true})
                                    await uploadTask.on(
                                        "state_changed",
                                        snapshot=>{
                                            // progress function ...
                                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                            this.setState({ progress });
                                        },
                                        error=>{
                                            console.log(error);
                                            this.setState({updateButton:"Update",updateButtonDisable:false})
                                        },
                                        ()=>{
                                            this.storage
                                            .ref(this.auth.currentUser.uid)
                                            .child(this.state.croppedImage.name)
                                            .getDownloadURL()
                                            .then(url=>{
                                                this.firestore.collection('users').doc(this.auth.currentUser.uid).update({
                                                    photo:url
                                                }).then(()=>{
                                                    this.props.setIsOpenModal(false);
                                                    Swal.fire('Update Successful','','success');
                                                }).catch(err=>{
                                                    this.setState({updateButton:"Update",updateButtonDisable:false});
                                                });
                                            })
                                        }
                                    );
                                }}>{this.state.updateButton} <i className="fas fa-edit"></i>
                            </button>
                        </div>}
                    {/* end of crop */}
                    
                </div>
            </div>
        </div>
    )
}

}
