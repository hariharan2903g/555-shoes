let showToastFunction = null;

export function registerToast(fn){

    showToastFunction = fn;

}

export function showToast(message){

    if(showToastFunction){

        showToastFunction(message);

    }

}