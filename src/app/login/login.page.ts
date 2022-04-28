import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:string;
  public password:string;
  public userData:any;
  public url:string="http://microwebservice.online/ecodation/12subat/ahmet/filmapp.php";

  constructor(private http:HttpClient,public toastController: ToastController,private activatedRoute: ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    console.log("giriş");
    /// user login mi

    this.userData = JSON.parse(localStorage.getItem('userJSON'));

    

  }
  onLogin(email,password){
    // Kullanici bilgileri al servis gönder gelen cevabı işle

    console.log(password+"----"+email);

    this.http.get(this.url+'?email='+email+'&sifre='+password+'&servis=kullanici_giris').subscribe(data=>{
        console.log(data);

        if(data[0]){
          this.userData=data;
          this.uyari('Hoşgeldin','success');
          localStorage.setItem('userJSON', JSON.stringify(data));
          this.navCtrl.navigateRoot('/folder/'+this.userData.id);
          
        }else{
          this.uyari('Bilgiler yanlış,Hesap bulunamadı.','danger');
          
        }
       
    })
  }
  //UYARI KISIMI
  async uyari(mesaj,renk) {
    const toast = await this.toastController.create({
      message: mesaj,
      color:renk,
      duration: 500
    });
    toast.present();
  }
}
