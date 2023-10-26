import { Aprendiz, NivelEducativo } from "./aprendiz.js";
import { Curso } from "./curso.js";

let cursos = [new Curso("Prácticas esenciales para el agilisgmo",20,90,true,2019)
,new Curso("Ingenieria de software para la web",15,99,true,2019)
,new Curso("Pruebas automatizadas",25,50,true,2020)
,new Curso("Principios de diseño y arquitectura",30,75,true,2020)];

export const ap = new Aprendiz("Eduar Giovanni", "Romero Rubiano", "avatar.png",30,NivelEducativo.UNIVERSITARIO,cursos);
console.log(ap.cursos);

let aprendizTable: HTMLElement = document.getElementById("aprendiz")!;
let estadisticasTable: HTMLElement = document.getElementById("estadisticas")!;
let cursosTable: HTMLElement = document.getElementById("cursos")!;
let botonFiltro: HTMLElement = document.getElementById("boton-filtro")!;
let textoBusqeuda: HTMLInputElement = <HTMLInputElement>document.getElementById("texto-busqueda")!;

botonFiltro.onclick= () => {
    let text:string = textoBusqeuda.value;
    text = (text==null) ? "" : text;
    cursosTable.getElementsByTagName("tbody")[0].remove();
    let cursosFiltrados: Curso[] = ap.cursos.filter(c => c.nombre.match(text))
    mostrarCursosAprendiz(cursosFiltrados)
};

mostrarDatosAprendiz(ap);
mostrarEstadisticas(ap);
mostrarCursosAprendiz(ap.cursos);

function mostrarDatosAprendiz(aprendiz:Aprendiz):void{
    let tbodyAprendiz = document.createElement("tbody");
    tbodyAprendiz.innerHTML=`<tr><td colspan=2><img src="./${aprendiz.avatar}"/></td></tr>
    <tr><td>Nombre</td><td>${aprendiz.nombre}</td></tr>
    <tr><td>Apellidos</td><td>${aprendiz.apellidos}</td></tr>
    <tr><td>Nivel Educativo</td><td>${aprendiz.nivelEducativo}</td></tr>
    <tr><td>Edad</td><td>${aprendiz.edad}</td></tr>`
    aprendizTable.appendChild(tbodyAprendiz);
}

function mostrarEstadisticas(aprendiz:Aprendiz){
    let numeroCertificados:number=aprendiz.darCursosCertificados();
    let trElement:HTMLElement = document.createElement("tr");
    trElement.innerHTML=`<td><b>Cursos certificados</b></td><td>${numeroCertificados}</td>`
    estadisticasTable.appendChild(trElement);
}

function mostrarCursosAprendiz(cursos: Curso[]):void{
    let cursosTBody: HTMLElement = document.createElement("tbody");
    let estado: string[] = cursos.map(c => (c.calificacion>60 ? 'green' : 'red'));
    let indice: number = 0;
    for(let curso of cursos)
    {
        let trElement: HTMLElement = document.createElement("tr");
        trElement.innerHTML = `<td>${curso.nombre}</td>
        <td>${curso.horas}</td>
        <td style='color:${estado[indice]}'>${curso.calificacion}</td>
        <td>${curso.certificado}</td>
        <td>${curso.anio}</td>`;
        cursosTBody.appendChild(trElement);
        indice ++;
    }
    cursosTable.appendChild(cursosTBody);
} 