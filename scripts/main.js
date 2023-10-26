import { Aprendiz, NivelEducativo } from "./aprendiz.js";
import { Curso } from "./curso.js";
var cursos = [new Curso("Prácticas esenciales para el agilisgmo", 20, 90, true, 2019),
    new Curso("Ingenieria de software para la web", 15, 99, true, 2019),
    new Curso("Pruebas automatizadas", 25, 50, true, 2020),
    new Curso("Principios de diseño y arquitectura", 30, 75, true, 2020)];
export var ap = new Aprendiz("Eduar Giovanni", "Romero Rubiano", "avatar.png", 30, NivelEducativo.UNIVERSITARIO, cursos);
console.log(ap.cursos);
var aprendizTable = document.getElementById("aprendiz");
var estadisticasTable = document.getElementById("estadisticas");
var cursosTable = document.getElementById("cursos");
var botonFiltro = document.getElementById("boton-filtro");
var textoBusqeuda = document.getElementById("texto-busqueda");
botonFiltro.onclick = function () {
    var text = textoBusqeuda.value;
    text = (text == null) ? "" : text;
    cursosTable.getElementsByTagName("tbody")[0].remove();
    var cursosFiltrados = ap.cursos.filter(function (c) { return c.nombre.match(text); });
    mostrarCursosAprendiz(cursosFiltrados);
};
mostrarDatosAprendiz(ap);
mostrarEstadisticas(ap);
mostrarCursosAprendiz(ap.cursos);
function mostrarDatosAprendiz(aprendiz) {
    var tbodyAprendiz = document.createElement("tbody");
    tbodyAprendiz.innerHTML = "<tr><td colspan=2><img src=\"./" + aprendiz.avatar + "\"/></td></tr>\n    <tr><td>Nombre</td><td>" + aprendiz.nombre + "</td></tr>\n    <tr><td>Apellidos</td><td>" + aprendiz.apellidos + "</td></tr>\n    <tr><td>Nivel Educativo</td><td>" + aprendiz.nivelEducativo + "</td></tr>\n    <tr><td>Edad</td><td>" + aprendiz.edad + "</td></tr>";
    aprendizTable.appendChild(tbodyAprendiz);
}
function mostrarEstadisticas(aprendiz) {
    var numeroCertificados = aprendiz.darCursosCertificados();
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td><b>Cursos certificados</b></td><td>" + numeroCertificados + "</td>";
    estadisticasTable.appendChild(trElement);
}
function mostrarCursosAprendiz(cursos) {
    var cursosTBody = document.createElement("tbody");
    var estado = cursos.map(function (c) { return (c.calificacion > 60 ? 'green' : 'red'); });
    var indice = 0;
    for (var _i = 0, cursos_1 = cursos; _i < cursos_1.length; _i++) {
        var curso = cursos_1[_i];
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + curso.nombre + "</td>\n        <td>" + curso.horas + "</td>\n        <td style='color:" + estado[indice] + "'>" + curso.calificacion + "</td>\n        <td>" + curso.certificado + "</td>\n        <td>" + curso.anio + "</td>";
        cursosTBody.appendChild(trElement);
        indice++;
    }
    cursosTable.appendChild(cursosTBody);
}
