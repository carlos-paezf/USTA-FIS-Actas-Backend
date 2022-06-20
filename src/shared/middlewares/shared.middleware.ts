import { HttpResponse } from '../response/http.response';


export class SharedMiddleware {
    constructor(protected readonly httpResponse: HttpResponse = new HttpResponse()) { }


}