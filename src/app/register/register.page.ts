import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public adi:string;
  public soyadi:string;
  public email:string;
  public password:string;
  public userData:any;
  public url:string="http://microwebservice.online/ecodation/12subat/ahmet/filmapp.php";

  constructor(private http:HttpClient,public toastController: ToastController,private activatedRoute: ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
  }
  onLogin(adi,soyadi,email,password){
    // Kullanici bilgileri al servis gönder gelen cevabı işle

    console.log(adi+"----"+soyadi+"----"+email+"----"+password);

    this.http.get(this.url+'?adi='+adi+'&soyadi='+soyadi+'&email='+email+'&sifre='+password+'&servis=kullanici_kayit').subscribe(data=>{
        console.log(data);

        if(data)
        {
          console.log(adi+"----"+soyadi+"----"+email+"----"+password);
          this.userData=data;
          this.uyari('Kayıt başarılı, Giriş yap sayfasına gidebilirsiniz.','success');
          localStorage.setItem('userJSON', JSON.stringify(data));
          
        }else{
          this.uyari('Bilgiler geçerli değil. Lütfen tekrar deneyiniz.','danger');
          
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
