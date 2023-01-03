var searchFile = function () {
    fetch("../../../getfile").then(e=>e.text()).then(
        data=>$("#path_ini").val(data).change())
}