import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Movie } from 'src/app/admin/movie';
import { MovieCatService } from 'src/app/admin/movie-cat.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  ine: any;
  constructor(public service: MovieCatService, private sanitizer: DomSanitizer, public ahlabik: AuthService) { }
  panier: Movie[] = [];
  numbers: number[] = [1, 2, 3, 4, 5];
  selectedNumber: number = 1;
  a: number = 0; total: number = 0;
  @Output() onOrderFinished = new EventEmitter();
  paymentHandler: any = null;
  stripeAPIKey: any =
    'pk_test_51O7i36GFZy3TZDoAO7sdOP1UhQaDt0RgkY2H7TZXvlnZOOysuyZISIce7bJ4yYoybMZVc3BG9HwyxJN77BwWhplH00VDwIqPIo'
  ngOnInit(): void {
    this.service.panier$.subscribe(
      panier => {
        this.panier = panier;
      }
    );
    for (const key in this.panier) {
      if (this.panier.hasOwnProperty(key)) {
        this.total += parseInt(this.panier[key].prix, 10);
      }
    }
    this.invokeStripe();
  }
  checkoutProduct() {
    this.makePayment();
  }
  makePayment() {
    let amount = this.total
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: (stripeToken: any) => {
        this.processPayment(amount, stripeToken);
      },

    });
    paymentHandler.open({
      name: 'ItSolutionStuff.com',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  processPayment(amount: any, stripeToken: any) {
    console.log(stripeToken);
    const data = {
      amount: amount * 100,
      token: stripeToken
    }
    this.ahlabik.sendPayment(data)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          alert("Operation sucessfully done")
          //signaler au composant ecommerce que la commande est finie
          this.onOrderFinished.emit(false);
          //Rénitialiser total à 0
          this.total = 0;
        },
        error: (e) => {
          console.log(e);
          alert("Error : Operation not done")
        },
      });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
            //signaler au composant ecommerce que la commande est réalisée
            this.onOrderFinished(false);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  changer(prix: Movie) {
    this.a = this.selectedNumber * parseInt(prix.prix);
    this.total = this.total - parseInt(prix.prix);
    this.total += this.a

  }
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logout() {
    this.ahlabik.doLogout();
  }

  ajouterAuPanier(article: Movie) {
    this.panier.push(article);
  }


}
