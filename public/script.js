if(document.getElementById('id')){
    const btn = document.getElementById('btn');
    const id = document.getElementById('id');
    if(id.value!==""){
        btn.textContent = "Modifier";
        const form = document.getElementById('form');
        form.action = '/apprenants/edit';
    }
    
}
