import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Artist, CreateArtistRequest, CreateCustomerRequest, CreateOrderRequest, CreateReviewRequest, Customer, Order, Painting, PaintingState, Review } from './platform.models';
import QueryString from 'qs';

class ApiClient {
   private client: AxiosInstance;

   constructor(baseURL: string) {
      this.client = axios.create({
         baseURL,
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   // Artists
   getArtists(): Promise<AxiosResponse<Artist[]>> {
      return this.client.get('/artist');
   }

   createArtist(data: CreateArtistRequest): Promise<AxiosResponse<Artist>> {
      return this.client.post('/artist', data);
   }

   getArtistById(artistId: string): Promise<AxiosResponse<Artist>> {
      return this.client.get(`/artist/${artistId}`);
   }

   updateArtist(artistId: string, data: Artist): Promise<AxiosResponse<Artist>> {
      return this.client.put(`/artist/${artistId}`, data);
   }

   // Customers
   createCustomer(data: CreateCustomerRequest): Promise<AxiosResponse<Customer>> {
      return this.client.post('/customer', data);
   }

   getCustomerById(customerId: string): Promise<AxiosResponse<Customer>> {
      return this.client.get(`/customer/${customerId}`);
   }

   updateCustomer(customerId: string, data: Customer): Promise<AxiosResponse<Customer>> {
      return this.client.put(`/customer/${customerId}`, data);
   }

   // Orders
   createOrder(customerId: string, data: CreateOrderRequest): Promise<AxiosResponse<Order>> {
      return this.client.post(`/order`, data, {
         params: { customerId }
      });
   }

   getOrders(customerId: string): Promise<AxiosResponse<Order[]>> {
      return this.client.get(`/order`, {
         params: { customerId }
      });
   }

   getOrder(customerId: string, orderId: string): Promise<AxiosResponse<Order | null>> {
      return this.client.get(`/order/${orderId}`, {
         params: { customerId }
      });
   }

   cancelOrder(orderId: string, customerId: string): Promise<AxiosResponse<Order>> {
      return this.client.put(`/order/${orderId}/cancel`, null, {
         params: { customerId }
      });
   }

   // Paintings
   getPaintings(states: PaintingState[]): Promise<AxiosResponse<Painting[]>> {
      return this.client.get('/paintings',
         {
            params: { states: states.join(",") }
         });
   }

   getPaintingsByIdList(idList: string[]): Promise<AxiosResponse<Painting[]>> {
      return this.client.post('/paintings/get', { idList: idList })
   }

   createPainting(data: Painting): Promise<AxiosResponse<Painting>> {
      return this.client.post('/paintings', data);
   }

   getPaintingsByArtist(artistId: string): Promise<AxiosResponse<Painting[]>> {
      return this.client.get(`/paintings/${artistId}`);
   }

   getPaintingById(paintingId: string): Promise<AxiosResponse<Painting>> {
      return this.client.get(`/paintings/${paintingId}`);
   }

   updatePainting(artistId: string, paintingId: string, data: Painting): Promise<AxiosResponse<Painting>> {
      return this.client.put(`/paintings/${artistId}/paintings/${paintingId}`, data);
   }

   // Reviews
   getReviews(paintingId?: string): Promise<AxiosResponse<Review[]>> {
      const params: any = {};
      if (paintingId) params.paintingId = paintingId;

      return this.client.get('/review', { params: params });
   }

   createReview(data: CreateReviewRequest): Promise<AxiosResponse<Review>> {
      return this.client.post('/review', data);
   }
}

export default ApiClient;

