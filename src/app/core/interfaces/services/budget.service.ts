import { IBudgetResponse } from '../responses/budget.response';
import { Observable } from 'rxjs';


export interface IBudgetService {
    getBudgets(): Observable<IBudgetResponse>;
}