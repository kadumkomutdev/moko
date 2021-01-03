import React from 'react';
 
const FirebaseContext = React.createContext(null);

 
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {Firebase => <Component {...props} firebase={Firebase} />}
    </FirebaseContext.Consumer>
  );
 
export default FirebaseContext;