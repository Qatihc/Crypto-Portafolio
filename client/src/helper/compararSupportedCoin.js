function compararSupportedCoin(id, obj){
    if (id > obj.id) return 1;
    if (id < obj.id) return -1;
    return 0;
}

export {compararSupportedCoin};