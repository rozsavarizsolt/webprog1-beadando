const url = 'https://demoserver.hu/AjaxApi.php';
const code = 'CSZS98rz315';

async function kiolvasas(){
    let response = await fetch(url, {
        method: 'post',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "code="+code+"&op=read"
    });
    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;

    str = "<p>Rekordok száma: " + data.rowCount + "</p>";
    str += "<table><tr><th>ID</th><th>Név</th><th>Magasság</th><th>Súly</th></tr>";

    let osszeg = 0;
    let maxHeight = 0;

    for(let i = 0; i < list.length; i++){
        let height = parseFloat(list[i].height);
        osszeg += height;

        if (height > maxHeight) {
            maxHeight = height;
        }

        str += "<tr><td>" + list[i].id + "</td><td>" + list[i].name + "</td><td>" + list[i].height + "</td><td>" + list[i].weight + "</td></tr>";
    }

    let atlag = list.length > 0 ? (osszeg / list.length).toFixed(2) : 0;

    str += "</table>";
    str += `<p>Magasságok összege: ${osszeg}</p>`;
    str += `<p>Magasságok átlaga: ${atlag}</p>`;
    str += `<p>Legnagyobb magasság: ${maxHeight}</p>`;

    document.getElementById("readResult").innerHTML = str;
    document.getElementById("createResult").innerHTML = "";
    document.getElementById("updateResult").innerHTML = "";
    document.getElementById("deleteResult").innerHTML = "";
}

async function letrehozas() {
    nameStr = document.getElementById("name").value;
    weight = document.getElementById("weight").value;
    height = document.getElementById("height").value;

    if (nameStr.length > 0 && nameStr.length <= 30 && weight.length > 0 && weight.length <= 30 && height.length > 0 && height.length <= 30) {
        let response = await fetch(url, {
            method: 'post',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "code=" + code + "&op=create&name=" + nameStr + "&height=" + height + "&weight=" + weight
        });

        let data = await response.text();

        if(data > 0){
            str = "Sikeres létrehozás!";
        }
        else{
            str = "Hiba történt a létrehozás során!";
        }

        document.getElementById("createResult").innerHTML = str;
        document.getElementById("name").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("height").value = "";
    }else{
        document.getElementById("createResult").innerHTML = "Validációs hiba!";
    }
}

async function getDataForId() {
    let response = await fetch(url, {
        method: 'post',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "code=" + code + "&op=read"
    });

    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;

    for(let i = 0; i < list.length; i++){
        if (list[i].id == document.getElementById("searchId").value) {
            document.getElementById("updateName").value = list[i].name;
            document.getElementById("updateWeight").value = list[i].weight;
            document.getElementById("updateHeight").value = list[i].height;
        }
    }
}

async function frissites() {
    id = document.getElementById("searchId").value;
    nameStr = document.getElementById("updateName").value;
    height = document.getElementById("updateHeight").value;
    weight = document.getElementById("updateWeight").value;

    if (nameStr.length > 0 && nameStr.length <= 30 && height.length > 0 && height.length <= 30 && weight.length > 0 && weight.length <= 30) {
        let response = await fetch(url, {
            method: 'post',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "code=" + code + "&op=update&id=" + id + "&name=" + nameStr + "&height=" + height + "&weight=" + weight
        });

        let data = await response.text();
        if (data > 0) {
            str = "Sikeres frissítés!";
        }else{
            str = "Hiba történt a frissítés során!";
        }

        document.getElementById("updateResult").innerHTML = str;

        document.getElementById("searchId").value = "";
        document.getElementById("updateName").value = "";
        document.getElementById("updateHeight").value = "";
        document.getElementById("updateWeight").value = "";
    }
    else{
        document.getElementById("updateResult").innerHTML = "Validációs hiba!";
    }
}

async function torles(){
    id = document.getElementById("deleteId").value;
    if (id.length > 0 && id.length <= 30) {
        let response = await fetch(url, {
            method: 'post',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "code=" + code + "&op=delete&id=" + id
        });

        let data = await response.text();
        if(data > 0){
            str = "Sikeres törlés!";
        }
        else{
            str = "Hiba történt a törlés közben.";
        }

        document.getElementById("deleteResult").innerHTML = str;
        document.getElementById("deleteId").value = "";
    }
    else{
        document.getElementById("deleteResult").innerHTML = "Validációs hiba!";
    }
}

window.onload = function(){
    kiolvasas();
};
