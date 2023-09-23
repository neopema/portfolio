import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDarkmode]'
})
export class DarkmodeDirective {

  darkMode: boolean = false;

  @HostListener('click') onClick() {
    if(this.element.nativeElement.classList.contains('dark-mode')){
      document.body.classList.toggle('dark');
      if(this.darkMode){
        this.renderer.setAttribute(document.querySelector("link[rel='icon']"), "href", "assets/favicon-dark.ico");
      }else{
        this.renderer.setAttribute(document.querySelector("link[rel='icon']"), "href", "favicon.ico");
      }
    }
  }

  @HostListener('load')
  ngOnInit(){
    const dark_scheme = window.matchMedia('(prefers-color-scheme: dark');
    // const favicon = document.querySelector("link[rel='icon']");

    if(dark_scheme.matches === true){
      this.renderer.setAttribute(document.querySelector("link[rel='icon']"), "href", "assets/favicon-dark.ico");
      document.body.classList.add('dark');
      this.darkMode = true;
    }
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
    ) { }

}
