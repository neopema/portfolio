import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  @ViewChild('background',{static: true}) universo!: ElementRef<HTMLCanvasElement>;

  cells_randomnes: boolean[] = [false,false,false,false,true];
  randomnes: boolean[] = [false,false,false,false,false,true];
  randomnes_alt: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true];
  current_universe: string = "";

  x_lightyears: number = 0;
  y_lightyears: number = 0;

  materia!: boolean[][];
  dark_matter: string = "";
  espectro: string = "";

  grados_energia: string[] = [
    "rgba(252,191,9,0.9)",
    "rgba(237,37,78,0.9)",
    "rgba(84,101,255,0.9)",
    "rgba(55,213,139,0.9)",
    "rgba(146,47,181,0.9)",
  ];

  grados_energia_bajos: string[] = [
    "rgba(252,191,9,0.36)",
    "rgba(237,37,78,0.36)",
    "rgba(84,101,255,0.36)",
    "rgba(55,213,139,0.36)",
    "rgba(146,47,181,0.36)",
  ];

  grados_energia_bajos_p: string[] = [
    "rgba(252,191,9,0.36)",
    "rgba(237,37,78,0.36)",
    "rgba(84,101,255,0.36)",
    "rgba(55,213,139,0.36)",
  ];

  energia_especial: string = "rgba(246,134,34,0.36)";

  percepcion_temporal = 9;

  infinite_universe: boolean = false;

  constructor(private route: Router) { 
    window.addEventListener("resize", this.resize.bind(this));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setRealidad();
  }

  setRealidad(){

    const realidad = this.universo.nativeElement;
    const vacio = realidad.getContext("2d")!;

    this.setUniverse();
    this.resize();

    const espacio = () => {
      if(vacio){

        this.setDarkMatter();
  
        for (let x = 0; x < this.materia.length; x++) {
          for (let y = 0; y < this.materia[x].length; y++) {
            const celula = this.materia[x][y];
            
            if(celula===true)
            {
              let espectro = 
              this.espectro == "random" ? 
                this.random(this.grados_energia) : 
                (this.espectro == "random_low" ?
                  this.random(this.grados_energia_bajos_p) :
                  //else
                  this.getEspectro()
                );
              vacio.fillStyle = espectro;
              vacio.fillRect(x*10, y*9, 10, 9);
            }
            else
            {
              if(this.current_universe === "/linktree" || this.current_universe === "/art"){

                vacio.fillStyle = this.random(this.grados_energia_bajos);

              }else if(this.current_universe === "/projects"){

                let ran = this.random([this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.grados_energia_bajos[4]]);
                let alt = this.random([ran, this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter]);
                vacio.fillStyle = alt;

              }else if(this.current_universe === "/work"){

                let ran = this.random(
                  [
                  this.dark_matter,
                  this.dark_matter,
                  this.dark_matter,
                  this.dark_matter,
                  this.dark_matter,
                  this.dark_matter,
                  this.dark_matter,
                  this.dark_matter,
                  "rgba(30, 47, 57,0.9)",
                  "rgba(8, 13, 20,0.9)",
                  "rgba(8, 24, 32, 0.9)"
                  ]
                );

                let alt = this.random([ran, this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter,this.dark_matter]);
                vacio.fillStyle = alt; 
              }else{
                vacio.fillStyle = this.dark_matter;
              }
              vacio.fillRect(x*10, y*9, 10, 9);
            }
            
          }
        }

        if(this.infinite_universe){
          this.materia = this.reaccion_infinita(this.materia);
        }else{
          this.materia = this.reaccion(this.materia);
        }
  
      }
    }

    let tiempo = setInterval(espacio, 1000/this.percepcion_temporal);

  }

  setUniverse() {

    this.current_universe  = this.route.url;
    this.infinite_universe = this.infinite();

    this.route.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.current_universe = event.url;
        this.resize();
        this.infinite_universe = this.infinite();
      }
    })
  }

  resize() {

    let proto_materia: boolean[][];
    const realidad = this.universo.nativeElement;
    this.x_lightyears = realidad.width = window.innerWidth;
    this.y_lightyears = realidad.height = window.innerHeight;
    // this.setYLightyears();

    let x_limit = Math.ceil(this.x_lightyears/10);
    let y_limit = Math.ceil(this.y_lightyears/9);

    proto_materia = Array(Math.ceil(x_limit)).fill(Array(Math.ceil(y_limit)).fill(false));
    this.materia = this.sustancia(proto_materia);

  }

  sustancia(matter: boolean[][]): boolean[][] {
    let transformed_matter: boolean[][] = JSON.parse(JSON.stringify(matter));
    
    //random
    for (let i = 0; i < transformed_matter.length; i++) {
      for (let j = 0; j < transformed_matter[i].length; j++) {
        if(i == 0 || j == 0 || i == transformed_matter.length-1 || j == transformed_matter[i].length-1){
          transformed_matter[i][j] = false;
        }else{
          transformed_matter[i][j] = this.random(this.randomnes);
        }
      }
    }

    
    // for (let i = 0; i < transformed_matter.length; i++) {
      // for (let j = 0; j < transformed_matter[i].length; j++) {
        // if(i == 0 || j == 0 || i == transformed_matter.length-1 || j == transformed_matter[i].length-1){
        //   transformed_matter[i][j] = false;
        // }else{
        //   transformed_matter[i][j] = this.random(this.randomnes);
        // }
        // transformed_matter[j][i] = this.random(this.randomnes_alt)
      // }
    // }


    return transformed_matter;
  }

  reaccion(espacio_tiempo: boolean[][]){
    let reaccion: boolean[][] = espacio_tiempo.map(row => [...row]);
    for (let x = 0; x < this.materia.length; x++) {
      for (let y = 0; y < this.materia[x].length; y++) {
        const celula = this.materia[x][y];
        const acciones = this.accion(espacio_tiempo, x, y);

        if(celula === false && acciones == 3){
          //pasivo
          reaccion[x][y] = true;
        }else if(celula === true && (acciones < 2 || acciones > 3)){
          //inactivo
          reaccion[x][y] = false;
        }else if(celula === true && (acciones==2 || acciones==3)){
          //activo
          reaccion[x][y] = true;
        }
      }
    }

    return reaccion;
  }

  reaccion_infinita(espacio_tiempo: boolean[][]){
    let reaccion: boolean[][] = espacio_tiempo.map(row => [...row]);
    for (let x = 0; x < this.materia.length; x++) {
      for (let y = 0; y < this.materia[x].length; y++) {
        const celula = reaccion[x][y];
        const acciones = this.accion(reaccion, x, y);

        if(celula === false && acciones == 3){
          //pasivo
          reaccion[x][y] = true;
        }else if(celula === true && (acciones < 2 || acciones > 3)){
          //inactivo
          reaccion[x][y] = false;
        }else if(celula === true && (acciones==2 || acciones==3)){
          //activo
          reaccion[x][y] = true;
        }
      }
    }

    return reaccion;
  }

  accion(espacio_tiempo: boolean[][], x: number, y:number){
    let acciones = 0;

    for(let pinX = -1; pinX<= 1; pinX++){
      for (let pinY = -1; pinY <= 1; pinY++) {
        if(pinX === 0 && pinY === 0) continue;

        let posX = x + pinX;
        let posY = y + pinY;
        
        if (posY >= 0 && posY < espacio_tiempo[x].length && posX >= 0 && posX < espacio_tiempo.length){
          acciones += espacio_tiempo[posX][posY] != false ? 1 : 0;
        }
        
      }
    }

    return acciones;
  }

  setDarkMatter(){
    let getted_dark_matter = "";
    let getted_espectro = "random";
    let dark = document.body.classList.contains("dark");
    // console.log(this.current_universe);
    switch (this.current_universe) {
      case '/about':
        getted_dark_matter = this.energia_especial;
        getted_espectro = "std";
        break;
      case '/work':
        getted_dark_matter = "rgba(4, 15, 25, 0.3)";
        // this.grados_energia_bajos[2];
        getted_espectro = "std";
        break;
      case '/art':
        getted_dark_matter = this.grados_energia_bajos[1];
        break;
      case '/projects':
        getted_dark_matter = "rgba(106,34,130,0.3)";
        // this.grados_energia_bajos[4];
        getted_espectro = "random_low";
        break;
      case '/linktree':
        getted_dark_matter = dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";
        getted_espectro = "std";
        break;
      default:
        getted_dark_matter = dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";
        break;
    }

    this.dark_matter = getted_dark_matter;
    this.espectro = getted_espectro;
  }

  getEspectro(){
    let dark = document.body.classList.contains("dark");

    let current_espectro = "";
    let espectro_random = this.random(this.randomnes);
    let final_random_choice = this.random(this.randomnes);

    if(this.current_universe === "/linktree"){
      current_espectro = !espectro_random ? this.random(this.grados_energia) : "rgba(255,255,255,0.3)";
    }else{
      let random_choice = this.current_universe == "/about" ?
      this.random(["rgba(255,255,255,0.36)","rgba(255,255,255,0.36)", this.complementario()]) :
      (this.current_universe == "/work" ?
        this.random(["rgba(144, 92, 42,0.49)","rgba(73, 87, 79,0.63)","rgba(73, 87, 79,0.63)","rgba(176, 154, 126,0.49)","rgba(166, 95, 33,0.49)","rgba(115, 44, 29,0.49)","rgba(217, 200, 191,0.49)","rgba(242, 160, 61,0.49)","rgba(140, 117, 46,0.49)","rgba(159, 118, 70,0.49)","rgba(36, 115, 115,0.49)",this.complementario(), this.complementario()]) :
        this.random(["rgba(255,255,255,0.36)", this.complementario(), this.complementario()]));

      current_espectro = !espectro_random ?
        this.dark_matter : 
        (final_random_choice ?
          random_choice :
          this.dark_matter
        );
    }

    return current_espectro;
  }

  random(items: any[]){
    return items[Math.floor(Math.random() * items.length)];
  }

  complementario(): string{
    let complementario = "";

    switch (this.dark_matter) {
      case this.energia_especial:
        complementario = this.energia_especial;
        break;
      case this.grados_energia_bajos[2]:
        complementario = "rgba(4, 15, 25, 0.9)";
        // this.random(["rgba(252,191,9,0.54)", this.grados_energia_bajos[3], this.grados_energia[2]]);
        break;
      // case this.grados_energia_bajos[1]:
      //   complementario = this.random([this.grados_energia_bajos[0],this.grados_energia_bajos[3],this.grados_energia_bajos[2],this.grados_energia_bajos[4], this.energia_especial]);
      //   break;
      // case this.grados_energia_bajos[4]:
      //   complementario = this.random([this.grados_energia_bajos[0],this.grados_energia_bajos[0],this.grados_energia_bajos[3]]);
      //   break;
    }

    return complementario;
  }

  setYLightyears(): number{
    let espacio_control = window.innerWidth > 1023 ? (window.innerHeight/100)*11 : (window.innerHeight/100)*34;
    let lightyears = this.specialUniverse() ? window.innerHeight : window.innerHeight - espacio_control;
    
    return lightyears;
  }

  specialUniverse(): boolean{
    if(this.current_universe === "/linktree"){
      return true;
    }

    return false;
  }

  infinite(): boolean{
    if(this.current_universe == "/linktree" || this.current_universe == "/art" || this.current_universe == "/projects" || this.current_universe == "/"){
      return false;
    }

    return true;
  }

}
