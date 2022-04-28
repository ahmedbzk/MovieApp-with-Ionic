import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-detay',
  templateUrl: './detay.page.html',
  styleUrls: ['./detay.page.scss'],
})
export class DetayPage implements OnInit {
  public kullanici:any=[];
  
  public film_id: string;
  public filmler:any=[];
  public url:string="https://api.themoviedb.org/3/movie/";
  public api:string="?api_key=2a42d23c277319c03cb1f5f06c21d6f9";
  public film_listesi:any=JSON.parse(localStorage.getItem("id")) || [] ;

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,public toastController: ToastController) { }

  ngOnInit() {
    this.film_id = this.activatedRoute.snapshot.paramMap.get('id');

    
    this.kullanici = JSON.parse(localStorage.getItem('userJSON'));
    localStorage.setItem("id",JSON.stringify(this.film_listesi));
    this.http.get( this.url+this.film_id+this.api).subscribe(data=>{
    this.filmler=data;

    
    
  });
}




butonclick(id){
  let x =JSON.parse(localStorage.getItem("id")) || [];
  let a =0;
  x.forEach(element => {
    if(element==id){
      a++
    }
  });
  
  if(a==1){
    this.uyari('Film watchlistinizde var.','danger');
    (<HTMLInputElement>document.getElementById("myBtn")).hidden = true;
    
  }else{
    this.film_listesi.push(id);
    localStorage.setItem("id",JSON.stringify(this.film_listesi));
    this.uyari('Film watchlistinize başarıyla eklendi.','success');

(<HTMLInputElement>document.getElementById("myBtn")).hidden = true;
  }

}


async uyari(mesaj,renk) {
  const toast = await this.toastController.create({
    message: mesaj,
    color:renk,
    duration: 1000,
  });
  toast.present();
}
}
