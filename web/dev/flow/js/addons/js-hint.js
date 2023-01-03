/*
    Danilo Toro
*/

const par = {
    "(": ")",
    "'": "'",
    '"': '"',
    "[": "]",
    "{": "}"
}

String.prototype.splice = function(idx, str){
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(0));
}

function autocomplete(cm, ev){
    let cursor = cm.doc.getCursor()
    let value = cm.doc.getValue()
    let key = ev.key
    if(par[key]){
        let new_value = value.splice(cursor.ch, par[key])
        cm.doc.setValue(new_value)
        cm.doc.setCursor(cursor)
    }
}