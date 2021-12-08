/* La funcion comparar devuelve 0 si los elemento son iguales, 1 si el primero es mayor que el segundo, y -1 si el primero es menor al segundo. */

function busquedaBinaria(elem, array, comparar){
    try{
        if (!Array.isArray(array)) throw new TypeError('Segundo argumento no es array.');

        let low = 0;
        let high = array.length - 1;

        while(low <= high){
            let medio = Math.floor((low + high) / 2);
            let comp = comparar(elem, array[medio]);
            if (comp == 0) return medio;
            if (comp > 0) low = medio + 1;
            if (comp < 0) high = medio - 1; 
        }

        return -1;
    }
    catch(e){
        console.log('error en busqueda binaria.');
        throw new Error(e);
    }
}

export {busquedaBinaria};