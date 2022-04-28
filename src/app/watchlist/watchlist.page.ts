import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  public film_listesi:any=JSON.parse(localStorage.getItem("id")) || [] ;
  public url:string="https://api.themoviedb.org/3/movie/";
  public api:string="?api_key=2a42d23c277319c03cb1f5f06c21d6f9";
  public film_id:any=[];
  public filmler:any=[];
  public filmiki:any=[];
  public i:number;
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,public toastController: ToastController) { }

  ngOnInit() {
    this.film_id = JSON.parse(localStorage.getItem('id')) || [];
    for(this.i=0;this.i<this.film_id.length;this.i++){
      this.http.get( this.url+this.film_id[this.i]+this.api).subscribe(data=>{
        this.filmler=data;
        console.log(this.filmler);
        this.filmiki.push(this.filmler);
      });
    }
    
    

  }

  doRefresh(event) {

    setTimeout(() => {
      console.log('Async operation has ended');
      window.location.reload();
      event.target.complete();
    }, 500);
  }







  remove(id){
    

    this.film_listesi.forEach((i,index)=>{
      console.log(i);
      if(i==id) {
        this.film_listesi.splice(index,1);
        console.log(index);
        
        localStorage.setItem("id",JSON.stringify(this.film_listesi));
      }});

    this.uyari('Filminiz silindi.','danger');
  
    setTimeout(() => {
      window.location.assign("http://localhost:8100/watchlist");
    }, 2); 
  }


  async uyari(mesaj,renk) {
    const toast = await this.toastController.create({
      message: mesaj,
      color:renk,
      duration: 2000,
    });
    toast.present();
  }
}
