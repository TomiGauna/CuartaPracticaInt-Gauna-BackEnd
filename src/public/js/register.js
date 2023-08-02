const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/register/',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
        if(result.status===200){
            let counter = 0
            let login = setInterval(() => {
                counter++
                if(counter === 1) {
                    alert("Account successfully created")
                }
                if(counter === 3) {
                    window.location.replace('/login');
                    clearInterval(login)
                }
            }, 1000);
        }else {
            alert("Fail to register account" + result.status)
        };
    });
});