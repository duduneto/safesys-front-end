import fetch from 'node-fetch';

export default function pegaFetch(){
    return fetch(`http://localhost:3030/api/login/5a9499eed881511d7403778a`, { mode: 'no-cors' })
            .then( response => response.json())
            .then( result => result.email)
            .then( myemail => this.setState({ email: myemail}))
            
}

