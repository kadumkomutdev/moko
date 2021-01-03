import Swal from 'sweetalert2';

//navigate other profile
export const navigateProfile = (username,photo,uid,history) =>{
    Swal.fire({
        text:username,
        imageUrl:photo,
        imageAlt:username,
        confirmButtonText:"View profile <i class='fas fa-user-circle'></i>"
      }).then(result =>{
        if(result.isConfirmed){
          history.push(`/home/profile/${uid}`)
        }
      }) 
}

//navigate the auth profile
export const myProfile = (name,picture,history,signout) =>{
    Swal.fire({
        title:name,
        imageUrl:picture,
        imageAlt:name,
        imageHeight:'150px',
        imageWidth:"150px",
        focusConfirm:false,
        focusDeny:false,
        focusCancel:false,
        showConfirmButton:true,
        reverseButtons:true,
        confirmButtonText:"Log out <i class='fas fa-paper-plane'></i>",
        confirmButtonColor:"#f44336",
        denyButtonColor:"#4a6e8b",
        showDenyButton:true,
        denyButtonText:'View Profile <i class="fas fa-user-circle"></i>',
    }).then(result=>{
        if(result.isConfirmed){
            logOut(signout);
        }
        if(result.isDenied){
           history.push('/home/profile');
        }
    })
}
const logOut = (signout) =>{
    Swal.fire({
        title: 'LOGOUT?',
        text: 'ARE YOU SURE',
        icon: 'warning',
        allowOutsideClick:false,
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'No, cancel'
      }).then((result) => {
        if (result.value) {
            signout();
        }else if(result.dismiss===Swal.DismissReason.cancel){
            Swal.fire('Cancelled','Uff.. You had us worried','info');
        }
      })
}