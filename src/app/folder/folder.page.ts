import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public eniyi:any=[];
  public eniyifilmler:any=[];
  public sliderrbir:any;
  public sliderr:any;
  public yineleme_iki:any=[];
  public yineleme:any=[];
  public folder: string;
  public kelime: string;
  public isimler: any;
  public filmler:any=[];
  public kullanici:any=[];
  public eniyifilmurl:string="https://api.themoviedb.org/3/discover/movie?api_key=2a42d23c277319c03cb1f5f06c21d6f9&with_genres=18&primary_release_year=2022";
  public url:string="https://api.themoviedb.org/3/search/movie?api_key=2a42d23c277319c03cb1f5f06c21d6f9&query=";
  public urliki:string="https://api.themoviedb.org/3/discover/movie?api_key=2a42d23c277319c03cb1f5f06c21d6f9&sort_by=popularity.desc";
  public sliderurl:string="https://api.themoviedb.org/3/discover/movie?api_key=2a42d23c277319c03cb1f5f06c21d6f9&sort_by=vote_average.dsc";
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.yinele();

    this.kullanici = JSON.parse(localStorage.getItem('userJSON'));
    this.http.get(this.urliki).subscribe(data=>{
      this.yineleme=data;
      this.yineleme_iki=this.yineleme.results;
      
  
    })

    this.http.get(this.eniyifilmurl).subscribe(data=>{
      this.eniyi=data;
      this.eniyifilmler=this.eniyi.results;
      
    })
    
  }
  
  
  yinele(){
    this.http.get(this.urliki).subscribe(data=>{
    this.yineleme=data;
    this.yineleme_iki=this.yineleme.results;
    

  })
  
}

  bul(){
    if(this.kelime.length>0){
      this.http.get(this.url+this.kelime).subscribe(data=>{
      this.isimler=data;
      this.filmler=this.isimler.results;
      console.log(this.kelime);
      console.log(this.filmler);
      
    })
    }else{
      this.filmler=[];
    
    }
    
  }
  slider(){
    this.http.get(this.sliderurl).subscribe(data=>{
      this.sliderr=data;
      this.sliderrbir=this.sliderr.results;
      console.log(this.sliderrbir);
      

    })
  }

  

}
