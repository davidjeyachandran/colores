window.addEventListener("load", function(){
    miJSON = [
        {
            "name": "Melissa",
            "color": "Verde"
        },
        {
            "name": "Fabrizzio",
            "color": "Verde"
        },
        {
            "name": "Edith",
            "color": "Celeste"
        },
        {
            "name": "Edgar",
            "color": "Blanco"
        },
        {
            "name": "Anabel",
            "color": "Morado"
        },
        {
            "name": "David",
            "color": "Verde"
        }
    ];
    
    var colorList = [];
    
    miJSON.forEach(function(item){
        if (isNaN(colorList[item.color])) colorList[item.color]=0;
        colorList[item.color]++;
    }); 
    
    var html = '<table border=1>';
    Object.keys(colorList).forEach( function(item) {
        html += '<tr><td>' + item + '</td><td>' + colorList[item] + '</td>';
    });
    html += '</table>';

    document.getElementById('app').innerHTML = html;

});
