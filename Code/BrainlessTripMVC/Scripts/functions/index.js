

function formInit() {
    getCountyList();
}


function getCountyList() {
    var _url = "https://demo.igis.com.tw/server/rest/services/TWN_VISASTATUS/MapServer/0/query?";
    var _data = "where=%E5%B7%A5%E4%BD%9C%E8%A1%A81__Countrt_CN+%3C%3E%27%27&text=&objectIds=&time=&"
    +"geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam="+
    "&outFields=%E5%B7%A5%E4%BD%9C%E8%A1%A81__Countrt_CN&returnGeometry=false&returnTrueCurves=false&" +
    "maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false" +
    "&orderByFields=%E5%B7%A5%E4%BD%9C%E8%A1%A81__Countrt_CN&groupByFieldsForStatistics=" +
    "&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=true&resultOffset=&" +
    "resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json";
    _url += _data;
    /*
    $.get(_url, null,
        function (result) {
            console.log(result);
        })
        */
    // AJAX跨網址處理
    $.ajax({
        url: _url,
        //data: _oOptions,
        dataType: "jsonp",
        crossDomain: true,
        success: afterAjaxCall,
        error: afterAjaxCall
    });
}

function ajaxCallJsonp(target, options) {

    var data = $.getJSON(target, options);

    //empty content
    $("#result").html("");

    //成功得到資料
    data.success(function (msg) {

        //my data
        if (target == "http://design2u.me/example/jsonp/index.php?callback=?") {
            $("#result").html('Your name is ' + msg.fullname);
        }

    });

    //取得資料失敗
    data.error(function (msg) {
        $("#result").html("fail getting data");
    });

}

function afterAjaxCall(result) {
    try {
        console.log();
        var _names = [];
        var _county = "";
        _names.push("<option value='Taiwan'>Taiwan</option>");
        for (var i = 0; i < result.features.length; i++) {
            _county = result.features[i].attributes["工作表1__Countrt_CN"];
            _names.push("<option value='" + _county + ">" + _county + "</option>");            
        }
        console.log(_names);
        $("#selCounty").html(_names.join(""));
        //if (result.length > 0) {
        //    alert(oJson[0].CODE + " " + oJson.CustomerName);
        //} else {
        //    alert(oJson.CODE + " " + oJson.CustomerName);
        //}
    } catch (e) {
        alert("callback err:" + e.message);
    }
    
}