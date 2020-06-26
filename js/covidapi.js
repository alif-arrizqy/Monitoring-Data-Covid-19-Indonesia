$(document).ready(function () {


    // $.getJSON("https://api.covid19india.org/data.json", function (data) {
    $.getJSON("https://covid19.mathdro.id/api/countries/Indonesia", function (data) {


        // let total_active = data.statewise[0].active;
        let total_confirmed = data.confirmed.value;
        let total_recovered = data.recovered.value;
        let total_deaths = data.deaths.value;
        let last_update = data.lastUpdate;

        $("#confirmed").append(total_confirmed);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        $("#lastupdate").append(last_update);
    });

    $.getJSON("https://opendata.arcgis.com/datasets/0c0f4558f1e548b68a1c82112744bad3_0.geojson", function (data) {
        // For state wise data
        let Provinsi = [];
        let Kasus_Posi = [];
        let Kasus_Semb = [];
        let Kasus_Meni = [];
        
        $.each(data.features, function (id, obj) {
            Provinsi.push(obj.properties.Provinsi)
            Kasus_Posi.push(obj.properties.Kasus_Posi)
            Kasus_Semb.push(obj.properties.Kasus_Semb)
            Kasus_Meni.push(obj.properties.Kasus_Meni)
        })   
        // to remove total casese in an array
        
        Provinsi.pop()
        // Kasus_Posi.shift()
        // Kasus_Semb.shift()
        // Kasus_Meni.shift();
        console.log(Provinsi);
        

        var barchart = document.getElementById("barchart").getContext('2d');

        var chartview = new Chart(barchart, {
            type: 'bar',
            data: {
                labels: Provinsi,
                datasets: [{
                    label: "Confirmed Case",
                    data: Kasus_Posi,
                    backgroundColor: "orange",
                    // minBarLength: 100,
                },
                {
                    label: "Recovered Case",
                    data: Kasus_Semb,
                    backgroundColor: "steelblue",
                    // minBarLength: 100,
                },
                {
                    label: "Death Case",
                    data: Kasus_Meni,
                    backgroundColor: "orangered",
                    // minBarLength: 100,
                }

                ]
            },
            options: {}
        });

        var linechart = document.getElementById("linechart").getContext('2d');

        var chartview2 = new Chart(linechart, {
            type: 'line',
            data: {
                labels: Provinsi,
                datasets: [{
                    label: "Confirmed Case",
                    data: Kasus_Posi,
                    backgroundColor: "orange",
                },
                {
                    label: "Recovered Case",
                    data: Kasus_Semb,
                    backgroundColor: "steelblue",
                },
                {
                    label: "Death Case",
                    data: Kasus_Meni,
                    backgroundColor: "orangered",
                }
                ]
            },
            options: {}
        });
    });


    // Cvoid 19 Summery world

    $.getJSON("https://api.covid19api.com/summary", function (data) {

        // console.table(data.Countries);
        // console.log(data.Countries.Country)

        let g_total_confirmed = data.Global.TotalConfirmed;
        let g_total_recovered = data.Global.TotalRecovered;
        let g_total_deaths = data.Global.TotalDeaths;


        $("#g-confirmed").append(g_total_confirmed);
        $("#g-recovered").append(g_total_recovered);
        $("#g-deaths").append(g_total_deaths);

        let tblv = document.getElementById('tblv');

        for (let i = 1; i < (data['Countries'].length); i++) {
            let a = tblv.insertRow();
            a.insertCell(0);
            tblv.rows[i].cells[0].innerHTML = data['Countries'][i - 1]['Country'];
            tblv.rows[i].cells[0].style.fontWeight = "700";

            a.insertCell(1);
            tblv.rows[i].cells[1].innerHTML = data['Countries'][i - 1]['TotalConfirmed'];
            tblv.rows[i].cells[1].style.fontWeight = "700";
            tblv.rows[i].cells[1].style.color = "steelblue";


            a.insertCell(2);
            tblv.rows[i].cells[2].innerHTML = data['Countries'][i - 1]['TotalRecovered'];
            tblv.rows[i].cells[2].style.fontWeight = "700";
            tblv.rows[i].cells[2].style.color = "yellowgreen";

            a.insertCell(3);
            tblv.rows[i].cells[3].innerHTML = data['Countries'][i - 1]['TotalDeaths'];
            tblv.rows[i].cells[3].style.fontWeight = "700";
            tblv.rows[i].cells[3].style.color = "orangered";


        }

    });


});