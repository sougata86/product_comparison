import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage/storage.service';
import { ElasticsearchService } from './elasticsearch.service';


@NgModule({
    declarations: [],
    providers: [
        ApiService,
        AuthService,
        StorageService,
        ElasticsearchService
    ]
})
export class ServiceModule { }
