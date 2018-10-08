class Main {
    constructor(){
        document.addEventListener('DOMContentLoaded', (event)=>{this.ready()});
        
    }

    ready(){
        // Attach any content listeners
        document.getElementById('signin-button').addEventListener('click', function() {
            blockstack.redirectToSignIn()
        });
        document.getElementById('signout-button').addEventListener('click', function() {
            blockstack.signUserOut(window.location.origin)
        });
        
        debugger
        // page re-loaded check status
        if (blockstack.isUserSignedIn()) {
            var profile = blockstack.loadUserData().profile;
            this.showProfile(profile);
        } else if (blockstack.isSignInPending()) {
            blockstack.handlePendingSignIn().then( (userData) =>{
                window.location = window.location.origin
            })
        }
    }

    showProfile( profile ){
        const person = new blockstack.Person(profile)
        document.getElementById('heading-name').innerHTML = person.name()
        document
            .getElementById('avatar-image')
            .setAttribute('src', person.avatarUrl())
        document.getElementById('section-1').style.display = 'none'
        document.getElementById('section-2').style.display = 'block'
    }
}

export default Main;