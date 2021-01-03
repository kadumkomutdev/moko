import Swal from 'sweetalert2'

export const updateUserTurn = (auth,game,firestore,val,value) =>{
    if(auth.currentUser.uid!==game.playerturn){
        return;
    }
    const player = game.playerturn===game.host.uid?game.accepter.uid:game.host.uid;
    const updateTurn = firestore.collection('tictactoe').doc(game.gameid);


    switch(val){
        case "zero":
            if(game.button.zero.state){
                Swal.fire('','Its already filled','warning');
                return;
            }
            updateTurn.update({
                 'button.zero' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "one":
            if(game.button.one.state){
                Swal.fire('','Its already filled','warning');
                return;
            }
            updateTurn.update({
                 'button.one' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "two":
            if(game.button.two.state){
                Swal.fire('','Its already filled','warning');

                return;
            }
            updateTurn.update({
                 'button.two' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "three":
            if(game.button.three.state){
                Swal.fire('','Its already filled','warning');
                
                return;
            }
            updateTurn.update({
                 'button.three' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "four":
            if(game.button.four.state){
                Swal.fire('','Its already filled','warning');
                
                return;
            }
            updateTurn.update({
                 'button.four' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "five":
            if(game.button.five.state){
                Swal.fire('','Its already filled','warning');
                
                return;
            }
            updateTurn.update({
                 'button.five' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "six":
            if(game.button.six.state){
                Swal.fire('','Its already filled','warning');
            
                return;
            }
            updateTurn.update({
                 'button.six' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "seven":
            if(game.button.seven.state){
                Swal.fire('','Its already filled','warning');
                
                return;
            }
            updateTurn.update({
                 'button.seven' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        case "eight":
            if(game.button.eight.state){
                Swal.fire('','Its already filled','warning');
                
                return;
            }
            updateTurn.update({
                 'button.eight' : {
                     state : true,
                     value : value
                 },
                 playerturn : player
            })
            break;
        default:
    }
}

//winning logic
export const checkWinTicTacToe = (game,firestore,history)=>{
            var win;
            if(game.button.zero.value==='X'&&game.button.one.value==='X'&&game.button.two.value==='X'){
                win = 1;
            }else if(game.button.three.value==='X'&&game.button.four.value==='X'&&game.button.five.value==='X'){
                win = 1
            }else if(game.button.six.value==='X'&&game.button.seven.value==='X'&&game.button.eight.value==='X'){
                win = 1
            }else if(game.button.zero.value==='X'&&game.button.three.value==='X'&&game.button.six.value==='X'){
                win = 1
            }else if(game.button.one.value==='X'&&game.button.four.value==='X'&&game.button.seven.value==='X'){
                win = 1
            }else if(game.button.two.value==='X'&&game.button.five.value==='X'&&game.button.eight.value==='X'){
                win = 1
            }else if(game.button.zero.value==='X'&&game.button.four.value==='X'&&game.button.eight.value==='X'){
                win = 1
            }else if(game.button.two.value==='X'&&game.button.four.value==='X'&&game.button.six.value==='X'){
                win = 1
            }

            if(game.button.zero.value==='O'&&game.button.one.value==='O'&&game.button.two.value==='O'){
                win = 2
            }else if(game.button.three.value==='O'&&game.button.four.value==='O'&&game.button.five.value==='O'){
                win = 2
            }else if(game.button.six.value==='O'&&game.button.seven.value==='O'&&game.button.eight.value==='O'){
                win = 2
            }else if(game.button.zero.value==='O'&&game.button.three.value==='O'&&game.button.six.value==='O'){
                win = 2
            }else if(game.button.one.value==='O'&&game.button.four.value==='O'&&game.button.seven.value==='O'){
                win = 2
            }else if(game.button.two.value==='O'&&game.button.five.value==='O'&&game.button.eight.value==='O'){
                win = 2
            }else if(game.button.zero.value==='O'&&game.button.four.value==='O'&&game.button.eight.value==='O'){
                win = 2
            }else if(game.button.two.value==='O'&&game.button.four.value==='O'&&game.button.six.value==='O'){
                win = 2
            }

            if(win===1){
                 firestore.collection('tictactoe').doc(game.gameid).update({
                    win : game.host.uid
                })
                Swal.fire({
                    text:game.host.name+" Wins",
                    imageUrl:game.host.photo,
                    confirmButtonText:"Go back"
                }).then((result)=>{
                    if(result.isConfirmed){
                        history.push('/home/chat');
                    }
                })
                return;
            }else if(win===2){
                firestore.collection('tictactoe').doc(game.gameid).update({
                    win : game.accepter.uid
                })
                Swal.fire({
                    text:game.accepter.name+" Wins",
                    imageUrl:game.accepter.photo,
                    confirmButtonText:"Go back"
                }).then((result)=>{
                    if(result.isConfirmed){
                        history.push('/home/chat');
                    }
                })
                return;
            }
    checkTieTicTacToe(game,history);
}

//checking if the game is tied
const checkTieTicTacToe=(game,history)=>{
    if(game.button.zero.state
        &&game.button.one.state
        &&game.button.two.state
        &&game.button.three.state
        &&game.button.four.state
        &&game.button.five.state
        &&game.button.six.state
        &&game.button.seven.state
        &&game.button.eight.state){
             Swal.fire({
                text:"Game is Tied",
                confirmButtonText:"Go back"
            }).then(res=>{
                if(res.isConfirmed){
                    history.push('/home/chat');
                }
            })
        }
}

//check if the game was decline by other user
export const checkAcceptTicTacToe = (game,history)=>{
    if(game&&game.accept==="decline"){
        Swal.fire({
            text:"Your challenge was decline",
            icon:'info',
            confirmButtonText:"Go back"
        }).then(result=>{
            if(result.isConfirmed){
                history.push('/home/chat');
            }
        })
    }
}