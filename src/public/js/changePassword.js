const form = document.getElementById('changePswdForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/changePassword',{
        method:'PUT',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            console.log("Password changed successfully");
            let counter = 0
            let login = setInterval(() => {
                counter++
                if(counter === 1) {
                    alert("Password successfully modified")
                }
                if(counter === 3) {
                    window.location.replace('/login');
                    clearInterval(login)
                }
            }, 1000);
        }
    })
})