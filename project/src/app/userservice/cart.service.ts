import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError , map } from 'rxjs/operators';
export interface Product {
  productid: string;
  quantity: number;
}
export interface ProductDetails {
  _id: string;
  seller_id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  color: string;
  size: string;
  images: string[];
  featuredImage: string;
  avgRating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isFavorite: boolean;
  Promocode: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CartProduct {
  productid: ProductDetails | null;
  quantity: number;
  _id: string;
}

export interface CartResponse {
  _id: string;
  userid: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productid: string;
  quantity: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000'; 
  private localCart: CartItem[] = [];
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('token', `${token}`);
    }
    
    return headers;
  }

 

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartResponse[]>(`${this.apiUrl}/getusercart`, { headers: this.getHeaders() }).pipe(
      map(response => {
       
        if (!response || response.length === 0 || !response[0].products) {
          return [];
        }
        const cart = response[0];
       
        return cart.products
          .filter(product => product.productid !== null && product.productid?._id)
          .map(product => ({
            productid: product.productid!._id,
            quantity: product.quantity,
            name: product.productid!.name,
            price: product.productid!.price,
            stock: product.productid!.stock,
            image: product.productid!.featuredImage || product.productid!.images[0] || ''
          }));
      }),
      catchError(() => of(this.localCart))
    );
  }





  updateCartItem(productid: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatecartquantity`, { productid, quantity }, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }













  addToCart(products: Product[]): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/addtocart`, { products }, { headers: this.getHeaders() });
  }



  removeFromCart(productid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletefromcart/${productid}`, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        this.localCart = this.localCart.filter(item => item.productid !== productid);
        throw err;
      })
    );
  }

  updateLocalCart(cartItems: CartItem[]) {
    this.localCart = cartItems;
  }
}