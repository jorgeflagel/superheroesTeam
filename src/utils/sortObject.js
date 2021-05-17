export default function sortObject(obj, dir) {
    var sortable = [];
    var sorted = [];
    for (var key in obj) {
        sortable.push([key, obj[key]]);
    }
    if (dir === "descendent"){
        sorted = sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
    }
    else {
        sorted = sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
    }
    return sorted;
}