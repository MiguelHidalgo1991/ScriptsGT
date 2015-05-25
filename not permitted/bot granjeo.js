function inserir(a, o) {
    document.units[a].value = o
}

function total(a) {
    return $("input[name=" + a + "]").next().text().match(/([0-9]+)/)[1]
}

function redir(a) {
    location.search = "?village=" + dados.village.id + "&screen=" + a
}

function verificar(a) {
    return $("input[name=" + a + "]").length > 0 ? 1 : 0
}

function obter_coords() {
    var a = [];
    $("table[class=map] td:has(a[onmouseover*=Map.map_popup])").each(function(o, e) {
        var n = e.innerHTML.match(/map_popup\((.*?)\)\"/i);
        if (n) {
            var n = n[0].split(","),
                r = parseInt(n[4], 10),
                t = String(n[1].match(/\d+\|\d+/)),
                i = (i = n[5].match(/\'(.+)\s\(/)) ? i[1] : null;
            i || (!opcoes.aldeia_pontos.min || r >= opcoes.aldeia_pontos.min) && (!opcoes.aldeia_pontos.max || r <= opcoes.aldeia_pontos.max) && a.push(t)
        }
    }), a = a.filter(function(a, o, e) {
        return o === e.lastIndexOf(a)
    }), alert(a.length > 0 ? a.join(" ") : "Semabandonadas para obter coordenadas!")
}
var unidades = {
    spear: [0, 0],
    sword: [0, 0],
    axe: [0, 0],
    archer: [0, 0],
    spy: [1, 0],
    light: [4, 0],
    marcher: [0, 0],
    heavy: [0, 0],
    ram: [0, 0],
    catapult: [0, 0],
    snob: [0, 0]
}, opcoes = {
        coords: "499|433",
        protecao: 1,
        obter_coords: 1,
        aldeia_pontos: {
            min: 0,
            max: 13e3
        },
        aviso_ultima: 1
    }, dados = game_data;
"place" == dados.screen ? ($("div[style*=red]").length > 0 && redir("place"), opcoes.protecao && $("[width=300] [href*=player]").length > 0 ? redir("place") : $("[name=submit]").click(), "" == document.units.x.value && $("[name=support]").length > 0 && ($.each(unidades, function(a, o) {
    verificar(a) && (o[1] ? inserir(a, total(a)) : total(a) - o[0] >= 0 ? inserir(a, o[0]) : inserir(a, total(a)))
}), coords = opcoes.coords.split(" "), name = "FastFarm" + dados.world, num = $.cookie(name), (null == num || num >= coords.length) && (num = 0), num == coords.length && opcoes.aviso_ultima && alert("Última aldeia da lista..."), coord = coords[num].split("|"), inserir("x", coord[0]), inserir("y", coord[1]), $.cookie(name, parseInt(num) + 1, {
    expires: 10
}), $("[name=attack]").click())) : "map" == dados.screen && opcoes.obter_coords ? obter_coords() : redir("place");