exports.goto_access = (rol) =>{
    switch(rol){
        case 'Administrador':
            return '/admin';
        default:
            return "/"
    }
}