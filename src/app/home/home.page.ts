import {Component, OnInit} from '@angular/core';
import {PwaService} from '../pwa.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    isPwaPossible = false;
    isIos = false;

    constructor(private pwaService: PwaService) {
    }


    installPwa() {
        this.pwaService.installPwa();
    }

    ngOnInit(): void {

        this.pwaService.havePwaOption$.asObservable()
            .pipe(
                tap((havePwaOption) => {
                    if (havePwaOption) {
                        this.isPwaPossible = this.pwaService.verifyPwaOption();
                    }
                }))
            .subscribe();
        this.isIos = this.pwaService.isIos();
    }


}
