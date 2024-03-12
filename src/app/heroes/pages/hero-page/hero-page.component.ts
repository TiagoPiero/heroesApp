import { Component, OnInit, Pipe } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, //para leer la ruta especificada
    private router: Router                   // para redireccionar a heroes/list
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById( id ) )  //recibo los params, pero necesito solo el id y por eso lo desestructuro.
      ).subscribe (hero => {
        if ( !hero ) return this.router.navigate( [ 'heroes/list']);
        this.hero = hero;
        return;
      })
  }

  goBack(): void {
   this.router.navigate([ 'heroes/list' ]);
  }

}
